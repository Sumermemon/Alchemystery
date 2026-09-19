'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type PageRow } from '@/types/database.types';
import { createPageAction, updatePageAction, deletePageAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/image-upload';
import { STATUS } from '@/constants/status';

interface PageFormProps {
  initialData?: PageRow;
}

export function PageForm({ initialData }: PageFormProps) {
  const router = useRouter();
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
    };

    try {
      if (isEditing) {
        await updatePageAction(initialData.id, payload);
      } else {
        await createPageAction(payload);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this page?')) return;
    
    setIsPending(true);
    try {
      await deletePageAction(initialData.id);
      router.push('/admin/pages');
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting.');
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
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

        <div className="space-y-6">
          <h3 className="text-sm font-medium text-[var(--color-ivory)]">SEO Settings</h3>
          
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

      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        {isEditing ? (
          <Button type="button" variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete Page
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/pages')} disabled={isPending}>
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
