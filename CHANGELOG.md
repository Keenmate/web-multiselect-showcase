# Changelog

All notable changes to web-multiselect-showcase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed — v2.0.0 rebuild
- **Updated `@keenmate/web-multiselect` to `^2.0.0`** (from `^1.11.0`). The navbar version badge auto-derives from the installed package, so it now reads `v2.0.0`.
- **New interactive-demo harness** (`src/lib/demo/`): the showcase now presents *curated, controls-driven* demos instead of many static sections. `DemoPlayground.svelte` renders a live `<web-multiselect>`, a panel of toggle/select/number controls, and a **Quick usage** code snippet that updates live from the current control state (`codegen.ts`). Supporting pieces: `Control.svelte`, `PropTable.svelte`, `samples.ts` (shared datasets) and `api-data.ts` (the single source of truth for the API-reference pages).
- **Restructured navigation to the 13-topic taxonomy** matching the library's example suite:
  - Features: `basic`, `data-api`, `events-callbacks`, `tree`, `custom-rendering`, `action-buttons`, `tooltips`, `responsive` (incl. RTL), `external-search`, `virtual-scrolling`, `positioning`, `theming`, `logging`.
  - API Reference: `properties`, `events`, `methods`, `callbacks`, `css-variables`, `security`, `migration`.
  - Removed the old `features/{groups,flexible-data,value-format,form-integration,async-search,display-modes,rtl,advanced-features,custom-styling}` and `api/{component,logging}` routes (folded into the new pages).
- **Documented every v2.0.0 feature**: add-new creation mode (async `addNewCallback`, `allow-add-new`, the new `add` event), imperative open/close (`open`/`close`/`toggle`/`isOpen`), search-text control (`search`/`searchText`/`clearSearch`), the scroll-to API (`scrollToIndex`/`scrollToValue`/`scrollToGroup`), tree mode (path members, `checkbox-mode`, `cascade-select-policy`, selectable-leaves), container-responsive `collapse-badges-below`, the inline `show-clear` button, `renderBadgeCallback`, overlay groups, and the base-icon theming contract.
- **New `api/migration` page** documenting the v1 → v2 breaking changes — most importantly that the `onSelect`/`onDeselect`/`onChange` handler properties now receive a `CustomEvent`, plus the removed field-shell CSS variables.
- **Homepage & getting-started refreshed** for v2.0.0: new feature cards (tree, add-new, scroll-to), dropped the stale "25× / 99.8%" benchmark copy, fixed the `document.querySelector('multi-select')` bug, modernized the Svelte example to runes, and added a v2 upgrade banner linking to the migration notes.

### Previous (v1.11.0)
- **Updated `@keenmate/web-multiselect` to `^1.11.0`** (from `^1.10.0`). The navbar version badge auto-derives from the installed package, so it now reads `v1.11.0`.
  - **Automatic OS-aware dark mode** — the library's `--base-*` color defaults now resolve via CSS `light-dark()`. A page-level `color-scheme: dark` yields readable dark defaults with zero `--ms-*` overrides. Documented in `features/custom-styling` via a new "New in v1.11.0" callout and a note on the custom dark-theme demo (manual full overrides are now opt-in, not required for basic dark support).
  - **Dropdown positioning hardened** (library-internal, no showcase code change) — fixes sideways drift when an option is wider than the input, and mis-anchoring when an ancestor uses `container-type` / `contain`; a one-time `console.warn` now names the culprit element when a containing-block property still forces drift.
  - **`--base-*` theming taxonomy realigned** in the library (`--base-primary-bg` → `--base-hover-bg`, `--base-primary-bg-hover` → `--base-active-bg`). The showcase does not override these hooks (it themes via `--ms-*`), so no page changes were required; the migration note is surfaced in `features/custom-styling` for consumers who do.

### Fixed
- **Eliminated drift between showcase and `@keenmate/web-multiselect` v1.10.0 API**
  - `pills-*` attributes renamed to `badges-*` (the rename landed in library v1.8.0 but several pages still used the old names) — covers `pills-position`, `pills-threshold`, `pills-threshold-mode`, `pills-display-mode` in `features/rtl`, `features/virtual-scrolling`, `features/display-modes`, and `api/properties` (the tip example)
  - Callback renames (library v1.6.0): `getCountBadgeCallback` → `getCounterCallback`; `renderSelectionBadgeContentCallback` → `renderSelectedItemContentCallback`; `getSelectionBadgeClassCallback` → `getSelectedItemClassCallback`. Affected `features/rtl`, `features/display-modes`, `features/virtual-scrolling`
  - Homepage form snippet: `form-value-format` → `value-format` (correct attribute name) and removed non-existent `allow-select-all` / `allow-clear-all` attributes; also fixed the JS selector from `document.querySelector('multi-select')` to `'web-multiselect'`
  - Virtual-scrolling demo: removed non-existent `show-select-all="true"` attribute; fixed `placeholder` → `search-placeholder`
  - Section title labels: `DM07/DM08 Pills Position` → `Badges Position`, `DM09 Pills Threshold` → `Badges Threshold`, `RTL04 RTL Pills Positions` → `RTL Badges Positions`

### Changed
- **Removed `CS01 Input Size` section** from `features/custom-styling` — the `input-size` attribute was removed in library v1.5.0 and replaced by `--ms-rem` scaling. Renumbered remaining sections: `CS02 → CS01` (`--ms-rem` scaling), `CS03 → CS02` (fine-grained control), `CS04 → CS03` (theming), `CS05 → CS04` (variables reference). Page overview and "Quick Reference" table updated to match
- **Replaced the v1.8.0 breaking-change alert** in custom-styling with a v1.10.0 "What's new" block pointing to `THEMING.md`, the SVG X icon mask approach, and the three new `--ms-*-icon-size` variables
- **`EXAMPLES.md`**: All `/examples/*` quick-lookup links updated to the actual `/features/*` route paths; CS-prefix table updated to reflect the renumbered sections
- **`api/properties` page**: "Initial Values" section renamed to "Declarative Data & Initial Values" and now documents the new `data-options` attribute added in library v1.10.0 alongside `initial-values`

### Security
- **Cleared `npm audit` to 0 vulnerabilities** by bumping direct deps and tightening the `overrides` block
  - `@sveltejs/kit` `^2.58.0` → `^2.61.0` (GHSA-hgv7-v322-mmgr: `query.batch` cross-talk)
  - `svelte` `^5.55.5` → `^5.55.9` (4 SSR-XSS / ReDoS advisories <= 5.55.6)
  - `overrides.devalue` `^5.7.1` → `^5.8.1` (GHSA-77vg-94rm-hx3p: DoS via sparse array deserialization)
  - Added `overrides.mermaid: ^11.15.0` (4 advisories in 11.x ≤ 11.14.0, transitive via `@keenmate/svelte-docs`)
- **Updated `@keenmate/svelte-docs`** range from `^1.0.0-rc09` to `^1.0.0-rc11` (was already resolving to rc11 via pre-release semver matching; pinning explicitly for clarity)

### Changed
- **Updated @keenmate/web-multiselect** to `^1.8.5`
  - v1.8.5: RTL inline badge margin fix, new `--ms-inline-align` CSS variable for vertical alignment
  - v1.8.0: **BREAKING** - CSS variable naming consolidation (`background` → `bg` for shorter names)
    - All `--ms-*-background*` variables renamed to `--ms-*-bg*` (35+ variables)
    - All `--base-*-background*` variables renamed to `--base-*-bg*` (8 variables)
    - `--ms-text-on-accent` → `--ms-text-color-on-accent`
    - `--base-text-on-accent` → `--base-text-color-on-accent`
  - v1.7.0: Generic border variable, checkbox/option/badge color fixes
  - v1.6.1: Complete theming variable cascade fix (`--base-*` variables now properly cascade)
  - v1.6.0: SCSS to CSS migration, new features

- **Restructured navigation** - Moved all pages from `/examples/*` to `/features/*` to match web-daterangepicker-showcase structure
  - Removed "Examples" navigation section
  - All example pages now under "Features" section: Basic Usage, Groups, Flexible Data, Value Format, Form Integration, Async Search, Virtual Scrolling, Display Modes, RTL Support, Advanced Features, Custom Styling
  - Custom Styling page restructured with live demos (CS01-CS05 sections)
  - Deleted old `api/styling` page (merged into Custom Styling)
  - Updated all internal links to use `/features/*` routes

- **Updated API Reference documentation** to match current component API
  - `/api/component`: Added missing callbacks (getBadgeDisplayCallback, getBadgeClassCallback, renderGroupLabelContentCallback, beforeSearchCallback, customStylesCallback), new Rendering Callbacks section, Tooltip Callbacks section, Action Buttons section, updated version example to 1.8.0
  - `/api/properties`: Fixed attribute names (`pills-*` → `badges-*`), removed non-existent attributes (allow-select-all, allow-clear-all), added missing attributes (dropdown-max-width, keep-options-on-search, should-keep-search-on-close, search-mode, actions-layout, remove-button-tooltip-text), added Virtual Scrolling section
  - `/api/events`: Fixed component selector in examples (`multi-select` → `web-multiselect`)

### Added
- **Compile-time version badge** - Version now displayed in navbar, extracted from package-lock.json at build time via Vite's `define` feature
  - Handles both normal npm dependencies and `file:` links for local development
  - Badge moved into navbar on mount for consistent positioning

- **Example Index System** - Added prefix codes to all 51 examples across 11 pages for quick reference
  - Created `EXAMPLES.md` with complete lookup table and prefix reference
  - Prefixes: BU (Basic Usage), GR (Groups), FD (Flexible Data), VF (Value Format), FI (Form Integration), AS (Async Search), VS (Virtual Scrolling), CS (Custom Styling), DM (Display Modes), RTL (RTL Support), AF (Advanced Features)
  - Each `ShowcaseSection` title now includes its example code (e.g., "BU01 Basic Multiselect", "DM05 Compact Mode")

### Changed
- **Updated @keenmate/svelte-docs** from `1.0.0-rc08` to `1.0.0-rc09`
  - Migrated Plausible analytics from `app.html` to `analyticsScripts` config option

### Added
- **Groups Example Page** - New dedicated `/examples/groups` page documenting group customization features
  - Custom Group Labels section demonstrating `renderGroupLabelContentCallback` with string returns (emoji + uppercase)
  - Group Styling section showcasing all CSS variables for group appearance customization
  - Advanced Customization section combining callbacks + styling with HTMLElement returns (colored dot indicators)
  - Complete CSS variables reference for groups (`--ms-group-*` properties)
  - Code examples for both string and HTMLElement callback return patterns
