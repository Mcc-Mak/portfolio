# Paint

A minimalist pixel-painting web app. Move the mouse across a 64×64 grid to
leave a black trail, creating simple pixel art.

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Languages | `HTML`, `CSS`, `JavaScript` |
| Architecture | Single-page static site (no build step) |

## Features

- **64×64 pixel grid** — generated dynamically via DOM manipulation
- **Mouse-trail painting** — cells turn black on mouseout, leaving a painted trail
- **No dependencies** — pure vanilla JavaScript

## Project Structure

```
paint/
├── index.html      # Entry point — loads styles and script
├── styles.css      # Grid and cell styling
├── paint.js        # Grid generation and paint logic
└── README.md
```

## Getting Started

No build step required — open `index.html` directly in a browser:

```bash
# Clone
git clone https://github.com/Mcc-Mak/paint.git
cd paint

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Coding Standards

| Category | Convention | Example |
|:---------|:-----------|:--------|
| Files | lowercase, dot-separated | `index.html`, `paint.js` |
| JS instances/vars | camelCase | `paintGrid`, `cellSize`, `cellMargin` |
| HTML attributes | `data-*` kebab-case | `data-row`, `data-col` |
| CSS classes | kebab-case | `.paint-cell`, `.paint-row` |
| Strings | single quotes; backticks for templates | `'black'`, `'paint-grid'` |
| Indentation | 4 spaces | — |
