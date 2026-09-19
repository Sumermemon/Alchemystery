import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase credentials');

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedPages() {
  const pages = [
    {
      slug: 'practice',
      title: 'The Practice',
      status: 'published',
      seo_title: 'The Practice | Alchemystery',
      seo_description: 'Explore the spiritual modalities offered at Alchemystery — Akashic Records, Tarot, Numerology, Energy Healing and more.',
    },
    {
      slug: 'about',
      title: 'About Isha',
      status: 'published',
      seo_title: 'About Isha | Alchemystery',
      seo_description: 'Meet Isha — an intuitive guide offering one-to-one sessions in Akashic Records, Tarot, Numerology and Spiritual Guidance.',
    },
  ];

  for (const page of pages) {
    const { data, error } = await supabase
      .from('pages')
      .upsert(page, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error(`Error seeding page "${page.slug}":`, error.message);
      continue;
    }

    console.log(`✅ Page "${page.slug}" upserted (id: ${data.id})`);

    // Seed sections for "practice"
    if (page.slug === 'practice') {
      const sections = [
        {
          page_id: data.id,
          section_key: 'intro',
          heading: 'A Space for Your Inner Truth',
          body: 'Alchemystery is a quiet, dedicated practice for those seeking clarity, direction and a deeper connection to themselves. Through a range of established spiritual modalities, Isha offers one-to-one sessions designed to meet you exactly where you are.',
          sort_order: 1,
          status: 'published',
        },
        {
          page_id: data.id,
          section_key: 'what-to-expect',
          heading: 'What to Expect',
          body: 'Each session is held in a calm, non-judgmental space. Whether you are working through a specific question or simply feeling called to explore, the session will gently follow what is most alive for you at this time.\n\nAll sessions are conducted online and are approximately 60 minutes in length. Recordings are available on request.',
          sort_order: 2,
          status: 'published',
        },
        {
          page_id: data.id,
          section_key: 'modalities',
          heading: 'The Modalities',
          body: '**Akashic Records** — A deeply contemplative reading that draws on the energetic archive of your soul\'s journey.\n\n**Tarot** — A reflective tool using symbolic imagery to illuminate patterns, possibilities and inner truth.\n\n**Numerology** — A structured exploration of the numbers that shape your character, timing and life path.\n\n**Spiritual Guidance** — An open, intuitive conversation for those seeking gentle direction and inner perspective.\n\n**Energy & Healing** — A calming, body-aware practice centred on balance and energetic wellbeing.',
          sort_order: 3,
          status: 'published',
        },
      ];

      for (const section of sections) {
        const { error: secErr } = await supabase.from('page_sections').insert(section);
        if (secErr) console.error('  Section error:', secErr.message);
        else console.log(`  → Section "${section.title}" added`);
      }
    }

    // Seed sections for "about"
    if (page.slug === 'about') {
      const sections = [
        {
          page_id: data.id,
          section_key: 'intro',
          heading: 'About Isha',
          body: 'Isha is an intuitive guide and energy worker based in India. She works with individuals across the world, offering sessions in Akashic Records, Tarot, Numerology, Spiritual Guidance and Energy Healing.',
          sort_order: 1,
          status: 'published',
        },
        {
          page_id: data.id,
          section_key: 'approach',
          heading: 'Her Approach',
          body: "Isha's work is grounded in deep listening and genuine care. Her sessions are not about predictions — they are about perspective. She creates a space where you can feel safe to explore, reflect and reconnect with the wisdom already present within you.\n\nHer approach draws from years of personal study and practice across multiple traditions, combined with a natural, intuitive sensitivity that clients often describe as calming and clarifying.",
          sort_order: 2,
          status: 'published',
        },
        {
          page_id: data.id,
          section_key: 'working-together',
          heading: 'Working Together',
          body: 'Sessions are conducted online and are available worldwide. Isha works with a small number of clients at any time to ensure each session receives her full presence and attention.\n\nIf you feel drawn to her work, you are warmly invited to reach out.',
          sort_order: 3,
          status: 'published',
          cta_label: 'Get in Touch',
          cta_url: '/connect',
        },
      ];

      for (const section of sections) {
        const { error: secErr } = await supabase.from('page_sections').insert(section);
        if (secErr) console.error('  Section error:', secErr.message);
        else console.log(`  → Section "${section.heading}" added`);
      }
    }
  }


  console.log('\nDone!');
}

seedPages().catch(console.error);
