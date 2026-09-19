import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixImages() {
  // Fix Tarot image (broken Google icon)
  const { error: tarotErr } = await supabase
    .from('services')
    .update({ image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200' })
    .eq('slug', 'tarot');
  
  if (tarotErr) console.error('Tarot update error:', tarotErr);
  else console.log('✅ Tarot image updated');

  // Fix Numerology image
  const { error: numErr } = await supabase
    .from('services')
    .update({ image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200' })
    .eq('slug', 'numerology');

  if (numErr) console.error('Numerology update error:', numErr);
  else console.log('✅ Numerology image updated');

  // Also add price_display if missing (the sessions list was showing raw "2500")
  const { data: services } = await supabase.from('services').select('id, slug, price_inr, price_display');
  console.log('\nCurrent service pricing:');
  for (const s of (services ?? [])) {
    console.log(`  ${s.slug}: price_inr=${s.price_inr}, price_display=${s.price_display}`);
    if (s.price_inr && !s.price_display) {
      const { error } = await supabase
        .from('services')
        .update({ price_display: `₹${s.price_inr}` })
        .eq('id', s.id);
      if (!error) console.log(`    → Set price_display to ₹${s.price_inr}`);
    }
  }
}

fixImages().catch(console.error);
