# Handover: conceptvid (YouTube explainer videos)

Last updated 2026-10-11. Status: **the printer-ink video is finished and approved** ("This looks good"). Latest render: [release render-3](https://github.com/madebyformastudios/conceptvid/releases/tag/render-3).

## What this project is

The user makes YouTube explainer videos. They write the script and record the voiceover themselves; Claude builds the video in code (Remotion) and GitHub Actions renders it. The first video is *"Why is it that printer ink costs more than champagne?"* (3:10).

- Repo: https://github.com/madebyformastudios/conceptvid (public). Local checkout: `~/untitled folder 2/conceptvid`.
- Push access works over HTTPS from this Mac (no `gh` CLI installed; use `curl` against the GitHub API to read runs/releases).
- Pushing to `main` with changes under `src/`, `public/`, `package*.json` or the workflow triggers a render. Markdown-only commits do not.

## What the user wants (style, settled after three iterations)

1. **Flat CMYK "print shop" infographics** (cream paper, halftone dots, registration marks, cyan/magenta/yellow/ink palette, Archivo Black headlines, thick ink outlines, hard drop shadows). Kept from v1.
2. **Code-drawn cartoon characters acting inside the infographics**: round white heads, dot eyes, stick-ish limbs. **Every video uses the same two leads** (the user's rule):
   - **Sam** (`who="sam"`, friendly, mustard hoodie): the main character, standing in for the viewer, "you". Whenever the script says "you", it's Sam.
   - **Gerald** (`who="gerald"`, business suit, glasses, smug): the antagonist, whoever profits off the viewer in that video's story (company, industry, system).
   - Extras (scientist, salesman, cashier, crowd and so on) may support a scene but never take over these two roles.
3. **No AI-generated backgrounds or story scenes.** v2 put the puppets on Google Flow-generated cartoon sets; the user disliked the backgrounds. Do not bring them back unless asked.
4. Things must appear **on** the spoken word, not after it. The user noticed late cues before.
5. Sound effects must be **soft and quiet** under the voice. The user called the first set "too loud and too harsh".
6. The user said explicitly: **do not do TTS**, they supply the voiceover. And: **do not use existing skills** (e.g. the remotion skill); build things from scratch.
7. The user offered to generate images in Google Flow on request; the local `flow-mcp` server can drive Flow directly (see below), but the current style needs no generated images.

History: v1 (render-1) infographics only → v2 (render-2) puppets on Flow backgrounds, rejected for the backgrounds → v3 (render-3) infographics with the characters inside, approved.

## How the video is built

```
public/voiceover.mp3      user's narration (single file, starts at 0:00)
src/script.json           script split into 30 scenes (s01..s30), 9 chapters
src/words.json            per-scene start/end + timestamp of every script word (generated)
src/Video.tsx             timeline: paper background, voiceover, one Sequence per scene, chapter swipes
src/scenes/S1|S2|S3.tsx   the 30 scenes (S01..S30 map to s01..s30 via scenes/index.ts)
src/scenes/layout.ts      layout grid: TOP=130 headline band, FLOOR=935, presenter columns
src/components/Art.tsx    illustration kit: Printer, Cartridge, Drop, Page, Dialog, Tag, Stamp, Chip, Razor, ...
src/components/Frame.tsx  Paper bg, ChapterBadge, Headline (word pop, *highlight*), Label, Stage, PrintSwipe, Sfx
src/characters/           Rig (pose, face, line-boil filter), Toon (outfits + LOOKS cast), Actor (keyframes,
                          auto blink/breathe/walk, emotes, Cam), Props (held items), CastSheet (cast preview)
src/anim.ts               useBeat(): at('phrase') -> frame the narrator says it (minus LEAD=4 frames)
tools/align.py            whisper JSON -> src/words.json, with onset snapping to the real audio
tools/sfx.py              synthesizes public/sfx/*.wav (soft, sine-based, -14 dBFS peaks)
tools/stills.mjs          render one still per scene (or several with FRACS=0.4,0.9) for visual review
.github/workflows/render.yml  render -> loudnorm to -14 LUFS -> thumbnail frame -> GitHub Release render-N
```

### Timing model
- Inside a scene, `const {frame, fps, at} = useBeat();` then `at('out of cyan')` gives the frame of that phrase. The phrase must exist in that scene's text, or the render throws. `at(phrase, nth, offset)` exists for repeats and nudges.
- Cue on the **earliest** word that fits, and remember `pop()` springs need about 4 frames to read.
- Scene lengths come from `words.json` (cuts land in the pauses between sentences).

### Characters
- `<Actor who="sam" x y s keys=[{f, p:{...pose}, d, ease}] emotes=[{f, kind}] rHand={<Prop/>} flip enter />` inside a `<Stage>` (SVG).
- Pose fields: shoulders/elbows/hips/knees angles, lean, headTilt, lookX/Y, blink, mouth (smile/flat/o/open/frown/smirk/grin), brows (neutral/raised/oneUp/angry/sad/smug), talk, squash, x/y.
- Standard presenter: `s=0.62` at `PRESENTER.left` (250) or `.right` (1670), feet on `FLOOR`.
- Cast (`LOOKS` in Toon.tsx): sam, gerald, sommelier, salesman, scientist, cashier, judge, bouncer, worker, mail, librarian, exec, angry1-3.

### Audio
- SFX via `<Sfx name="pop|click|thud|error|ding|cash|whoosh" at={frame} volume={0.3..0.7} />`. Keep volumes in that range. CI normalizes the final mix to -14 LUFS.

## Everyday commands (run in `conceptvid/`)

```bash
npm ci                                   # once
npm run studio                           # live preview in the browser
npx tsc                                  # type-check (CI does this too)
node tools/stills.mjs out/stills 0.5 s05,s12      # end-of-scene stills for chosen scenes
FRACS=0.4,0.9 node tools/stills.mjs out/stills 0.5 s05   # several moments per scene
npx remotion render src/index.ts PrinterInk out/printer-ink.mp4 --crf=18   # full local render (~5 min)
npx remotion still src/index.ts CastSheet out/cast.png   # see the whole cast
```

Review workflow that worked well: render stills, tile them into contact sheets with ffmpeg `xstack`, look, fix coordinates, repeat. For timing, grab frames from the MP4 about 0.1 s after a word's timestamp in `words.json` and confirm the visual is already on screen.

## Making the next video

1. Put the new narration in `public/voiceover.mp3` and the script in `src/script.json` (scene ids, `chapter` on chapter openers, exact narration text).
2. Transcribe with word timing (whisper.cpp is installed as `whisper-cli`; get a model such as `ggml-base.en.bin` from huggingface.co/ggerganov/whisper.cpp; the old copy lived in a temporary scratchpad and may be gone):
   ```bash
   ffmpeg -i public/voiceover.mp3 -ar 16000 -ac 1 vo.wav
   whisper-cli -m ggml-base.en.bin -f vo.wav -ojf -ml 1 -sow -of vo
   python3 tools/align.py vo.json <video length in seconds, ~2.5 s past the last word>
   ```
   It reports how many script words matched (612/613 last time); fix script typos if many fail.
3. Write new scenes in `src/scenes/` (copy the patterns in S1-S3), then review with stills.
4. Rename the composition and output file if wanted (`Root.tsx` id `PrinterInk`, the workflow's output names).

## Google Flow / flow-mcp (only if generated images are ever needed again)

- `~/flow-mcp` is a local MCP server that drives flow.google.com in its own Chrome profile (CDP port 9333). It is now registered in Claude as the `flow` MCP (`mcp__flow__*` tools). Its Studio/HTTP API runs on 127.0.0.1:8787 (token in `~/.flow-mcp/token`, endpoints `POST /api/<tool>`).
- Images (Nano Banana Pro) cost 0 credits; video clips cost credits, so always ask the user first. Account: Pro plan, about 1,050 credits.
- **Uncommitted local patch** in `~/flow-mcp/src/flow.ts`: Flow renamed the character editor's "Done" button to "Finished editing"; both selectors were changed to `/^(Done( editing)?|Finished editing)$/` and the project rebuilt. It's not committed in that repo; tell the user, or commit it if they want.
- Flow paces generations about 2-3 minutes apart; 10 images take about 25 minutes.
- Flow characters were created in the user's Flow project: Sam, Gerald, Printer.

## Open items / ideas

- **Thumbnail**: the release's `thumbnail-frame.png` is just frame 95 (title card). A proper YouTube thumbnail has not been made; offer one (code-drawn with the cast, or a Flow prompt for the user).
- The `PrinterInk` composition id and file names are video-specific; generalize when starting video #2.
- `tools/stills.mjs` writes wherever you point it; `out/` is git-ignored.

## Memory

Claude's memory for this user lives in `~/.claude/projects/-Users-jlopes-untitled-folder-2/memory/` (style preferences and pipeline notes). Keep it in sync with this file.
