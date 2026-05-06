'use server'

import nodemailer from 'nodemailer'

export type FormState = {
  success: boolean
  message: string
} | null

export async function sendContactEmail(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const company = formData.get('company')?.toString().trim()
  const role = formData.get('role')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return { success: false, message: 'Name, email, and message are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"TapFlow Contact" <${process.env.GMAIL_USER}>`,
      to: 'fengng6907@gmail.com',
      replyTo: email,
      subject: `New TapFlow Enquiry from ${name}${company ? ` · ${company}` : ''}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
            <div style="width: 32px; height: 32px; background: #dc2626; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">⚡</div>
            <span style="font-size: 20px; font-weight: 700; color: #fff;">TapFlow</span>
          </div>
          <h2 style="color: #fff; font-size: 24px; font-weight: 700; margin-bottom: 8px;">New Enquiry</h2>
          <p style="color: #71717a; margin-bottom: 32px; font-size: 14px;">Someone reached out via tapflow.io/contact</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${[
              ['Name', name],
              ['Email', email],
              ['Company', company || '—'],
              ['Role', role || '—'],
            ].map(([k, v]) => `
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-size: 13px; font-weight: 600; width: 100px; border-bottom: 1px solid rgba(255,255,255,0.06);">${k}</td>
                <td style="padding: 10px 0; color: #e4e4e7; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.06);">${v}</td>
              </tr>
            `).join('')}
          </table>
          <div style="background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px;">
            <div style="color: #52525b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Message</div>
            <div style="color: #e4e4e7; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</div>
          </div>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); color: #3f3f46; font-size: 12px;">
            Reply directly to this email to reach ${name} at ${email}
          </div>
        </div>
      `,
    })

    return { success: true, message: "Message received. We'll be in touch within 24 hours." }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, message: 'Failed to send your message. Please try again or email us directly.' }
  }
}
