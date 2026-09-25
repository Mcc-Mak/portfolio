# Calculator

A web-based calculator mimicking a Casio-style keypad, supporting basic
arithmetic (`+`, `-`, `*`, `/`) with full keyboard input.

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Languages | `HTML`, `CSS`, `JavaScript` |
| Architecture | Single-page static site (no build step) |

## Features

- **Basic arithmetic** — addition, subtraction, multiplication, division
- **Keyboard input** — numpad and digit keys mapped to calculator buttons
- **Division-by-zero error handling** — locks the display until Clear is pressed
- **Leading-zero prevention** — typed digits replace a lone `0` automatically
- **Casio-branded UI** — dark theme with color-coded operator keys

## Project Structure

```
calculator/
├── index.html          # Entry point — loads styles and script
├── styles.css          # Calculator styling
├── calculator.js       # Core calculator logic
├── logo.png            # Casio brand logo
└── README.md
```

## Getting Started

No build step required — open `index.html` directly in a browser:

```bash
# Clone
git clone https://github.com/Mcc-Mak/calculator.git
cd calculator

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Coding Standards

| Category | Convention | Example |
|:---------|:-----------|:--------|
| Files | lowercase, dot-separated | `index.html`, `calculator.js` |
| JS classes | PascalCase | `Calculator` |
| JS instances/vars | camelCase | `keyMap`, `hasError`, `calculatorContainer` |
| HTML attributes | `data-*` kebab-case | `data-type`, `data-row` |
| CSS classes | kebab-case | `.calc-cell`, `.calc-row` |
| Strings | single quotes; backticks for templates | `'0'`, `` `row-${y}` `` |
| Indentation | 4 spaces | — |
