# src/

Source root for the `pokemon-frontend` React application. All
JavaScript, JSX, and CSS that ships in the bundle lives under this
directory.

## Purpose

This directory contains the application entry point, the top-level
container component, global styles, and the `components/` subtree. It
is the target of the `react-scripts` build — every import tree starts
from `src/index.js`.

## Key Files

| File        | Responsibility                                                |
| ----------- | ------------------------------------------------------------- |
| `index.js`  | Boots React 18 via `ReactDOM.createRoot` and renders `<App/>` inside `<React.StrictMode>`. Mounts to the `#root` element declared in `public/index.html`. |
| `index.css` | Global styles (body, resets, font stack).                     |
| `App.js`    | Top-level stateful container. Owns all application state: the Pokemon list, available types, active filters, loading flag, and error flag. Performs the initial data fetch (in parallel) and re-applies filters when they change. |
| `App.css`   | Styles for the shell: header, grid, results-info, error and empty states. |

## Subdirectories

| Folder         | Purpose                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| `components/`  | Presentational, stateless components used by `App.js` (see [components/README.md](./components/README.md)). |

## How It Connects

```
public/index.html
      │  <div id="root"></div>
      ▼
src/index.js            ──▶ ReactDOM.createRoot(...).render(<App/>)
      ▼
src/App.js              ──▶ fetch backend, manage filters
      ├─▶ components/FilterBar
      ├─▶ components/PokemonCard (×N)
      └─▶ components/LoadingSpinner
                         │
                         ▼
               pokemon-backend API (JSON)
```

`App.js` resolves the backend URL from
`process.env.REACT_APP_API_URL || 'http://localhost:3001'`. Any new
module that needs to call the backend should reuse this constant
rather than hard-coding a URL.

## Conventions

- Functional components and hooks only — no class components.
- Default-exported components.
- CSS co-located next to its component (`Foo.js` + `Foo.css`).
- Class names in kebab-case.

## Related

- Project overview: [../README.md](../README.md)
- AI-agent guidance: [../CLAUDE.md](../CLAUDE.md)
- Architecture: [../ARCHITECTURE.md](../ARCHITECTURE.md)
