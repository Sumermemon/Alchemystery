'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type FaqRow } from '@/types/database.types';
import { createFaqAction, updateFaqAction, deleteFaqAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { STATUS } from '@/constants/status';

interface FaqFormProps {
  initialData?: FaqRow;
}

export function FaqForm({ initialData }: FaqFormProps) {
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
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: (formData.get('category') as string) || null,
      sort_order: parseInt(formData.get('sort_order') as string, 10) || 0,
      status: formData.get('status') as 'draft' | 'published' | 'archived',
    };

    try {
      if (isEditing) {
        await updateFaqAction(initialData.id, payload);
      } else {
        await createFaqAction(payload);
      }
    } catch (err: any) {
      setError(err.message + (err.stack ? `\nStack: ${err.stack}` : ''));
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm('Are you sure you want to delete this FAQ?')) return;
    
    setIsPending(true);
    try {
      await deleteFaqAction(initialData.id);
      router.push('/admin/faqs');
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
        <div className="space-y-2">
          <Label htmlFor="question">Question <span className="text-red-400">*</span></Label>
          <Input id="question" name="question" defaultValue={initialData?.question} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Answer <span className="text-red-400">*</span></Label>
          <Textarea id="answer" name="answer" defaultValue={initialData?.answer} required className="h-40" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input id="category" name="category" defaultValue={initialData?.category || ''} placeholder="e.g. Booking" />
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
            Delete FAQ
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/faqs')} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create FAQ')}
          </Button>
        </div>
      </div>
    </form>
  );
}
