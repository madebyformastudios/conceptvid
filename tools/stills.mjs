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
  const frame = Math.round(s.end * 30) - 12;
  await renderStill({serveUrl, composition, frame, scale, output: path.join(out, `${s.id}.png`)});
  console.log(s.id, frame);
}
