# Why does printer ink cost more than champagne?

A 2D infographic explainer built with [Remotion](https://remotion.dev). Every visual is drawn in code (SVG + React), with a flat print-shop look: paper, halftone dots, registration marks, and the four CMYK inks.

## How it works

| Piece | File |
| --- | --- |
| Narration | `public/voiceover.mp3` |
| Script, split into 30 scenes and 9 chapters | `src/script.json` |
| Word-level timestamps for the narration | `src/words.json` (made by `tools/align.py`) |
| Scenes | `src/scenes/A.tsx`, `B.tsx`, `C.tsx` |
| Illustration kit (printer, cartridges, chip…) | `src/components/Art.tsx` |
| Background, headlines, transitions, SFX | `src/components/Frame.tsx` |
| Synthesized sound effects | `public/sfx/*.wav` (made by `tools/sfx.py`) |

Animations are keyed to the narration. Inside a scene, `at('out of cyan')` returns the frame where the narrator says those words, so things pop in exactly on cue.

## Rendering

Push to `main`, or run **Actions → Render video → Run workflow**. The MP4 and a thumbnail frame are attached to a new GitHub Release (`render-N`) and also uploaded as a workflow artifact.

Locally:

```bash
npm ci
npm run studio      # live preview
npm run render      # out/printer-ink.mp4
```

## Swapping the voiceover

1. Replace `public/voiceover.mp3`.
2. Transcribe it with word timestamps using whisper.cpp:
   `whisper-cli -m ggml-base.en.bin -f vo.wav -ojf -ml 1 -sow -of vo` (feed it a 16 kHz mono WAV).
3. Run `python3 tools/align.py vo.json <total-seconds>`. This rewrites `src/words.json`, and every scene re-times itself.
