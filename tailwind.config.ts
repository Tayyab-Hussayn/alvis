import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:            'var(--color-bg)',
        surface:       'var(--color-surface)',
        subtle:        'var(--color-subtle)',
        text:          'var(--color-text)',
        'text-muted':  'var(--color-text-muted)',
        'text-faint':  'var(--color-text-faint)',
        accent:        'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-soft': 'var(--color-accent-soft)',
        border:        'var(--color-border)',
        'border-dark': 'var(--color-border-dark)',
        success:       'var(--color-success)',
        error:         'var(--color-error)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 6rem)',     { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.7' }],
        'body-md':     ['1rem',     { lineHeight: '1.6' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.5' }],
        'label':       ['0.75rem',  { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

export default config
