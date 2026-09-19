import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\.user_uploaded';
const targetDir = path.resolve('public/images');

const imageMap = [
  { src: 'media_1789824640946.png', dest: 'hero_bg.png', isPng: true },
  { src: 'media_1789824746158.png', dest: 'hero_crystals_vertical.png', isPng: true },
  { src: 'media_1789824651669.jpg', dest: 'session_akashic.jpg', isPng: false },
  { src: 'media_1789824661507.jpg', dest: 'session_tarot.jpg', isPng: false },
  { src: 'media_1789824666088.jpg', dest: 'session_numerology.jpg', isPng: false },
  { src: 'media_1789824671104.png', dest: 'session_guidance.png', isPng: true },
  { src: 'media_1789824691289.jpg', dest: 'session_energy.jpg', isPng: false },
  { src: 'media_1789824696951.png', dest: 'isha_portrait.png', isPng: true },
  { src: 'media_1789824701072.png', dest: 'insight_moon_ocean.png', isPng: true },
  { src: 'media_1789824707199.jpg', dest: 'insight_tarot_shadow.jpg', isPng: false },
  { src: 'media_1789824716546.png', dest: 'insight_mountains.png', isPng: true },
];

async function enhanceImages() {
  console.log('Starting image quality enhancement pass...');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of imageMap) {
    const srcPath = path.join(uploadedDir, item.src);
    const destPath = path.join(targetDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.log(`Source not found: ${srcPath}`);
      continue;
    }

    let pipeline = sharp(srcPath)
      .sharpen({ sigma: 1.0, m1: 0.5, m2: 2.0 })
      .modulate({ brightness: 1.01, saturation: 1.04 });

    if (item.isPng) {
      await pipeline.png({ compressionLevel: 7 }).toFile(destPath);
    } else {
      await pipeline.jpeg({ quality: 95, mozjpeg: true }).toFile(destPath);
    }

    const stat = fs.statSync(destPath);
    console.log(`Enhanced ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  // Also enhance lotus_glowing.jpg if present in brain
  const brainDir = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850';
  const lotusSrc = path.join(brainDir, 'lotus_glowing_1789824752651.jpg');
  if (fs.existsSync(lotusSrc)) {
    await sharp(lotusSrc)
      .sharpen({ sigma: 1.0, m1: 0.5, m2: 2.0 })
      .modulate({ brightness: 1.02, saturation: 1.06 })
      .jpeg({ quality: 95, mozjpeg: true })
      .toFile(path.join(targetDir, 'lotus_glowing.jpg'));
    console.log('Enhanced lotus_glowing.jpg');
  }

  console.log('All images enhanced successfully!');
}

enhanceImages().catch(err => {
  console.error('Enhancement error:', err);
  process.exit(1);
});
