'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type BlogPostRow } from '@/types/database.types';
import { createBlogPostAction, updateBlogPostAction, deleteBlogPostAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/image-upload';
import { STATUS } from '@/constants/status';

interface BlogFormProps {
  initialData?: BlogPostRow;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // State for image URLs
  const [coverImageUrl, setCoverImageUrl] = React.useState<string>(initialData?.cover_image_url || '');
  const [ogImageUrl, setOgImageUrl] = React.useState<string>(initialData?.og_image_url || '');

  const isEditing = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const pubDate = formData.get('published_at') as string;
    
    const payload = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: (formData.get('excerpt') as string) || null,
      content: (formData.get('content') as string) || null,
      author_name: (formData.get('author_name') as string) || null,
      status: formData.get('status') as 'draft' | 'published' | 'archived',
      published_at: pubDate ? new Date(pubDate).toISOString() : null,
      seo_title: (formData.get('seo_title') as string) || null,
      seo_description: (formData.get('seo_description') as string) || null,
      cover_image_url: coverImageUrl || null,
      og_image_url: ogImageUrl || null,
    };

    try {
      if (isEditing) {
        await updateBlogPostAction(initialData.id, payload);
      } else {
        await createBlogPostAction(payload);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this post? This cannot be undone.')) return;
    
    setIsPending(true);
    try {
      await deleteBlogPostAction(initialData.id);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting.');
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left/Main Column - Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-400">*</span></Label>
            <Input id="title" name="title" defaultValue={initialData?.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug <span className="text-red-400">*</span></Label>
            <Input id="slug" name="slug" defaultValue={initialData?.slug} required pattern="^[a-z0-9-]+$" title="Lowercase letters, numbers, and hyphens only" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={initialData?.excerpt || ''} className="h-24" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea id="content" name="content" defaultValue={initialData?.content || ''} className="h-96 font-mono text-sm" placeholder="## Introduction..." />
            <p className="text-xs text-[var(--color-muted)] mt-1">Supports standard Markdown formatting.</p>
          </div>
        </div>

        {/* Right Column - Media & Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload
              bucket="blog-images"
              value={coverImageUrl}
              onChange={setCoverImageUrl}
              onRemove={() => setCoverImageUrl('')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={initialData?.status || STATUS.DRAFT}>
              <option value={STATUS.DRAFT}>Draft</option>
              <option value={STATUS.PUBLISHED}>Published</option>
              <option value={STATUS.ARCHIVED}>Archived</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="published_at">Published Date</Label>
            <Input 
              id="published_at" 
              name="published_at" 
              type="date" 
              defaultValue={initialData?.published_at ? new Date(initialData.published_at).toISOString().split('T')[0] : ''} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_name">Author Name</Label>
            <Input id="author_name" name="author_name" defaultValue={initialData?.author_name || ''} />
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

            <div className="space-y-2">
              <Label>Social Image (OG)</Label>
              <ImageUpload
                bucket="blog-images"
                value={ogImageUrl}
                onChange={setOgImageUrl}
                onRemove={() => setOgImageUrl('')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        {isEditing ? (
          <Button type="button" variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete Post
          </Button>
        ) : (
          <div></div> // Spacer
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog')} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Post')}
          </Button>
        </div>
      </div>
    </form>
  );
}
