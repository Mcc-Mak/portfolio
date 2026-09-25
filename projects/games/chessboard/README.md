# Chessboard

A web-based two-player strategy game that blends chess movement with tactical
terrain manipulation. Players place **blocks** and **traps** on the board while
maneuvering their chess pieces, scoring by breaching the opponent's side.

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Languages | `HTML`, `CSS`, `JavaScript` |
| Libraries | `jQuery` 3.5.1, `SweetAlert2` 8.11.8 |
| Architecture | Single-page static site (no build step) |

## Features

- **Two-player turn-based gameplay** — alternating moves on a shared board
- **Block placement** — visible obstacles that block movement paths
- **Trap placement** — hidden mines that destroy the triggering piece and
  block the road when detonated
- **Score system** — earn 1 point per piece that reaches the opposite side;
  first player to 5 points wins
- **Three actions per round:**
  1. Place at most 1 block
  2. Place at most 1 trap
  3. Move 1 chess piece by 1 step

## Project Structure

```
chessboard/
├── index.html                  # Entry point — loads all scripts and styles
├── styles.css                  # Game board styling
├── game.js                     # Core game logic (43 KB)
├── constants.js                # Game constants and configuration
├── models.js                   # Data models
├── vendor/                     # Vendored libraries (jQuery, SweetAlert2)
├── statics/img/                # Sprite assets (players, blocks, traps, explosions)
├── documentation/              # Design docs (state machine, layout, config)
└── README.md
```

## Getting Started

No build step required — open `index.html` directly in a browser:

```bash
# Clone
git clone https://github.com/Mcc-Mak/Anonymous-Chessboard.git
cd Anonymous-Chessboard

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Design Documentation

The `documentation/` folder contains design artifacts:

| File | Content |
|:-----|:--------|
| `State Machine.pptx` | Game state transitions |
| `Layout.pptx` | Board layout design |
| `table.config.xlsx` | Board configuration tables |
| `Static Machine.PNG` | State machine diagram |

## Coding Standards

| Category | Convention | Example |
|:---------|:-----------|:--------|
| Files | lowercase, dot-separated | `index.html`, `game.js` |
| JS classes | PascalCase | `GameConstants`, `Game`, `Player` |
| JS instances/vars | camelCase | `constants`, `game`, `layoutTable` |
| HTML attributes | `data-*` kebab-case | `data-row`, `data-status` |
| CSS classes | kebab-case | `.chessboard`, `.turn-board` |
| Strings | single quotes; backticks for templates | `'DEFAULT'`, `` `Player ${game.turn}` `` |
| Indentation | 4 spaces | — |
| Third-party libs | `vendor/` directory | `vendor/jquery/` |

## Repository

[GitHub: Mcc-Mak/Anonymous-Chessboard](https://github.com/Mcc-Mak/Anonymous-Chessboard)
