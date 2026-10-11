#!/bin/bash
# Tile PNG stills into a contact sheet: tools/sheet.sh <dir> <out.png> [cols]
dir="$1"; out="$2"; cols="${3:-3}"
files=("$dir"/*.png); n=${#files[@]}
rows=$(( (n + cols - 1) / cols ))
args=(); layout=()
for i in "${!files[@]}"; do args+=(-i "${files[$i]}"); x=$(( i % cols )); y=$(( i / cols )); layout+=("$((x*960))_$((y*540))"); done
inputs=$(for i in $(seq 0 $((n-1))); do printf "[%d:v]scale=960:540[v%d];" $i $i; done)
refs=$(for i in $(seq 0 $((n-1))); do printf "[v%d]" $i; done)
lay=$(IFS='|'; echo "${layout[*]}")
ffmpeg -v error -y "${args[@]}" -filter_complex "${inputs}${refs}xstack=inputs=$n:layout=$lay:fill=black" "$out"
