# CLAUDE.md — Pokemon Frontend AI Agent Guidance

This document gives AI agents the context required to reason about and safely modify the `pokemon-frontend` repository.

## Language & Runtime

- **Language:** JavaScript (ES2015+ with JSX)
- **Module system:** ES modules via `react-scripts` (Webpack + Babel under the hood)
- **Node:** v18 or later (for local dev / build)
- **Package manager:** npm

## Frameworks & Major Libraries

| Dependency      | Version  | Purpose |
| --------------- | -------- | ------- |
| `react`         | ^18.2.0  | UI library — functional components + hooks (`useState`, `useEffect`) |
| `react-dom`     | ^18.2.0  | DOM renderer; `createRoot` API entry in `src/index.js` |
| `react-scripts` | 5.0.1    | Create-React-App build/test/dev tooling |

There are no state-management or routing libraries — state is local to `App.js`.

## Architecture Pattern

- **Single-page React application** scaffolded by Create React App.
- **Container/presentational split:** `App.js` is the container (owns state and data fetching); `components/*` are presentational (props in → JSX out).
- **Client-side filtering:** the full Pokemon list is fetched once on mount, then filtered in-browser as the user changes filter inputs. The backend supports the same filters via query params, but the current implementation only uses them implicitly through `/api/pokemons` (no params, fetch-all).

## File Map

| Path                                | Role |
| ----------------------------------- | ---- |
| `public/index.html`                 | HTML shell — defines `<div id="root">` |
| `public/manifest.json`              | PWA metadata |
| `src/index.js`                      | React entry point — mounts `<App />` in StrictMode |
| `src/index.css`                     | Global resets / typography |
| `src/App.js`                        | Top-level container: data fetching, filter state, layout |
| `src/App.css`                       | Layout styling for `App` |
| `src/components/PokemonCard.js`     | Single Pokemon card (image, name, types, legendary badge) |
| `src/components/PokemonCard.css`    | Card styles + per-type color classes |
| `src/components/FilterBar.js`       | Controlled inputs for name / type / legendary |
| `src/components/FilterBar.css`      | Filter bar styles |
| `src/components/LoadingSpinner.js`  | Animated Pokeball loading indicator |
| `src/components/LoadingSpinner.css` | Spinner animation |
| `.env.example`                      | Template for `REACT_APP_API_URL` |
| `package.json`                      | Dependencies, scripts, `proxy` setting for dev |

## Environment & Configuration

- `REACT_APP_API_URL` — base URL of the backend API. Defaults to `http://localhost:3001` when unset.
- `proxy` in `package.json` — forwards unmatched dev-server requests to `http://localhost:3001`.

## Conventions & Constraints

- **Functional components only.** No class components anywhere in the codebase.
- **Hooks:** `useState` for state, `useEffect` with explicit dependency arrays for side effects.
- **No TypeScript.** Stay in plain JS/JSX; do not introduce `.ts`/`.tsx` files without an explicit request.
- **CSS-per-component.** Each component imports a co-located `.css` file. Class names are kebab-case and unscoped.
- **Data contract with backend.** Components assume the backend response shape `{ success, count?, data }` and Pokemon objects of `{ id, name, type[], legendary, image }`. Any field rename here must be paired with the corresponding change in `pokemon-backend/server.js`.
- **Filtering rules** (must stay in sync with backend):
  - `name`: case-insensitive `includes` substring match
  - `type`: case-insensitive exact match against any element of `pokemon.type`
  - `legendary`: empty string = show all; `'true'` = legendary only; `'false'` = non-legendary only
- **Error handling:** failed fetches render an error panel with a Retry button; missing images fall back to `/placeholder-pokemon.png`.

## Safe Code-Generation Notes

- Keep the existing dependency array semantics in `useEffect` blocks — silently dropping a dependency causes stale-closure bugs.
- The fetch call uses two requests in `Promise.all`. If you add a third, update the destructuring and the `.ok` guard together.
- Per-type color CSS classes (`.type-fire`, `.type-water`, …) live in `PokemonCard.css`. Adding new Pokemon types in the backend requires a matching class here, otherwise the badge falls back to default styling.
- The component tree is shallow — prefer adding new sibling components under `src/components/` and lifting state into `App.js` rather than building deeper hierarchies.

## Scripts

| Script | Action |
| ------ | ------ |
| `npm start`        | Dev server on `http://localhost:3000` with hot reload |
| `npm run build`    | Production build into `build/` |
| `npm test`         | Runs the Jest test runner from CRA (no tests currently defined) |
| `npm run docker:build` | Build a Docker image tagged `pokemon-frontend` |
| `npm run docker:run`   | Run the image, mapping host `3002` → container `80` |
