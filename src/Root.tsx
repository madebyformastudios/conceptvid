import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {CastSheet} from './characters/CastSheet';
import {CastPose} from './characters/CastPose';
import {CastStyle} from './characters/RigChar';
import {RigSheet, RigExtras} from './characters/RigSheet';
import {totalFrames} from './timing';
import {FPS, W, H} from './theme';
import {printerInk} from './videos/printer-ink';
import {concertFees} from './videos/concert-fees';
import {yourPrice} from './videos/your-price';
import {YourPriceKit, CarPlane} from './videos/your-price/KitSheet';
import {KitSheet} from './videos/concert-fees/KitSheet';

// Props are serialized to JSON, so each video gets its own wrapper instead of passing `def` as a prop.
const YourPriceVideo: React.FC = () => <Video def={yourPrice} />;
const ConcertFeesVideo: React.FC = () => <Video def={concertFees} />;
const PrinterInkVideo: React.FC = () => <Video def={printerInk} />;

// Test: the first minute of the concert-fees video with the rigged-SVG cast.
const SAM_SVG_TEST_END = concertFees.aligned.find((a) => a.id === 's11')!.end;
const SamSvgTest: React.FC = () => (
  <CastStyle.Provider value={{rigged: true}}>
    <Video def={concertFees} />
  </CastStyle.Provider>
);

// Each video's length comes from its words.json (narration aligned by tools/align.py).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="YourPrice" component={YourPriceVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(yourPrice, FPS)} />
    <Composition id="ConcertFees" component={ConcertFeesVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(concertFees, FPS)} />
    <Composition id="SamSvgTest" component={SamSvgTest} fps={FPS} width={W} height={H} durationInFrames={Math.round(SAM_SVG_TEST_END * FPS)} />
    <Composition id="PrinterInk" component={PrinterInkVideo} fps={FPS} width={W} height={H} durationInFrames={totalFrames(printerInk, FPS)} />
    <Composition id="KitSheet" component={KitSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
    <Composition id="CastPose" component={CastPose} defaultProps={{who: 'sam' as const, pose: 'neutral'}} fps={FPS} width={560} height={720} durationInFrames={1} />
    <Composition id="CarPlane" component={CarPlane} fps={FPS} width={W} height={H} durationInFrames={1} />
    <Composition id="YourPriceKit" component={YourPriceKit} fps={FPS} width={W} height={H} durationInFrames={30} />
    <Composition id="RigExtras" component={RigExtras} fps={FPS} width={W} height={H} durationInFrames={1} />
    <Composition id="RigSheet" component={RigSheet} fps={FPS} width={W} height={H} durationInFrames={1} />
    <Composition id="CastSheet" component={CastSheet} fps={FPS} width={W} height={H} durationInFrames={30} />
  </>
);
