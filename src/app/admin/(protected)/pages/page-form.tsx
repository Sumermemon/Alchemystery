'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type PageRow, type PageSectionRow } from '@/types/database.types';
import { createPageAction, updatePageAction, deletePageAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/image-upload';
import { STATUS } from '@/constants/status';
import { ExternalLink } from 'lucide-react';

import { useToast } from '@/components/ui/toast';

interface PageFormProps {
  initialData?: PageRow;
  initialSection?: PageSectionRow | null;
}

export function PageForm({ initialData, initialSection }: PageFormProps) {
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const [ogImageUrl, setOgImageUrl] = React.useState<string>(initialData?.og_image_url || '');

  const isEditing = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      status: formData.get('status') as 'draft' | 'published' | 'archived',
      seo_title: (formData.get('seo_title') as string) || null,
      seo_description: (formData.get('seo_description') as string) || null,
      og_image_url: ogImageUrl || null,
      section_heading: (formData.get('section_heading') as string) || null,
      section_body: (formData.get('section_body') as string) || null,
      section_cta_label: (formData.get('section_cta_label') as string) || null,
      section_cta_url: (formData.get('section_cta_url') as string) || null,
    };

    try {
      if (isEditing) {
        await updatePageAction(initialData.id, payload);
        showSuccess('Page Updated', `"${payload.title}" has been saved successfully.`);
        router.refresh();
      } else {
        await createPageAction(payload);
        showSuccess('Page Created', `"${payload.title}" was created successfully.`);
        router.push('/admin/pages');
        router.refresh();
      }
    } catch (err: any) {
      const msg = err.message || 'An error occurred while saving.';
      setError(msg);
      showError('Save Failed', msg);
    } finally {
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this page?')) return;
    
    setIsPending(true);
    try {
      await deletePageAction(initialData.id);
      showSuccess('Page Deleted', `"${initialData.title}" was deleted successfully.`);
      router.push('/admin/pages');
      router.refresh();
    } catch (err: any) {
      const msg = err.message || 'An error occurred while deleting.';
      setError(msg);
      showError('Delete Failed', msg);
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      {isEditing && (
        <div
          className="p-4 rounded-xl flex items-center justify-between border"
          style={{
            background: 'rgba(201,168,76,0.06)',
            borderColor: 'rgba(201,168,76,0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium">
              Live URL:
            </span>
            <code className="text-sm text-[var(--color-ivory)] bg-white/5 px-2 py-1 rounded">
              /{initialData.slug}
            </code>
          </div>
          <a
            href={`/${initialData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-gold)] hover:underline font-semibold"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column - General Details */}
        <div className="space-y-6">
          <div className="pb-3 border-b" style={{ borderColor: 'var(--admin-border)' }}>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)] font-sans">
              Page Details
            </h2>
            <p className="text-xs text-[var(--admin-muted)] mt-0.5">Title, route slug, and publication status</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Page Title <span className="text-red-400">*</span></Label>
            <Input id="title" name="title" defaultValue={initialData?.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug <span className="text-red-400">*</span></Label>
            <Input id="slug" name="slug" defaultValue={initialData?.slug} required pattern="^[a-z0-9-]+$" title="Lowercase letters, numbers, and hyphens only" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={initialData?.status || STATUS.DRAFT}>
              <option value={STATUS.DRAFT}>Draft</option>
              <option value={STATUS.PUBLISHED}>Published</option>
              <option value={STATUS.ARCHIVED}>Archived</option>
            </Select>
          </div>
        </div>

        {/* Right Column - SEO Settings */}
        <div className="space-y-6">
          <div className="pb-3 border-b" style={{ borderColor: 'var(--admin-border)' }}>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)] font-sans">
              SEO & Social Sharing
            </h2>
            <p className="text-xs text-[var(--admin-muted)] mt-0.5">Search engine metadata and preview banner</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO Title</Label>
            <Input id="seo_title" name="seo_title" defaultValue={initialData?.seo_title || ''} maxLength={70} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO Description</Label>
            <Textarea id="seo_description" name="seo_description" defaultValue={initialData?.seo_description || ''} maxLength={160} className="h-20" />
          </div>

          <div className="space-y-2">
            <Label>Social Image (OG)</Label>
            <ImageUpload
              bucket="site-assets"
              value={ogImageUrl}
              onChange={setOgImageUrl}
              onRemove={() => setOgImageUrl('')}
            />
          </div>
        </div>
      </div>

      {/* Page Content & Narrative */}
      <div className="space-y-6 pt-4 border-t" style={{ borderColor: 'var(--admin-border)' }}>
        <div className="pb-3 border-b" style={{ borderColor: 'var(--admin-border)' }}>
          <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)] font-sans">
            Page Content & Narrative
          </h2>
          <p className="text-xs text-[var(--admin-muted)] mt-0.5">Main section heading, story narrative, and optional action button</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="section_heading">Section Heading</Label>
          <Input
            id="section_heading"
            name="section_heading"
            placeholder="e.g. A Sacred Journey Inward"
            defaultValue={initialSection?.heading || ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="section_body">Page Content (Markdown supported)</Label>
          <Textarea
            id="section_body"
            name="section_body"
            rows={8}
            placeholder="Write the content for this page here. Supports full Markdown..."
            defaultValue={initialSection?.body || ''}
            className="font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="section_cta_label">CTA Button Label (Optional)</Label>
            <Input
              id="section_cta_label"
              name="section_cta_label"
              placeholder="e.g. Explore Offerings"
              defaultValue={initialSection?.cta_label || ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_cta_url">CTA Button Link (Optional)</Label>
            <Input
              id="section_cta_url"
              name="section_cta_url"
              placeholder="e.g. /connect or /sessions"
              defaultValue={initialSection?.cta_url || ''}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--admin-border)' }}>
        {isEditing ? (
          <Button type="button" variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete Page
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="secondary" onClick={() => router.push('/admin/pages')} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Page')}
          </Button>
        </div>
      </div>
    </form>
  );
}
