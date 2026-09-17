# Page Index

The showcase presents **curated, controls-driven** demos (one demo may combine several features and
is driven by live toggle switches, with a code snippet that updates as you toggle). Granular,
per-feature and bleeding-edge demos live in the library repo's `examples-*.html` files
(`../web-multiselect`), which are for development.

## Feature pages (`/features/*`)

| Route | Covers |
|-------|--------|
| [basic](/features/basic) | Options, search, single/multiple, badges display mode, inline clear (v2), counter |
| [data-api](/features/data-api) | Data shapes (members/callbacks/tuples), `value-format`, imperative API (open/close/search/scroll-to) |
| [events-callbacks](/features/events-callbacks) | Events + `on*` twins, `beforeSelectCallback` veto, add-new creation (v2) |
| [tree](/features/tree) | Path-member trees, `checkbox-mode`, `cascade-select-policy`, selectable-leaves |
| [custom-rendering](/features/custom-rendering) | `renderOptionContentCallback`, whole-badge `renderBadgeCallback` (v2) |
| [action-buttons](/features/action-buttons) | Built-in + custom actions, dynamic visibility/disabled/text callbacks |
| [tooltips](/features/tooltips) | Option & badge tooltips, placement, follow-cursor, styling |
| [responsive](/features/responsive) | `mobile-presentation`, `collapse-badges-below` (v2), RTL |
| [external-search](/features/external-search) | `searchCallback`, debounce, min length, AbortSignal |
| [virtual-scrolling](/features/virtual-scrolling) | 15k options, scroll-to API (v2) |
| [positioning](/features/positioning) | Containing-block gotchas, `lock-placement`, `max-height` |
| [theming](/features/theming) | `--ms-rem` scaling, base-icon contract, CSS variables |
| [logging](/features/logging) | Global registry + per-instance logging |

## API reference (`/api/*`)

| Route | Covers |
|-------|--------|
| [properties](/api/properties) | Every observed HTML attribute |
| [events](/api/events) | `select` / `deselect` / `change` / `add` (v2) |
| [methods](/api/methods) | Public JS API (selection, dropdown, search & scroll, messaging) |
| [callbacks](/api/callbacks) | Data extraction, rendering, hooks, add-new |
| [css-variables](/api/css-variables) | Theming variables |
| [security](/api/security) | Raw-HTML rendering callbacks & sanitization |
| [migration](/api/migration) | v1 → v2 breaking changes |

## Authoring

All the data behind the API pages lives in `src/lib/demo/api-data.ts`. Demos are built with the
harness in `src/lib/demo/` — see `CLAUDE.md` and the canonical `src/routes/features/basic/+page.svelte`.
