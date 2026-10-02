import type { Metadata } from 'next';
import { BlogForm } from '../blog-form';

export const metadata: Metadata = { title: 'New Blog Post — Admin' };

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">New Blog Post</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Write a new article or journal entry.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <BlogForm />
      </div>
    </div>
  );
}
