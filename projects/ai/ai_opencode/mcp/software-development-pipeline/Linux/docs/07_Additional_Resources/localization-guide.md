# Localization (l10n) and Internationalization (i18n) Guide

## Table of Contents

- [Introduction](#introduction)
- [Supported Languages](#supported-languages)
- [Translation Workflow](#translation-workflow)
- [Translation File Structure](#translation-file-structure)
- [Adding a New Language](#adding-a-new-language)
- [Updating Translations](#updating-translations)
- [Translating UI Text vs. Content](#translating-ui-text-vs-content)
- [Right-to-Left (RTL) Language Support](#right-to-left-rtl-language-support)
- [Locale-Specific Formatting](#locale-specific-formatting)
- [Translation Tools](#translation-tools)
- [Translation Quality Assurance](#translation-quality-assurance)
- [Pseudo-Localization for Testing](#pseudo-localization-for-testing)
- [Translation Maintenance Schedule](#translation-maintenance-schedule)
- [Cross-References](#cross-references)

---

## Introduction

This guide describes how the project supports multiple languages and locales.
Internationalization (i18n) is the engineering work that makes a product
adaptable to different languages without code changes. Localization (l10n) is
the process of actually adapting the product for a specific locale —
translating text, formatting dates and numbers, and adjusting layout.

**The distinction matters:**

- **i18n** is done once, by developers. It means extracting user-facing
  strings from code, using locale-aware formatting APIs, and designing layouts
  that survive text expansion and RTL direction.
- **l10n** is done repeatedly, per locale, by translators. It means providing
  translated strings and locale-specific configuration.

A well-internationalized codebase can absorb a new language with **zero code
changes** — only new translation files. This is the goal. If adding a language
requires touching source files, the i18n is incomplete.

The CMMI Level 4 pipeline treats i18n as a first-class concern: untranslated
hardcoded strings are flagged during code review (R2 secure-coding skill) and
missing translation keys surface as test failures (R10 gate).

---

## Supported Languages

The table below lists supported locales. English is the default source locale;
all other locales are translations of it.

| Locale Code | Language | Region | Direction | Status | Translation Coverage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `en` | English | (default) | LTR | Source | 100% (source of truth) |
| `[lang-1]` | [Language 1] | [Region 1] | [LTR/RTL] | [Active/Beta] | [XX]% |
| `[lang-2]` | [Language 2] | [Region 2] | [LTR/RTL] | [Active/Beta] | [XX]% |
| `[lang-3]` | [Language 3] | [Region 3] | [LTR/RTL] | [Active/Beta] | [XX]% |
| `[lang-4]` | [Language 4] | [Region 4] | [LTR/RTL] | [Planned] | 0% |

**Locale code convention:** BCP 47 language tags (`language-REGION`), e.g.,
`en-US`, `es-ES`, `zh-CN`, `ar-SA`. The `language` subtag alone is used as the
filename for translation files; region variants are handled via fallback (see
[Translation File Structure](#translation-file-structure)).

**Coverage thresholds:**

- **Active** (≥ 90% coverage): shipped and supported. Missing keys fall back to
  English.
- **Beta** (60%–89%): shipped behind a flag; user-visible but incomplete.
- **Planned** (< 60%): not yet shipped.

Coverage is computed by the QA tooling (see
[Translation Quality Assurance](#translation-quality-assurance)) as
`translated_keys / total_source_keys`.

---

## Translation Workflow

Translations follow a structured workflow from string extraction to release.
Skipping steps produces inconsistent, untested translations.

```
1. EXTRACT
   │  Developer adds/changes user-facing strings in source code using t('key')
   │  Extraction tool scans src/ and produces/updates the source locale file
   │  (en.json) with new keys; removed strings are flagged for cleanup
   ▼
2. TRANSLATE
   │  Translators (or [Translation Tool]) translate new/changed keys
   │  Translations land in the target locale files (e.g., es.json, ar.json)
   │  Context comments accompany ambiguous keys
   ▼
3. REVIEW
   │  A second translator (or reviewer) checks translations for accuracy,
   │  tone, and context. Edits are tracked.
   ▼
4. MERGE
   │  Reviewed translations merge into the default branch
   │  CI runs the i18n test suite (key parity, no hardcoded strings)
   │  Pseudo-localization runs to catch layout issues
   ▼
5. TEST
   │  QA verifies each locale in a running build
   │  RTL languages tested for layout correctness
   │  Locale-specific formatting (dates, numbers, currency) verified
   ▼
6. RELEASE
   │  Locales at or above coverage threshold ship
   │  Coverage report archived; maintenance schedule updated
```

**Workflow rules:**

- Never edit translation files directly in the source locale (`en.json`)
  without a corresponding code change. The source locale is generated.
- Never ship a locale below the Active threshold without a Beta flag.
- Every merged translation set is recorded in the changelog under **Changed**.

---

## Translation File Structure

Translation files are JSON, organized by locale and namespace. The default
structure places them under `src/locales/`:

```
src/locales/
├── en/
│   ├── common.json
│   ├── errors.json
│   ├── dashboard.json
│   └── settings.json
├── [lang-1]/
│   ├── common.json
│   ├── errors.json
│   ├── dashboard.json
│   └── settings.json
└── [lang-2]/
    └── ...
```

**Namespaces** group strings by feature area so files stay manageable and
translators can work in context. A key is referenced as `namespace:key.path`.

**Example `en/common.json`:**

```json
{
  "app": {
    "name": "[Product Name]",
    "tagline": "CMMI Level 4 DevSecOps Pipeline"
  },
  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "confirm": "Confirm",
    "close": "Close"
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "settings": "Settings",
    "profile": "Profile"
  },
  "status": {
    "loading": "Loading...",
    "empty": "No results found",
    "error": "Something went wrong"
  }
}
```

**Example `en/errors.json`:**

```json
{
  "auth": {
    "required": "Authentication is required.",
    "expired": "Your session has expired. Please sign in again.",
    "forbidden": "You do not have permission to perform this action."
  },
  "validation": {
    "email": "Please enter a valid email address.",
    "required": "This field is required.",
    "minLength": "Must be at least {{count}} characters."
  }
}
```

**Interpolation:** Variables use double-curly braces (`{{count}}`). Plural
forms use a `count` object:

```json
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}
```

**Key naming conventions:**

- Use lowercase, dot-nested keys: `actions.save`, not `ActionsSave`.
- Group by feature/namespace, not by page, to maximize reuse.
- Keys are semantic, not literal: `status.loading`, not `status.threeDots`.
- Never embed the source string as the key (anti-pattern): avoid
  `"Save": "Save"`.

---

## Adding a New Language

To add support for a new locale, follow these steps. No source code changes
should be required if i18n is complete.

**1. Register the locale**

Add the new locale to the supported languages config (e.g.,
`src/config/locales.js`):

```javascript
module.exports = {
  defaultLocale: 'en',
  locales: [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: '[lang-new]', name: '[Language New]', dir: '[ltr/rtl]' }
  ],
  fallback: 'en'
};
```

**2. Create the locale directory and files**

Copy the structure from the source locale:

```bash
cp -r src/locales/en src/locales/[lang-new]
```

**3. Translate the strings**

Replace each value in each JSON file with the translated string. Leave the
keys unchanged. Add translator comments for ambiguous strings where context is
needed.

```json
{
  "actions": {
    "save": "[translated Save]",
    "cancel": "[translated Cancel]",
    "delete": "[translated Delete]"
  }
}
```

**4. Configure locale-specific formatting**

Create a formatting config for the locale (dates, numbers, currency). See
[Locale-Specific Formatting](#locale-specific-formatting).

**5. Run the i18n tests**

```bash
npm test -- --suite=i18n
```

This verifies key parity (every key in `en` exists in `[lang-new]`) and reports
coverage.

**6. Add pseudo-localization (if RTL)**

If the locale is RTL, add it to the RTL test set and run the RTL layout tests
(see [Right-to-Left (RTL) Language Support](#right-to-left-rtl-language-support)).

**7. Update the supported languages table**

Update the table in [Supported Languages](#supported-languages) above and the
changelog.

**8. QA and release**

Run the full QA process (see [Translation Quality Assurance](#translation-quality-assurance)).
Ship as Beta if below 90% coverage, Active otherwise.

---

## Updating Translations

Translations change when source strings change. The update process keeps
locales in sync.

**When a source string changes:**

1. The extraction tool marks the key as "changed" in each locale file (often
   via a status field or by moving the old translation to a `_previous` key).
2. Translators re-translate the changed key.
3. The old translation is discarded after the new one is reviewed.

**When a source string is added:**

1. The extraction tool adds the new key to every locale file, with the English
   value as a placeholder and a `status: "untranslated"` flag.
2. Translators translate the new key.
3. Untranslated keys fall back to English at runtime.

**When a source string is removed:**

1. The extraction tool flags the orphaned key in each locale file.
2. A cleanup step (manual or automated) removes orphaned keys after a grace
   period (to allow rollback).
3. Removal is recorded in the changelog.

**Update command:**

```bash
# Extract strings from source and update locale files
npm run i18n:extract

# Show coverage report per locale
npm run i18n:report

# Clean up orphaned keys (with confirmation)
npm run i18n:clean
```

---

## Translating UI Text vs. Content

Not all text is translated the same way. The project distinguishes between UI
text and content.

| Text Type | Examples | How Translated | Stored In |
| :--- | :--- | :--- | :--- |
| **UI text** | Button labels, menu items, error messages, tooltips | Professional translation; extracted to locale files | `src/locales/*/` |
| **User content** | User-generated posts, comments, names | Not translated by us; user's choice | Database (per-user locale) |
| **Documentation** | README, guides, help text | Translated separately; may lag UI | `docs/[locale]/` |
| **Marketing content** | Landing page copy, announcements | Professional transcreation | CMS / content repo |
| **Logs and error codes** | Audit log entries, error codes | Never translated (must be locale-neutral for compliance) | `logs/` (English only) |

**Rules:**

- **Logs are never translated.** Audit log entries (R11) and error codes must
  be locale-neutral for compliance and searchability. HIPAA-02 and SOX-03
  require consistent, searchable audit records.
- **UI text is always extracted.** Never hardcode user-facing strings in
  source. The secure-coding skill (R2) flags hardcoded strings.
- **Documentation translation is optional and may lag.** The English docs are
  authoritative; translations are a convenience.
- **Date/number/currency formats are always locale-aware.** See
  [Locale-Specific Formatting](#locale-specific-formatting).

---

## Right-to-Left (RTL) Language Support

RTL languages (Arabic, Hebrew, Persian, Urdu, etc.) require layout mirroring.
The project supports RTL via CSS logical properties and a direction attribute.

**Enabling RTL:**

1. Set the `dir` attribute on the root element based on locale:

```javascript
const dir = locale.startsWith('ar') || locale.startsWith('he') ||
            locale.startsWith('fa') || locale.startsWith('ur') ? 'rtl' : 'ltr';
document.documentElement.setAttribute('dir', dir);
document.documentElement.setAttribute('lang', locale);
```

2. Use CSS logical properties instead of physical ones:

```css
/* Bad: physical properties break in RTL */
.sidebar { left: 0; margin-right: 16px; padding-left: 8px; }

/* Good: logical properties mirror automatically */
.sidebar {
  inset-inline-start: 0;        /* left in LTR, right in RTL */
  margin-inline-end: 16px;      /* right in LTR, left in RTL */
  padding-inline-start: 8px;    /* left in LTR, right in RTL */
}
```

3. Use `text-align: start` and `text-align: end` instead of `left`/`right`.

4. Flip directional icons (arrows, chevrons) in RTL. Use a CSS transform or an
   RTL-specific icon variant:

```css
[dir="rtl"] .icon-arrow-forward {
  transform: scaleX(-1);
}
```

**RTL testing checklist:**

- [ ] Layout mirrors correctly (navigation, sidebars, icons)
- [ ] Text alignment is correct (start/end, not left/right)
- [ ] No horizontal overflow or clipping
- [ ] Modals and tooltips open on the correct side
- [ ] Number/date inputs render in the correct direction (numbers are always
      LTR even in RTL contexts)
- [ ] Form labels and inputs align correctly

---

## Locale-Specific Formatting

Dates, numbers, and currency must be formatted according to the user's locale.
The project uses the built-in `Intl` API (no external dependency required for
Node.js LTS and modern browsers).

**Date formatting:**

```javascript
const date = new Date('2026-08-13T10:30:00Z');

new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(date);
// "August 13, 2026"

new Intl.DateTimeFormat('[lang-1]', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(date);
// "[locale-formatted date]"

new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full', timeStyle: 'short'
}).format(date);
// "Thursday, August 13, 2026 at 10:30 AM"
```

**Number formatting:**

```javascript
const number = 1234567.89;

new Intl.NumberFormat('en-US').format(number);
// "1,234,567.89"

new Intl.NumberFormat('[lang-1]').format(number);
// "[locale-formatted number]"

new Intl.NumberFormat('de-DE').format(number);
// "1.234.567,89"
```

**Currency formatting:**

```javascript
const amount = 1299.99;

new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
}).format(amount);
// "$1,299.99"

new Intl.NumberFormat('[lang-1]', {
  style: 'currency', currency: '[CUR]'
}).format(amount);
// "[locale-formatted currency]"

new Intl.NumberFormat('ja-JP', {
  style: 'currency', currency: 'JPY'
}).format(amount);
// "￥1,300"
```

**Relative time formatting:**

```javascript
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-1, 'day');
// "yesterday"

new Intl.RelativeTimeFormat('[lang-1]', { numeric: 'auto' }).format(-1, 'day');
// "[locale-formatted relative time]"
```

**Plural rules:**

```javascript
new Intl.PluralRules('en').select(0);  // "other"
new Intl.PluralRules('en').select(1);  // "one"
new Intl.PluralRules('en').select(2);  // "other"

// Some languages have more plural forms (e.g., Arabic: zero, one, two, few, many, other)
new Intl.PluralRules('ar').select(2);  // "two"
```

**Formatting config per locale:** Store locale-specific formatting defaults
(currency, first day of week, timezone defaults) in a config file rather than
hardcoding them:

```javascript
// src/config/locale-formats.js
module.exports = {
  'en': { currency: 'USD', firstDayOfWeek: 0 },
  '[lang-1]': { currency: '[CUR]', firstDayOfWeek: [0/1] },
  'de': { currency: 'EUR', firstDayOfWeek: 1 }
};
```

---

## Translation Tools

The project is tool-agnostic but recommends the following. Replace
`[Translation Tool]` with the chosen tool in your deployment.

| Tool | Type | Use Case | Notes |
| :--- | :--- | :--- | :--- |
| **i18next** | Runtime library (JS) | String loading, interpolation, pluralization, fallback | Recommended runtime; works in Node.js and browser |
| **FormatJS (intl-messageformat)** | Runtime library (JS) | ICU MessageFormat for complex interpolation | Use when you need gender, plurals, and nested formatting |
| **[Translation Tool]** (Crowdin) | Translation platform | Collaborative translation, translation memory, glossary | For teams needing a translator UI and workflow |
| **[Translation Tool]** (Transifex) | Translation platform | Similar to Crowdin; enterprise focus | Alternative platform |
| **i18n-ally** (VS Code extension) | Editor integration | Inline preview of translations, missing-key detection | Developer convenience |

**Recommended stack:**

- **Runtime:** i18next (or FormatJS for ICU MessageFormat needs)
- **Platform:** [Translation Tool] for translator collaboration
- **Extraction:** `i18next-parser` or equivalent CLI
- **Editor:** i18n-ally for inline previews

**Extraction example (i18next-parser):**

```bash
# Extract all t() calls from src/ and update locale files
npx i18next-parser --config i18next-parser.config.js
```

---

## Translation Quality Assurance

QA ensures translations are accurate, complete, and don't break the UI.

**Automated checks (run in CI, R10 gate):**

| Check | Description | Failure Action |
| :--- | :--- | :--- |
| **Key parity** | Every key in `en` exists in each active locale | Fail the build |
| **No hardcoded strings** | No user-facing string literals in `src/` (outside locale files) | Fail the build (R2) |
| **Interpolation parity** | Every `{{variable}}` in source exists in translations | Fail the build |
| **Coverage threshold** | Active locales ≥ 90% coverage | Warn (don't fail) for Beta; fail for Active |
| **Pseudo-localization** | Run with pseudo-locale; detect layout overflow | Fail on overflow/clipping |

**Manual checks (per locale, per release):**

- Linguistic review by a native speaker
- Context verification (does the translation fit where it appears?)
- Tone and consistency (glossary adherence)
- RTL layout (for RTL locales)

**Coverage report command:**

```bash
npm run i18n:report
```

Example output:

```
Locale   Coverage   Missing   Status
en       100%       0         Source
[lang-1] 94%         12       Active
[lang-2] 71%         87       Beta
[lang-3] 0%          300      Planned
```

---

## Pseudo-Localization for Testing

Pseudo-localization tests internationalization without real translations. It
transforms English strings to simulate translation: lengthening them (to catch
overflow), adding accents (to catch encoding issues), and wrapping them in
brackets (to detect un-extracted hardcoded strings).

**Pseudo-locale transformation rules:**

- Replace ASCII letters with accented equivalents: `a→å`, `e→ë`, `o→ø`, etc.
- Pad the string by ~40% to simulate text expansion (German, French)
- Wrap in brackets `[...]` so un-extracted strings are visible

**Example pseudo-localization function:**

```javascript
const accentMap = {
  a: 'å', b: 'β', c: 'ç', d: 'ð', e: 'ë', f: 'ƒ', g: 'ĝ',
  h: 'ħ', i: 'î', j: 'ĵ', k: 'ķ', l: 'ł', m: 'ɱ', n: 'ñ',
  o: 'ø', p: 'þ', q: 'ǫ', r: 'ř', s: 'š', t: 'ţ', u: 'û',
  v: 'ʋ', w: 'ŵ', x: '×', y: 'ÿ', z: 'ž'
};

function pseudoLocalize(str) {
  const padded = str + '~'.repeat(Math.ceil(str.length * 0.4));
  const accented = padded.replace(/[a-zA-Z]/g, (c) => {
    const lower = c.toLowerCase();
    const replacement = accentMap[lower] || c;
    return c === lower ? replacement : replacement.toUpperCase();
  });
  return '[' + accented + ']';
}

// "Save" → "[Šåvë~~~~~]"
// "Loading..." → "[Łøåðîñg...~~~~~~~~~]"
```

**Using the pseudo-locale:**

1. Add `pseudo` as a locale in the config.
2. Generate the pseudo locale file from English:

```bash
npm run i18n:pseudo
```

3. Switch the UI to the `pseudo` locale.
4. Verify: no text is cut off, no layout breaks, no unbracketed English strings
   appear (unbracketed = hardcoded and not extracted).

---

## Translation Maintenance Schedule

Translations require ongoing maintenance to stay current as the product evolves.

| Cadence | Activity | Owner | Trigger |
| :--- | :--- | :--- | :--- |
| **Per PR (automated)** | Extract strings, check key parity, run pseudo-localization | CI pipeline | Every merge to default branch |
| **Weekly** | Review untranslated/changed keys; dispatch to translators | [i18n Coordinator] | Extraction report |
| **Bi-weekly (per sprint)** | Translate and review new/changed strings | Translators + reviewers | Sprint end |
| **Monthly** | Coverage report; flag locales dropping below threshold | [i18n Coordinator] | Calendar |
| **Quarterly** | Full linguistic QA on each Active locale; glossary update | [i18n Coordinator] + native reviewers | Calendar |
| **Per release** | Verify all Active locales at ≥ 90% before shipping | Release manager | Release gate |

**Maintenance commands:**

```bash
# Weekly: generate extraction report
npm run i18n:extract && npm run i18n:report

# Monthly: check coverage and flag at-risk locales
npm run i18n:report -- --threshold 0.9

# Quarterly: export strings for translator handoff
npm run i18n:export -- --format xliff --locale [lang-1]
```

**When a locale falls below threshold:**

1. The monthly report flags it.
2. [i18n Coordinator] dispatches a translation batch.
3. If not recovered within [2] sprints, the locale is downgraded from Active
   to Beta and hidden from the default locale picker (with a note to users).
4. Recovery restores Active status.

---

## Cross-References

- **Glossary**: `../06_User_Reference/glossary.md` — definitions of i18n, l10n,
  locale, BCP 47, RTL, ICU MessageFormat, pseudo-localization, and related
  terms.
- **Architecture**: `../01_Design_Architecture/arch.md` — system architecture,
  including where the i18n runtime fits and how locale files are loaded.
- **Project charter**: `../../AGENTS.md` — R2 (secure-coding skill enforces no
  hardcoded strings) and R10 (mandatory gate, which includes i18n tests).
