# Google Form Generator

A Google Apps Script web application that generates Google Forms from pasted
tab-separated table data. Supports form metadata, multiple question types,
response spreadsheet linking, QR code generation, and PDF export.

## Links

- [Generate Google Form (via web app)](https://script.google.com/macros/s/AKfycbyIPyFwaHgAIap4bGlVF0oWbuwX9MJ7v7o4RNpVWVcJS9qt2BT7Y5OTQ_1RrHOeb9OBdw/exec)
- [Generate Google Form (via Google Forms)](https://docs.google.com/forms/u/0/)
- [Convert TEXT to QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TEXT_TO_BE_CONVERTED)

## Directory Structure

```
google_form_generator/
├── google_scripts/
│   ├── google_form_generator.gs   # Main Apps Script (server + embedded HTML/CSS/JS)
│   ├── appsscript.json            # Project manifest (timeZone, oauthScopes, webapp config)
│   └── test_cases/
│       └── google_form_testcase_1.txt  # Sample tab-separated input
├── user_guide_en.md               # User guide (English)
├── user_guide_zh.md               # User guide (Chinese)
├── README.md
├── .gitignore
└── LICENSE
```

## Sample Input

```
FORM NAME: <專案名稱>
FORM TITLE: <專案題目>

FORM DESCRIPTION START
💡 最頂的備註放在這裡。
FORM DESCRIPTION END

問題（一）	REQUIRED	MCQ#答案一,答案二	💡 我為這「必答（REQUIRED）」的「多項選擇題（MCQ）」增加備註。
問題（二）	NON-REQUIRED	MCQ#答案一,答案二,答案三,答案四	💡 每多一個答案要多一個逗號。
問題（三）	REQUIRED	SHORT_ANSWER#	💡 「短答題（SHORT_ANSWER）」不用附加任何選項。
問題（四）	REQUIRED	PARAGRAPH#	💡 「長答題（PARAGRAPH）」也不用附加任何選項。
問題（五）	REQUIRED	DROPDOWN#選項一,選項二,選項三,選項四,選項五	💡 「選單（DROPDOWN）」的選項與「多項選擇題（MCQ）」一樣，用「,」分隔。
```

## Supported Question Types

| Keyword | Google Forms Type |
|---|---|
| `SHORT_ANSWER` / `TEXT` | Short answer |
| `PARAGRAPH` / `LONG_ANSWER` / `ESSAY` | Paragraph |
| `MCQ` / `MULTIPLE_CHOICE` | Multiple choice |
| `CHECKBOX` / `CHECKBOXES` | Checkbox |
| `DROPDOWN` / `SELECT` | Dropdown |
| `LINEAR_SCALE` / `SCALE` / `RATING` | Linear scale |
| `DATE` | Date |
| `TIME` | Time |

## Coding Standards

### Naming Conventions

- **Files and directories:** `snake_case` ASCII (`[a-z0-9_.]` charset — no
  uppercase, hyphens, spaces, or parentheses).
- **Functions:** `camelCase` (e.g. `createFormFromTable`,
  `normalizeQuestionType`).
- **Constants:** `UPPER_SNAKE_CASE` for global configuration values
  (e.g. `DEBUG_MODE`, `DEFAULT_FOLDER_ID`).
- **CSS classes:** `kebab-case`.
- **HTML attributes / element IDs:** `camelCase`.

### JavaScript / Google Apps Script

- Use `const` by default; `let` only when reassignment is required. Never use
  `var`.
- Declare all DOM references at the top of `DOMContentLoaded` before attaching
  event listeners — avoids use-before-declaration bugs in async callbacks.
- Avoid implicit globals: every variable must have an explicit `const`/`let`
  declaration.
- Extract hardcoded values (folder IDs, API endpoints) into named constants.
- Use `String.prototype.replace()` with a regex `/g` flag instead of
  `replaceAll()` for broader GAS runtime compatibility.
- Terminate all statements with semicolons.

### Security

- No secrets or credentials are committed. The `DEFAULT_FOLDER_ID` constant is
  intentionally empty — users must supply their own folder ID at runtime.
- The Apps Script runs under the deployer's Google account; `appsscript.json`
  scopes are limited to `forms`, `drives`, `script.send_mail`, and
  `spreadsheets`.
