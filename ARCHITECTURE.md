# ARCHITECTURE.md — pokemon-frontend

High-level architectural overview of the Pokemon Frontend single-page
application.

---

## 1. Purpose

`pokemon-frontend` is a client-side React application that fetches the
Pokemon catalog from the companion `pokemon-backend` API and provides
an interactive UI to search and filter Pokemon by name, type, and
legendary status.

## 2. Technology Stack

| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Language        | JavaScript (JSX, ES Modules)                 |
| UI Framework    | React 18 (functional components + hooks)    |
| Build Tooling   | react-scripts 5 (Create React App)           |
| HTTP Client     | Native `fetch` API                           |
| Styling         | Plain CSS (per-component)                    |
| Dev Server      | Webpack dev server (`react-scripts start`)   |
| Prod Server     | Nginx (in Docker image)                      |
| Packaging       | Docker multi-stage build (`.tr-codegen/`)    |

## 3. High-Level System Diagram

```
          ┌──────────────────────────────────────────────────┐
          │                    Browser                       │
          │                                                  │
          │  ┌──────────────────────────────────────────────┐│
          │  │  index.html  →  <div id="root"></div>        ││
          │  │         │                                     ││
          │  │         ▼                                     ││
          │  │  React (index.js → App)                       ││
          │  │     ├─ FilterBar                              ││
          │  │     ├─ PokemonCard (×N)                       ││
          │  │     └─ LoadingSpinner                         ││
          │  └──────────────────────────────────────────────┘│
          └───────────────────┬──────────────────────────────┘
                              │ fetch() JSON
                              ▼
                 ┌───────────────────────────┐
                 │  pokemon-backend :3001    │
                 │  GET /api/pokemons        │
                 │  GET /api/types           │
                 └───────────────────────────┘
```

## 4. Major Components

### 4.1 Entry Shell (`public/index.html` + `src/index.js`)
- `index.html` provides the static shell with a single `#root` mount
  point and document metadata.
- `index.js` bootstraps React 18 via `ReactDOM.createRoot` under
  `<React.StrictMode>`.

### 4.2 Application Container (`src/App.js`)
- Only stateful component in the tree.
- Holds: `pokemons`, `filteredPokemons`, `types`, `filters`, `loading`,
  `error`.
- Two `useEffect` hooks:
  1. On mount: parallel fetch of `/api/pokemons` and `/api/types`.
  2. On filter or dataset change: re-applies the three filters and
     recomputes `filteredPokemons`.

### 4.3 Presentational Components (`src/components/`)
| Component       | Role                                              |
| --------------- | ------------------------------------------------- |
| `FilterBar`     | Renders the name input, type `<select>`, legendary `<select>`, and a conditional "Clear Filters" button. Fires `onFilterChange` on every change. |
| `PokemonCard`   | Renders a single Pokemon tile (image, name, type badges, id, legendary ribbon). Handles broken images via `onError`. |
| `LoadingSpinner`| Animated Pokeball shown while the initial fetch is in flight. |

## 5. Data Flow / Request Lifecycle

```
 mount
   │
   ▼
 useEffect #1 ──▶ Promise.all(fetch /api/pokemons, fetch /api/types)
                     │
                     ├─ ok ─▶ setPokemons, setTypes, setLoading(false)
                     └─ err ─▶ setError, setLoading(false)
   │
   ▼
 render:
   loading   ──▶ <LoadingSpinner/>
   error     ──▶ error screen + Retry
   default   ──▶ <FilterBar/> + <PokemonCard/> grid

 user changes a filter
   │
   ▼
 FilterBar.onFilterChange(newFilters)
   │
   ▼
 App.setFilters(...)
   │
   ▼
 useEffect #2 (deps: [filters, pokemons])
   │
   ▼
 setFilteredPokemons(filtered)
   │
   ▼
 React re-renders grid
```

## 6. State Model

Single slice owned by `App`:

```js
filters = {
  name:      '',           // free-text substring
  type:      '',           // exact match (case-insensitive), '' = all
  legendary: '' | 'true' | 'false'
}
```

Deriving from this slice:
- `filteredPokemons` = `pokemons` with the three filters applied.
- `hasActiveFilters` (computed inside `FilterBar`) toggles the Clear
  button.

## 7. Key Design Decisions

- **Client-side filtering** over fetch-per-filter. The dataset is small
  (~12 items) so filtering locally is simpler and avoids latency.
- **One stateful container** (`App`). Avoids the complexity of context
  or an external store for a feature this small.
- **Plain CSS** rather than a CSS framework. Keeps the dependency
  surface minimal; per-component `.css` files co-locate styles with
  their JSX.
- **Env-driven API base URL** (`REACT_APP_API_URL`) — enables the same
  build to run against local, staging, or production backends.
- **Graceful error screen with Retry** — simple reload-based recovery
  works because no user input is lost (the app is read-only).

## 8. Module / Dependency Graph

```
index.js
  └─▶ App.js
        ├─▶ App.css
        ├─▶ components/PokemonCard.js ─▶ PokemonCard.css
        ├─▶ components/FilterBar.js   ─▶ FilterBar.css
        └─▶ components/LoadingSpinner.js ─▶ LoadingSpinner.css
```

External:
- `react`, `react-dom` — runtime.
- Browser `fetch` — HTTP.

## 9. Deployment Architecture

```
┌────────────────────────────────────────────────────────────┐
│  Build stage (node:18-alpine)                              │
│    npm install → npm run build → /app/build                │
└────────────────────────────────────────────────────────────┘
                             │ copies /build
                             ▼
┌────────────────────────────────────────────────────────────┐
│  Runtime stage (nginx:alpine)                              │
│    /usr/share/nginx/html  ← build artifacts                │
│    /etc/nginx/conf.d/default.conf ← .tr-codegen/nginx.conf │
│    EXPOSE 80                                               │
└────────────────────────────────────────────────────────────┘
```

Production features baked into the Nginx layer:
- Gzip compression
- Static-asset caching
- SPA fallback (`try_files ... /index.html`)
- Security headers

## 10. External Integrations

- **Pokemon Backend** — REST API at `REACT_APP_API_URL` (default
  `http://localhost:3001`). See the backend repo's `ARCHITECTURE.md`.
- **Pokemon sprites** — images are absolute URLs on
  `raw.githubusercontent.com/PokeAPI/sprites`, loaded directly by the
  browser from each `PokemonCard`.

## 11. File Structure Hierarchy

```
pokemon-frontend
├── public/
│   ├── index.html                    # SPA shell
│   └── manifest.json                 # PWA metadata
├── src/
│   ├── index.js                      # React bootstrap
│   ├── index.css                     # global styles
│   ├── App.js                        # stateful container
│   ├── App.css
│   └── components/
│       ├── FilterBar.js / .css
│       ├── PokemonCard.js / .css
│       └── LoadingSpinner.js / .css
├── .tr-codegen/                      # Docker assets (hidden tooling)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── package.json
└── package-lock.json
```

## 12. Related Docs

- [README.md](./README.md) — user-facing setup & usage.
- [CLAUDE.md](./CLAUDE.md) — AI-agent constraints & conventions.
- [src/README.md](./src/README.md) — source tree overview.
- [src/components/README.md](./src/components/README.md) — component
  responsibilities.
- [public/README.md](./public/README.md) — static assets.
