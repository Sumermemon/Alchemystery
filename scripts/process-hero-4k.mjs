import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const generatedPath = 'C:\\Users\\OM\\.gemini\\antigravity-ide\\brain\\ded755e7-032c-4d90-8da4-2657bf641850\\hero_bg_4k_1790865367487.jpg';
const targetDir = path.resolve('public/images');

async function processHero4k() {
  console.log('Processing 4K Hero Background...');
  
  if (!fs.existsSync(generatedPath)) {
    console.error('Source not found:', generatedPath);
    process.exit(1);
  }

  // 1. First, inspect source image and patch the bottom-right watermark spark if needed
  const { data, info } = await sharp(generatedPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  console.log(`Source image: ${width}x${height}, channels: ${channels}`);

  // In the generated 1376x768 image, the spark is around x: 1200..1280, y: 660..730
  // In this region, let's check and blend from dark surrounding terrain
  // Let's sample the terrain around x: 1150..1190, y: 660..730
  const patched = Buffer.from(data);
  for (let y = Math.floor(height * 0.85); y < height - 10; y++) {
    for (let x = Math.floor(width * 0.85); x < width - 10; x++) {
      const idx = (y * width + x) * channels;
      const r = patched[idx], g = patched[idx + 1], b = patched[idx + 2];
      // If pixel is brighter than the dark rock/shadow terrain (which is typically < 40)
      if (r > 60 && g > 55 && b > 70) {
        // Sample from 40px to the left
        const sampleIdx = (y * width + (x - 45)) * channels;
        patched[idx] = patched[sampleIdx];
        patched[idx + 1] = patched[sampleIdx + 1];
        patched[idx + 2] = patched[sampleIdx + 2];
      }
    }
  }

  // 2. High-precision Lanczos3 upscale to 2560x1440 (2K QHD) with unsharp masking for crystal clarity
  const sharpPatched = sharp(patched, { raw: { width, height, channels } });

  console.log('Upscaling to 2560x1440 with Lanczos3 and unsharp mask...');
  const upscaled2k = sharpPatched
    .resize(2560, 1440, {
      kernel: sharp.kernel.lanczos3,
      fit: 'cover',
      position: 'right top'
    })
    .sharpen({
      sigma: 1.2,
      m1: 0.6,
      m2: 2.2
    })
    .modulate({
      brightness: 1.01,
      saturation: 1.06
    });

  // Write high quality PNG for lossless quality
  await upscaled2k.clone().png({ compressionLevel: 6 }).toFile(path.join(targetDir, 'hero_bg.png'));
  console.log('Saved public/images/hero_bg.png (2560x1440)');

  // Also write 4K WebP for ultra-fast high-res delivery
  await upscaled2k.clone().webp({ quality: 95, effort: 5 }).toFile(path.join(targetDir, 'hero_bg.webp'));
  console.log('Saved public/images/hero_bg.webp (2560x1440 WebP)');

  // Also generate 3840x2160 true 4K UHD version
  await sharp(patched, { raw: { width, height, channels } })
    .resize(3840, 2160, {
      kernel: sharp.kernel.lanczos3,
      fit: 'cover',
      position: 'right top'
    })
    .sharpen({
      sigma: 1.4,
      m1: 0.7,
      m2: 2.5
    })
    .modulate({
      brightness: 1.01,
      saturation: 1.06
    })
    .webp({ quality: 94, effort: 5 })
    .toFile(path.join(targetDir, 'hero_bg_4k.webp'));
  console.log('Saved public/images/hero_bg_4k.webp (3840x2160 True 4K)');

  console.log('Hero 4K generation complete!');
}

processHero4k().catch(err => {
  console.error('Processing error:', err);
  process.exit(1);
});
