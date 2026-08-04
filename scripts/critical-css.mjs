/**
 * Post-build: inline critical above-the-fold CSS into dist/index.html.
 *
 * Extracts @font-face, :root, html/body reset, and any rule whose selector
 * contains a className token found in hero/header source files. The remaining
 * CSS is kept as an external stylesheet but loaded non-render-blocking via
 * the "preload + onload" pattern with a noscript fallback.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const assetsDir = join(distDir, 'assets');

const ABOVE_FOLD = [
  'src/App.tsx',
  'src/components/layout/Header.tsx',
  'src/components/hero/WebGLHero.tsx',
  'src/components/common/ImageComparisonSlider.tsx',
  'src/components/common/Reveal.tsx',
  'src/components/common/CustomCursor.tsx',
  'src/styles/index.css',
];

function gatherTokens() {
  const tokens = new Set();
  const always = ['html','body','*','container',':root','grain-overlay','scrollbar-none',
                  'header','hero','btn-primary','btn-outline','eyebrow','section-title',
                  'snap-section','fixed','absolute','relative','flex','inline-flex','grid',
                  'block','inline','hidden','z-','top-','left-','w-full','h-full','pt-',
                  'pb-','px-','py-','mt-','mb-','text-','font-','bg-','border-','rounded-',
                  'shadow-','leading-','tracking-','text-xs','text-sm','text-base','text-lg',
                  'text-xl','overflow-hidden','justify-','items-','transition-','hover:']
  for (const t of always) tokens.add(t);

  for (const fp of ABOVE_FOLD) {
    const raw = readFileSync(join(root, fp), 'utf-8');
    const matches = raw.matchAll(/className="([^"]+)"/g);
    for (const m of matches) {
      for (const tok of m[1].split(/\s+/)) {
        if (tok && tok.length > 1) tokens.add(tok);
      }
    }
  }
  return tokens;
}

function main() {
  const assets = readdirSync(assetsDir);
  const cssName = assets.find(f => f.startsWith('index-') && f.endsWith('.css'));
  if (!cssName) throw new Error('No entry CSS found in dist/assets');
  const cssPath = join(assetsDir, cssName);
  const rawCss = readFileSync(cssPath, 'utf-8');
  const tokens = gatherTokens();
  console.log(`critical-css: ${tokens.size} critical tokens`);

  const parsed = postcss.parse(rawCss);
  const criticalNodes = [];

  for (const node of parsed.nodes) {
    if (node.type === 'atrule') {
      if (['font-face', 'keyframes', 'import'].includes(node.name)) { criticalNodes.push(node); }
      continue;
    }
    if (node.type === 'rule') {
      const sel = node.selector;
      if (/^(html|body|\*|:root|::before|::after)/.test(sel.trim())) { criticalNodes.push(node); continue; }
      let matched = false;
      for (const tok of tokens) {
        const clean = tok.replace(/^[-[\]\\]+|[[\]\\-]+$/g, '').replace(/[\\\[\]\/{}():|@,!]/g, '');
        if (clean && sel.includes(clean)) { matched = true; break; }
      }
      if (matched) criticalNodes.push(node);
    }
  }

  const criticalSrc = criticalNodes.map(n => n.toString()).join('\n');
  console.log(`critical-css: ${criticalSrc.length} B inline from ${rawCss.length} B total`);

  let html = readFileSync(join(distDir, 'index.html'), 'utf-8');
  const re = /<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+\.css)"\s*\/?>/;
  const match = html.match(re);
  if (!match) throw new Error('Could not find stylesheet link in dist/index.html');
  const cssHref = match[1];

  html = html.replace(re,
    `<style>${criticalSrc}</style>\n` +
    `    <link rel="preload" as="style" href="${cssHref}" onload="this.onload=null;this.rel='stylesheet'" crossorigin />\n` +
    `    <noscript><link rel="stylesheet" href="${cssHref}" crossorigin /></noscript>`
  );

  writeFileSync(join(distDir, 'index.html'), html, 'utf-8');
  console.log('critical-css: index.html updated');
}

main();