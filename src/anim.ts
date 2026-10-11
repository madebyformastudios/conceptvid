import {Easing, interpolate, spring} from 'remotion';
import {createContext, useContext} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const lerp = (f: number, input: number[], output: number[], ease = Easing.inOut(Easing.cubic)) =>
  interpolate(f, input, output, {...clamp, easing: ease});

export const ramp = (f: number, start: number, len = 12) => lerp(f, [start, start + len], [0, 1]);

export const pop = (f: number, fps: number, start: number, damping = 12) =>
  spring({frame: f - start, fps, config: {damping, stiffness: 170, mass: 0.7}});

export const soft = (f: number, fps: number, start: number) =>
  spring({frame: f - start, fps, config: {damping: 200}});

export const wobble = (f: number, amp = 1, speed = 0.08) => Math.sin(f * speed) * amp;

type Ctx = {text: string; duration: number; words: [number, number][]};
export const SceneCtx = createContext<Ctx>({text: '', duration: 1, words: []});

const LEAD = 4;

// Frame-accurate beats keyed to the script: at('cyan') -> frame the narrator says "cyan".
export const useBeat = () => {
  const {text, duration, words} = useContext(SceneCtx);
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const at = (phrase: string, nth = 0, offset = 0) => {
    let idx = -1;
    for (let i = 0; i <= nth; i++) idx = text.toLowerCase().indexOf(phrase.toLowerCase(), idx + 1);
    if (idx < 0) throw new Error(`Beat "${phrase}" not found in: ${text}`);
    let f = words[0]?.[1] ?? 0;
    for (const [c, t] of words) if (c <= idx) f = t;
    // Fire slightly early so a pop-in peaks on the word, not after it.
    return Math.max(0, f + offset - LEAD);
  };
  return {frame, fps, duration, at};
};
