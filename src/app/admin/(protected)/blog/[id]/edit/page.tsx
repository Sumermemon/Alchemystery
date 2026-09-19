import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Edit Post — Admin' };
interface Props { params: Promise<{ id: string }> }
export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-xl text-[var(--color-ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Edit Post</h1>
      <p className="text-[var(--color-muted)] text-sm">ID: {id}</p>
      <p className="text-[var(--color-muted)] text-sm mt-2">Phase 2 — Blog editor coming soon.</p>
    </div>
  );
}
