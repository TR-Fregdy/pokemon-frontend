# `src/` — Application Source

## Purpose

This directory contains all source code processed by Create React App's build pipeline. Everything under here is compiled, bundled, and emitted into `build/` by `npm run build`, or served live by `npm start`.

## Key Files

| File | Responsibility |
| ---- | -------------- |
| `index.js`     | React entry point. Creates the React 18 root via `ReactDOM.createRoot` and renders `<App />` inside `<React.StrictMode>`. |
| `index.css`    | Global styles — body resets, base typography, smooth scrolling. Applied app-wide. |
| `App.js`       | Top-level container component. Owns all application state (`pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`), fetches the dataset on mount, applies client-side filtering, and renders the page layout. |
| `App.css`      | Layout styles for the `App` shell — `app-header`, `main-content`, `results-info`, `pokemon-grid`, error/empty states. |

## Subdirectories

- [`components/`](./components/README.md) — Presentational React components (cards, filter bar, loading spinner).

## How This Directory Connects to the Rest of the System

- `index.js` is the build target referenced by Create React App; it mounts the React tree into `<div id="root">` declared in [`../public/index.html`](../public/README.md).
- `App.js` issues `fetch` calls to the `pokemon-backend` API at `${REACT_APP_API_URL}/api/pokemons` and `/api/types`.
- Components in [`components/`](./components/README.md) receive props from `App.js` (filters, types, list of Pokemon, change handlers).

## Conventions

- Functional components and hooks only — no classes.
- Co-locate `.css` next to each component (`App.css` next to `App.js`, etc.).
- Keep `App.js` as the single source of truth for cross-component state.

## See Also

- Architectural overview: [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
- AI agent guidance: [`../CLAUDE.md`](../CLAUDE.md)
