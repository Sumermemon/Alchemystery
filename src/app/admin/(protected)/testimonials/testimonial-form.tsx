'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type TestimonialRow } from '@/types/database.types';
import { createTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { STATUS } from '@/constants/status';

interface TestimonialFormProps {
  initialData?: TestimonialRow;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const isEditing = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      author_name: formData.get('author_name') as string,
      author_initials: (formData.get('author_initials') as string) || null,
      content: formData.get('content') as string,
      service_id: (formData.get('service_id') as string) || null,
      sort_order: parseInt(formData.get('sort_order') as string, 10) || 0,
      status: formData.get('status') as 'draft' | 'published' | 'archived',
    };

    try {
      if (isEditing) {
        await updateTestimonialAction(initialData.id, payload);
      } else {
        await createTestimonialAction(payload);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this testimonial?')) return;
    
    setIsPending(true);
    try {
      await deleteTestimonialAction(initialData.id);
      router.push('/admin/testimonials');
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

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author_name">Author Name <span className="text-red-400">*</span></Label>
            <Input id="author_name" name="author_name" defaultValue={initialData?.author_name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_initials">Author Initials</Label>
            <Input id="author_initials" name="author_initials" defaultValue={initialData?.author_initials || ''} maxLength={5} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Testimonial Content <span className="text-red-400">*</span></Label>
          <Textarea id="content" name="content" defaultValue={initialData?.content} required className="h-32" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service_id">Service ID (Optional)</Label>
            <Input id="service_id" name="service_id" defaultValue={initialData?.service_id || ''} placeholder="UUID" />
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
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input id="sort_order" name="sort_order" type="number" min="0" defaultValue={initialData?.sort_order ?? 0} />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        {isEditing ? (
          <Button type="button" variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete Testimonial
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/testimonials')} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Testimonial')}
          </Button>
        </div>
      </div>
    </form>
  );
}
