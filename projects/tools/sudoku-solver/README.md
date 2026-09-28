# Sudoku Solver

An OpenCV-based Sudoku solver that reads puzzle images, extracts the board using template matching, solves with sole-candidate and unique-candidate rules, and outputs the solved board with colored numbers overlaid on the original image.

## Requirements

- Python 3
- OpenCV (`cv2`)
- NumPy
- Pygame (for `Vector2`)

```bash
pip install opencv-python numpy pygame
```

## Usage

```bash
cd App
python main.py
```

By default, solves puzzle #6000. To solve a different puzzle, edit the call at the bottom of `App/main.py`:

```python
solution.run_single(question_id=6000)
```

To solve all puzzles (6000-10000), uncomment `run_all`:

```python
solution.run_all()
```

## How It Works

1. **Image Input** — Reads a Sudoku puzzle PNG from `App/Statics/Images/Data Source/Medium/`.
2. **Board Detection** — Uses OpenCV template matching to locate the Sudoku grid and individual digits.
3. **Board Extraction** — Maps detected digit positions to a 9x9 grid representation.
4. **Solving** — Applies two rules iteratively:
   - **Rule 1 (Sole Candidate)** — If a cell has only one possible value, fill it in.
   - **Rule 2 (Unique Candidate)** — If a value can only go in one cell within a row, column, or grid, fill it in.
5. **Output** — Overlays the solved numbers (in green) on the original puzzle image and displays/saves the result.

## Project Structure

```
App/
  main.py                          # Main application (solver + image I/O)
  Statics/
    Images/
      Data Source/Medium/          # Input puzzle images (Q_#6000.PNG - Q_#10000.PNG)
      Fingerprint/                 # Template images for board & digit detection
        Board.PNG
        Number/#1-9.PNG
      Reference/                   # Colored number overlays for output
        Brown/#1-9.PNG
        Green/#1-9.PNG
        Purple/#1-9.PNG
        Red/#1-9.PNG
      Output/Medium/               # Generated output (gitignored)
```

## Architecture

The solver uses a nested factory pattern:

- **`ConstantFactory`** — Color names and number set constants.
- **`LoggerFactory`** — Debug logging utilities (JSON output, conditional print).
- **`SudokuRegularFactory`** — Main solver orchestrator:
  - **`SolverFactory`** — Solving logic by difficulty (Easy/Medium/Hard; only Medium implemented):
    - **`MediumFactory`** — Medium-difficulty solver with `ConstantFactory`, `UtilityFactory` (cell helpers), and `SystemFactory` (solving rules).
  - **`DataFactory`** — Image I/O with `ConstantFactory` (paths), `UtilityFactory` (image drawing), and `SystemFactory` (input/output factories).
- **`SolutionFactory`** — Entry point; creates a `SudokuRegularFactory` and runs single or batch solving.

## Data Source

Puzzle images sourced from [valeur.org](https://valeur.org/sudoku/medium/a/free-printable-medium-sudoku-with-the-answer-6000.html).

## Coding Standards

This project follows **PEP 8** conventions:

- **Files**: `snake_case.py`
- **Classes**: `PascalCase` (e.g., `SudokuRegularFactory`, `SolutionFactory`)
- **Methods**: `snake_case` (e.g., `get_cell_by_cell_id`, `run_rule_1`)
- **Variables/Instance attributes**: `snake_case` (e.g., `question_id`, `data_changed`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `TOTAL_NO_OF_ROWS`, `FULL_SET_ANSWER`, `IS_DEBUG`)
- **Module-level singletons**: `snake_case` (e.g., `constants`, `logger`)
- **Imports** at top of file, before class definitions
- **`if __name__ == '__main__':`** guard for entry point
- No mutable default arguments (use `None` + conditional assignment)
- Boolean comparisons use truthiness (`if self.IS_DEBUG:` not `if self.IS_DEBUG == True:`)
