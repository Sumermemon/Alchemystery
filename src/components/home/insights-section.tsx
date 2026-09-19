'use client';

import Link from 'next/link';
import type { BlogPostRow } from '@/types/database.types';

const DEFAULT_POSTS = [
  {
    id: 'post-1',
    slug: 'what-is-the-akashic-records',
    title: 'What is the Akashic Records?',
    excerpt: 'An exploration into the energetic library of the soul, and how accessing this space can bring profound clarity to your present life.',
    cover_image_url: '/images/insight_moon_ocean.png',
  },
  {
    id: 'post-2',
    slug: 'tarot-as-a-tool-for-reflection',
    title: 'Tarot as a Tool for Reflection',
    excerpt: 'Moving beyond fortune telling: how symbolic cards offer an mirror to your inner psyche, unconscious patterns, and conscious choices.',
    cover_image_url: '/images/insight_tarot_shadow.jpg',
  },
  {
    id: 'post-3',
    slug: 'understanding-numerology',
    title: 'Understanding Numerology',
    excerpt: 'The universal language of vibration and numbers. Discover how your birth cycles and numbers reveal your soul blueprint.',
    cover_image_url: '/images/insight_mountains.png',
  },
];

export function InsightsSection({ posts }: { posts: BlogPostRow[] }) {
  const displayedPosts = posts && posts.length >= 3 ? posts.slice(0, 3) : DEFAULT_POSTS;

  return (
    <section className="bg-[#F6F3EE] text-[#1A1F2C] py-24 px-6 relative border-t border-[#CFA56A]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
        <div>
          <p className="text-[#CFA56A] text-xs tracking-[0.25em] uppercase font-mono mb-3 font-semibold">
            FROM THE PRACTICE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2] mb-3 text-[#1A1F2C]" style={{ fontFamily: 'var(--font-serif)' }}>
            Insights & Reflections
          </h2>
          <p className="text-[#555C6E] text-sm md:text-base font-medium max-w-xl">
            Articles, perspectives and guidance to support you on your journey.
          </p>
        </div>
        <Link 
          href="/insights"
          className="text-[#1A1F2C] text-xs tracking-[0.2em] uppercase font-mono font-bold hover:text-[#CFA56A] transition-colors inline-flex items-center gap-2 pb-1 border-b border-[#CFA56A]"
        >
          Explore All Articles <span>→</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedPosts.map((post, idx) => {
          const defaultImgs = [
            '/images/insight_moon_ocean.png',
            '/images/insight_tarot_shadow.jpg',
            '/images/insight_mountains.png',
          ];
          const imgUrl = post.cover_image_url && post.cover_image_url.startsWith('/images/')
            ? post.cover_image_url
            : defaultImgs[idx % defaultImgs.length];

          return (
            <Link 
              key={post.id || post.slug} 
              href={`/insights/${post.slug}`} 
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#CFA56A]/20 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(207,165,106,0.15)] hover:border-[#CFA56A]/50 transition-all duration-300"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#070A14] relative">
                <img 
                  src={imgUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-xl mb-3 group-hover:text-[#CFA56A] transition-colors leading-snug" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
                  {post.title}
                </h3>
                <p className="text-[#555C6E] text-sm line-clamp-3 mb-6 font-medium leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="text-[#CFA56A] text-xs tracking-[0.2em] uppercase font-mono font-bold flex items-center gap-2 mt-auto">
                  Read More <span>→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
