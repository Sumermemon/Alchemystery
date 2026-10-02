import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { SettingsForm } from './settings-form';

export const metadata: Metadata = { title: 'Site Settings — Admin' };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const smtpConfigured = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Site Settings</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Manage global brand, contact, and SEO defaults.</p>
      </div>

      {/* SMTP Status Banner */}
      <div className={`mb-6 p-4 rounded-xl border text-sm flex items-start gap-3 ${smtpConfigured ? 'bg-emerald-900/20 border-emerald-700/40 text-emerald-400' : 'bg-amber-900/20 border-amber-700/40 text-amber-400'}`}>
        <span className="text-lg leading-none mt-0.5">{smtpConfigured ? '✓' : '⚠'}</span>
        <div>
          {smtpConfigured ? (
            <>
              <strong>Email notifications active.</strong> Lead emails will be sent to your Contact Email ({(settings.contact_email as string) || 'not set'}) when someone submits the enquiry form.
            </>
          ) : (
            <>
              <strong>Email notifications are not configured.</strong> Enquiries still save to the database but no email alert is sent.{' '}
              Add <code className="text-[11px] bg-black/30 px-1 py-0.5 rounded">SMTP_HOST</code>, <code className="text-[11px] bg-black/30 px-1 py-0.5 rounded">SMTP_USER</code>, and <code className="text-[11px] bg-black/30 px-1 py-0.5 rounded">SMTP_PASS</code> to your <code className="text-[11px] bg-black/30 px-1 py-0.5 rounded">.env.local</code> file to enable. See <code className="text-[11px] bg-black/30 px-1 py-0.5 rounded">.env.example</code> for instructions.
            </>
          )}
        </div>
      </div>

      <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
