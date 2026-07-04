# src/ - React Application Source

## Purpose

This directory contains all React source code for the Pokemon Frontend application. It houses the main application component, global styles, and the `components/` subdirectory with reusable UI components.

## Key Files

| File | Responsibility |
|------|---------------|
| `index.js` | Application entry point. Creates the React root using `ReactDOM.createRoot()` and renders the `App` component wrapped in `React.StrictMode`. |
| `index.css` | Global CSS styles applied to the entire application. Sets base font family (`-apple-system`, `BlinkMacSystemFont`, etc.) and font smoothing. |
| `App.js` | Main container component. Manages all application state (`pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`), handles API data fetching via `useEffect` with `Promise.all`, implements client-side filter logic, and orchestrates the rendering of child components. |
| `App.css` | Application-level styles including the header gradient, Pokemon grid layout (CSS Grid with `auto-fill`/`minmax`), error and empty state messaging, result count display, and button styles. |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `components/` | Reusable presentational React components (FilterBar, PokemonCard, LoadingSpinner) with co-located CSS files. |

## How It Connects to the System

- **Entry flow**: `public/index.html` loads the bundled JS → `src/index.js` renders `<App />` → `App.js` fetches data from the backend API and renders child components.
- **API integration**: `App.js` fetches from `REACT_APP_API_URL` (defaults to `http://localhost:3001`) on mount, consuming `/api/pokemons` and `/api/types` endpoints.
- **Component tree**: `App.js` renders `LoadingSpinner` (during loading), `FilterBar` (filter controls), and a grid of `PokemonCard` components.
- **Data flow**: Unidirectional - state lives in `App.js`, flows down as props to child components. Filter changes bubble up via callback props.

## Architecture Reference

For a high-level overview of the project architecture, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
