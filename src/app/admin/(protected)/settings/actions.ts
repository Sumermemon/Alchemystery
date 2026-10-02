'use server';

import { revalidatePath } from 'next/cache';
import { upsertSettings } from '@/lib/repositories/settings.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { siteSettingsFormSchema, type SiteSettingsFormData } from '@/lib/validations/settings.schema';
import { sendTestEmail } from '@/lib/services/email.service';

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
export async function testSmtpAction(formData?: Partial<SiteSettingsFormData>): Promise<{ success: boolean; message: string }> {
  const authUser = await requireSuperAdmin();
  if (!authUser) return { success: false, message: 'Unauthorized' };

  const dbSettings = await getSiteSettings();
  const mergedSettings = { ...dbSettings, ...(formData || {}) };
  const targetEmail = (mergedSettings.contact_email as string) || (mergedSettings.smtp_user as string);

  return sendTestEmail(targetEmail, mergedSettings as any);
}
