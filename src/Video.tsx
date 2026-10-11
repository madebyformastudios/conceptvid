import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Paper, ChapterBadge, PrintSwipe, SceneShell, Sfx} from './components/Frame';
import {SceneCtx} from './anim';
import {ALIGNED, SCENES, chapterIndex, chapterName} from './timing';
import {SCENE_COMPONENTS} from './scenes';

const SWIPE = 22;

export const Video: React.FC = () => {
  const {fps} = useVideoConfig();
  const starts = ALIGNED.map((a) => Math.round(a.start * fps));
  const ends = ALIGNED.map((a) => Math.round(a.end * fps));
  return (
    <AbsoluteFill>
      <Paper />
      <Audio src={staticFile('voiceover.mp3')} />
      {SCENES.map((s, i) => {
        const Comp = SCENE_COMPONENTS[s.id];
        const dur = ends[i] - starts[i];
        // Word timestamps relative to this scene, in frames.
        const words = ALIGNED[i].words.map(([c, t]) => [c, Math.round(t * fps) - starts[i]] as [number, number]);
        return (
          <Sequence key={s.id} from={starts[i]} durationInFrames={dur} name={`${s.id} ${s.text.slice(0, 32)}`}>
            <SceneCtx.Provider value={{text: s.text, duration: dur, words}}>
              <SceneShell duration={dur} last={i === SCENES.length - 1}>
                <Comp />
              </SceneShell>
            </SceneCtx.Provider>
            {chapterIndex(i) > 1 && i < SCENES.length - 1 && <ChapterBadge n={chapterIndex(i) - 1} name={chapterName(i)} start={0} />}
          </Sequence>
        );
      })}
      {SCENES.map((s, i) =>
        s.chapter && i > 0 ? (
          <Sequence key={`sw${s.id}`} from={starts[i] - Math.round(SWIPE / 2)} durationInFrames={SWIPE} name="print swipe">
            <PrintSwipe len={SWIPE} />
            <Sfx name="whoosh" at={0} volume={0.5} />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
