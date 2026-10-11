import React from 'react';
import * as A from './A';
import * as B from './B';
import * as Cc from './C';

const all = {...A, ...B, ...Cc} as Record<string, React.FC>;

export const SCENE_COMPONENTS: Record<string, React.FC> = Object.fromEntries(
  Object.entries(all)
    .filter(([k]) => /^S\d\d$/.test(k))
    .map(([k, v]) => [`s${k.slice(1)}`, v]),
);
