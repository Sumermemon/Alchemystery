/**
 * Service repository — data access layer for the services table.
 * All Supabase queries related to services live here.
 * Components never query Supabase directly.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { STATUS } from '@/constants/status';
import type { ServiceRow, InsertService, UpdateService } from '@/types/database.types';

export const DEFAULT_SERVICES: ServiceRow[] = [
  {
    id: 'srv-1',
    slug: 'akashic-records',
    title: 'Akashic Records',
    short_description: 'A doorway into the deeper story of your experience. Explore patterns, relationships, recurring themes and questions beneath the surface.',
    description: `### A Doorway Into Your Soul\u2019s Story
The Akashic Records hold the energetic imprint of every thought, emotion, pattern, and possibility of your journey across time.

In this private one-to-one online session, we open your records with your permission, holding a safe and compassionate space to explore:
- Recurring themes or feelings of stagnation
- Energetic bonds, karmic dynamics, and ancestral patterns
- Deep clarity around your purpose, relationships, and current life transitions

### What to Expect
- **Format:** Private 1-on-1 session via Google Meet / Zoom
- **Duration:** 60 minutes
- **Recording:** Audio recording provided upon request`,
    duration_minutes: 60,
    price_display: 'By Appointment',
    category_id: null,
    seo_title: null,
    seo_description: null,
    image_url: '/images/session_akashic.jpg',
    sort_order: 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-2',
    slug: 'tarot',
    title: 'Tarot',
    short_description: 'The cards don\u2019t decide your story. They help you look at it differently \u2014 an intuitive mirror for decisions and transitions.',
    description: `### An Intuitive Mirror for Your Journey
Tarot is not about fatalistic fortune-telling; it is a sacred mirror reflecting what is currently moving within your conscious and subconscious awareness.

During our reading, we lay out the cards to examine:
- The hidden influences shaping your current decisions
- Emotional clarity around romantic, family, or work relationships
- Actionable, empowering guidance for your next steps

### What to Expect
- **Format:** Private 1-on-1 session via Google Meet / Zoom
- **Duration:** 60 minutes
- **Recording:** Provided upon request`,
    duration_minutes: 60,
    price_display: 'By Appointment',
    category_id: null,
    seo_title: null,
    seo_description: null,
    image_url: '/images/session_tarot.jpg',
    sort_order: 2,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-3',
    slug: 'numerology',
    title: 'Numerology',
    short_description: 'Numbers carry their own language and symbolism. Explore your personal numbers and cycles to uncover patterns within your journey.',
    description: `### Cosmic Geometry & Sacred Numbers
Every number carries a unique vibrational frequency. By analyzing your birth date and name, numerology reveals your soul\u2019s cosmic blueprint.

We examine:
- Your Life Path and Soul Urge frequencies
- Personal Year Cycles and seasonal energetic shifts
- Favorable periods for career ventures, transitions, and partnerships

### What to Expect
- **Format:** Private 1-on-1 session via Google Meet / Zoom
- **Duration:** 60 minutes
- **Recording:** Provided upon request`,
    duration_minutes: 60,
    price_display: 'By Appointment',
    category_id: null,
    seo_title: null,
    seo_description: null,
    image_url: '/images/session_numerology.jpg',
    sort_order: 3,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-4',
    slug: 'spiritual-guidance',
    title: 'Spiritual Guidance',
    short_description: 'Sometimes the most powerful shift begins with a conversation. A private, intuitive space to bring your questions and experiences.',
    description: `### A Safe, Grounded Dialogue
Sometimes what you need most is not a modality, but an open, non-judgmental space to speak what is present and be truly heard.

Spiritual guidance sessions offer:
- Intuitive discernment for complex life phases
- Perspective on spiritual awakening, existential questioning, and grief
- Grounded practices for daily mindfulness and inner sovereignty

### What to Expect
- **Format:** Private 1-on-1 session via Google Meet / Zoom
- **Duration:** 60 minutes
- **Recording:** Provided upon request`,
    duration_minutes: 60,
    price_display: 'By Appointment',
    category_id: null,
    seo_title: null,
    seo_description: null,
    image_url: '/images/session_guidance.png',
    sort_order: 4,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-5',
    slug: 'energy-healing',
    title: 'Energy & Healing',
    short_description: 'A gentle practice for shifting, balancing and reconnecting. Create space to become more aware of your energy and restore balance.',
    description: `### Restoring Harmony & Inner Flow
Our physical bodies and energetic fields hold onto accumulated stress, emotional residue, and environmental tension.

This session focuses on:
- Subtle energy clearing and chakra realignment
- Releasing stagnant emotions and restoring deep calm
- Reconnecting with your body\u2019s natural intuitive balance

### What to Expect
- **Format:** Private 1-on-1 session via Google Meet / Zoom
- **Duration:** 60 minutes
- **Recording:** Provided upon request`,
    duration_minutes: 60,
    price_display: 'By Appointment',
    category_id: null,
    seo_title: null,
    seo_description: null,
    image_url: '/images/session_energy.jpg',
    sort_order: 5,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/** Fetch all published services, ordered by sort_order */
export async function getPublishedServices(): Promise<ServiceRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', STATUS.PUBLISHED)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn(`[ServiceRepository] getPublishedServices warning: ${error.message}`);
      return DEFAULT_SERVICES;
    }
    return (data && data.length > 0) ? data : DEFAULT_SERVICES;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[ServiceRepository] getPublishedServices network error: ${msg}`);
    return DEFAULT_SERVICES;
  }
}

/** Fetch a single published service by slug — used for /sessions/[slug] */
export async function getPublishedServiceBySlug(slug: string): Promise<ServiceRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('status', STATUS.PUBLISHED)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.warn(`[ServiceRepository] getPublishedServiceBySlug warning: ${error.message}`);
      return DEFAULT_SERVICES.find((s) => s.slug === slug) ?? null;
    }
    return data ?? DEFAULT_SERVICES.find((s) => s.slug === slug) ?? null;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[ServiceRepository] getPublishedServiceBySlug network error: ${msg}`);
    return DEFAULT_SERVICES.find((s) => s.slug === slug) ?? null;
  }
}

/** Fetch all services (any status) — for admin CMS use */
export async function getAllServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[ServiceRepository] getAllServices: ${error.message}`);
  return data ?? [];
}

/** Fetch a single service by id — for admin edit form */
export async function getServiceById(id: string): Promise<ServiceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[ServiceRepository] getServiceById: ${error.message}`);
  }
  return data ?? null;
}

/** Create a new service */
export async function createService(payload: InsertService): Promise<ServiceRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[ServiceRepository] createService: ${error.message}`);
  return data;
}

/** Update an existing service */
export async function updateService({ id, ...payload }: UpdateService): Promise<ServiceRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[ServiceRepository] updateService: ${error.message}`);
  return data;
}

/** Delete a service (hard delete) */
export async function deleteService(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(`[ServiceRepository] deleteService: ${error.message}`);
}
