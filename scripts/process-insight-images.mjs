import sharp from 'sharp';
import path from 'path';

const img1 = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\insight_crescent_ocean_1790920864499.jpg';
const img2 = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\insight_botanical_shadow_1790920894610.jpg';
const img3 = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\insight_golden_landscape_1790920921098.jpg';

async function processAll() {
  await sharp(img1)
    .resize(1200, 750, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.resolve('public/images/insight_crescent_ocean.webp'));
  await sharp(img1)
    .resize(1200, 750, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.resolve('public/images/insight_crescent_ocean.jpg'));

  await sharp(img2)
    .resize(1200, 750, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.resolve('public/images/insight_botanical_shadow.webp'));
  await sharp(img2)
    .resize(1200, 750, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.resolve('public/images/insight_botanical_shadow.jpg'));

  await sharp(img3)
    .resize(1200, 750, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.resolve('public/images/insight_golden_landscape.webp'));
  await sharp(img3)
    .resize(1200, 750, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.resolve('public/images/insight_golden_landscape.jpg'));

  console.log('Saved all 3 insight images successfully!');
}

processAll().catch(console.error);
