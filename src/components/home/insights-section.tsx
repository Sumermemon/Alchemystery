'use client';

import Link from 'next/link';
import type { BlogPostRow } from '@/types/database.types';

const DEFAULT_POSTS = [
  {
    id: 'post-1',
    slug: 'what-is-the-akashic-records',
    title: 'What is the Akashic Records?',
    excerpt: 'A gentle introduction to this powerful source of insight.',
    cover_image_url: '/images/insight_crescent_ocean.webp',
  },
  {
    id: 'post-2',
    slug: 'tarot-as-a-tool-for-reflection',
    title: 'Tarot as a Tool for Reflection',
    excerpt: 'More than predictions — a mirror for your inner world.',
    cover_image_url: '/images/insight_botanical_shadow.webp',
  },
  {
    id: 'post-3',
    slug: 'understanding-numerology',
    title: 'Understanding Numerology',
    excerpt: 'The language of numbers and what they reveal.',
    cover_image_url: '/images/insight_golden_landscape.webp',
  },
];

export function InsightsSection({ posts }: { posts: BlogPostRow[] }) {
  const displayedPosts = posts && posts.length >= 3 ? posts.slice(0, 3) : DEFAULT_POSTS;

  return (
    <section id="insights" className="bg-[#F1EDE2] text-[#1A1F2C] py-20 lg:py-24 px-6 relative border-t border-[#A37D42]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
        
        {/* Left Column — Header & Explore Link matching target mockup */}
        <div className="lg:col-span-4 xl:col-span-3.5 space-y-5">
          <p className="text-[#A37D42] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
            FROM THE PRACTICE
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] text-[#1A1F2C]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Insights &amp; Reflections
          </h2>
          <p className="text-[#555C6E] text-sm sm:text-[14.5px] leading-relaxed max-w-sm">
            Articles, perspectives and guidance to support you on your journey.
          </p>
          <div className="pt-2">
            <Link 
              href="/insights"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#A37D42] border-b border-[#A37D42] pb-0.5 hover:text-[#1A1F2C] hover:border-[#1A1F2C] transition-all"
            >
              <span>Explore All Articles</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Right 3 Columns — Transparent Article Cards matching target mockup */}
        <div className="lg:col-span-8 xl:col-span-8.5 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-7">
          {displayedPosts.map((post, idx) => {
            const defaultImgs = [
              '/images/insight_crescent_ocean.webp',
              '/images/insight_botanical_shadow.webp',
              '/images/insight_golden_landscape.webp',
            ];
            const defaultExcerpts = [
              'A gentle introduction to this powerful source of insight.',
              'More than predictions — a mirror for your inner world.',
              'The language of numbers and what they reveal.',
            ];

            const imgUrl = post.cover_image_url && post.cover_image_url.startsWith('/images/insight_')
              ? post.cover_image_url
              : defaultImgs[idx % defaultImgs.length];

            const excerpt = defaultExcerpts[idx % defaultExcerpts.length] || post.excerpt;

            return (
              <Link 
                key={post.id || post.slug} 
                href={`/insights/${post.slug}`} 
                className="group flex flex-col space-y-3.5 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Image Container with rounded corners */}
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#EAE6DE] shadow-sm relative border border-[#A37D42]/15">
                  <img 
                    src={imgUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Article Title */}
                <h3
                  className="text-lg font-medium text-[#1A1F2C] leading-snug group-hover:text-[#A37D42] transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#555C6E] text-xs sm:text-[13px] leading-relaxed line-clamp-2">
                  {excerpt}
                </p>

                {/* Read More Link */}
                <div className="pt-0.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#A37D42] group-hover:underline">
                    <span>Read More</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
