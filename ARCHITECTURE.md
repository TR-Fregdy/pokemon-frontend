# Architecture – `pokemon-frontend`

Conceptual, system-level view of the Pokemon web client. Pair this with
[`README.md`](./README.md) (human-facing) and [`CLAUDE.md`](./CLAUDE.md)
(AI-agent-facing).

---

## 1. Overview

`pokemon-frontend` is a **Create-React-App** single-page application that
browses and filters Pokemon served by `pokemon-backend`. It is a pure browser
client: no server-side rendering, no router, no state library.

## 2. Major Components

| Component        | File                                  | Responsibility                                            |
|------------------|---------------------------------------|-----------------------------------------------------------|
| Entry point      | `src/index.js`                        | Calls `ReactDOM.createRoot` and mounts `<App>`            |
| App shell        | `src/App.js`                          | Fetches data, holds filter state, orchestrates children   |
| Filter controls  | `src/components/FilterBar.js`         | Search-by-name, type select, legendary select, clear btn  |
| Result card      | `src/components/PokemonCard.js`       | Renders one Pokemon with image, types, id badge           |
| Loading UI       | `src/components/LoadingSpinner.js`    | Animated Pokeball shown while fetching                    |
| Global styles    | `src/index.css`, `src/App.css`        | Page-level layout, typography, glassmorphism theme        |
| Static shell     | `public/index.html`, `public/manifest.json` | HTML template, PWA manifest                        |

## 3. Component Tree

```text
<React.StrictMode>
  <App>
    ├─ <header>                     (title + tagline)
    ├─ <LoadingSpinner/>            (while loading)
    ├─ error banner                 (when fetch fails)
    └─ <main>
         ├─ <FilterBar/>
         ├─ results count text
         └─ <div className="pokemon-grid">
              ├─ <PokemonCard/>
              ├─ <PokemonCard/>
              └─ ...
```

## 4. Data Flow & Request Lifecycle

```text
  index.html  ──(script)──▶  index.js  ──▶  <App/>
                                              │
                                              ▼
                               useEffect on mount
                                              │
                 ┌────────────────────────────┴────────────────────────────┐
                 ▼                                                         ▼
   fetch /api/pokemons                                        fetch /api/types
                 │                                                         │
                 ▼                                                         ▼
     setPokemons(data)                                        setTypes(data)
                 │
                 ▼
           (user types / selects)  ──▶  FilterBar → onFilterChange
                                              │
                                              ▼
                                    setFilters({...})
                                              │
                                              ▼
                  useEffect watching [filters, pokemons]
                                              │
                                              ▼
                           setFilteredPokemons([...])
                                              │
                                              ▼
                                <PokemonCard .../> × N
```

Filtering is performed **twice** – once on the server (to minimise payload if
used directly) and once in the browser (for instantaneous feedback as the user
types). Both implementations follow identical semantics.

## 5. Key Architectural Decisions

1. **Create React App** – chosen for zero-config, standard tooling.
2. **No router** – the app has a single view; a router would be over-engineered.
3. **No state library** – local `useState` is sufficient for two fetches and a
   filter object.
4. **Co-located CSS** – each component has a sibling `.css` file; keeps
   concerns visually local and avoids CSS leakage via BEM-style class names.
5. **Environment-driven API URL** – `REACT_APP_API_URL` allows the same bundle
   to point at dev / staging / production backends.
6. **Proxy during dev** – `package.json`'s `proxy` field forwards unknown
   requests to `http://localhost:3001`, sidestepping CORS in dev.

## 6. External Integrations

| System          | Direction | Protocol | Notes                                   |
|-----------------|-----------|----------|-----------------------------------------|
| `pokemon-backend` | outbound | HTTP (fetch) | `/api/pokemons`, `/api/types`         |
| PokeAPI sprites | outbound  | HTTPS (img src) | Images loaded directly by `<img>`; `onError` falls back to `/placeholder-pokemon.png` |

## 7. Directory Layout

```text
pokemon-frontend/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.js            # React entry point
│   ├── index.css           # Global base styles
│   ├── App.js              # Root component
│   ├── App.css             # App-level styles
│   └── components/
│       ├── FilterBar.js / .css
│       ├── PokemonCard.js / .css
│       └── LoadingSpinner.js / .css
├── package.json
└── .env.example
```

## 8. Deployment Topology

```text
┌──────────────────┐   build    ┌──────────────────┐    HTTP    ┌──────────────────┐
│  React source    │ ─────────▶ │ Static bundle    │ ◀────────▶ │  Browser client  │
│  (src/, public/) │            │ (build/ or nginx)│            └──────────────────┘
└──────────────────┘            └────────┬─────────┘                     │
                                         │ proxied /api/*                │ fetch
                                         ▼                               ▼
                                ┌──────────────────────────────────────────┐
                                │ pokemon-backend (Express) on :3001       │
                                └──────────────────────────────────────────┘
```

In production the build output is typically served by Nginx (see
`nginx.conf` referenced in the README). In development, `react-scripts start`
serves the app on `:3000` with HMR.

## 9. Dependencies Between Modules

```text
index.js  ──imports──▶  App.js
   │                       │
   │                       ├──▶ components/FilterBar
   │                       ├──▶ components/PokemonCard
   │                       └──▶ components/LoadingSpinner
   │
   └── index.css (global reset / typography)
```

No circular or cross-component imports; children are leaf components.

## 10. Future Evolution (Non-Binding)

- Promote `App.js` state into a Context if the tree grows beyond two levels.
- Introduce React Router when more than one route is needed.
- Add unit tests with React Testing Library for `FilterBar` and `PokemonCard`.
- Replace the 1:1 server-side filter mirror with server-driven queries when the
  dataset exceeds a few hundred entries.
