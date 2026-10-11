import script from './script.json';
import words from './words.json';
import * as S1 from './scenes/S1';
import * as S2 from './scenes/S2';
import * as S3 from './scenes/S3';
import {VideoDef, asAligned, sceneMap} from '../../timing';

// "Why is it that printer ink costs more than champagne?" (render-4, approved)
export const printerInk: VideoDef = {
  audio: 'printer-ink/voiceover.mp3',
  scenes: script,
  aligned: asAligned(words),
  components: sceneMap(S1, S2, S3),
};
