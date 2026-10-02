'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updateSettingsAction, testSmtpAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/admin/image-upload';
import { useToast } from '@/components/ui/toast';
import { type SiteSettings } from '@/types/content.types';

interface SettingsFormProps {
  initialData: Partial<SiteSettings>;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const [testStatus, setTestStatus] = React.useState<'idle' | 'sending'>('idle');
  const [showPass, setShowPass] = React.useState(false);

  const [logoUrl, setLogoUrl] = React.useState<string>(initialData.logo_url || '');
  const [faviconUrl, setFaviconUrl] = React.useState<string>(initialData.favicon_url || '');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      brand_name: formData.get('brand_name') as string,
      website_title: formData.get('website_title') as string,
      tagline: (formData.get('tagline') as string) || undefined,
      contact_email: (formData.get('contact_email') as string) || undefined,
      contact_phone: (formData.get('contact_phone') as string) || undefined,
      whatsapp: (formData.get('whatsapp') as string) || undefined,
      address: (formData.get('address') as string) || undefined,
      instagram_url: (formData.get('instagram_url') as string) || undefined,
      facebook_url: (formData.get('facebook_url') as string) || undefined,
      youtube_url: (formData.get('youtube_url') as string) || undefined,
      default_seo_title: (formData.get('default_seo_title') as string) || undefined,
      default_seo_description: (formData.get('default_seo_description') as string) || undefined,
      footer_text: (formData.get('footer_text') as string) || undefined,
      logo_url: logoUrl || null,
      favicon_url: faviconUrl || null,
      smtp_host: (formData.get('smtp_host') as string) || null,
      smtp_port: (formData.get('smtp_port') as string) || null,
      smtp_secure: (formData.get('smtp_secure') as string) || null,
      smtp_user: (formData.get('smtp_user') as string) || null,
      smtp_pass: (formData.get('smtp_pass') as string) || null,
      smtp_from_name: (formData.get('smtp_from_name') as string) || null,
      smtp_from_email: (formData.get('smtp_from_email') as string) || null,
    };

    try {
      await updateSettingsAction(payload);
      success('Settings saved!', 'All changes have been applied successfully.');
      router.refresh();
    } catch (err: unknown) {
      error('Save failed', err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  }

  async function handleTestSmtp() {
    setTestStatus('sending');
    try {
      const host = (document.getElementById('smtp_host') as HTMLInputElement)?.value;
      const port = (document.getElementById('smtp_port') as HTMLInputElement)?.value;
      const secure = (document.getElementById('smtp_secure') as HTMLSelectElement)?.value;
      const user = (document.getElementById('smtp_user') as HTMLInputElement)?.value;
      const pass = (document.getElementById('smtp_pass') as HTMLInputElement)?.value;
      const fromName = (document.getElementById('smtp_from_name') as HTMLInputElement)?.value;
      const fromEmail = (document.getElementById('smtp_from_email') as HTMLInputElement)?.value;
      const contactEmail = (document.getElementById('contact_email') as HTMLInputElement)?.value;

      const currentFormValues = {
        smtp_host: host,
        smtp_port: port,
        smtp_secure: secure,
        smtp_user: user,
        smtp_pass: pass,
        smtp_from_name: fromName,
        smtp_from_email: fromEmail,
        contact_email: contactEmail,
      };

      const result = await testSmtpAction(currentFormValues);
      if (result.success) {
        success('Test email sent!', result.message);
      } else {
        error('SMTP test failed', result.message);
      }
    } catch {
      error('SMTP test failed', 'Unexpected error. Check console logs.');
    } finally {
      setTestStatus('idle');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 w-full">

      {/* 1. General Information */}
      <div className="space-y-5">
        <div
          className="pb-2.5"
          style={{ borderBottom: '1px solid var(--admin-section-border, var(--admin-border))' }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider font-sans text-[var(--color-gold)]">
            General Information
          </h3>
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
            Core brand details and public site metadata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="brand_name">Brand Name</Label>
            <Input id="brand_name" name="brand_name" defaultValue={initialData.brand_name || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_title">Website Title</Label>
            <Input id="website_title" name="website_title" defaultValue={initialData.website_title || ''} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={initialData.tagline || ''} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="footer_text">Footer Text</Label>
            <Textarea id="footer_text" name="footer_text" defaultValue={initialData.footer_text || ''} className="h-20" />
          </div>
        </div>
      </div>

      {/* 2. Branding (Media) - Side by Side Logo & Favicon */}
      <div className="space-y-5">
        <div
          className="pb-2.5"
          style={{ borderBottom: '1px solid var(--admin-section-border, var(--admin-border))' }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider font-sans text-[var(--color-gold)]">
            Branding (Media)
          </h3>
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
            Upload your official logo and browser favicon (PNG, SVG, WEBP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Website Logo</Label>
            <ImageUpload
              bucket="site-assets"
              value={logoUrl}
              onChange={setLogoUrl}
              onRemove={() => setLogoUrl('')}
            />
          </div>

          <div className="space-y-2">
            <Label>Browser Favicon</Label>
            <ImageUpload
              bucket="site-assets"
              value={faviconUrl}
              onChange={setFaviconUrl}
              onRemove={() => setFaviconUrl('')}
            />
          </div>
        </div>
      </div>

      {/* 3. Contact & Location */}
      <div className="space-y-5">
        <div
          className="pb-2.5"
          style={{ borderBottom: '1px solid var(--admin-section-border, var(--admin-border))' }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider font-sans text-[var(--color-gold)]">
            Contact & Location
          </h3>
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
            Public contact channels used in header, footer, and inquiry responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input id="contact_email" name="contact_email" type="email" defaultValue={initialData.contact_email || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_phone">Contact Phone</Label>
            <Input id="contact_phone" name="contact_phone" defaultValue={initialData.contact_phone || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input id="whatsapp" name="whatsapp" defaultValue={initialData.whatsapp || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" defaultValue={initialData.address || ''} className="h-10 min-h-[40px]" />
          </div>
        </div>
      </div>

      {/* 4. Social & SEO */}
      <div className="space-y-5">
        <div
          className="pb-2.5"
          style={{ borderBottom: '1px solid var(--admin-section-border, var(--admin-border))' }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider font-sans text-[var(--color-gold)]">
            Social Profiles & SEO
          </h3>
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">
            External social links and default metadata for search engines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input id="instagram_url" name="instagram_url" type="url" defaultValue={initialData.instagram_url || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_url">YouTube URL</Label>
            <Input id="youtube_url" name="youtube_url" type="url" defaultValue={initialData.youtube_url || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_url">Facebook URL</Label>
            <Input id="facebook_url" name="facebook_url" type="url" defaultValue={initialData.facebook_url || ''} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="default_seo_title">Default SEO Title</Label>
            <Input id="default_seo_title" name="default_seo_title" defaultValue={initialData.default_seo_title || ''} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="default_seo_description">Default SEO Description</Label>
            <Textarea id="default_seo_description" name="default_seo_description" defaultValue={initialData.default_seo_description || ''} className="h-20" />
          </div>
        </div>
      </div>

      {/* 5. SMTP Email Notifications */}
      <div className="space-y-5">
        <div
          className="flex items-center justify-between pb-2.5"
          style={{ borderBottom: '1px solid var(--admin-section-border, var(--admin-border))' }}
        >
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider font-sans text-[var(--color-gold)]">
              Email Notifications (SMTP)
            </h3>
            <p className="text-xs text-[var(--admin-muted)] mt-0.5">
              When configured, lead emails are sent directly to your Contact Email.
            </p>
          </div>
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[var(--color-gold)] hover:underline whitespace-nowrap ml-4 font-medium"
          >
            Gmail App Passwords →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label htmlFor="smtp_host">SMTP Host</Label>
            <Input
              id="smtp_host"
              name="smtp_host"
              placeholder="smtp.gmail.com"
              defaultValue={initialData.smtp_host || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp_port">SMTP Port</Label>
            <Input
              id="smtp_port"
              name="smtp_port"
              placeholder="587"
              defaultValue={initialData.smtp_port || '587'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp_secure">Secure (SSL)</Label>
            <select
              id="smtp_secure"
              name="smtp_secure"
              defaultValue={initialData.smtp_secure || 'false'}
              className="flex h-10 w-full rounded-lg border px-3.5 py-2 text-sm font-sans outline-none transition-all duration-150 focus:ring-2 focus:ring-[var(--color-gold)]/25 focus:border-[var(--color-gold)] cursor-pointer"
              style={{
                background: 'var(--admin-input-bg, #ffffff)',
                borderColor: 'var(--admin-input-border, rgba(255,255,255,0.12))',
                color: 'var(--admin-input-text, var(--color-ivory))',
              }}
            >
              <option value="false" style={{ background: 'var(--admin-surface, #11162b)', color: 'var(--admin-text, #fff)' }}>false — port 587 (TLS)</option>
              <option value="true" style={{ background: 'var(--admin-surface, #11162b)', color: 'var(--admin-text, #fff)' }}>true — port 465 (SSL)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="smtp_user">SMTP Username / Email</Label>
            <Input
              id="smtp_user"
              name="smtp_user"
              type="email"
              placeholder="you@gmail.com"
              autoComplete="off"
              defaultValue={initialData.smtp_user || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp_pass">SMTP Password / App Password</Label>
            <div className="relative">
              <Input
                id="smtp_pass"
                name="smtp_pass"
                type={showPass ? 'text' : 'password'}
                placeholder="16-char app password"
                autoComplete="new-password"
                defaultValue={initialData.smtp_pass || ''}
                className="pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--admin-muted)] hover:text-[var(--color-gold)] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="smtp_from_name">From Name</Label>
            <Input
              id="smtp_from_name"
              name="smtp_from_name"
              placeholder="Alchemystery"
              defaultValue={initialData.smtp_from_name || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp_from_email">From Email</Label>
            <Input
              id="smtp_from_email"
              name="smtp_from_email"
              type="email"
              placeholder="hello@alchemystery.in"
              defaultValue={initialData.smtp_from_email || ''}
            />
          </div>
        </div>

        {/* Test SMTP Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleTestSmtp}
            disabled={testStatus === 'sending'}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-[rgba(207,165,106,0.4)] text-[var(--color-gold)] hover:bg-[rgba(207,165,106,0.08)] transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {testStatus === 'sending' ? '⏳ Sending...' : '✉ Send Test Email'}
          </button>
          <p className="text-xs text-[var(--admin-muted)]">
            Sends a test email to your Contact Email to verify credentials immediately.
          </p>
        </div>
      </div>

      <div
        className="pt-6 flex justify-end"
        style={{ borderTop: '1px solid var(--admin-section-border, var(--admin-border))' }}
      >
        <Button type="submit" disabled={isPending} className="px-6 py-2.5">
          {isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}
