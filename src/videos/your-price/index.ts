import script from './script.json';
import words from './words.json';
import * as A from './scenes/A';
import * as B from './scenes/B';
import * as C from './scenes/C';
import * as D from './scenes/D';
import {VideoDef, asAligned, sceneMap} from '../../timing';

// "Is the internet charging you more than your friend?" (surveillance pricing).
// Sam is "you", Gerald is the pricing machine. Uses the user's rigged-SVG cast.
export const yourPrice: VideoDef = {
  audio: 'your-price/voiceover.mp3',
  scenes: script,
  aligned: asAligned(words),
  components: sceneMap(A, B, C, D),
  backdrop: 'halftone',
  rigged: true,
};
