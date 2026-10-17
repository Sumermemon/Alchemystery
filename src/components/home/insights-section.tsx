'use client';

import Link from 'next/link';
import type { BlogPostRow } from '@/types/database.types';

const DEFAULT_POSTS = [
  {
    id: 'post-1',
    slug: 'what-are-the-akashic-records',
    title: 'What Are the Akashic Records?',
    excerpt: 'A gentle introduction to the Akashic Records and the idea of accessing a deeper layer of your story.',
    cover_image_url: '/images/insight_crescent_ocean.webp',
  },
  {
    id: 'post-2',
    slug: 'tarot-as-a-tool-for-reflection',
    title: 'Tarot as a Tool for Reflection',
    excerpt: 'Beyond predictions \u2014 exploring tarot as an intuitive mirror for the questions we carry.',
    cover_image_url: '/images/insight_botanical_shadow.webp',
  },
  {
    id: 'post-3',
    slug: 'everything-is-energy',
    title: 'Everything Is Energy',
    excerpt: 'A look at the idea of energy, awareness and what it means to consciously shift what we carry.',
    cover_image_url: '/images/insight_golden_landscape.webp',
  },
  {
    id: 'post-4',
    slug: 'understanding-numerology',
    title: 'Understanding Numerology',
    excerpt: 'Exploring numbers, symbolism and the patterns they may reveal about our personal journeys.',
    cover_image_url: '/images/session_numerology.jpg',
  },
];

export function InsightsSection({ posts }: { posts: BlogPostRow[] }) {
  const displayedPosts = posts && posts.length > 0 ? posts.slice(0, 4) : DEFAULT_POSTS;

  return (
    <section id="insights" className="bg-[#F1EDE2] text-[#1A1F2C] py-20 lg:py-24 px-6 relative border-t border-[#A37D42]/20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Block matching copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#A37D42]/20">
          <div className="space-y-3 max-w-2xl">
            <p className="text-[#A37D42] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
              INSIGHTS &amp; REFLECTIONS
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] text-[#1A1F2C]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Things Worth Exploring
            </h2>
            <p className="text-[#555C6E] text-sm sm:text-[14.5px] leading-relaxed">
              Thoughts, stories and perspectives on intuition, energy, spirituality and the strange, beautiful experience of being human.
            </p>
          </div>

          <div className="pt-2 flex-shrink-0">
            <Link 
              href="/insights"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#A37D42] border-b border-[#A37D42] pb-0.5 hover:text-[#1A1F2C] hover:border-[#1A1F2C] transition-all"
            >
              <span>Explore All Articles</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
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

            const imgUrl = post.cover_image_url || defaultImgs[idx % defaultImgs.length];
            const excerpt = post.excerpt || defaultExcerpts[idx % defaultExcerpts.length];

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
