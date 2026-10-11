import React from 'react';

// One video = narration + script split into scenes + word timings + a component per scene.
export type SceneDef = {id: string; chapter?: string; text: string};
export type Aligned = {id: string; start: number; end: number; words: [number, number][]};
export type VideoDef = {
  audio: string; // file in public/
  scenes: SceneDef[];
  aligned: Aligned[];
  components: Record<string, React.FC>;
  backdrop?: 'paper' | 'halftone'; // 'paper' = printer-ink look; 'halftone' = newer look with chapter accents
};

export const asAligned = (json: unknown) => (json as {total: number; scenes: Aligned[]}).scenes;

// Scene components are named S01..Snn and map to script ids s01..snn.
export const sceneMap = (...mods: Record<string, unknown>[]): Record<string, React.FC> =>
  Object.fromEntries(
    mods
      .flatMap((m) => Object.entries(m))
      .filter(([k]) => /^S\d\d$/.test(k))
      .map(([k, v]) => [`s${k.slice(1)}`, v as React.FC]),
  );

export const chapterIndex = (scenes: SceneDef[], i: number) => {
  let n = 0;
  for (let k = 0; k <= i; k++) if (scenes[k].chapter) n++;
  return n;
};

export const chapterName = (scenes: SceneDef[], i: number) => {
  for (let k = i; k >= 0; k--) if (scenes[k].chapter) return scenes[k].chapter!;
  return '';
};

export const totalFrames = (v: VideoDef, fps: number) => Math.round(v.aligned[v.aligned.length - 1].end * fps);
