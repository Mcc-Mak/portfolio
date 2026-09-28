# Tracer

A pixel-grid hover tracer built with vanilla JavaScript. Creates a dense grid of tiny div elements that highlight on hover, producing a trace effect as the mouse moves across the grid.

## Usage

Open `index.html` in a browser. Move the mouse over the grid to see the trace effect.

## Configuration

Adjust the constants at the top of `main.js`:

- `CONTAINER_LENGTH` — Grid container size in pixels (default: 480)
- `SIDE_LENGTH` — Cell size in pixels (default: 1)
- `MARGIN` — Cell margin in pixels (default: 0.5)

Ensure `CONTAINER_LENGTH / (SIDE_LENGTH + 2 * MARGIN)` is an integer for a clean grid.

## How It Works

The script generates a grid of div elements. Each cell is positioned using CSS float, with hover styling that changes the background color. The grid density is determined by the ratio of container size to cell size plus margins.

## Coding Standards

This project follows these conventions:

- **Files**: `lowercase.js`, `lowercase.html`
- **Variables**: `camelCase` for locals (e.g., `cellsPerRow`), `UPPER_SNAKE_CASE` for constants (e.g., `CONTAINER_LENGTH`)
- **CSS classes**: `lowercase` (e.g., `.cell`, `.row`)
- **HTML5 boilerplate**: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- **Variable declarations**: `const`/`let` (never implicit globals)
- **CSS units**: All length values include units (e.g., `480px`, not `480`)
- **Script loading**: `<script defer>` in `<head>`
