import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedBlogPosts } from '@/lib/repositories/blog.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || 'Alchemystery';
  return {
    title: `Insights & Reflections | ${brandName}`,
    description: 'Articles, perspectives and guidance from the Alchemystery practice.',
  };
}

export default async function InsightsPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-24">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">From the Practice</p>
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          Insights & Reflections
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/insights/${post.slug}`}
            className="group block rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            {post.cover_image_url ? (
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={post.cover_image_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                <span className="text-[var(--color-gold)] opacity-50" style={{ fontFamily: 'var(--font-serif)' }}>Alchemystery</span>
              </div>
            )}
            <div className="p-8">
              {post.category && (
                <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">
                  {post.category}
                </p>
              )}
              <h2 className="text-2xl mb-4 group-hover:text-[var(--color-ivory)] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-[var(--color-muted)] text-sm line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)] tracking-widest uppercase">
                {post.published_at && (
                  <span>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
                <span className="text-[var(--color-gold)] group-hover:underline underline-offset-4">Read Article</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-24 text-[var(--color-muted)]">
          No insights available at the moment.
        </div>
      )}
    </div>
  );
}
