"""Shot list for the cartoon cut: one illustrated still per shot, cut on a spoken word.

Each shot: id, cue (scene id, phrase that starts the shot), refs (Flow characters), move (camera), prompt.
`python3 shots/shots.py flow`  -> JSON scenes for flow_generate
`python3 shots/shots.py remotion` -> src/shots.json for the video
"""
import json, sys
from pathlib import Path

STYLE = (
    "Style: hand-drawn 2D cartoon illustration, a storyboard panel from a narrative YouTube animated documentary. "
    "Characters have large perfectly round white heads, small black dot eyes, simple expressive eyebrows, small simple mouths, "
    "no noses, no ears, thin black stick arms and legs with small round white hands. Bold dark charcoal outlines with slightly "
    "uneven hand-drawn line weight, flat muted desaturated colours with soft cel shading, subtle paper grain texture, gentle "
    "vignette, cinematic lighting. Detailed but simple illustrated background. Widescreen 16:9 composition."
)
NO_TEXT = "No text, letters or numbers anywhere in the image."

SAM = "Sam (young adult, round white head, messy dark-brown hair, mustard-yellow hoodie, dark blue jeans, white sneakers)"
GERALD = "Gerald (smug printer-company executive, round white head, slicked-back silver hair, small rectangular black glasses, navy pinstripe three-piece suit, crimson tie)"
PRINTER = "the printer (boxy off-white and warm-grey home inkjet printer with a small dark LCD screen on the right and two round buttons)"


def text(*words):
    quoted = ", ".join(f'"{w}"' for w in words)
    return f"The only text in the image is {quoted}, hand-lettered in a casual comic handwriting font, spelled exactly. No other text."


SHOTS = [
    # --- Intro
    dict(id="01", cue=("s01", "why"), refs=[], move="push",
         prompt=f"A tiny printer ink cartridge displayed like a priceless jewel on a red velvet pedestal under a museum spotlight, inside a dim luxury wine cellar; rows of dusty vintage champagne bottles on wooden racks in the background look small and ordinary by comparison. Low-angle hero shot. {NO_TEXT}"),
    dict(id="02", cue=("s02", "you need"), refs=["Sam", "Printer"], move="pan-right",
         prompt=f"{SAM} sits at a cluttered home desk late at night, lit by a laptop screen, looking hopefully at {PRINTER} on the desk beside him. A mug, sticky notes, a desk lamp. Medium-wide shot. {NO_TEXT}"),
    dict(id="03", cue=("s02", "boarding pass"), refs=["Sam"], move="push",
         prompt=f"Over-the-shoulder close-up of {SAM} looking at a laptop screen that shows an airline boarding pass with a barcode. Warm lamp light. {text('BOARDING PASS')}"),
    dict(id="04", cue=("s02", "contract"), refs=["Sam"], move="pan-left",
         prompt=f"{SAM} signs a very thick stack of contract paper with a pen, eyes half-closed and bored, clearly not reading a single word; the pile is taller than his head. Medium shot, desk at night. {NO_TEXT}"),
    dict(id="05", cue=("s03", "you press"), refs=["Printer"], move="push",
         prompt=f"Extreme close-up of a round white cartoon finger pressing the green print button on {PRINTER}. Dramatic shallow focus, desk-lamp glow. {NO_TEXT}"),
    dict(id="06", cue=("s03", "tells you"), refs=["Printer"], move="shake",
         prompt=f"Close-up of the small LCD screen on {PRINTER} glowing red with a blinking warning icon and a cyan ink-drop symbol with a red cross. Dark room, ominous red glow. {text('OUT OF CYAN')}"),
    dict(id="07", cue=("s04", "you're"), refs=["Sam"], move="push",
         prompt=f"Close-up of {SAM} staring straight at the viewer with a completely deadpan, unimpressed expression, one eyebrow raised, holding up a plain black-and-white printed page. Plain grey background with spotlight. {NO_TEXT}"),
    # --- The numbers
    dict(id="08", cue=("s05", "let's start"), refs=["Sam"], move="pan-right",
         prompt=f"{SAM} peers through a big magnifying glass at a tiny ink cartridge sitting on a desk; its price tag is enormous compared to the cartridge. Medium close-up, bright desk lamp. {NO_TEXT}"),
    dict(id="09", cue=("s05", "vintage champagne"), refs=[], move="push",
         prompt=f"A snobbish sommelier character with a round white head, thin moustache, black waistcoat and bow tie, carefully pouring glossy cyan printer ink from an ink cartridge into a crystal champagne flute in an elegant candle-lit wine cellar, tasting card on the table. Medium shot. {NO_TEXT}"),
    dict(id="10", cue=("s05", "luxury perfumes"), refs=[], move="pan-left",
         prompt=f"An upscale perfume boutique shelf with elegant glass perfume bottles on mirrored glass; in the middle, on the highest gold pedestal with its own spotlight and a velvet rope, sits a humble printer ink cartridge. Store interior, soft warm light. {NO_TEXT}"),
    dict(id="11", cue=("s06", "consumer"), refs=[], move="push",
         prompt=f"Three consumer-rights researchers with round white heads, white lab coats and clipboards, standing in a testing lab in front of a row of beakers holding gold liquid, perfume, champagne and dark cyan ink, frowning and comparing them; a whiteboard behind them shows a bar chart where one bar is far taller than the rest. {NO_TEXT}"),
    dict(id="12", cue=("s07", "ink isn't"), refs=[], move="push",
         prompt=f"A chemist with a round white head, safety goggles pushed up and a white lab coat, holding up a beaker of blue ink to the light with a completely unimpressed, bored expression. Simple lab background, cool light. {NO_TEXT}"),
    dict(id="13", cue=("s07", "mostly water"), refs=[], move="pan-right",
         prompt=f"Factory scene: a worker with a round white head and a hard hat pours an ordinary garden hose of tap water into a huge steel vat, while another adds a single small spoonful of blue dye and a dropper of chemicals. Industrial background, pipes. {NO_TEXT}"),
    dict(id="14", cue=("s08", "so why"), refs=["Sam"], move="push",
         prompt=f"Supermarket checkout: {SAM} stands at the till holding a single tiny ink cartridge, next to an overflowing shopping cart of a whole week of groceries (bread, vegetables, milk, cereal). The cashier with a round white head stares at the cartridge with shock. Bright supermarket light. {NO_TEXT}"),
    # --- Razors and blades
    dict(id="15", cue=("s09", "to understand"), refs=[], move="pan-left",
         prompt=f"Sepia-tinted old-timey 1900s barbershop: a moustached salesman with a round white head, straw boater hat and striped jacket proudly holds up a shiny safety razor to a small crowd. Vintage atmosphere, warm sepia tones. {NO_TEXT}"),
    dict(id="16", cue=("s10", "you sell"), refs=[], move="push",
         prompt=f"Sepia-tinted 1900s street: the moustached salesman with a round white head and boater hat happily hands out free razors from a wooden cart to passers-by. {text('FREE RAZORS')}"),
    dict(id="17", cue=("s10", "make your money"), refs=[], move="pull",
         prompt=f"Sepia-tinted 1900s scene: a customer with a round white head is buried up to the neck under a mountain of small replacement razor-blade boxes, while the moustached salesman in a boater hat sits behind him at a desk happily counting a big pile of banknotes and coins. {NO_TEXT}"),
    dict(id="18", cue=("s11", "printer companies"), refs=["Gerald", "Printer"], move="push",
         prompt=f"A glossy modern corporate boardroom: {GERALD} proudly unveils {PRINTER} on a pedestal, pulling off a cloth, while executives with round white heads around the long table applaud; behind him a whiteboard shows a simple sketch of a razor with an arrow pointing to a printer. {NO_TEXT}"),
    dict(id="19", cue=("s12", "that printer"), refs=["Sam"], move="pan-right",
         prompt=f"Electronics store aisle: {SAM} happily grabs a printer box from a shelf; a huge bright yellow price tag hangs from the box. Bright retail lighting. {text('$49')}"),
    dict(id="20", cue=("s12", "barely break even"), refs=["Gerald"], move="push",
         prompt=f"{GERALD} sits relaxed in a leather office chair, feet on his desk, looking at a big wall screen showing a line chart that drops to zero, and he is smiling and shrugging, not worried at all. Dim office, screen glow. {NO_TEXT}"),
    dict(id="21", cue=("s13", "because"), refs=["Sam", "Gerald"], move="push",
         prompt=f"Dramatic dark stage with a single spotlight: {SAM} stands awkwardly in the light with a giant price tag hanging from a string around his neck, while {GERALD} leans in from the shadows inspecting him through a magnifying glass with a greedy smile. {NO_TEXT}"),
    # --- Starter cartridges
    dict(id="22", cue=("s14", "and it gets"), refs=["Sam", "Printer"], move="pan-left",
         prompt=f"{SAM} happily unboxing a brand-new {PRINTER} on the living room floor among foam and cardboard, holding up a small ink cartridge with a cheerful sticker on it. Cosy living room, daylight. {text('STARTER')}"),
    dict(id="23", cue=("s14", "look exactly"), refs=[], move="push",
         prompt=f"A scientist with a round white head holds two identical ink cartridges up to a glowing X-ray lightbox; the X-ray reveals the left cartridge is almost empty inside with only a thin layer of ink, while the right one is completely full. Dark lab, blue lightbox glow. {NO_TEXT}"),
    dict(id="24", cue=("s15", "so the first"), refs=["Sam", "Printer"], move="shake",
         prompt=f"{SAM} looks shocked at {PRINTER}, whose screen glows red with an empty ink-drop icon; on the wall behind him a paper calendar shows only the third day of the month circled. {NO_TEXT}"),
    dict(id="25", cue=("s15", "coincidentally"), refs=["Gerald"], move="push",
         prompt=f"{GERALD} stands behind a shop counter stacked high with ink cartridges, giving a sly wink to the viewer and rubbing his hands together while a cash register drawer full of money pops open. Warm shop light. {NO_TEXT}"),
    # --- The chip
    dict(id="26", cue=("s16", "now, you"), refs=["Sam", "Gerald"], move="pan-right",
         prompt=f"Store aisle: {SAM} reaches with a pleased smile for a plain cheap generic ink cartridge box on a lower shelf, while {GERALD} secretly peeks around the end of the shelf behind him with narrowed eyes. {NO_TEXT}"),
    dict(id="27", cue=("s17", "small chip"), refs=[], move="push",
         prompt=f"Extreme macro close-up of the back of an ink cartridge showing a tiny gold microchip with glowing cyan circuit traces, like a sci-fi security device, dramatic rim light. {NO_TEXT}"),
    dict(id="28", cue=("s17", "unofficially"), refs=[], move="pan-left",
         prompt=f"Cutaway inside a printer drawn like a nightclub entrance: a tiny stern security bouncer with a round white head, black t-shirt, earpiece and clipboard checks the ID of a nervous little ink cartridge waiting at a velvet rope, while a queue of cartridges waits behind. Moody purple light. {NO_TEXT}"),
    dict(id="29", cue=("s18", "reject"), refs=[], move="shake",
         prompt=f"Inside the printer, the stern bouncer with a round white head points firmly away while a cheap generic ink cartridge with a sad little face is tossed out of the doorway. Moody purple light, comedic. {NO_TEXT}"),
    dict(id="30", cue=("s18", "warnings"), refs=["Sam"], move="push",
         prompt=f"{SAM} sits at a computer whose screen is completely buried under dozens of overlapping red and yellow warning pop-up windows with exclamation icons; his face is lit red, exhausted. Dark room. {NO_TEXT}"),
    # --- Firmware
    dict(id="31", cue=("s19", "in some cases"), refs=["Sam", "Printer"], move="pan-right",
         prompt=f"Happy cosy scene: {SAM} smiling and holding a freshly printed page next to {PRINTER}, which is printing happily with a cheap generic cartridge visible inside; warm afternoon light through a window. {NO_TEXT}"),
    dict(id="32", cue=("s19", "firmware update"), refs=[], move="push",
         prompt=f"Ominous close-up of a laptop screen in a dark room showing a software update progress bar almost full, with a gear icon; the cold blue glow is the only light, thunderstorm flash in the window behind. {text('UPDATING FIRMWARE...')}"),
    dict(id="33", cue=("s19", "worse"), refs=["Sam", "Printer"], move="shake",
         prompt=f"{PRINTER} angrily spits the cheap generic ink cartridge out across the room, motion lines; {SAM} recoils in shock with his hands up. Dark room lit by the printer's red screen. {NO_TEXT}"),
    dict(id="34", cue=("s20", "lawsuits"), refs=["Gerald"], move="push",
         prompt=f"Courtroom: {GERALD} sits at the defendant's table sweating nervously and loosening his crimson tie, while a stern judge with a round white head and black robes raises a wooden gavel high. Wood-panelled courtroom, warm light. {NO_TEXT}"),
    dict(id="35", cue=("s20", "angry people"), refs=[], move="pan-left",
         prompt=f"A grid of many small home desks seen from above, each with an angry person with a round white head furiously typing at a computer, steam coming from their heads, red angry speech bubbles with scribbled symbols floating up. Chaotic, comedic. {NO_TEXT}"),
    dict(id="36", cue=("s21", "some all-in-one"), refs=["Sam"], move="push",
         prompt=f"{SAM} stands at an all-in-one printer-scanner with the scanner lid open and a document on the glass, looking confused at its small screen showing an empty ink-drop icon. Home office, daylight. {text('INK LOW - CANNOT SCAN')}"),
    dict(id="37", cue=("s22", "that's like"), refs=["Sam"], move="pan-right",
         prompt=f"Inside a car at dusk: {SAM} in the driver's seat stares in disbelief at the dashboard, where an orange low-fuel light glows and the car radio display shows a red message. Through the windscreen, an empty road. {text('LOW FUEL - NO MUSIC')}"),
    # --- Subscriptions
    dict(id="38", cue=("s23", "and now"), refs=["Gerald"], move="push",
         prompt=f"Epic final-boss reveal: {GERALD} rises from swirling dark smoke in a dramatic low-angle shot, holding up a glowing golden contract scroll with both hands, lightning crackling behind him, red and purple light. {text('INK SUBSCRIPTION')}"),
    dict(id="39", cue=("s23", "new ink arrives"), refs=["Sam"], move="pan-left",
         prompt=f"Sunny doorstep: a cheerful mail carrier with a round white head and a blue cap hands a small cardboard parcel to {SAM}, who smiles happily in his doorway; a printer is visible in the hallway behind. {NO_TEXT}"),
    dict(id="40", cue=("s24", "until you cancel"), refs=["Sam"], move="push",
         prompt=f"Over-the-shoulder shot of {SAM} at a laptop, clicking a big red cancel button with the cursor, small nervous sweat drop on his head. Dim evening room. {text('CANCEL SUBSCRIPTION')}"),
    dict(id="41", cue=("s24", "stop working"), refs=["Printer"], move="shake",
         prompt=f"{PRINTER} wrapped tightly in heavy iron chains with a huge brass padlock on the front; its small screen glows red. Dark room, harsh spotlight from above. {NO_TEXT}"),
    dict(id="42", cue=("s24", "you never owned"), refs=["Gerald"], move="push",
         prompt=f"{GERALD} holds up a single ink cartridge like a landlord holding keys, with a little paper tag tied to it, smirking. Dim office with a window at night. {text('RENTED')}"),
    # --- The trap
    dict(id="43", cue=("s25", "so why"), refs=[], move="tilt-down",
         prompt=f"Giant iceberg cross-section in a calm sea: above the waterline only a small printer box with a small price tag; below the water a massive pile of hundreds of ink cartridges fills the huge underwater part of the iceberg. Clear blue water, overcast sky. {NO_TEXT}"),
    dict(id="44", cue=("s26", "and once"), refs=["Sam"], move="pan-right",
         prompt=f"{SAM} slumped in a comfy armchair looking up at a towering steep mountain with a new printer tiny at the very top, while a single ink cartridge sits within easy reach on the side table next to him. Golden evening light. {NO_TEXT}"),
    dict(id="45", cue=("s26", "brilliant trap"), refs=["Sam"], move="push",
         prompt=f"A giant wooden mousetrap seen from the side, with an ink cartridge placed on it as the bait like cheese; {SAM} tiptoes towards it, drawn by it. Dramatic top light, dark background. {NO_TEXT}"),
    # --- The way out
    dict(id="46", cue=("s27", "there is hope"), refs=["Sam"], move="push",
         prompt=f"Sunrise breaking through the window: {SAM} smiling with relief as he refills a modern ink-tank printer from a large bottle of ink, warm golden light rays filling the room. {NO_TEXT}"),
    dict(id="47", cue=("s27", "laser printers"), refs=[], move="pan-left",
         prompt=f"A sleek office laser printer rapidly shooting out a big stack of black-and-white pages, motion lines, a happy office worker with a round white head catching them. Bright clean office. {NO_TEXT}"),
    dict(id="48", cue=("s27", "library"), refs=["Sam"], move="pan-right",
         prompt=f"A cosy public library with tall wooden bookshelves and warm lamps: {SAM} picks up a printed page from the library's public printer, while a friendly librarian with a round white head, cardigan and glasses waves from the desk. {NO_TEXT}"),
    dict(id="49", cue=("s28", "the real lesson"), refs=["Sam", "Gerald"], move="push",
         prompt=f"Detective scene: {SAM} wearing a detective hat inspects a tiny cheap price tag through a magnifying glass, and follows a long trail of gold coins on the floor that leads to {GERALD} sitting on a huge pile of money in the background. Noir lighting. {NO_TEXT}"),
    dict(id="50", cue=("s29", "so next time"), refs=["Sam", "Printer"], move="push",
         prompt=f"Night, desk lamp: {SAM} rests his forehead on the desk in defeat next to {PRINTER}, whose screen glows red again. Same desk as the opening. {text('OUT OF CYAN')}"),
    dict(id="51", cue=("s29", "working exactly"), refs=["Gerald"], move="pull",
         prompt=f"{GERALD} leans back in a luxurious leather chair in a dark penthouse office overlooking a city at night, smugly raising a crystal champagne flute filled with glossy cyan ink in a toast. {NO_TEXT}"),
    dict(id="52", cue=("s30", "why is it"), refs=["Sam"], move="push",
         prompt=f"{SAM} looks directly at the viewer with a hopeful little smile, pointing at a big red rounded subscribe button hanging on the wall next to him, a small bell icon beside it. Clean warm background. {text('SUBSCRIBE')}"),
]


def flow_prompt(s):
    return f"{s['prompt']} {STYLE}"


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "flow"
    only = set(sys.argv[2].split(",")) if len(sys.argv) > 2 else None
    shots = [s for s in SHOTS if not only or s["id"] in only]
    if mode == "flow":
        scenes = [
            dict(prompt=flow_prompt(s), type="image", model="Nano Banana Pro", aspect_ratio="16:9", max_credits=0,
                 reference_images=[f"asset:{r}" for r in s["refs"]] or None)
            for s in shots
        ]
        for sc in scenes:
            if sc["reference_images"] is None:
                del sc["reference_images"]
        print(json.dumps({"project": "printer-ink-cartoon", "scenes": scenes}))
    else:
        out = Path(__file__).resolve().parent.parent / "src/shots.json"
        out.write_text(json.dumps([dict(id=s["id"], scene=s["cue"][0], at=s["cue"][1], move=s["move"]) for s in SHOTS], indent=1))
        print(f"wrote {out} ({len(SHOTS)} shots)")
