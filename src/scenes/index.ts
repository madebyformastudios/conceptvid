import React from 'react';
import * as A from './A';
import * as B from './B';
import * as Cc from './C';
import * as T1 from '../toon/T1';
import * as T2 from '../toon/T2';
import * as T3 from '../toon/T3';

const pick = (mods: Record<string, unknown>[]) =>
  Object.fromEntries(
    mods.flatMap((m) => Object.entries(m)).filter(([k]) => /^S\d\d$/.test(k)).map(([k, v]) => [`s${k.slice(1)}`, v as React.FC]),
  );

// Cartoon (toon) scenes override the infographic originals where they exist.
export const SCENE_COMPONENTS: Record<string, React.FC> = {...pick([A, B, Cc]), ...pick([T1, T2, T3])};
