import script from './script.json';
import aligned from './words.json';

export type SceneDef = {id: string; chapter?: string; text: string};
export const SCENES = script as SceneDef[];

type Aligned = {id: string; start: number; end: number; words: [number, number][]};
export const ALIGNED = (aligned as unknown as {total: number; scenes: Aligned[]}).scenes;

export const chapterIndex = (i: number) => {
  let n = 0;
  for (let k = 0; k <= i; k++) if (SCENES[k].chapter) n++;
  return n;
};

export const chapterName = (i: number) => {
  for (let k = i; k >= 0; k--) if (SCENES[k].chapter) return SCENES[k].chapter!;
  return '';
};
