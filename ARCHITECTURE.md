# ARCHITECTURE.md — Pokemon Frontend

This document provides a high-level architectural overview of the Pokemon Frontend application.

## Overall Architecture and Design

The Pokemon Frontend is a **single-page application (SPA)** built with React 18. It follows a **container/presentational component architecture** where a single container component (`App.js`) manages all application state and data fetching, while child components are stateless and purely presentational.

The application fetches Pokemon data from an external REST API at startup, stores it in local component state, and performs all filtering operations client-side in the browser.

```
┌──────────────────────────────────────────────────────────┐
│                      Browser (SPA)                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                   App.js (Container)                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │  │
│  │  │ useState  │  │useEffect │  │  Filter Logic    │  │  │
│  │  │ (state)   │  │ (fetch)  │  │  (client-side)  │  │  │
│  │  └──────────┘  └──────────┘  └─────────────────┘  │  │
│  │         │              │                │          │  │
│  │         ▼              ▼                ▼          │  │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────────┐   │  │
│  │  │ FilterBar  │ │PokemonCard │ │LoadingSpinner│   │  │
│  │  │(search/    │ │(display    │ │(loading UI)  │   │  │
│  │  │ filters)   │ │ pokemon)   │ │              │   │  │
│  │  └────────────┘ └────────────┘ └──────────────┘   │  │
│  └────────────────────────────────────────────────────┘  │
│                          │                               │
│                          │ fetch()                       │
│                          ▼                               │
│              ┌───────────────────────┐                   │
│              │  REST API (Backend)   │                   │
│              │  GET /api/pokemons    │                   │
│              │  GET /api/types       │                   │
│              └───────────────────────┘                   │
└──────────────────────────────────────────────────────────┘
```

## Major Components and Responsibilities

### App.js — Container Component
- **Role:** Application shell and state orchestrator.
- **Responsibilities:**
  - Fetches all Pokemon data and type data from the backend API on mount.
  - Manages all application state (`pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`).
  - Implements client-side filter logic (name search, type filter, legendary filter).
  - Renders the header, filter bar, Pokemon grid, loading spinner, error states, and empty states.
  - Passes data and callbacks to child components via props.

### FilterBar.js — Filter Controls
- **Role:** Search and filter user interface.
- **Responsibilities:**
  - Renders a name search input, type dropdown, and legendary status dropdown.
  - Displays a conditional "Clear Filters" button when any filter is active.
  - Delegates all state changes to the parent `App.js` via callback props.

### PokemonCard.js — Pokemon Display Card
- **Role:** Individual Pokemon visual representation.
- **Responsibilities:**
  - Renders Pokemon image, name, ID, type badges, and legendary indicator.
  - Applies type-specific color styling using a `typeColors` lookup map.
  - Handles image load failures with a fallback placeholder.

### LoadingSpinner.js — Loading Indicator
- **Role:** Visual feedback during data loading.
- **Responsibilities:**
  - Renders an animated Pokeball-style CSS spinner.
  - Displayed conditionally while the initial API fetch is in progress.

## Data Flow and Request Lifecycle

### Initial Load Sequence
```
1. Browser loads index.html
2. React mounts App component
3. useEffect triggers fetchInitialData()
4. Promise.all([
     fetch('/api/pokemons'),  ──→  Backend API
     fetch('/api/types')       ──→  Backend API
   ])
5. Response parsed as JSON
6. setState: pokemons, types, loading=false
7. useEffect triggers applyFilters()
8. filteredPokemons = pokemons (no filters active)
9. React renders: FilterBar + PokemonCard grid
```

### Filter Interaction Flow
```
1. User types in search / selects dropdown
2. FilterBar calls onFilterChange(name, value)
3. App.js updates filters state via handleFilterChange()
4. useEffect detects filters change → runs applyFilters()
5. applyFilters() chains .filter() calls:
   a. Filter by name (case-insensitive partial match)
   b. Filter by type (case-insensitive exact match)
   c. Filter by legendary (boolean comparison)
6. setState: filteredPokemons = result
7. React re-renders PokemonCard grid with filtered data
```

### Error Recovery Flow
```
1. API fetch fails (network error or non-200 status)
2. catch block sets error message and loading=false
3. App renders error UI with "Retry" button
4. User clicks "Retry" → window.location.reload()
5. Full initial load sequence restarts
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Client-side filtering** | Dataset is small (~150 Pokemon). Eliminates network round-trips for filter operations, providing instant UI feedback. |
| **No routing library** | Application has a single view. Adding React Router would be unnecessary overhead. |
| **No state management library** | State is simple and confined to one component tree. React hooks (`useState` + `useEffect`) are sufficient. |
| **Plain CSS (no CSS-in-JS)** | Keeps the dependency count low and CSS easily inspectable. Component-scoped via file naming convention. |
| **Minimal dependencies** | Only React and react-scripts. Reduces bundle size, attack surface, and maintenance burden. |
| **Promise.all for parallel fetch** | Both API calls are independent and can execute concurrently, reducing initial load time. |
| **Container/Presentational split** | Clear separation of concerns: data logic in App.js, rendering in child components. Simplifies testing and reuse. |
| **Multi-stage Docker build** | Keeps the production image small (Nginx Alpine) while using Node for the build step. |
| **Nginx for production serving** | Efficient static file serving with SPA routing support (`try_files`). |

## Dependencies Between Modules

```
src/
├── index.js ──────────────► App.js (mounts the app)
│                              │
│                              ├──► FilterBar.js (receives filters, types, callbacks)
│                              ├──► PokemonCard.js (receives pokemon object)
│                              └──► LoadingSpinner.js (conditionally rendered)
│
├── index.css ─────────────► Global base styles (imported by index.js)
├── App.css ───────────────► App layout styles (imported by App.js)
│
src/components/
├── FilterBar.css ─────────► FilterBar styles (imported by FilterBar.js)
├── PokemonCard.css ───────► PokemonCard styles (imported by PokemonCard.js)
└── LoadingSpinner.css ────► LoadingSpinner styles (imported by LoadingSpinner.js)

public/
├── index.html ────────────► HTML shell (React mounts into #root div)
└── manifest.json ─────────► PWA metadata

.tr-codegen/
├── Dockerfile ────────────► Multi-stage build (Node → Nginx)
├── docker-compose.yml ────► Orchestrates frontend + backend
└── nginx.conf ────────────► Production web server config
```

### External Dependencies

- **Backend REST API** — The application requires a running backend service at the URL specified by `REACT_APP_API_URL` (default: `http://localhost:3001`). The backend provides Pokemon data and type listings.
- **Pokemon images** — Image URLs returned by the API point to external image hosting. The frontend handles image load failures gracefully with fallback placeholders.

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI Framework | React 18.2 | Component rendering, state management |
| Build Tooling | Create React App (Webpack, Babel) | Bundling, transpilation, dev server |
| Styling | CSS3 | Layout, animations, responsive design |
| Linting | ESLint (react-app preset) | Code quality |
| Testing | Jest (via react-scripts) | Unit testing |
| Containerization | Docker (multi-stage) | Reproducible builds |
| Web Server | Nginx Alpine | Production static serving |
| Orchestration | Docker Compose | Multi-service development |
