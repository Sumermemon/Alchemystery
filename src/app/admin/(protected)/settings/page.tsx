import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { SettingsForm } from './settings-form';

export const metadata: Metadata = { title: 'Site Settings — Admin' };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Site Settings</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Manage global brand, contact, and SEO defaults.</p>
      </div>

      <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
