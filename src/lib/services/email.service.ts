/**
 * Email service — sends transactional emails via SMTP (nodemailer).
 *
 * SMTP credentials are read from:
 *   1. Database site_settings (configured via Admin → Settings → Email Notifications)
 *   2. Environment variables as fallback (.env.local)
 *
 * If neither source has credentials, emails are skipped silently —
 * the enquiry form still works normally.
 */

import nodemailer from 'nodemailer';
import type { SiteSettings } from '@/types/content.types';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}

/**
 * Resolves SMTP config — prefers DB settings, falls back to env vars.
 * Returns null if not configured.
 */
export function resolveSmtpConfig(dbSettings?: Partial<SiteSettings>): SmtpConfig | null {
  const host =
    (dbSettings?.smtp_host as string | null | undefined) ||
    process.env.SMTP_HOST ||
    '';
  const user =
    (dbSettings?.smtp_user as string | null | undefined) ||
    process.env.SMTP_USER ||
    '';
  const pass =
    (dbSettings?.smtp_pass as string | null | undefined) ||
    process.env.SMTP_PASS ||
    '';

  if (!host || !user || !pass) return null;

  const portStr =
    (dbSettings?.smtp_port as string | null | undefined) ||
    process.env.SMTP_PORT ||
    '587';
  const parsedPort = parseInt(portStr, 10) || 587;
  const secureStr =
    (dbSettings?.smtp_secure as string | null | undefined) ||
    process.env.SMTP_SECURE ||
    'false';

  // In SMTP standards: port 465 is SSL (secure: true). Port 587 is STARTTLS (secure: false).
  const secure = parsedPort === 465 ? true : (secureStr === 'true' && parsedPort !== 587);

  const fromName =
    (dbSettings?.smtp_from_name as string | null | undefined) ||
    process.env.SMTP_FROM_NAME ||
    (dbSettings?.brand_name as string | null | undefined) ||
    'Alchemystery';
  const fromEmail =
    (dbSettings?.smtp_from_email as string | null | undefined) ||
    process.env.SMTP_FROM_EMAIL ||
    user;

  // Clean password: strip all internal whitespace (common with Google 4-letter spaced blocks)
  const cleanPass = pass.trim().replace(/\s+/g, '');

  return {
    host,
    port: parsedPort,
    secure,
    user: user.trim(),
    pass: cleanPass,
    fromName: fromName.trim(),
    fromEmail: fromEmail.trim(),
  };
}

export interface LeadEmailPayload {
  /** Admin/owner email to receive the notification */
  toEmail: string;
  /** Visitor's name */
  visitorName: string;
  /** Visitor's email */
  visitorEmail: string;
  /** Selected session type (optional) */
  sessionType?: string | null;
  /** Visitor's message */
  message: string;
  /** Pass DB settings so SMTP config can be read from there */
  dbSettings?: Partial<SiteSettings>;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a lead notification email to the site owner when a new enquiry arrives.
 * Returns true on success, false if SMTP is not configured or sending fails.
 */
export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<boolean> {
  const smtp = resolveSmtpConfig(payload.dbSettings);
  if (!smtp) {
    console.warn('[EmailService] SMTP not configured — skipping lead notification email.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: { rejectUnauthorized: false },
    family: 4, // Force IPv4 to prevent ENETUNREACH on systems without IPv6 routing
    connectionTimeout: 15000,
  } as any);

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const sessionRow = payload.sessionType
    ? `<tr><td style="padding-bottom:20px;"><p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">Session Interest</p><p style="margin:0;font-size:14px;color:#F1EDE2;background:rgba(207,165,106,0.08);padding:8px 14px;border-radius:6px;border:1px solid rgba(207,165,106,0.2);display:inline-block;">${escapeHtml(payload.sessionType)}</p></td></tr>`
    : '';

  const htmlBody = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>New Enquiry</title></head><body style="margin:0;padding:0;background:#0B0F1E;font-family:'Segoe UI',Arial,sans-serif;color:#F1EDE2;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F1E;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#11162A;border-radius:12px;border:1px solid rgba(207,165,106,0.25);overflow:hidden;max-width:100%;"><tr><td style="background:linear-gradient(135deg,#0B0F1E 0%,#1A1030 100%);padding:32px 40px;border-bottom:1px solid rgba(207,165,106,0.2);"><p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">&#10022; ${escapeHtml(smtp.fromName)}</p><h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#F1EDE2;">New Enquiry Received</h1><p style="margin:4px 0 0;font-size:12px;color:#8892A4;">${submittedAt} IST</p></td></tr><tr><td style="padding:32px 40px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:20px;"><p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">From</p><p style="margin:0;font-size:16px;font-weight:600;color:#F1EDE2;">${escapeHtml(payload.visitorName)}</p><p style="margin:2px 0 0;font-size:13px;color:#8892A4;"><a href="mailto:${escapeHtml(payload.visitorEmail)}" style="color:#CFA56A;text-decoration:none;">${escapeHtml(payload.visitorEmail)}</a></p></td></tr>${sessionRow}<tr><td style="padding-bottom:28px;"><p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#CFA56A;font-family:monospace;">Message</p><div style="background:#0B0F1E;border-radius:8px;padding:20px;border:1px solid rgba(255,255,255,0.08);font-size:14px;line-height:1.7;color:#C4CDD9;white-space:pre-wrap;">${escapeHtml(payload.message)}</div></td></tr></table></td></tr><tr><td style="padding:0 40px 32px;"><a href="mailto:${escapeHtml(payload.visitorEmail)}" style="display:inline-block;background:#CFA56A;color:#0B0F1E;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;border-radius:6px;">Reply to ${escapeHtml(payload.visitorName)} &rarr;</a></td></tr><tr><td style="background:#090D1B;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);"><p style="margin:0;font-size:11px;color:#4A5568;text-align:center;">Automated notification from the ${escapeHtml(smtp.fromName)} enquiry form.</p></td></tr></table></td></tr></table></body></html>`;

  const textBody = [
    `New Enquiry — ${smtp.fromName}`,
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
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to: payload.toEmail,
      replyTo: `"${payload.visitorName}" <${payload.visitorEmail}>`,
      subject: `New Enquiry from ${payload.visitorName} — ${smtp.fromName}`,
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

/**
 * Diagnostic test email — verifies SMTP credentials and sends a test email.
 */
export async function sendTestEmail(
  toEmail?: string,
  dbSettings?: Partial<SiteSettings>
): Promise<{ success: boolean; message: string }> {
  const smtp = resolveSmtpConfig(dbSettings);
  if (!smtp) {
    return {
      success: false,
      message: 'SMTP settings are incomplete. Please provide Host, Username, and App Password.',
    };
  }

  const targetEmail = toEmail || (dbSettings?.contact_email as string) || smtp.user;

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: { rejectUnauthorized: false },
    family: 4,
    connectionTimeout: 15000,
  } as any);

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to: targetEmail,
      subject: `Test Email — ${smtp.fromName}`,
      text: `Hello,\n\nThis is a test email confirming that your email configuration for ${smtp.fromName} is working properly!\n\nHost: ${smtp.host}:${smtp.port}\nSender: ${smtp.fromEmail}`,
      html: `<div style="font-family:sans-serif;padding:20px;color:#1A1F2C;"><h2 style="color:#A37D42;">Email Configuration Verified</h2><p>This is a test email confirming that your email configuration for <strong>${escapeHtml(smtp.fromName)}</strong> is active and working properly.</p><p style="font-size:12px;color:#666;">Host: ${escapeHtml(smtp.host)}:${smtp.port}<br/>Sender: ${escapeHtml(smtp.fromEmail)}</p></div>`,
    });
    return {
      success: true,
      message: `Test email sent successfully to ${targetEmail}!`,
    };
  } catch (err: any) {
    console.error('[EmailService] Test email failed:', err);
    const errorMsg = err?.message || String(err);
    if (errorMsg.includes('535') || errorMsg.includes('BadCredentials')) {
      return {
        success: false,
        message:
          'Gmail authentication failed (535 Bad Credentials). For Gmail, you must use a 16-character Google App Password (not your personal password). Go to myaccount.google.com → Security → 2-Step Verification → App passwords to create one.',
      };
    }
    if (errorMsg.includes('ENETUNREACH') || errorMsg.includes('ETIMEDOUT')) {
      return {
        success: false,
        message: `Could not reach ${smtp.host}:${smtp.port}. Please check your host and port settings.`,
      };
    }
    return {
      success: false,
      message: `SMTP error: ${errorMsg}`,
    };
  }
}
