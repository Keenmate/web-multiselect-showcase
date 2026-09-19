# web-multiselect-showcase

The showcase & documentation site for [`@keenmate/web-multiselect`](https://github.com/keenmate/web-multiselect) —
a SvelteKit static site with curated, controls-driven demos and a full API reference.

## Develop

```sh
npm install
npm run dev      # http://localhost:5174
```

Use `make link-lib` / `make rebuild-lib` to develop against a local build of `../web-multiselect`.

## Build

```sh
npm run build    # static site → build/  (adapter-static)
npm run preview  # preview the production build
npm run check    # svelte-check
```

## Structure

- `src/routes/features/*` — feature demos (basic, data-api, tree, custom-rendering, …)
- `src/routes/api/*` — API reference (properties, events, methods, callbacks, css-variables, security, migration)
- `src/lib/demo/*` — the interactive-demo harness (`DemoPlayground`, controls, live code generation) and
  `api-data.ts`, the single source of truth for the API pages.

See `CLAUDE.md` for architecture notes and `EXAMPLES.md` for the page index.
