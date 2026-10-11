"""Background sets for the cartoon cut. Generated empty in Flow (free); characters and props are animated on top.

`python3 shots/sets.py` prints the flow_generate request body.
"""
import json, sys

STYLE = (
    "Bright, clean 2D cartoon background art for an animated YouTube explainer: flat bold cheerful colours, thick clean "
    "dark-charcoal outlines, simple rounded shapes, soft flat cel shading, minimal texture, sunny daytime light, airy and "
    "colourful, not dark. Polished modern TV-cartoon background painting. Completely empty scene: no people, no characters, "
    "no animals, no faces. No text, letters, logos or numbers anywhere. Widescreen 16:9, straight-on eye-level view."
)

SETS = [
    ("office", "A bright cosy home office during the day: a wooden desk along the right third of the frame with an empty clear desktop "
               "(nothing on it except a small potted plant at the far right), a big sunny window with blue sky behind the desk, "
               "a bookshelf and a framed picture on a pastel wall, a light wooden floor; the left half of the frame is open floor space."),
    ("checkout", "A bright cheerful supermarket checkout lane: a checkout counter with a conveyor belt and a cash register in the "
                 "middle-right, colourful grocery shelves in the background, shiny floor, open space in the left foreground."),
    ("oldstreet", "A sunny old-fashioned 1900s town street in warm sepia and cream tones: a barbershop front with a striped barber pole, "
                  "brick buildings, a gas street lamp, cobblestone pavement; wide open pavement in the foreground."),
    ("boardroom", "A bright modern corporate boardroom: a long glossy meeting table seen from the side running across the lower third, "
                  "big glass windows with a sunny city skyline, a blank whiteboard on the left wall, open floor in the centre."),
    ("store", "A bright electronics store aisle: tall shelves of colourful generic boxes on both sides receding into the distance, "
              "clean tiled floor, ceiling lights, wide open aisle floor in the centre foreground."),
    ("livingroom", "A bright sunny living room: a comfy sofa against the back wall, a rug on a wooden floor, a window with "
                   "plants, a low coffee table on the right; open floor space in the centre and left."),
    ("courtroom", "A bright wood-panelled courtroom seen from the front: the judge's high bench in the centre background, "
                  "a flag stand, a wooden table in the lower right foreground, warm daylight from tall windows."),
    ("road", "A sunny countryside road seen through a car windscreen: rolling green hills, blue sky with fluffy clouds, the road "
             "running to the horizon; the bottom third of the frame is the plain dashboard top of the car, no steering wheel, no gauges."),
    ("penthouse", "A sleek bright penthouse executive office: a big polished desk on the right, a leather chair, floor-to-ceiling "
                  "windows with a sunny city skyline, modern art on the wall, open floor on the left."),
    ("library", "A bright welcoming public library: tall wooden bookshelves full of colourful books, reading tables, big arched "
                "windows with sunlight, open floor space in the centre foreground."),
]

if __name__ == "__main__":
    only = set(sys.argv[1].split(",")) if len(sys.argv) > 1 else None
    scenes = [
        dict(prompt=f"{desc} {STYLE}", type="image", model="Nano Banana Pro", aspect_ratio="16:9", max_credits=0)
        for name, desc in SETS if not only or name in only
    ]
    print(json.dumps({"project": "printer-ink-sets-v2", "scenes": scenes}))
