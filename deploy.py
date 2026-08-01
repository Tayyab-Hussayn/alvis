#!/usr/bin/env python3
"""Build and deploy the Alvis website to the cPanel server via SSH/SFTP.

Reads connection details from AGENTS/cpanel-ssh.md (gitignored — never commit
credentials directly in this file). Run from the project root:

    python3 deploy.py

Steps: local `npm run build` -> zip the production artifacts (.next, public,
server.js, package.json, package-lock.json, next.config.mjs) -> upload over
SFTP -> extract on the server -> `npm install --omit=dev` on the server ->
restart the Node.js app via cloudlinux-selector -> verify the live site
responds.

Deliberately excluded from the deploy package:
  - node_modules (installed fresh on the server for the correct platform)
  - .env.local (never overwrite whatever secrets are already configured
    on the server — e.g. the contact form's SMTP credentials)
  - .git, AGENTS/, source .tsx/.ts files (not needed at runtime; only the
    compiled .next output and public assets are)
  - .next/cache (build-speed cache only, not needed to serve the app)
"""

import os
import re
import subprocess
import sys
import time
import zipfile

import paramiko

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
SSH_DOC = os.path.join(PROJECT_ROOT, 'AGENTS', 'cpanel-ssh.md')
LOCAL_ZIP = os.path.join(PROJECT_ROOT, 'alvis-deploy.zip')
APP_ROOT = 'alvis'  # relative to the remote user's home dir, per AGENTS/cpanel-ssh.md
REMOTE_ZIP = f'alvis-deploy-{int(time.time())}.zip'
REMOTE_NPM = '/opt/alt/alt-nodejs20/root/usr/bin/npm'
SITE_URL = 'https://alvismarketing.com/'

INCLUDE_PATHS = ['server.js', 'package.json', 'package-lock.json', 'next.config.mjs', 'public', '.next']
EXCLUDE_DIR_PARTS = {'.next/cache'}


def parse_ssh_creds(doc_path):
    if not os.path.isfile(doc_path):
        sys.exit(f"ERROR: SSH instructions file not found at {doc_path}. Cannot deploy without connection details.")
    text = open(doc_path).read()

    def grab(label):
        m = re.search(rf'\*\*{label}:\*\*\s*(\S+)', text)
        if not m:
            sys.exit(f"ERROR: could not find '{label}' in {doc_path}")
        return m.group(1)

    return {
        'host': grab('Host'),
        'port': int(grab('Port')),
        'user': grab('User'),
        'password': grab('Pass'),
    }


def run_local_build():
    print('==> Running local production build (npm run build)...')
    result = subprocess.run(['npm', 'run', 'build'], cwd=PROJECT_ROOT)
    if result.returncode != 0:
        sys.exit('ERROR: local build failed. Aborting deploy — nothing was uploaded.')
    print('==> Build OK.\n')


def build_zip():
    print('==> Packaging deploy artifacts...')
    if os.path.exists(LOCAL_ZIP):
        os.remove(LOCAL_ZIP)

    file_count = 0
    with zipfile.ZipFile(LOCAL_ZIP, 'w', zipfile.ZIP_DEFLATED) as zf:
        for rel_path in INCLUDE_PATHS:
            abs_path = os.path.join(PROJECT_ROOT, rel_path)
            if not os.path.exists(abs_path):
                sys.exit(f"ERROR: expected build artifact missing: {rel_path} (did the build actually produce it?)")

            if os.path.isfile(abs_path):
                zf.write(abs_path, rel_path)
                file_count += 1
                continue

            for dirpath, dirnames, filenames in os.walk(abs_path):
                rel_dir = os.path.relpath(dirpath, PROJECT_ROOT)
                if any(rel_dir == d or rel_dir.startswith(d + os.sep) for d in EXCLUDE_DIR_PARTS):
                    dirnames[:] = []
                    continue
                dirnames[:] = [d for d in dirnames if os.path.join(rel_dir, d) not in EXCLUDE_DIR_PARTS]
                for fname in filenames:
                    fabs = os.path.join(dirpath, fname)
                    frel = os.path.relpath(fabs, PROJECT_ROOT)
                    zf.write(fabs, frel)
                    file_count += 1

    size_mb = os.path.getsize(LOCAL_ZIP) / (1024 * 1024)
    print(f'==> Packaged {file_count} files, {size_mb:.1f} MB -> {LOCAL_ZIP}\n')


def run_remote(client, cmd, label, timeout=280):
    print(f'==> {label}...')
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    exit_code = stdout.channel.recv_exit_status()
    out = stdout.read().decode(errors='replace')
    err = stderr.read().decode(errors='replace')
    if out.strip():
        print(out.strip())
    if exit_code != 0:
        if err.strip():
            print(err.strip(), file=sys.stderr)
        sys.exit(f"ERROR: remote step '{label}' failed (exit {exit_code}). Aborting.")
    return out


def deploy():
    creds = parse_ssh_creds(SSH_DOC)

    run_local_build()
    build_zip()

    print(f"==> Connecting to {creds['host']}:{creds['port']} as {creds['user']}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(creds['host'], port=creds['port'], username=creds['user'], password=creds['password'], timeout=30)

    try:
        print('==> Uploading deploy package...')
        sftp = client.open_sftp()
        sftp.put(LOCAL_ZIP, f'/home/{creds["user"]}/{REMOTE_ZIP}')
        sftp.close()
        print('==> Upload complete.\n')

        run_remote(
            client,
            f'mkdir -p ~/{APP_ROOT} && cd ~/{APP_ROOT} && unzip -oq ~/{REMOTE_ZIP} && rm ~/{REMOTE_ZIP}',
            'Extracting build on server',
        )

        run_remote(
            client,
            f'cd ~/{APP_ROOT} && {REMOTE_NPM} install --omit=dev --no-audit --no-fund',
            'Installing production dependencies on server (this can take a couple of minutes)',
            timeout=480,
        )

        run_remote(
            client,
            f'/usr/sbin/cloudlinux-selector restart --json --interpreter nodejs --user {creds["user"]} --app-root {APP_ROOT}',
            'Restarting Node.js app',
        )
    finally:
        client.close()

    print('==> Waiting for app to come back up...')
    time.sleep(6)

    print(f'==> Verifying live site at {SITE_URL} ...')
    verify = subprocess.run(
        ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '20', SITE_URL],
        capture_output=True, text=True,
    )
    status = verify.stdout.strip()
    if status != '200':
        sys.exit(f"ERROR: post-deploy check failed — {SITE_URL} returned HTTP {status or '(no response)'}. "
                  f"The app was restarted but is not responding correctly. Investigate before trusting this deploy.")

    print(f'==> Verified: {SITE_URL} responded 200 OK.')
    os.remove(LOCAL_ZIP)
    print('\nDeployment complete.')


if __name__ == '__main__':
    deploy()
