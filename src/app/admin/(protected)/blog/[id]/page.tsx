import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostById } from '@/lib/repositories/blog.repository';
import { BlogForm } from '../blog-form';

export const metadata: Metadata = { title: 'Edit Blog Post — Admin' };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">Edit Blog Post</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Update details for {post.title}.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <BlogForm initialData={post} />
      </div>
    </div>
  );
}
