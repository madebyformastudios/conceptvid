import React from 'react';
import * as S1 from './S1';
import * as S2 from './S2';
import * as S3 from './S3';

// Scene components are named S01..S30 and map to script ids s01..s30.
export const SCENE_COMPONENTS: Record<string, React.FC> = Object.fromEntries(
  [S1, S2, S3]
    .flatMap((m) => Object.entries(m))
    .filter(([k]) => /^S\d\d$/.test(k))
    .map(([k, v]) => [`s${k.slice(1)}`, v as React.FC]),
);
