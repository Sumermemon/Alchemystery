const fs = require('fs');

// Fix insights/page.tsx
const insightsPage = 'src/app/(public)/insights/page.tsx';
let insightsCode = fs.readFileSync(insightsPage, 'utf8');
insightsCode = insightsCode.replace(/<span className="text-xs uppercase tracking-widest text-\[var\(--color-gold\)\]">\s*\{post\.category\}\s*<\/span>/g, '');
fs.writeFileSync(insightsPage, insightsCode);

// Fix sessions/[slug]/page.tsx
const sessionsSlug = 'src/app/(public)/sessions/[slug]/page.tsx';
let sessionsCode = fs.readFileSync(sessionsSlug, 'utf8');
sessionsCode = sessionsCode.replace(/\{service\.category\}/g, '');
sessionsCode = sessionsCode.replace(/\{service\.long_description/g, '{service.description');
fs.writeFileSync(sessionsSlug, sessionsCode);

// Fix sessions/page.tsx
const sessionsPage = 'src/app/(public)/sessions/page.tsx';
let sessionsPageCode = fs.readFileSync(sessionsPage, 'utf8');
sessionsPageCode = sessionsPageCode.replace(/<span className="text-xs uppercase tracking-widest text-\[var\(--color-gold\)\]">\s*\{service\.category\}\s*<\/span>/g, '');
fs.writeFileSync(sessionsPage, sessionsPageCode);

// Fix testimonials-section.tsx
const testimonialsSec = 'src/components/home/testimonials-section.tsx';
let tsCode = fs.readFileSync(testimonialsSec, 'utf8');
tsCode = tsCode.replace(/t\.quote/g, 't.content').replace(/t\.client_name/g, 't.author_name');
fs.writeFileSync(testimonialsSec, tsCode);

// Fix settings-form.tsx
const settingsForm = 'src/app/admin/(protected)/settings/settings-form.tsx';
let sfCode = fs.readFileSync(settingsForm, 'utf8');
sfCode = sfCode.replace(/tagline: data\.tagline,/g, 'tagline: data.tagline ?? undefined,');
fs.writeFileSync(settingsForm, sfCode);

// Fix actions.ts defaults
const fixActions = (file, field) => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(new RegExp(field + ':\\s*data\\.' + field + ','), field + ': data.' + field + ' ?? null,');
  fs.writeFileSync(file, code);
};
fixActions('src/app/admin/(protected)/blog/actions.ts', 'excerpt');
fixActions('src/app/admin/(protected)/blog/actions.ts', 'content');
fixActions('src/app/admin/(protected)/blog/actions.ts', 'cover_image_url');
fixActions('src/app/admin/(protected)/faqs/actions.ts', 'category');
fixActions('src/app/admin/(protected)/pages/actions.ts', 'seo_title');
fixActions('src/app/admin/(protected)/pages/actions.ts', 'seo_description');
fixActions('src/app/admin/(protected)/pages/actions.ts', 'og_image_url');
fixActions('src/app/admin/(protected)/services/actions.ts', 'category_id');
fixActions('src/app/admin/(protected)/services/actions.ts', 'short_description');
fixActions('src/app/admin/(protected)/services/actions.ts', 'description');
fixActions('src/app/admin/(protected)/services/actions.ts', 'image_url');
fixActions('src/app/admin/(protected)/testimonials/actions.ts', 'author_initials');
fixActions('src/app/admin/(protected)/testimonials/actions.ts', 'service_id');

// Fix Button asChild errors
const adminPages = [
  'src/app/admin/(protected)/blog/page.tsx',
  'src/app/admin/(protected)/faqs/page.tsx',
  'src/app/admin/(protected)/pages/page.tsx',
  'src/app/admin/(protected)/services/page.tsx',
  'src/app/admin/(protected)/testimonials/page.tsx'
];
for (const page of adminPages) {
  let code = fs.readFileSync(page, 'utf8');
  code = code.replace(/<Button asChild/g, '<Button').replace(/<Button(.*?) asChild/g, '<Button$1');
  fs.writeFileSync(page, code);
}

console.log('Fixed simple errors');
