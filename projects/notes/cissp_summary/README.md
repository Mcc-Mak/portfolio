# isc-cissp-summary

CISSP study notes summarizing all 34 sessions of the ISC2 CISSP course, plus appendices, diagrams, and a consolidated overview.

## Structure

| Path | Contents |
|:-----|:---------|
| `NN_Session_N_*.md` | Session-by-session study notes (Sessions 1–34) |
| `appendix_1.md`, `appendix_2.md` | Appendix notes |
| `diagram_appendix_N.md` | Diagram-focused appendix notes |
| `diagrams_part_N.md` | Consolidated diagram collections |
| `diagrams/` | Per-session diagram markdown files (`session_NN.md`, `consolidated.md`) |
| `overview/version_1/` | SVG overview diagrams and master PDF |
| `raw/` | Original study guide PDF and conversation JSON exports |
| `study_plan.xlsx` | Study schedule spreadsheet |

## Coding Standards

### File Naming

- Directories and files use `snake_case` ASCII (`[a-z0-9_.]` charset)
- No spaces, hyphens, uppercase letters, or special characters in path names
- Session notes: `NN_Session_N_description.md` (zero-padded number prefix)
- Diagram files: `session_NN.md` (zero-padded)
- Overview SVGs: `NN_descriptive_name.svg` (zero-padded number prefix)

### Markdown

- ATX-style headers (`#`, `##`, `###`)
- Tables use GitHub-flavored markdown pipe syntax
- Code blocks fenced with triple backticks and language tag where applicable