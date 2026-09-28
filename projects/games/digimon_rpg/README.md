# RPG (Digimon)

A 2D side-scrolling action game built with Python and pygame. The player
controls an Argumon character across multiple worlds and stages, fighting
enemies (Taction1), collecting supplements, and progressing through castle
gates.

## Tech Stack

- **Language:** Python 3
- **Framework:** pygame
- **Dependencies:** `pygame`, `numpy`

## Project Structure

```
rpg/
    Global.py             # Singletons: logger, font, color, frame, player constants
    Configuration.py      # Display surface, world/stage/player configuration
    Plugin.py             # Plugin/animation/physics engine for characters
    ObjectPool.py         # Stage, character, player, enemy, status bar factories
    main.py               # Entry point: event handler, game loop, rendering
    generate_schema.py    # Utility: generates XML structure diagram from source
    Statics/
        Images/           # Sprite sheets, backgrounds, UI assets
        Audio/            # Background music
```

## How to Run

```bash
python main.py
```

Requires `pygame` and `numpy` installed.

## Architecture

The game uses a factory-based singleton pattern. Each module exposes a module-
level singleton instance (`ALL = <Factory>()`) that other modules import:

- `Global` (from `Global.py`) — logger, fonts, colors, frame loader, name
  constants, player constants.
- `Config` (from `Configuration.py`) — display surface, world layout, stage
  count, player controller key bindings.
- `PluginFactory` (from `Plugin.py`) — per-character plugin managing animation
  state machines and Newtonian physics (position, velocity, acceleration).

`main.py` contains `GameFactory` (game loop, rendering, event handling) and a
module-level `event_handler` singleton for custom pygame events.

### Data Flow

```
main.py (GameFactory)
    -> ObjectPool.py (StageFactory, PlayerFactory, EnemyFactory, StatusBarFactory)
        -> Plugin.py (PluginFactory -> ArgumonFactory/Taction1Factory)
            -> Global.py (frame loading, constants)
            -> Configuration.py (display, key bindings, world layout)
```

## Coding Standards

This project follows **PEP 8** with the following conventions:

### Naming

| Element              | Convention         | Example                     |
|----------------------|--------------------|-----------------------------|
| Files                | `snake_case.py`    | `object_pool.py`            |
| Classes              | `PascalCase`       | `StageFactory`              |
| Methods / functions  | `snake_case`       | `setup_argumon()`           |
| Instance attributes  | `snake_case`       | `self.character_level`      |
| Constants            | `UPPER_SNAKE`      | `TOTAL_NO_OF_STAGES`        |
| Module singletons    | `UPPER_SNAKE`      | `ALL = ConfigurationFactory()` |

### Style

- **String formatting:** f-strings throughout (no `%` formatting, no `.format()`).
- **Imports:** explicit (`from Plugin import PluginFactory`), no wildcard
  imports except `from pygame.locals import *` (standard pygame practice).
- **Paths:** forward slashes (`./Statics/...`) for cross-platform compatibility.
- **Entry point:** `if __name__ == '__main__':` guard in `main.py`.
- **String literals:** single quotes for short strings, double quotes for
  strings containing apostrophes or rendered display text.

### Architecture Conventions

- Module-level singleton pattern: each module ends with
  `ALL = <Factory>()` (or equivalent) and is imported as an alias
  (`from Global import ALL as Global`).
- Factory classes use inner classes for hierarchical composition
  (e.g., `StageFactory.NotificationFactory.BeginFactory`).
- Physics constants (`GRAVITY`, `FRICTION_CONSTANT_GROUND`,
  `FRICTION_CONSTANT_AIR`) are `UPPER_SNAKE` instance attributes on
  `CharacterFactory`.
- `event_handler` is a module-level singleton in `main.py`, shared by
  `GameFactory` methods for custom pygame event registration.
