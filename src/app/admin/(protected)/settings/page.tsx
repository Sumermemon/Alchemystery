import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { resolveSmtpConfig } from '@/lib/services/email.service';
import { SettingsForm } from './settings-form';

export const metadata: Metadata = { title: 'Site Settings — Admin' };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const smtpConfigured = resolveSmtpConfig(settings) !== null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">Site Settings</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Manage global brand, contact, SEO defaults, and email notifications.</p>
      </div>

      {/* SMTP Status Banner */}
      <div
        className="mb-6 p-4 rounded-xl border text-sm flex items-start gap-3 transition-colors"
        style={{
          background: smtpConfigured
            ? 'var(--admin-banner-emerald-bg, rgba(6, 78, 59, 0.2))'
            : 'var(--admin-banner-amber-bg, rgba(120, 53, 15, 0.2))',
          borderColor: smtpConfigured
            ? 'var(--admin-banner-emerald-border, rgba(16, 185, 129, 0.3))'
            : 'var(--admin-banner-amber-border, rgba(245, 158, 11, 0.3))',
          color: smtpConfigured
            ? 'var(--admin-banner-emerald-text, #34d399)'
            : 'var(--admin-banner-amber-text, #fbbf24)',
        }}
      >
        <span className="text-lg leading-none mt-0.5">{smtpConfigured ? '✓' : '⚠'}</span>
        <div className="leading-relaxed">
          {smtpConfigured ? (
            <>
              <strong>Email notifications active.</strong> Lead emails will be sent to <strong>{(settings.contact_email as string) || 'your contact email'}</strong> when someone submits the enquiry form.
              Use the <em>Send Test Email</em> button below to verify.
            </>
          ) : (
            <>
              <strong>Email notifications are not configured.</strong> Enquiries still save to the database but no email alert is sent.
              Fill in the <em>Email Notifications (SMTP)</em> section below and save to enable.
            </>
          )}
        </div>
      </div>

      <div
        className="p-4 sm:p-6 md:p-8 rounded-2xl transition-colors w-full"
        style={{
          background: 'var(--admin-card-bg, #11162b)',
          border: '1px solid var(--admin-card-border, rgba(255,255,255,0.08))',
          boxShadow: 'var(--admin-card-shadow, 0 4px 20px rgba(0,0,0,0.25))',
        }}
      >
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
