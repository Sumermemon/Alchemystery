'use server';

import { revalidatePath } from 'next/cache';
import { upsertSettings } from '@/lib/repositories/settings.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { siteSettingsFormSchema, type SiteSettingsFormData } from '@/lib/validations/settings.schema';

export async function updateSettingsAction(data: SiteSettingsFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = siteSettingsFormSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  // Filter out undefined values to avoid wiping out settings that weren't in the form
  const settingsToUpdate = Object.fromEntries(
    Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
  );

  await upsertSettings(settingsToUpdate);
  revalidatePath('/', 'layout'); // Revalidate everything since settings affect the whole site
}
