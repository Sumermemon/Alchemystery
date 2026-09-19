import type { Metadata } from 'next';
import { BlogForm } from '../blog-form';

export const metadata: Metadata = { title: 'New Blog Post — Admin' };

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>New Blog Post</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Write a new article or journal entry.</p>
      </div>

      <BlogForm />
    </div>
  );
}
