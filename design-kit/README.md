# Character kit: Sam & Gerald

Source art for thumbnails and other design work (e.g. Claude Design). Everything here is exported from
the same code that draws the characters in the videos (`src/characters/`), so it matches exactly.

## The cast

| | Sam | Gerald |
|---|---|---|
| Role | The friendly lead, stands in for the viewer ("you") | The antagonist: the company/industry profiting off the viewer |
| Look | Curly dark-brown hair, mustard hoodie, blue jeans, white sneakers | Slicked silver hair, glasses, navy pinstripe suit, red tie, black shoes |
| Personality | Curious, gets surprised and annoyed by fees | Smug, grinning, arms crossed; sweats when caught |

## Files

- `characters/<who>-<pose>-<right|left>.svg`: vectors, scalable to any size. `right` = looking/facing screen-right.
- `characters/png/<who>-<pose>.png`: transparent PNGs, 1120×1440, facing right.
- `cast-poses.png`: overview of all poses (Sam top row, Gerald bottom row).

Sam poses: neutral, happy, shocked, pointing, cheering, angry, sad, confused.
Gerald poses: smug, grinning, pointing, cheering, shrug, shocked, angry, nervous.

The feet sit at the bottom of the canvas with a soft ground shadow. Keep the figure whole (no stretching).

## Style rules (match the videos)

- **Look**: flat "print shop" infographic. Cream paper background, thick dark ink outlines, flat colour, hard offset drop shadows (about 9px down-right, solid ink). No gradients, no 3D, no photo elements.
- **Palette**
  - Paper `#F4EEE3`, darker paper `#E8DFD0`
  - Ink (outlines, text) `#1C1F3A`; character outline `#2B2A30`
  - Cyan `#12B5D9`, Magenta `#E6337A`, Yellow `#FFC83D`
  - Green `#2BB673`, Red `#E9473B`
  - Sam mustard `#D6A645`, Gerald navy `#2E3A5C`, Gerald tie `#B3263A`
- **Fonts**: headlines *Archivo Black*; labels *Inter* ExtraBold; small tags/receipts *JetBrains Mono* Bold (all Google Fonts).
- **Highlights**: key word in a headline gets a slanted marker swipe behind it (yellow, magenta or cyan).
- **Decoration**: a halftone dot wash in a corner is fine; no registration marks or colour bars.

## Thumbnail brief: "Why concert tickets come with so many fees"

- Sam on the left, **shocked**, staring at a giant checkout receipt or ticket: `$50` struck through, `$70.70` in red.
- Gerald on the right, **grinning** or **smug**, maybe holding a fat stack of fee tags.
- 2–4 words of big Archivo Black text, e.g. **"WHERE'S MY $20?"** or **"FEES. FEES. FEES."**, with one word highlighted in magenta.
- Cream background with a magenta/cyan halftone corner. Big shapes and high contrast so it reads at phone size.
