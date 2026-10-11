import script from './script.json';
import words from './words.json';
import * as A from "./scenes/A";
import * as B from "./scenes/B";
import * as C from "./scenes/C";
import * as D from "./scenes/D";
import {VideoDef, asAligned, sceneMap} from '../../timing';

// "Why is it that concert tickets come with so many fees?" — Sam is the fan, Gerald the ticket giant.
export const concertFees: VideoDef = {
  audio: 'concert-fees/voiceover.mp3',
  scenes: script,
  aligned: asAligned(words),
  components: sceneMap(A, B, C, D),
  backdrop: 'halftone',
};
