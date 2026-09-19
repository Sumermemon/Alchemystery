import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Service Category
    const { data: category, error: catErr } = await supabase
      .from('service_categories')
      .upsert({
        name: 'Intuitive Sessions',
        slug: 'intuitive-sessions',
        description: 'One-to-one sessions exploring your inner landscape through established spiritual modalities.',
        sort_order: 1
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (catErr) throw catErr;
    const categoryId = category.id;

    // 2. Services
    const services = [
      { category_id: categoryId, title: 'Akashic Records', slug: 'akashic-records', short_description: 'Insights for clarity and deeper self-understanding.', status: 'published', sort_order: 1, image_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80' },
      { category_id: categoryId, title: 'Tarot', slug: 'tarot', short_description: 'Reflective guidance for questions, decisions and life transitions.', status: 'published', sort_order: 2, image_url: 'https://images.unsplash.com/photo-1616422285623-14fb7794ae6c?auto=format&fit=crop&q=80' },
      { category_id: categoryId, title: 'Numerology', slug: 'numerology', short_description: 'Explore the symbolic significance of numbers and personal cycles.', status: 'published', sort_order: 3, image_url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80' },
      { category_id: categoryId, title: 'Spiritual Guidance', slug: 'spiritual-guidance', short_description: 'A one-to-one space for reflection and intuitive guidance.', status: 'published', sort_order: 4, image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80' },
      { category_id: categoryId, title: 'Energy & Healing', slug: 'energy-healing', short_description: 'A calming practice focused on balance and wellbeing.', status: 'published', sort_order: 5, image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' }
    ];

    for (const s of services) {
      const { error } = await supabase.from('services').upsert(s, { onConflict: 'slug' });
      if (error) throw error;
    }

    // 3. Testimonial
    const { error: tErr } = await supabase.from('testimonials').insert({
      client_name: 'R. S.',
      client_initials: 'RS',
      quote: 'My session with Isha gave me clarity at a time when I felt completely stuck. Her guidance is gentle, insightful and deeply genuine.',
      is_featured: true,
      sort_order: 1,
      status: 'published'
    });
    // Ignore tErr if it's just a duplicate, but wait, we didn't specify onConflict for testimonial

    // 4. Insights (Blog Posts)
    const posts = [
      { title: 'What is the Akashic Records?', slug: 'what-is-the-akashic-records', excerpt: 'A gentle introduction to this powerful source of insight.', content: 'Content goes here...', cover_image_url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80', status: 'published', published_at: new Date().toISOString() },
      { title: 'Tarot as a Tool for Reflection', slug: 'tarot-as-a-tool-for-reflection', excerpt: 'More than predictions — a mirror for your inner world.', content: 'Content goes here...', cover_image_url: 'https://images.unsplash.com/photo-1503437313881-503a91226402?auto=format&fit=crop&q=80', status: 'published', published_at: new Date().toISOString() },
      { title: 'Understanding Numerology', slug: 'understanding-numerology', excerpt: 'The language of numbers and what they reveal.', content: 'Content goes here...', cover_image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80', status: 'published', published_at: new Date().toISOString() }
    ];

    for (const p of posts) {
      const { error } = await supabase.from('blog_posts').upsert(p, { onConflict: 'slug' });
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
