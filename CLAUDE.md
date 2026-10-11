# conceptvid

Remotion project that turns the user's script + recorded voiceover into a YouTube explainer, rendered by GitHub Actions on push to `main`.

**Read `HANDOVER.md` first.** It has the settled visual style, the pipeline, commands, and open items.

Hard rules from the user:
- They record the voiceover; never generate TTS.
- Style = flat CMYK infographics with the code-drawn cast acting inside them. No AI-generated backgrounds or story scenes.
- Every video uses the same two leads: **Sam** (friendly, mustard hoodie) is the main character and stands for the viewer, "you". **Gerald** (business suit, glasses) is the antagonist: the company or industry profiting off the viewer. Extras may appear, but never replace these two roles.
- Visuals land on the spoken word (`at('phrase')` in `useBeat`); sound effects stay soft (`<Sfx volume 0.3-0.7>`).
- Build things from scratch rather than using pre-made skills.
- Ask before anything that spends Google Flow credits (video generation).

- Text near a character sits just above them; text in a container must fit it; props are held naturally; no decorative filler (registration marks, colour bars).
- Let the user preview in Remotion Studio before pushing (a push to main renders on GitHub).

Videos live in `src/videos/<name>/`; `.github/render-target` picks which one CI renders.
Before pushing: `npx tsc`, then review stills with `VIDEO=<name> node tools/stills.mjs <dir> 0.5 <scene ids>` and `tools/sheet.sh`.
