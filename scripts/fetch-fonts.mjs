/**
 * One-shot self-hosting fetcher for Google Fonts.
 *
 * Downloads the latin-subset woff2 files currently used by the site
 * (Cormorant Garamond 400/500/600/700 + italic 400, Plus Jakarta Sans
 * 300/400/500/600/700) into ./public/fonts and emits the matching
 * @font-face CSS to scripts/fonts.css for review.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'fonts');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const cssUrl =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';

const res = await fetch(cssUrl, { headers: { 'User-Agent': UA } });
const css = await res.text();

const blocks = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((m) => m[1]);

const slug = (family) => family.toLowerCase().replace(/\s+/g, '-');

await mkdir(outDir, { recursive: true });

let generated = '';
let total = 0;

for (const block of blocks) {
  const get = (prop) => {
    const m = block.match(new RegExp(`${prop}:\\s*([^;]+);`));
    return m ? m[1].trim() : '';
  };
  const family = get('font-family');
  const style = get('font-style') || 'normal';
  const weight = get('font-weight') || '400';
  const srcUrl = block.match(/url\(([^)]+)\)/)?.[1];
  const unicode = get('unicode-range');

  // Keep only the latin subset — the site is English-only.
  if (!unicode || !/U\+0000-00FF/.test(unicode)) continue;
  if (!srcUrl) continue;

  const fam = family.replace(/['"]/g, '');
  const isItalic = style === 'italic';
  const file = `${slug(fam)}${isItalic ? '-italic' : ''}-${weight}.woff2`;
  const dest = join(outDir, file);

  const buf = await fetch(srcUrl).then((r) => r.arrayBuffer());
  await writeFile(dest, Buffer.from(buf));
  const kb = (buf.byteLength / 1024).toFixed(1);
  total += buf.byteLength;
  console.log(`  ${file}  ${kb} KiB`);

  generated += `@font-face {
  font-family: '${fam}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${file}') format('woff2');
}
`;
}

await writeFile(join(root, 'scripts', 'fonts.css'), generated, 'utf8');
console.log(`\n${blocks.length} latin @font-face blocks → ${total / 1024} KiB total. CSS written to scripts/fonts.css`);
