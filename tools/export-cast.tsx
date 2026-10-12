// Export the two leads as standalone SVGs in a set of poses (for thumbnails / Claude Design).
// Usage: node_modules/.bin/esbuild tools/export-cast.tsx --bundle --platform=node --outfile=out/export-cast.cjs && node out/export-cast.cjs <outDir>
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import {Toon, LOOKS} from '../src/characters/Toon';
import {BASE} from '../src/characters/Rig';
import {POSES} from '../src/characters/poses';

const out = process.argv[2] ?? 'design-kit/characters';
fs.mkdirSync(out, {recursive: true});

// Origin is between the feet; the figure is ~600 units tall. Generous box so raised arms fit.
const VB = {x: -280, y: -680, w: 560, h: 720};

for (const who of ['sam', 'gerald'] as const) {
  for (const [name, p] of Object.entries(POSES[who])) {
    for (const facing of ['right', 'left'] as const) {
      const body = renderToStaticMarkup(
        <g transform={facing === 'left' ? 'scale(-1 1)' : undefined}>
          <Toon look={LOOKS[who]} pose={{...BASE, ...p}} />
        </g>,
      );
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" width="${VB.w}" height="${VB.h}">${body}</svg>\n`;
      fs.writeFileSync(path.join(out, `${who}-${name}-${facing}.svg`), svg);
    }
  }
}
console.log('wrote', fs.readdirSync(out).length, 'files to', out);
