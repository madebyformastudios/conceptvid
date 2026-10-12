import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {CastSheet} from './characters/CastSheet';
import {CastPose} from './characters/CastPose';
import {CastStyle} from './characters/SvgSam';
import {SvgSamSheet} from './characters/SvgSamSheet';
import {totalFrames} from './timing';
import {FPS, W, H} from './theme';
import {printerInk} from './videos/printer-ink';
import {concertFees} from './videos/concert-fees';
import {KitSheet} from './videos/concert-fees/KitSheet';

// Props are serialized to JSON, so each video gets its own wrapper instead of passing `def` as a prop.
const ConcertFeesVideo: React.FC = () => <Video def={concertFees} />;
const PrinterInkVideo: React.FC = () => <Video def={printerInk} />;

// Test: the first minute of the concert-fees video with Sam drawn from the user's turnaround SVG.
const SAM_SVG_TEST_END = concertFees.aligned.find((a) => a.id === 's11')!.end;
const SamSvgTest: React.FC = () => (
  <CastStyle.Provider value={{samSvg: true}}>
    <Video def={concertFees} />
  </CastStyle.Provider>
);

// Each video's length comes from its words.json (narration aligned by tools/align.py).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ConcertFees" component={ConcertFeesVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(concertFees, FPS)} />
    <Composition id="SamSvgTest" component={SamSvgTest} fps={FPS} width={W} height={H} durationInFrames={Math.round(SAM_SVG_TEST_END * FPS)} />
    <Composition id="PrinterInk" component={PrinterInkVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(printerInk, FPS)} />
    <Composition id="KitSheet" component={KitSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
    <Composition id="CastPose" component={CastPose} defaultProps={{who: 'sam' as const, pose: 'neutral'}} fps={FPS} width={560} height={720} durationInFrames={1} />
    <Composition id="SvgSamSheet" component={SvgSamSheet} fps={FPS} width={W} height={H} durationInFrames={1} />
    <Composition id="CastSheet" component={CastSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
  </>
);
