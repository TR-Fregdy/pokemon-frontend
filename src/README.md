# `src/` – React Application Source

The JavaScript, JSX, and CSS that make up the Pokemon Explorer single-page
application. Everything in this directory is processed by Create React App's
webpack build.

## Purpose

Hosts the root component, application entry point, global styles, and the
child components rendered by the app shell.

## Key Files

| File         | Responsibility                                                                |
|--------------|-------------------------------------------------------------------------------|
| `index.js`   | Bootstraps React 18 with `createRoot` and mounts `<App />` inside `<React.StrictMode>`. |
| `index.css`  | Global resets, typography, body background gradient.                          |
| `App.js`     | Top-level component. Fetches Pokemon and types from the backend, holds the filter state object, applies client-side filtering, and renders `<FilterBar>` + a grid of `<PokemonCard>` (or a `<LoadingSpinner>` / error banner). |
| `App.css`    | Layout for the header, main content grid, error banner, and no-results panel. |
| `components/`| Leaf components used by `App`. See [`components/README.md`](./components/README.md). |

## Data Flow (Quick Reference)

1. `index.js` renders `<App />`.
2. `App` fires two `fetch` calls on mount:
   `GET ${REACT_APP_API_URL}/api/pokemons` and `/api/types`.
3. User interactions on `FilterBar` update the filter state.
4. A secondary `useEffect` recomputes `filteredPokemons` whenever `filters` or
   `pokemons` changes.
5. The result is rendered as a grid of `PokemonCard`s.

## How It Connects

- Consumes the HTTP API exposed by the sibling `pokemon-backend` repository.
- Mounts into the `#root` element defined by `../public/index.html`.
- Environment variable `REACT_APP_API_URL` (injected by CRA) controls the
  backend base URL; defaults to `http://localhost:3001`.

## Editing Notes

- Prefer **functional components** with hooks – do not introduce class
  components.
- Keep each component's CSS in a sibling `.css` file; do not import styles
  from another component's file.
- Keep the filter-state shape stable: `{ name: string, type: string, legendary: '' | 'true' | 'false' }`.

## Related Docs

- Project overview → [`../README.md`](../README.md)
- System architecture → [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
- AI-agent guidance → [`../CLAUDE.md`](../CLAUDE.md)
