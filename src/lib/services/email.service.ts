/**
 * Email service — sends transactional emails via SMTP (nodemailer).
 *
 * Required environment variables (in .env.local):
 *   SMTP_HOST       — e.g. smtp.gmail.com  or  smtp.zoho.com
 *   SMTP_PORT       — e.g. 465 (SSL) or 587 (STARTTLS)
 *   SMTP_SECURE     — "true" for port 465, "false" for 587
 *   SMTP_USER       — your email login / address
 *   SMTP_PASS       — your email password or app password
 *   SMTP_FROM_NAME  — display name, e.g. "Alchemystery"
 *   SMTP_FROM_EMAIL — sender address, e.g. hello@alchemystery.in
 */

import nodemailer from 'nodemailer';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // SMTP not configured — emails will be skipped silently
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

export interface LeadEmailPayload {
  toEmail: string;
  visitorName: string;
  visitorEmail: string;
  sessionType?: string | null;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('[EmailService] SMTP not configured — skipping lead notification email.');
    return false;
  }

  const fromName = process.env.SMTP_FROM_NAME || 'Alchemystery';
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '';

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const sessionRow = payload.sessionType
    ? `<tr><td style="padding-bottom:20px;"><p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">Session Interest</p><p style="margin:0;font-size:14px;color:#F1EDE2;background:rgba(207,165,106,0.08);padding:8px 14px;border-radius:6px;border:1px solid rgba(207,165,106,0.2);display:inline-block;">${escapeHtml(payload.sessionType)}</p></td></tr>`
    : '';

  const htmlBody = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>New Enquiry</title></head><body style="margin:0;padding:0;background:#0B0F1E;font-family:'Segoe UI',Arial,sans-serif;color:#F1EDE2;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F1E;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#11162A;border-radius:12px;border:1px solid rgba(207,165,106,0.25);overflow:hidden;max-width:100%;"><tr><td style="background:linear-gradient(135deg,#0B0F1E 0%,#1A1030 100%);padding:32px 40px;border-bottom:1px solid rgba(207,165,106,0.2);"><p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">&#10022; Alchemystery</p><h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#F1EDE2;">New Enquiry Received</h1><p style="margin:4px 0 0;font-size:12px;color:#8892A4;">${submittedAt} IST</p></td></tr><tr><td style="padding:32px 40px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:20px;"><p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">From</p><p style="margin:0;font-size:16px;font-weight:600;color:#F1EDE2;">${escapeHtml(payload.visitorName)}</p><p style="margin:2px 0 0;font-size:13px;color:#8892A4;"><a href="mailto:${escapeHtml(payload.visitorEmail)}" style="color:#CFA56A;text-decoration:none;">${escapeHtml(payload.visitorEmail)}</a></p></td></tr>${sessionRow}<tr><td style="padding-bottom:28px;"><p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">Message</p><div style="background:#0B0F1E;border-radius:8px;padding:20px;border:1px solid rgba(255,255,255,0.08);font-size:14px;line-height:1.7;color:#C4CDD9;white-space:pre-wrap;">${escapeHtml(payload.message)}</div></td></tr></table></td></tr><tr><td style="padding:0 40px 32px;"><a href="mailto:${escapeHtml(payload.visitorEmail)}" style="display:inline-block;background:#CFA56A;color:#0B0F1E;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;border-radius:6px;">Reply to ${escapeHtml(payload.visitorName)} &rarr;</a></td></tr><tr><td style="background:#090D1B;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);"><p style="margin:0;font-size:11px;color:#4A5568;text-align:center;">Automated notification from Alchemystery enquiry form.</p></td></tr></table></td></tr></table></body></html>`;

  const textBody = [
    'New Enquiry — Alchemystery',
    '===========================',
    `From: ${payload.visitorName} <${payload.visitorEmail}>`,
    payload.sessionType ? `Session Interest: ${payload.sessionType}` : '',
    `Submitted: ${submittedAt} IST`,
    '',
    'Message:',
    payload.message,
    '',
    '---',
    `Reply: mailto:${payload.visitorEmail}`,
  ].filter((l) => l !== undefined).join('\n');

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: payload.toEmail,
      replyTo: `"${payload.visitorName}" <${payload.visitorEmail}>`,
      subject: `New Enquiry from ${payload.visitorName} — Alchemystery`,
      text: textBody,
      html: htmlBody,
    });
    console.log(`[EmailService] Lead notification sent to ${payload.toEmail}`);
    return true;
  } catch (err) {
    console.error('[EmailService] Failed to send lead notification:', err);
    return false;
  }
}
