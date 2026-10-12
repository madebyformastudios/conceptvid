// Transparent PNGs (1120x1440) of every pose in src/characters/poses.ts.
// Usage: node tools/export-cast-png.mjs [outDir]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] ?? 'design-kit/characters/png';
fs.mkdirSync(out, {recursive: true});
const src = fs.readFileSync('src/characters/poses.ts', 'utf8');
const names = (who) => [...src.split(`${who}: {`)[1].split('\n  },')[0].matchAll(/^\s{4}(\w+):/gm)].map((m) => m[1]);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const who of ['sam', 'gerald']) {
  for (const pose of names(who)) {
    const inputProps = {who, pose};
    const composition = await selectComposition({serveUrl, id: 'CastPose', inputProps});
    await renderStill({serveUrl, composition, inputProps, frame: 0, scale: 2, imageFormat: 'png', output: path.join(out, `${who}-${pose}.png`)});
    console.log(who, pose);
  }
}
