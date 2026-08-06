import nodemailer from 'nodemailer'
import type { ContactFormData } from './validations'
import { siteUrl, siteName, contactEmail } from './site'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;')
}

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Newsletter signup → agency inbox.
 *
 * Signups were previously only `console.log`-ed by the API route, which meant
 * every subscriber was silently dropped on a server nobody reads. Forwarding to
 * the contact inbox keeps them until a real ESP (Mailchimp/ConvertKit) is wired up.
 */
export async function sendNewsletterSignup(email: string, source = 'website'): Promise<void> {
  await transporter.sendMail({
    from:    `"Alvis Website" <${process.env.SMTP_USER}>`,
    to:      process.env.CONTACT_EMAIL ?? contactEmail,
    replyTo: email,
    subject: `New newsletter subscriber — ${email}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f7;">
        <div style="background: #0a1b3d; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h1 style="color: white; font-size: 22px; margin: 0;">New Newsletter Subscriber</h1>
        </div>
        <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e5e5e3;">
          <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">Email</p>
          <p style="margin: 0 0 20px;"><a href="mailto:${escapeHtml(email)}" style="color: #e63946; font-weight: 600;">${escapeHtml(email)}</a></p>
          <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">Signed up from</p>
          <p style="margin: 0; color: #0d0d0d;">${escapeHtml(source)}</p>
        </div>
        <p style="color: #a1a1aa; font-size: 12px; text-align: center; margin-top: 24px;">
          Sent from ${siteUrl}
        </p>
      </div>
    `,
  })
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, phone, subject, message } = data

  // Notification email → agency inbox
  await transporter.sendMail({
    from:    `"Alvis Website" <${process.env.SMTP_USER}>`,
    to:      process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Inquiry from ${name} — ${subject}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f7;">
        <div style="background: #0a1b3d; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h1 style="color: white; font-size: 24px; margin: 0;">New Project Inquiry</h1>
        </div>
        <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e5e5e3;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 140px; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; color: #0d0d0d; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #e63946;">${escapeHtml(email)}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; color: #0d0d0d;">${escapeHtml(phone)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Subject</td>
              <td style="padding: 10px 0; color: #0d0d0d;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e3;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;">Message</p>
            <p style="color: #0d0d0d; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
        <p style="color: #a1a1aa; font-size: 12px; text-align: center; margin-top: 24px;">
          Sent from ${siteUrl} contact form
        </p>
      </div>
    `,
  })

  // Auto-reply → sender
  await transporter.sendMail({
    from:    `"Alvis" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: `We got your message, ${name.split(' ')[0]}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f7;">
        <div style="background: #0a1b3d; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h1 style="color: white; font-size: 24px; margin: 0;">Thanks for reaching out.</h1>
        </div>
        <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e5e5e3;">
          <p style="color: #0d0d0d; font-size: 16px; line-height: 1.6;">
            Hi ${escapeHtml(name.split(' ')[0])},<br><br>
            We've received your message and will review it shortly. You can expect a reply from us
            within 24 hours (usually faster).<br><br>
            In the meantime, feel free to explore our work at
            <a href="${siteUrl}/case-studies" style="color: #e63946;">our case studies</a>.<br><br>
            Talk soon,<br>
            <strong>The Alvis Team</strong>
          </p>
        </div>
        <p style="color: #a1a1aa; font-size: 12px; text-align: center; margin-top: 24px;">
          ${siteName} · <a href="mailto:${contactEmail}" style="color: #a1a1aa;">${contactEmail}</a> · ${siteUrl}
        </p>
      </div>
    `,
  })
}
