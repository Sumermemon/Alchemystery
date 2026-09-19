'use client';

import Link from 'next/link';
import type { BlogPostRow } from '@/types/database.types';

export function InsightsSection({ posts }: { posts: BlogPostRow[] }) {
  // Show at most 3 posts on the homepage
  const displayedPosts = posts.slice(0, 3);

  return (
    <section className="bg-[var(--color-ivory)] text-[#0B0F1E] py-24 px-6 relative border-t border-[#d4b86a]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <p className="text-[var(--color-gold-100)] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
            FROM THE PRACTICE
          </p>
          <h2 className="text-4xl md:text-5xl leading-[1.2] mb-4" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>
            Insights & Reflections
          </h2>
          <p className="text-[#4a5568] text-sm md:text-base font-medium">
            Articles, perspectives and guidance to support you on your journey.
          </p>
        </div>
        <Link 
          href="/insights"
          className="text-[#0B0F1E] text-sm tracking-widest uppercase font-bold hover:text-[var(--color-gold-100)] transition-colors inline-flex items-center gap-2 pb-2 border-b border-[var(--color-gold-100)]"
        >
          Explore All Articles <span>→</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <Link key={post.id} href={`/insights/${post.slug}`} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
              {post.cover_image_url ? (
                <img 
                  src={post.cover_image_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-gold-100)] opacity-50" style={{ fontFamily: 'var(--font-serif)' }}>Alchemystery</div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl mb-3 text-[#0B0F1E] group-hover:text-[var(--color-gold-100)] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                {post.title}
              </h3>
              <p className="text-[#4a5568] text-sm line-clamp-3 mb-6 font-medium flex-grow">
                {post.excerpt}
              </p>
              <div className="text-[var(--color-gold-100)] text-xs tracking-widest uppercase font-bold flex items-center gap-2 mt-auto">
                Read More <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
