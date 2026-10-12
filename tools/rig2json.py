"""Convert a rigged character SVG (groups with id + data-pivot) into JSON for src/characters/RigSvg.tsx.

Usage: python3 tools/rig2json.py in.svg out.json

Keeps the element tree, camelCases attributes for React, turns data-pivot into [x, y],
drops <metadata>/<title>, and tags the eyebrow stroke (stroke-width 2.4 inside the head)
with id "<prefix>-brows" so the renderer can redraw it per expression.
"""
import json, re, sys
import xml.etree.ElementTree as ET

src, dst = sys.argv[1], sys.argv[2]
NS = '{http://www.w3.org/2000/svg}'
camel = lambda k: re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)

def conv(el, in_head=False):
    tag = el.tag.replace(NS, '')
    if tag in ('metadata', 'title'):
        return None
    a = {}
    pivot = None
    for k, v in el.attrib.items():
        k = k.split('}')[-1]
        if k == 'data-pivot':
            pivot = [float(x) for x in v.split()]
        elif k not in ('style',):
            a[camel(k)] = v
    head = in_head or a.get('id', '').endswith('-head')
    # eyebrows: the thick plain stroke inside the head (2.4 on Sam, 2.6 on Gerald)
    if tag == 'path' and head and a.get('strokeWidth') in ('2.4', '2.6') and a.get('fill') == 'none':
        a['id'] = 'BROWS'
    node = {'t': tag, 'a': a}
    if pivot:
        node['p'] = pivot
    kids = [k for k in (conv(c, head) for c in el) if k]
    if kids:
        node['c'] = kids
    return node

root = ET.parse(src).getroot()
tree = conv(root)
# the brow id takes the file's own prefix (f- or s-)
prefix = 'f' if root.attrib.get('id', '').endswith('front') else 's'
txt = json.dumps(tree).replace('"BROWS"', f'"{prefix}-brows"')
open(dst, 'w').write(txt)
print(dst, len(txt), 'bytes')
