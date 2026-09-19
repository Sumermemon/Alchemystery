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
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Edit Blog Post</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Update details for {post.title}.</p>
      </div>

      <BlogForm initialData={post} />
    </div>
  );
}
