'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type ServiceRow } from '@/types/database.types';
import { createServiceAction, updateServiceAction, deleteServiceAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/image-upload';
import { STATUS } from '@/constants/status';

interface ServiceFormProps {
  initialData?: ServiceRow;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // State for image URL
  const [imageUrl, setImageUrl] = React.useState<string>(initialData?.image_url || '');

  const isEditing = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      short_description: (formData.get('short_description') as string) || null,
      description: (formData.get('description') as string) || null,
      duration_minutes: formData.get('duration_minutes') ? parseInt(formData.get('duration_minutes') as string, 10) : null,
      price_display: (formData.get('price_display') as string) || null,
      sort_order: parseInt(formData.get('sort_order') as string, 10) || 0,
      status: formData.get('status') as 'draft' | 'published' | 'archived',
      seo_title: (formData.get('seo_title') as string) || null,
      seo_description: (formData.get('seo_description') as string) || null,
      image_url: imageUrl || null,
    };

    try {
      if (isEditing) {
        await updateServiceAction(initialData.id, payload);
      } else {
        await createServiceAction(payload);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this service? This cannot be undone.')) return;
    
    setIsPending(true);
    try {
      await deleteServiceAction(initialData.id);
      router.push('/admin/services');
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
        {/* Left Column - Main Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-400">*</span></Label>
            <Input id="title" name="title" defaultValue={initialData?.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug <span className="text-red-400">*</span></Label>
            <Input id="slug" name="slug" defaultValue={initialData?.slug} required pattern="^[a-z0-9-]+$" title="Lowercase letters, numbers, and hyphens only" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea id="short_description" name="short_description" defaultValue={initialData?.short_description || ''} className="h-20" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea id="description" name="description" defaultValue={initialData?.description || ''} className="h-40" />
          </div>
        </div>

        {/* Right Column - Media & Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload
              bucket="service-images"
              value={imageUrl}
              onChange={setImageUrl}
              onRemove={() => setImageUrl('')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_display">Price Display</Label>
              <Input id="price_display" name="price_display" defaultValue={initialData?.price_display || ''} placeholder="e.g. ₹2,500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (mins)</Label>
              <Input id="duration_minutes" name="duration_minutes" type="number" min="1" defaultValue={initialData?.duration_minutes || ''} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={initialData?.status || STATUS.DRAFT}>
                <option value={STATUS.DRAFT}>Draft</option>
                <option value={STATUS.PUBLISHED}>Published</option>
                <option value={STATUS.ARCHIVED}>Archived</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" name="sort_order" type="number" min="0" defaultValue={initialData?.sort_order ?? 0} />
            </div>
          </div>

          {/* SEO Section */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-ivory)]">SEO Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input id="seo_title" name="seo_title" defaultValue={initialData?.seo_title || ''} maxLength={70} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">SEO Description</Label>
              <Textarea id="seo_description" name="seo_description" defaultValue={initialData?.seo_description || ''} maxLength={160} className="h-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        {isEditing ? (
          <Button type="button" variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete Service
          </Button>
        ) : (
          <div></div> // Spacer
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/services')} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Service')}
          </Button>
        </div>
      </div>
    </form>
  );
}
