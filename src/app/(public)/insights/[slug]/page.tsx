import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from '@/lib/repositories/blog.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [post, settings] = await Promise.all([
      getPublishedBlogPostBySlug(slug),
      getSiteSettings(),
    ]);
    
    if (!post) return { title: 'Article Not Found' };
    
    const brandName = settings.brand_name || 'Alchemystery';
    
    return {
      title: `${post.seo_title ?? post.title} | ${brandName}`,
      description: post.seo_description ?? post.excerpt ?? undefined,
      openGraph: post.cover_image_url ? { images: [post.cover_image_url] } : undefined,
    };
  } catch {
    return { title: 'Article' };
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;

  let post = null;
  try {
    post = await getPublishedBlogPostBySlug(slug);
  } catch {
    // DB not yet configured
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-24">
      <header className="mb-16 text-center space-y-6">
        {post.category && (
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase">
            {post.category}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-[var(--color-muted)] text-sm tracking-widest uppercase">
          {post.published_at && (
            <span>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </header>

      {post.cover_image_url && (
        <div className="aspect-[21/9] w-full rounded-xl overflow-hidden shadow-2xl mb-16 border border-[rgba(255,255,255,0.06)]">
          <img 
            src={post.cover_image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {post.content && (
        <div className="bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-8 md:p-16">
          <MarkdownRenderer content={post.content} />
        </div>
      )}
    </article>
  );
}
