import fs from 'fs';

const repositories = [
  'src/lib/repositories/blog.repository.ts',
  'src/lib/repositories/faq.repository.ts',
  'src/lib/repositories/page.repository.ts',
  'src/lib/repositories/service.repository.ts',
  'src/lib/repositories/settings.repository.ts',
  'src/lib/repositories/testimonial.repository.ts',
];

for (const file of repositories) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Add public client import
  if (!code.includes('createPublicClient')) {
    code = code.replace(
      "import { createClient } from '@/lib/supabase/server';", 
      "import { createClient } from '@/lib/supabase/server';\nimport { createPublicClient } from '@/lib/supabase/public';"
    );
  }

  // Replace getPublished* and getSiteSettings supabase client creation
  code = code.replace(/export async function getPublished[A-Za-z0-9_]+\([^)]*\): Promise<[^>]+> \{\s*const supabase = await createClient\(\);/g, (match) => {
    return match.replace('await createClient()', 'createPublicClient()');
  });
  
  // For page.repository.ts: getPageBySlug
  code = code.replace(/export async function getPageBySlug[^{]+\{\s*const supabase = await createClient\(\);/g, (match) => {
    return match.replace('await createClient()', 'createPublicClient()');
  });
  
  // For settings.repository.ts: getSiteSettings
  code = code.replace(/export async function getSiteSettings[^{]+\{\s*const supabase = await createClient\(\);/g, (match) => {
    return match.replace('await createClient()', 'createPublicClient()');
  });

  fs.writeFileSync(file, code);
}
console.log('Repositories updated to use createPublicClient for public queries.');
