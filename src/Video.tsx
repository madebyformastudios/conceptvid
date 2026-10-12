import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Backdrop, ACCENTS} from './components/Backdrop';
import {Paper, ChapterBadge, PrintSwipe, SceneShell, Sfx} from './components/Frame';
import {SceneCtx} from './anim';
import {CastStyle} from './characters/RigChar';
import {C, BODY, MONO} from './theme';
import {VideoDef, chapterIndex} from './timing';

const SWIPE = 22;

/* Stand-in for a scene that hasn't been built yet. */
const Draft: React.FC<{id: string; text: string}> = ({id, text}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 200, fontFamily: BODY, fontWeight: 700, fontSize: 44, color: C.ink, textAlign: 'center', opacity: 0.6}}>
    <div style={{fontFamily: MONO, fontSize: 28, marginBottom: 24}}>{id.toUpperCase()} · DRAFT</div>
    {text}
  </AbsoluteFill>
);

/* Timeline shared by every video: paper, narration, one Sequence per scene, chapter swipes. */
export const Video: React.FC<{def: VideoDef}> = ({def}) => {
  const {fps} = useVideoConfig();
  const {scenes, aligned, components} = def;
  const starts = aligned.map((a) => Math.round(a.start * fps));
  const ends = aligned.map((a) => Math.round(a.end * fps));
  return (
    <CastStyle.Provider value={{rigged: !!def.rigged}}>
    <AbsoluteFill>
      {def.backdrop === 'halftone' ? (
        scenes.map((s, i) => {
          if (i > 0 && !s.chapter) return null;
          const next = scenes.findIndex((t, k) => k > i && t.chapter);
          const to = next < 0 ? ends[ends.length - 1] : starts[next];
          const [a, b] = ACCENTS[(chapterIndex(scenes, i) - 1) % ACCENTS.length];
          return (
            <Sequence key={`bg${s.id}`} from={starts[i]} durationInFrames={to - starts[i]} name={`backdrop ${s.chapter ?? ''}`}>
              <Backdrop accent={a} second={b} />
            </Sequence>
          );
        })
      ) : (
        <Paper />
      )}
      <Audio src={staticFile(def.audio)} />
      {scenes.map((s, i) => {
        const Comp = components[s.id];
        const dur = ends[i] - starts[i];
        // Word timestamps relative to this scene, in frames.
        const words = aligned[i].words.map(([c, t]) => [c, Math.round(t * fps) - starts[i]] as [number, number]);
        const ch = chapterIndex(scenes, i);
        return (
          <Sequence key={s.id} from={starts[i]} durationInFrames={dur} name={`${s.id} ${s.text.slice(0, 32)}`}>
            <SceneCtx.Provider value={{text: s.text, duration: dur, words}}>
              <SceneShell duration={dur} last={i === scenes.length - 1}>
                {Comp ? <Comp /> : <Draft text={s.text} id={s.id} />}
              </SceneShell>
            </SceneCtx.Provider>
          </Sequence>
        );
      })}
      {scenes.map((s, i) => {
        if (!s.chapter || i === 0) return null;
        const next = scenes.findIndex((t, k) => k > i && t.chapter);
        const to = next < 0 ? starts[scenes.length - 1] : starts[next];
        return (
          <Sequence key={`badge${s.id}`} from={starts[i]} durationInFrames={Math.max(1, to - starts[i])} name={`chapter badge ${s.chapter}`}>
            <ChapterBadge n={chapterIndex(scenes, i) - 1} name={s.chapter} start={0} />
          </Sequence>
        );
      })}
      {scenes.map((s, i) =>
        s.chapter && i > 0 ? (
          <Sequence key={`sw${s.id}`} from={starts[i] - Math.round(SWIPE / 2)} durationInFrames={SWIPE} name="print swipe">
            <PrintSwipe len={SWIPE} />
            <Sfx name="whoosh" at={0} volume={0.5} />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
    </CastStyle.Provider>
  );
};
