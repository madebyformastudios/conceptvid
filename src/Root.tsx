import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {CastSheet} from './characters/CastSheet';
import {ALIGNED} from './timing';
import {FPS, W, H} from './theme';

// Scene timing comes from src/words.json (narration aligned by tools/align.py).
const total = Math.round(ALIGNED[ALIGNED.length - 1].end * FPS);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PrinterInk" component={Video} fps={FPS} width={W} height={H} durationInFrames={total} />
    <Composition id="CastSheet" component={CastSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
  </>
);
