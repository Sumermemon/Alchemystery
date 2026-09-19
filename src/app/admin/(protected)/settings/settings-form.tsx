'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updateSettingsAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/admin/image-upload';
import { type SiteSettings } from '@/types/content.types';

interface SettingsFormProps {
  initialData: Partial<SiteSettings>;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  
  const [logoUrl, setLogoUrl] = React.useState<string>(initialData.logo_url || '');
  const [faviconUrl, setFaviconUrl] = React.useState<string>(initialData.favicon_url || '');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);
    
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
    };

    try {
      await updateSettingsAction(payload);
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-900/30 border border-green-900/50 rounded-lg text-green-400 text-sm">
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--color-gold)] border-b border-[rgba(255,255,255,0.1)] pb-2">General</h3>
          
          <div className="space-y-2">
            <Label htmlFor="brand_name">Brand Name</Label>
            <Input id="brand_name" name="brand_name" defaultValue={initialData.brand_name || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_title">Website Title</Label>
            <Input id="website_title" name="website_title" defaultValue={initialData.website_title || ''} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={initialData.tagline || ''} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="footer_text">Footer Text</Label>
            <Textarea id="footer_text" name="footer_text" defaultValue={initialData.footer_text || ''} className="h-20" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--color-gold)] border-b border-[rgba(255,255,255,0.1)] pb-2">Branding (Media)</h3>
          
          <div className="space-y-2">
            <Label>Logo</Label>
            <ImageUpload
              bucket="site-assets"
              value={logoUrl}
              onChange={setLogoUrl}
              onRemove={() => setLogoUrl('')}
            />
          </div>

          <div className="space-y-2">
            <Label>Favicon</Label>
            <ImageUpload
              bucket="site-assets"
              value={faviconUrl}
              onChange={setFaviconUrl}
              onRemove={() => setFaviconUrl('')}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--color-gold)] border-b border-[rgba(255,255,255,0.1)] pb-2">Contact & Location</h3>
          
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
            <Textarea id="address" name="address" defaultValue={initialData.address || ''} className="h-20" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--color-gold)] border-b border-[rgba(255,255,255,0.1)] pb-2">Social & SEO</h3>
          
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

          <div className="space-y-2 mt-6">
            <Label htmlFor="default_seo_title">Default SEO Title</Label>
            <Input id="default_seo_title" name="default_seo_title" defaultValue={initialData.default_seo_title || ''} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default_seo_description">Default SEO Description</Label>
            <Textarea id="default_seo_description" name="default_seo_description" defaultValue={initialData.default_seo_description || ''} className="h-20" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}
