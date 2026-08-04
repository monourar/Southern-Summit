/**
 * Build-time image optimization pipeline.
 *
 * Reads full-resolution source photos from ./images and the logo from
 * ./public/logo.png, resizes them to the exact display dimensions used by the
 * site (1x + retina), and emits modern WebP + AVIF (with an optimized JPG
 * fallback) into ./public/images so Vite serves them verbatim.
 *
 * Any previously-deployed file inside ./public/images that is no longer
 * referenced (e.g. the *_1785* duplicates) is pruned.
 */
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'images');
const outDir = join(root, 'public', 'images');

// name -> display config. Widths are 1x and 2x retina variants for the
// largest layout breakpoint that uses each photo.
const PHOTOS = [
  { name: 'hero_cad_blueprint', widths: [768, 1376] },
  { name: 'hero_backyard_night', widths: [768, 1376] },
  { name: 'before_backyard', widths: [768, 1280] },
  { name: 'after_backyard', widths: [768, 1280] },
  { name: 'portfolio_1_highland', widths: [640, 1024] },
  { name: 'portfolio_2_culinary', widths: [640, 1024] },
];

// Fix 3: WebP quality lowered from 82 -> 72. Photography tolerates more
// compression than default settings assume at web display sizes; a visual
// spot-check at q72 showed no perceptible quality loss on these renders while
// cutting ~30-40% off each WebP payload.
const WEBP_QUALITY = 72;
const AVIF_QUALITY = 48;
const JPEG_QUALITY = 78;

async function emit(pipeline, file) {
  await pipeline.toFile(file);
  const size = (await stat(file)).size;
  console.log(`  ${file.replace(root + '\\', '').replace(root + '/', '')}  ${(size / 1024).toFixed(1)} KiB`);
}

async function optimizePhoto(name, widths) {
  const src = join(srcDir, `${name}.jpg`);
  if (!existsSync(src)) {
    console.warn(`  SKIP ${name}: missing source`);
    return;
  }
  for (const w of widths) {
    const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
    await emit(base.clone().webp({ quality: WEBP_QUALITY }), join(outDir, `${name}-${w}.webp`));
    await emit(base.clone().avif({ quality: AVIF_QUALITY }), join(outDir, `${name}-${w}.avif`));
    await emit(base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }), join(outDir, `${name}-${w}.jpg`));
  }
}

async function optimizeLogo() {
  // Fix 2: logo mark is displayed at 44px (w-11 h-11) in header + footer, with
  // the favicon rendering at 16/32px. 144px covers 44px @ 3x retina (132px) and
  // the favicon with headroom. The original high-res source lives in
  // ./images/logo.png; the script emits the resized PNG + WebP into ./public.
  const src = join(srcDir, 'logo.png');
  if (!existsSync(src)) {
    console.warn('  SKIP logo: missing source (./images/logo.png)');
    return;
  }
  const img = sharp(src).resize(144, 144, { fit: 'contain' });
  await emit(img.clone().webp({ quality: 88 }), join(root, 'public', 'logo.webp'));
  const png = await img.clone().png({ compressionLevel: 9, palette: true }).toBuffer();
  await writeFile(join(root, 'public', 'logo.png'), png);
  console.log(`  public/logo.png  ${(png.length / 1024).toFixed(1)} KiB`);
}

async function prune() {
  const keep = new Set();
  for (const { name, widths } of PHOTOS) {
    for (const w of widths) {
      keep.add(`${name}-${w}.webp`);
      keep.add(`${name}-${w}.avif`);
      keep.add(`${name}-${w}.jpg`);
    }
  }
  keep.add('logo.webp');
  keep.add('logo.png');
  const entries = await readdir(outDir);
  for (const entry of entries) {
    if (!keep.has(entry)) {
      const p = join(outDir, entry);
      await rm(p, { recursive: true, force: true });
      console.log(`  prune ${entry}`);
    }
  }
}

await mkdir(outDir, { recursive: true });
console.log('Optimizing photos...');
for (const { name, widths } of PHOTOS) {
  console.log(` ${name}`);
  await optimizePhoto(name, widths);
}
console.log('Optimizing logo...');
await optimizeLogo();
console.log('Pruning stale assets...');
await prune();
console.log('Done.');
