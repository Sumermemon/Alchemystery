import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\isha_banner_exact_1790866872037.jpg';

async function process() {
  await sharp(src)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 95 })
    .toFile(path.resolve('public/images/isha_moon_banner.webp'));
  
  await sharp(src)
    .resize(1920, 1080, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.resolve('public/images/isha_moon_banner.jpg'));

  // Also copy to isha_portrait.png for consistency
  await sharp(src)
    .resize(1200, 1200, { fit: 'cover', position: 'top' })
    .png()
    .toFile(path.resolve('public/images/isha_portrait.png'));
    
  console.log('Saved isha_moon_banner.webp, .jpg, and isha_portrait.png');
}

process().catch(console.error);
