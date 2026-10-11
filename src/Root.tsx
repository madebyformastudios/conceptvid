import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {CastSheet} from './characters/CastSheet';
import {totalFrames} from './timing';
import {FPS, W, H} from './theme';
import {printerInk} from './videos/printer-ink';
import {concertFees} from './videos/concert-fees';
import {KitSheet} from './videos/concert-fees/KitSheet';

// Props are serialized to JSON, so each video gets its own wrapper instead of passing `def` as a prop.
const ConcertFeesVideo: React.FC = () => <Video def={concertFees} />;
const PrinterInkVideo: React.FC = () => <Video def={printerInk} />;

// Each video's length comes from its words.json (narration aligned by tools/align.py).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ConcertFees" component={ConcertFeesVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(concertFees, FPS)} />
    <Composition id="PrinterInk" component={PrinterInkVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(printerInk, FPS)} />
    <Composition id="KitSheet" component={KitSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
    <Composition id="CastSheet" component={CastSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
  </>
);
