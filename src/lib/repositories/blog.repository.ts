/**
 * Blog repository — data access layer for the blog_posts table.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { STATUS } from '@/constants/status';
import type { BlogPostRow, InsertBlogPost, UpdateBlogPost } from '@/types/database.types';

export const DEFAULT_BLOG_POSTS: BlogPostRow[] = [
  {
    id: 'post-1',
    slug: 'what-are-the-akashic-records',
    title: 'What Are the Akashic Records?',
    excerpt: 'A gentle introduction to the Akashic Records and the idea of accessing a deeper layer of your story.',
    content: `The Akashic Records are often described as an energetic library of every soul\u2019s journey across time, consciousness, and experience.

Derived from the Sanskrit word *Akasha*, meaning ether or space, this realm holds the memory and vibrational imprint of all thoughts, emotions, patterns, and possibilities.

### Looking Beneath the Surface
When we access the Akashic Records, we are not looking for fatalistic predictions or rigid truths. Instead, we open a doorway into the deeper story of your experience:
- Understanding repeating patterns in relationships or life choices
- Identifying energetic contracts or ancestral themes
- Bringing compassionate clarity to transitions and pivotal questions

### The Experience of a Reading
A session is a grounded, open dialogue. We begin with an opening prayer or attunement, connecting with your Record Keepers and Guides. You are invited to bring questions close to your heart, and together we explore what the records illuminate.

> *"Knowing yourself changes the way you experience everything around you."*`,
    cover_image_url: '/images/insight_crescent_ocean.webp',
    author_name: 'Isha',
    seo_title: null,
    seo_description: null,
    og_image_url: null,
    status: 'published',
    published_at: '2026-03-15T00:00:00Z',
    created_at: '2026-03-15T00:00:00Z',
    updated_at: '2026-03-15T00:00:00Z',
  },
  {
    id: 'post-2',
    slug: 'tarot-as-a-tool-for-reflection',
    title: 'Tarot as a Tool for Reflection',
    excerpt: 'Beyond predictions \u2014 exploring tarot as an intuitive mirror for the questions we carry.',
    content: `Many people think of Tarot as an attempt to predict the future. But in truth, the cards do not decide your story \u2014 they help you look at it differently.

Tarot is an intuitive mirror. Each archetypal image, suit, and number reflects aspects of the human journey that already reside within your subconscious.

### A Mirror for Transitions
When we feel stuck, overwhelmed, or divided between two choices, our analytical mind often loops over the same thoughts. The cards introduce fresh perspectives, allowing you to:
- See unseen influences and underlying motives
- Shift from passive worry to intentional action
- Reconnect with your innate inner wisdom

### How We Work With the Cards
At Alchemystery, Tarot is practiced with reverence, warmth, and grounded discernment. We do not engage in fear-based readings. Every spread is an invitation to explore what is present, what is shifting, and what possibilities are waiting to unfold.`,
    cover_image_url: '/images/insight_botanical_shadow.webp',
    author_name: 'Isha',
    seo_title: null,
    seo_description: null,
    og_image_url: null,
    status: 'published',
    published_at: '2026-03-22T00:00:00Z',
    created_at: '2026-03-22T00:00:00Z',
    updated_at: '2026-03-22T00:00:00Z',
  },
  {
    id: 'post-3',
    slug: 'everything-is-energy',
    title: 'Everything Is Energy',
    excerpt: 'A look at the idea of energy, awareness and what it means to consciously shift what we carry.',
    content: `Everything is energy. Our thoughts, emotions, physical bodies, relationships, and the spaces we inhabit each carry their own subtle vibrational frequency.

And because energy is constantly in motion, what feels heavy, rigid, or fixed is never truly permanent.

### The Power of Awareness
Before we can transmute anything, we must first become aware of it:
- What patterns am I carrying that are no longer mine?
- Where in my body or life do I feel constriction or resistance?
- What happens when I stop fighting an experience and simply witness it?

### Conscious Transmutation
Alchemy is the art of transformation \u2014 taking raw, unprocessed experience and refining it into gold. When we bring loving awareness to our energy, we begin to consciously work with it rather than simply moving through it.`,
    cover_image_url: '/images/insight_golden_landscape.webp',
    author_name: 'Isha',
    seo_title: null,
    seo_description: null,
    og_image_url: null,
    status: 'published',
    published_at: '2026-04-01T00:00:00Z',
    created_at: '2026-04-01T00:00:00Z',
    updated_at: '2026-04-01T00:00:00Z',
  },
  {
    id: 'post-4',
    slug: 'understanding-numerology',
    title: 'Understanding Numerology',
    excerpt: 'Exploring numbers, symbolism and the patterns they may reveal about our personal journeys.',
    content: `Numbers are the universe\u2019s universal language. Long before written alphabets, ancient sages understood that numbers represent energetic qualities and cosmic cycles.

Numerology is the study of how these symbolic frequencies correspond to your personal timeline and soul purpose.

### Your Personal Blueprint
Through your birth date and name vibrations, numerology illuminates:
- **Life Path:** The core lessons and themes of your incarnation
- **Expression & Soul Urge:** Your natural talents and deepest inner longings
- **Personal Year Cycles:** The seasonal energetic climate of where you are right now

### Moving With the Current
Understanding your numbers gives you a map of the seasons you are traversing. Instead of forcing progress during a time of rest, or hesitating during a cycle of expansion, you can move in harmony with your natural rhythm.`,
    cover_image_url: '/images/session_numerology.jpg',
    author_name: 'Isha',
    seo_title: null,
    seo_description: null,
    og_image_url: null,
    status: 'published',
    published_at: '2026-04-10T00:00:00Z',
    created_at: '2026-04-10T00:00:00Z',
    updated_at: '2026-04-10T00:00:00Z',
  },
];

/** Fetch all published blog posts, newest first */
export async function getPublishedBlogPosts(limit?: number): Promise<BlogPostRow[]> {
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('status', STATUS.PUBLISHED)
      .order('published_at', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
      console.warn(`[BlogRepository] getPublishedBlogPosts warning: ${error.message}`);
      return limit ? DEFAULT_BLOG_POSTS.slice(0, limit) : DEFAULT_BLOG_POSTS;
    }
    return (data && data.length > 0)
      ? data
      : (limit ? DEFAULT_BLOG_POSTS.slice(0, limit) : DEFAULT_BLOG_POSTS);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[BlogRepository] getPublishedBlogPosts network error: ${msg}`);
    return limit ? DEFAULT_BLOG_POSTS.slice(0, limit) : DEFAULT_BLOG_POSTS;
  }
}

/** Fetch a single published post by slug */
export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', STATUS.PUBLISHED)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.warn(`[BlogRepository] getPublishedBlogPostBySlug warning: ${error.message}`);
      return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
    }
    return data ?? DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[BlogRepository] getPublishedBlogPostBySlug network error: ${msg}`);
    return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

/** Fetch all posts for admin */
export async function getAllBlogPosts(): Promise<BlogPostRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`[BlogRepository] getAllBlogPosts: ${error.message}`);
  return data ?? [];
}

/** Fetch single post by id for admin edit */
export async function getBlogPostById(id: string): Promise<BlogPostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[BlogRepository] getBlogPostById: ${error.message}`);
  }
  return data ?? null;
}

export async function createBlogPost(payload: InsertBlogPost): Promise<BlogPostRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[BlogRepository] createBlogPost: ${error.message}`);
  return data;
}

export async function updateBlogPost({ id, ...payload }: UpdateBlogPost): Promise<BlogPostRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[BlogRepository] updateBlogPost: ${error.message}`);
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(`[BlogRepository] deleteBlogPost: ${error.message}`);
}
