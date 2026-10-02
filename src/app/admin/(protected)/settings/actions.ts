'use server';

import { revalidatePath } from 'next/cache';
import { upsertSettings } from '@/lib/repositories/settings.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { siteSettingsFormSchema, type SiteSettingsFormData } from '@/lib/validations/settings.schema';
import { resolveSmtpConfig } from '@/lib/services/email.service';
import nodemailer from 'nodemailer';

export async function updateSettingsAction(data: SiteSettingsFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = siteSettingsFormSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  // Filter out undefined values to avoid wiping out settings that weren't in the form
  const settingsToUpdate = Object.fromEntries(
    Object.entries(parsed.data).filter(([, v]) => v !== undefined)
  );

  await upsertSettings(settingsToUpdate);
  revalidatePath('/', 'layout'); // Revalidate everything since settings affect the whole site
}

/** Send a test email using the currently saved SMTP settings */
export async function testSmtpAction(): Promise<{ success: boolean; message: string }> {
  const authUser = await requireSuperAdmin();
  if (!authUser) return { success: false, message: 'Unauthorized' };

  const settings = await getSiteSettings();
  const smtp = resolveSmtpConfig(settings);

  if (!smtp) {
    return {
      success: false,
      message: 'SMTP is not configured. Save your SMTP settings first, then try again.',
    };
  }

  const toEmail = (settings.contact_email as string) || smtp.user;
  if (!toEmail) {
    return { success: false, message: 'Set a Contact Email to receive the test message.' };
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to: toEmail,
      subject: `✦ SMTP Test — ${smtp.fromName}`,
      text: `Your SMTP is working correctly!\n\nTest sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\nFrom: ${smtp.fromEmail}\nTo: ${toEmail}`,
      html: `<div style="font-family:Arial,sans-serif;padding:32px;background:#0B0F1E;color:#F1EDE2;border-radius:12px;max-width:500px;"><p style="color:#CFA56A;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:monospace;">&#10022; ${smtp.fromName}</p><h2 style="color:#F1EDE2;margin:8px 0;">SMTP is working! ✓</h2><p style="color:#8892A4;font-size:14px;">Your email notification settings are correctly configured. Lead enquiries will now be sent to <strong style="color:#CFA56A;">${toEmail}</strong>.</p><p style="color:#4A5568;font-size:12px;margin-top:24px;">Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p></div>`,
    });
    return { success: true, message: `Test email sent to ${toEmail}` };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[testSmtpAction] error:', msg);
    return { success: false, message: `Error: ${msg}` };
  }
}
