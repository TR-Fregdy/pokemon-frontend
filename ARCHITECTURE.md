# Architecture — Pokemon Frontend

## Overview

`pokemon-frontend` is a React 18 single-page application (SPA) bootstrapped with Create React App. It fetches Pokemon data from `pokemon-backend` once on load and provides a client-side experience for searching and filtering that data.

## Design Goals

- **Zero backend coupling beyond a JSON contract.** The app speaks to the API only via `fetch` and assumes a stable response envelope.
- **Instant, in-browser filtering.** All filtering happens after the data is fetched, so changes to filter inputs are reflected without round-trips.
- **Componentization.** Presentational components remain pure: they accept props and render JSX without state or side effects.

## Component Hierarchy

```
index.html
  └── <div id="root">
        └── <App>                          ← container, owns state
              ├── <FilterBar>              ← controlled inputs
              ├── <LoadingSpinner>         ← shown while initial fetch is in flight
              ├── error panel              ← inline JSX for fetch failures
              └── <PokemonCard> × N        ← one per filtered Pokemon
```

## State Owned by `App`

| State          | Type                              | Purpose |
| -------------- | --------------------------------- | ------- |
| `pokemons`     | `Pokemon[]`                       | Full dataset received from `/api/pokemons` |
| `filteredPokemons` | `Pokemon[]`                   | Derived view shown in the grid |
| `types`        | `string[]`                        | Options for the type `<select>`, from `/api/types` |
| `filters`      | `{ name, type, legendary }`       | Controlled-input values from `FilterBar` |
| `loading`      | `boolean`                         | True until the initial fetch resolves |
| `error`        | `string \| null`                  | Non-null shows the error panel |

## Data Flow

```
                        ┌──────────────────────┐
              mount     │  pokemon-backend     │
   ┌────────────────────▶  GET /api/pokemons   │
   │                    │  GET /api/types      │
   │                    └──────────┬───────────┘
   │                               │ JSON
   │                               ▼
   │             ┌─────────────────────────────────┐
   │             │            App.js               │
   │             │   pokemons, types, loading      │
   │             └───────────────┬─────────────────┘
   │                             │ props
   │     filters ◀────────┐      │
   │                      │      ▼
   │            ┌─────────┴──┐ ┌──────────────────────────────┐
   └────────────│ FilterBar  │ │  pokemon-grid                │
        events  └────────────┘ │  ├─ PokemonCard              │
                               │  ├─ PokemonCard              │
                               │  └─ … (one per filtered row) │
                               └──────────────────────────────┘
```

1. **Mount:** `useEffect` (empty deps) fires `fetchInitialData`, which issues `GET /api/pokemons` and `GET /api/types` in parallel.
2. **Initial render:** `LoadingSpinner` is shown until both responses resolve. Failure sets `error` and the error panel is rendered with a Retry button (a full-page reload).
3. **Filter changes:** The second `useEffect` (deps: `filters`, `pokemons`) recomputes `filteredPokemons` from the in-memory `pokemons` array.
4. **Render:** `PokemonCard` is mapped over `filteredPokemons`. Each card renders the sprite, name, padded ID, type badges, and (when applicable) a legendary badge.

## Filtering Semantics

- **Name** — `pokemon.name.toLowerCase().includes(filter.toLowerCase())`
- **Type** — `pokemon.type.some(t => t.toLowerCase() === filter.toLowerCase())`
- **Legendary** — empty string → no filter; `'true'` → only legendary; `'false'` → only non-legendary.

These rules mirror the backend so that switching to server-side filtering would yield identical results.

## Styling Strategy

- Plain CSS files co-located with each component (`PokemonCard.css`, `FilterBar.css`, `LoadingSpinner.css`).
- Global resets and typography in `src/index.css`.
- Layout (`app-header`, `main-content`, `pokemon-grid`, error/empty states) in `src/App.css`.
- Color tokens per Pokemon type are declared as `.type-<lowercase-type>` classes in `PokemonCard.css`.

## Key Decisions

- **Client-side filtering** keeps the UI snappy and keeps the backend stateless. Because the dataset is small (12 entries) there is no scaling cost.
- **No state library.** `useState` in `App.js` is sufficient and avoids dependency bloat.
- **CRA over a custom Webpack/Vite setup** for tooling familiarity and zero-config defaults.
- **Defensive image loading.** `PokemonCard` swaps in `/placeholder-pokemon.png` on image error so a broken sprite URL never breaks the layout.

## External Dependencies

- `react` / `react-dom` — UI runtime.
- `react-scripts` — dev server, production build, Jest test runner.

## Cross-Repository Coupling

| Consumer (this repo)                    | Producer (`pokemon-backend`)              |
| --------------------------------------- | ----------------------------------------- |
| `App.js` reads `data` from `/api/pokemons` | `server.js` envelope `{ success, count, data }` |
| `App.js` populates `types` from `/api/types` | `server.js` `/api/types` sorted distinct list |
| `PokemonCard.js` reads `id`, `name`, `type[]`, `legendary`, `image` | Pokemon object schema in `mockPokemons` |

Any change to the JSON contract requires a paired change in `pokemon-backend/server.js`.

## Deployment

- **Local dev:** `npm start` → CRA dev server on `:3000`. Requests to `/api/*` are proxied to `localhost:3001` (see `proxy` in `package.json`).
- **Production-ready build:** `npm run build` outputs static assets to `build/`.
- **Container:** `Dockerfile`, `docker-compose.yml`, and `nginx.conf` are staged under `.tr-codegen/` for the build pipeline. The image multi-stages a build container into an Nginx runtime.
