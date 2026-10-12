import {Pose} from './Rig';

// Named poses for the two leads, used by tools/export-cast.tsx and the CastPose composition.
const ARMS = {
  rest: {lShoulder: 12, lElbow: -6, rShoulder: -12, rElbow: 6},
  shock: {lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80},
  point: {lShoulder: 12, lElbow: -6, rShoulder: -100, rElbow: 0},
  cheer: {lShoulder: 155, lElbow: -25, rShoulder: -155, rElbow: 25},
  hips: {lShoulder: 50, lElbow: -120, rShoulder: -50, rElbow: 120},
  shrug: {lShoulder: 60, lElbow: -120, rShoulder: -60, rElbow: 120},
  crossed: {lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100},
  raise: {lShoulder: 12, lElbow: -6, rShoulder: -165, rElbow: -10},
};

type P = Partial<Pose>;
export const POSES: Record<'sam' | 'gerald', Record<string, P>> = {
  sam: {
    neutral: {...ARMS.rest, mouth: 'smile', lookX: 1},
    happy: {...ARMS.rest, mouth: 'grin', brows: 'raised', lookX: 1},
    shocked: {...ARMS.shock, mouth: 'o', brows: 'raised'},
    pointing: {...ARMS.point, mouth: 'smile', brows: 'raised', lookX: 1},
    cheering: {...ARMS.cheer, mouth: 'grin', brows: 'raised'},
    angry: {...ARMS.hips, mouth: 'frown', brows: 'angry', lookX: 1},
    sad: {...ARMS.rest, mouth: 'frown', brows: 'sad', headTilt: 8},
    confused: {...ARMS.shrug, mouth: 'flat', brows: 'oneUp'},
  },
  gerald: {
    smug: {...ARMS.crossed, mouth: 'smirk', brows: 'smug', lookX: 1},
    grinning: {...ARMS.raise, mouth: 'grin', brows: 'smug', lookX: 1},
    pointing: {...ARMS.point, mouth: 'smile', brows: 'raised', lookX: 1},
    cheering: {...ARMS.cheer, mouth: 'grin', brows: 'smug'},
    shrug: {...ARMS.shrug, mouth: 'smirk', brows: 'smug'},
    shocked: {...ARMS.shock, mouth: 'o', brows: 'raised'},
    angry: {...ARMS.crossed, mouth: 'frown', brows: 'angry', lookX: 1},
    nervous: {...ARMS.rest, mouth: 'flat', brows: 'raised', lean: 4},
  },
};

