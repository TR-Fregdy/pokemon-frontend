# CLAUDE.md — AI Agent Guidance

This file provides context for AI agents (Claude, Copilot, etc.) to reason accurately about this codebase and generate safe, compatible code.

## Programming Languages and Versions

- **JavaScript (ES6+)** — All source code is written in modern JavaScript using ES modules, arrow functions, destructuring, template literals, async/await, and optional chaining.
- **CSS3** — Component-scoped stylesheets using modern features (Grid, Flexbox, animations, gradients, backdrop-filter).
- **HTML5** — Single `index.html` entry point in `public/`.

## Frameworks and Major Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | ^18.2.0 | UI component framework (functional components + hooks) |
| React DOM | ^18.2.0 | DOM rendering for React |
| react-scripts | 5.0.1 | Create React App tooling (Webpack, Babel, ESLint, Jest) |

> **Note:** This project intentionally keeps its dependency footprint minimal — no routing library, no state management library, no CSS-in-JS library.

## Architecture Pattern

- **Single-Page Application (SPA)** with a single route.
- **Container / Presentational component pattern:**
  - `App.js` is the sole container component — it owns all state, performs data fetching, and orchestrates filter logic.
  - `FilterBar`, `PokemonCard`, and `LoadingSpinner` are stateless presentational components that receive data via props.
- **Client-side filtering:** Data is fetched once from the backend API on mount; all subsequent filtering is performed in-memory in the browser.

## Key Technical Details

### State Management
All application state is managed via React `useState` hooks in `App.js`:
- `pokemons` — Full dataset from the API.
- `filteredPokemons` — Subset after applying filters.
- `types` — Available Pokemon types (for filter dropdown).
- `filters` — Current filter criteria `{ name, type, legendary }`.
- `loading` / `error` — UI state flags.

### API Integration
- Base URL configured via `REACT_APP_API_URL` environment variable (defaults to `http://localhost:3001`).
- Two endpoints consumed:
  - `GET /api/pokemons` → `{ data: Pokemon[] }`
  - `GET /api/types` → `{ data: string[] }`
- Requests are made in parallel using `Promise.all()` inside a `useEffect` on mount.

### Build & Deployment
- Built with Create React App (Webpack under the hood).
- Production deployment uses a multi-stage Docker build: Node 20 Alpine for building, Nginx Alpine for serving.
- Nginx is configured for SPA routing (`try_files $uri $uri/ /index.html`).

## Constraints, Conventions, and Assumptions

1. **No TypeScript** — The project uses plain JavaScript. Do not introduce `.ts` or `.tsx` files.
2. **No routing library** — There is a single view. If routing is added, `react-router-dom` would be the expected choice.
3. **No global state library** — State lives in `App.js` and flows down via props. Do not introduce Redux, Zustand, or similar without explicit instruction.
4. **CSS conventions** — Each component has a co-located `.css` file with BEM-like class names (e.g., `.pokemon-card`, `.filter-bar`). Do not introduce CSS Modules, Tailwind, or styled-components.
5. **Functional components only** — No class components. Use hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) for all logic.
6. **Backend dependency** — The app expects a REST API at the configured `REACT_APP_API_URL`. The backend is a separate service (not in this repo).
7. **Environment variables** — Must be prefixed with `REACT_APP_` to be accessible at build time (Create React App convention).
8. **Browser support** — Targets browsers with >0.2% market share, excluding dead browsers and Opera Mini (per `browserslist` in `package.json`).
9. **Proxy in development** — `package.json` has `"proxy": "http://localhost:3001"` to forward API requests during local development.

## Notes for Safe Code Generation

- When adding new components, follow the existing pattern: create a `.js` file and a co-located `.css` file in `src/components/`.
- Image error handling uses an `onError` fallback to `/placeholder-pokemon.png`. Keep this pattern for any new image rendering.
- Filter logic in `App.js` uses sequential `.filter()` calls. New filters should be appended to this chain.
- The `PokemonCard` component uses a `typeColors` map for dynamic styling. When supporting new Pokemon types, add entries to this map.
- All CSS animations use `@keyframes` in the component's own CSS file. Keep animations scoped to their component.
- Docker Compose exposes frontend on port `3002` and backend on port `3001`.
