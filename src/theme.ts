import {loadFont as loadDisplay} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as loadBody} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const DISPLAY = loadDisplay('normal', {weights: ['400'], subsets: ['latin']}).fontFamily;
export const BODY = loadBody('normal', {weights: ['500', '700', '800'], subsets: ['latin']}).fontFamily;
export const MONO = loadMono('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily;

// Print-shop palette: paper, ink, and the four process colours.
export const C = {
  paper: '#F4EEE3',
  paperDark: '#E8DFD0',
  ink: '#1C1F3A',
  white: '#FFFFFF',
  cyan: '#12B5D9',
  magenta: '#E6337A',
  yellow: '#FFC83D',
  key: '#1C1F3A',
  green: '#2BB673',
  red: '#E9473B',
  gold: '#E8B04A',
  grey: '#9AA0B4',
  soft: '#CFC5B3',
};

export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const STROKE = 7;
export const SHADOW = `drop-shadow(10px 10px 0 ${C.ink})`;
