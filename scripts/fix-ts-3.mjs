import fs from 'fs';

const fixActions = (file, fields) => {
  let code = fs.readFileSync(file, 'utf8');
  let replacements = fields.map(f => `${f}: parsed.data.${f} ?? null`).join(', ');
  
  code = code.replace(/await create([a-zA-Z]+)\(parsed\.data\);/g, `await create$1({ ...parsed.data, ${replacements} });`);
  code = code.replace(/await update([a-zA-Z]+)\(\{ id, \.\.\.parsed\.data \}\);/g, `await update$1({ id, ...parsed.data, ${replacements} });`);
  
  fs.writeFileSync(file, code);
};

fixActions('src/app/admin/(protected)/blog/actions.ts', ['excerpt', 'content', 'cover_image_url', 'seo_title', 'seo_description', 'og_image_url']);
fixActions('src/app/admin/(protected)/faqs/actions.ts', ['category']);
fixActions('src/app/admin/(protected)/pages/actions.ts', ['seo_title', 'seo_description', 'og_image_url']);
fixActions('src/app/admin/(protected)/services/actions.ts', ['category_id', 'short_description', 'description', 'image_url', 'duration_minutes', 'price_display', 'seo_title', 'seo_description']);
fixActions('src/app/admin/(protected)/testimonials/actions.ts', ['author_initials', 'service_id']);

const sfFile = 'src/app/admin/(protected)/settings/settings-form.tsx';
let sfCode = fs.readFileSync(sfFile, 'utf8');
sfCode = sfCode.replace(/contact_email: \(formData\.get\('contact_email'\) as string\) \|\| null,/g, "contact_email: (formData.get('contact_email') as string) || undefined,");
sfCode = sfCode.replace(/contact_phone: \(formData\.get\('contact_phone'\) as string\) \|\| null,/g, "contact_phone: (formData.get('contact_phone') as string) || undefined,");
sfCode = sfCode.replace(/whatsapp: \(formData\.get\('whatsapp'\) as string\) \|\| null,/g, "whatsapp: (formData.get('whatsapp') as string) || undefined,");
sfCode = sfCode.replace(/address: \(formData\.get\('address'\) as string\) \|\| null,/g, "address: (formData.get('address') as string) || undefined,");
sfCode = sfCode.replace(/instagram_url: \(formData\.get\('instagram_url'\) as string\) \|\| null,/g, "instagram_url: (formData.get('instagram_url') as string) || undefined,");
sfCode = sfCode.replace(/facebook_url: \(formData\.get\('facebook_url'\) as string\) \|\| null,/g, "facebook_url: (formData.get('facebook_url') as string) || undefined,");
sfCode = sfCode.replace(/twitter_url: \(formData\.get\('twitter_url'\) as string\) \|\| null,/g, "twitter_url: (formData.get('twitter_url') as string) || undefined,");
sfCode = sfCode.replace(/youtube_url: \(formData\.get\('youtube_url'\) as string\) \|\| null,/g, "youtube_url: (formData.get('youtube_url') as string) || undefined,");
sfCode = sfCode.replace(/seo_title: \(formData\.get\('seo_title'\) as string\) \|\| null,/g, "seo_title: (formData.get('seo_title') as string) || undefined,");
sfCode = sfCode.replace(/seo_description: \(formData\.get\('seo_description'\) as string\) \|\| null,/g, "seo_description: (formData.get('seo_description') as string) || undefined,");
sfCode = sfCode.replace(/logo_url: \(formData\.get\('logo_url'\) as string\) \|\| null,/g, "logo_url: (formData.get('logo_url') as string) || undefined,");
sfCode = sfCode.replace(/favicon_url: \(formData\.get\('favicon_url'\) as string\) \|\| null,/g, "favicon_url: (formData.get('favicon_url') as string) || undefined,");
sfCode = sfCode.replace(/footer_text: \(formData\.get\('footer_text'\) as string\) \|\| null,/g, "footer_text: (formData.get('footer_text') as string) || undefined,");
fs.writeFileSync(sfFile, sfCode);

console.log('Fixed actions and settings-form');
