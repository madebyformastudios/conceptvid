# conceptvid

Remotion project that turns the user's script + recorded voiceover into a YouTube explainer, rendered by GitHub Actions on push to `main`.

**Read `HANDOVER.md` first.** It has the settled visual style, the pipeline, commands, and open items.

Hard rules from the user:
- They record the voiceover; never generate TTS.
- Style = flat CMYK infographics with the code-drawn cast (Sam, Gerald) acting inside them. No AI-generated backgrounds or story scenes.
- Visuals land on the spoken word (`at('phrase')` in `useBeat`); sound effects stay soft (`<Sfx volume 0.3-0.7>`).
- Build things from scratch rather than using pre-made skills.
- Ask before anything that spends Google Flow credits (video generation).

Before pushing: `npx tsc`, then review stills with `node tools/stills.mjs <dir> 0.5 <scene ids>`.
