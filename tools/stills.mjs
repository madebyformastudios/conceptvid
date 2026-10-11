// Render one still per scene (near its end) for quick visual review.
// Usage: node tools/stills.mjs <outDir> [scale]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] ?? 'out/stills';
const scale = Number(process.argv[3] ?? 0.5);
const only = process.argv[4]?.split(',');
fs.mkdirSync(out, {recursive: true});
const words = JSON.parse(fs.readFileSync('src/words.json', 'utf8'));
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'PrinterInk'});
for (const s of words.scenes) {
  if (only && !only.includes(s.id)) continue;
  // FRACS=0.5,0.95 renders several moments per scene
  const fracs = (process.env.FRACS ?? '').split(',').filter(Boolean).map(Number);
  const frames = fracs.length ? fracs.map((f) => Math.round((s.start + (s.end - s.start) * f) * 30)) : [Math.round(s.end * 30) - 12];
  for (const [i, frame] of frames.entries()) {
    await renderStill({serveUrl, composition, frame, scale, output: path.join(out, fracs.length ? `${s.id}-${i}.png` : `${s.id}.png`)});
  }
  console.log(s.id, frames.join(','));
}
