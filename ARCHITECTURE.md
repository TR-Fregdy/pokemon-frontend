# Architecture Overview - Pokemon Frontend

## High-Level Architecture

Pokemon Frontend is a **React 18 Single Page Application (SPA)** that provides a browser-based interface for browsing and filtering Pokemon data. It communicates with a separate backend API service to fetch data, then performs all filtering and presentation logic on the client side.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      App Component                        │  │
│  │         (State Management & Business Logic)               │  │
│  │                                                           │  │
│  │  State: pokemons, filteredPokemons, types, filters,       │  │
│  │         loading, error                                    │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐   │  │
│  │  │  FilterBar   │  │ PokemonCard  │  │LoadingSpinner  │   │  │
│  │  │  (Controls)  │  │  (Display)   │  │  (Feedback)    │   │  │
│  │  └─────────────┘  └──────────────┘  └────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                     fetch() API calls                           │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               ▼
                ┌──────────────────────────┐
                │      Backend API         │
                │   (http://localhost:3001) │
                │                          │
                │  GET /api/pokemons       │
                │  GET /api/types          │
                └──────────────────────────┘
```

## Major Components and Responsibilities

### 1. App (`src/App.js`)
**Role**: Root component, application controller, and state container.

- Manages all application state via `useState` hooks
- Fetches initial data (Pokemon list + types) from backend API on mount
- Implements client-side filtering logic (by name, type, and legendary status)
- Orchestrates conditional rendering: loading spinner, error state, or main content
- Passes state and callbacks down to child components via props

### 2. FilterBar (`src/components/FilterBar.js`)
**Role**: User input controls for filtering Pokemon.

- Renders three filter controls: name search input, type dropdown, legendary dropdown
- Operates as a controlled component (all input values driven by parent state)
- Calls parent `onFilterChange` callback on any input change
- Conditionally displays "Clear Filters" button when filters are active

### 3. PokemonCard (`src/components/PokemonCard.js`)
**Role**: Presentational component for individual Pokemon display.

- Renders Pokemon image, name, type badges, and ID number
- Applies legendary-specific styling (golden border and badge)
- Handles image loading errors with a placeholder fallback
- Type badges are color-coded via CSS class mapping

### 4. LoadingSpinner (`src/components/LoadingSpinner.js`)
**Role**: Visual loading indicator.

- Renders an animated Pokeball spinner during data fetch
- Pure presentational component with no props or state

## Data Flow and Request Lifecycle

### Initial Load Sequence

```
1. Browser loads index.html
       │
       ▼
2. React mounts App component
       │
       ▼
3. useEffect triggers fetchInitialData()
       │
       ├──── GET /api/pokemons ────┐
       │                           │  (Promise.all - parallel)
       ├──── GET /api/types ───────┘
       │
       ▼
4. Responses stored in state:
   - pokemons → setPokemons()
   - types → setTypes()
   - filteredPokemons initialized with all pokemons
       │
       ▼
5. App renders FilterBar + PokemonCard grid
```

### Filter Interaction Flow

```
1. User interacts with FilterBar input
       │
       ▼
2. FilterBar calls onFilterChange({ ...filters, [field]: value })
       │
       ▼
3. App.setFilters() updates filter state
       │
       ▼
4. useEffect detects filter/pokemons dependency change
       │
       ▼
5. applyFilters() runs:
   - Copies full pokemons array
   - Applies name filter (case-insensitive includes)
   - Applies type filter (array .some() match)
   - Applies legendary filter (boolean comparison)
       │
       ▼
6. setFilteredPokemons(filtered) triggers re-render
       │
       ▼
7. Pokemon grid updates to show filtered results
```

## Key Architectural Decisions

### 1. Client-Side Filtering
**Decision**: All Pokemon data is fetched once on mount; filtering happens entirely in the browser.

**Rationale**: The dataset size (Pokemon catalog) is small enough to hold in memory. This eliminates additional API round-trips for filter changes, providing instant filtering feedback.

**Trade-off**: Not suitable for very large datasets; would need server-side pagination for thousands of items.

### 2. Centralized State in App Component
**Decision**: All state lives in `App.js`; no external state management library.

**Rationale**: With only 3 child components and a flat component hierarchy, props drilling is simple and sufficient. Adding Redux/Zustand/Context would be over-engineering.

**Trade-off**: If the app grows significantly, state management would need to be refactored.

### 3. Native Fetch API
**Decision**: Uses browser-native `fetch()` instead of Axios or other HTTP libraries.

**Rationale**: Minimizes bundle size; the API calls are simple GET requests that don't benefit from Axios interceptors or other features.

### 4. Create React App Toolchain
**Decision**: Uses `react-scripts` (CRA) for build tooling instead of custom Webpack/Vite configuration.

**Rationale**: Provides zero-config setup with industry-standard defaults for Webpack, Babel, ESLint, and Jest.

**Trade-off**: Less flexibility in build customization; `eject` is a one-way operation.

### 5. Co-located CSS Files
**Decision**: Each component has a dedicated `.css` file in the same directory.

**Rationale**: Keeps styles organized and discoverable. Each component's styles are visually grouped with its logic.

**Trade-off**: CSS is globally scoped (no CSS Modules or CSS-in-JS), so class name collisions are possible.

### 6. Docker Multi-Stage Build
**Decision**: Production builds use a two-stage Docker build (Node.js for build, Nginx for serving).

**Rationale**: Produces a minimal production image (~25MB with Nginx Alpine) instead of shipping the full Node.js runtime.

## Dependencies Between Modules

```
src/index.js
    └── imports App.js
            ├── imports components/PokemonCard.js
            ├── imports components/FilterBar.js
            └── imports components/LoadingSpinner.js

CSS dependency chain (each .js imports its own .css):
    index.js  →  index.css (global styles)
    App.js    →  App.css (layout, header, grid)
    FilterBar.js     →  FilterBar.css
    PokemonCard.js   →  PokemonCard.css
    LoadingSpinner.js → LoadingSpinner.css
```

### External Dependencies
- **Backend API** (`REACT_APP_API_URL`): Required at runtime for Pokemon and types data
- **react / react-dom**: Core UI framework
- **react-scripts**: Build toolchain (dev dependency effectively)

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              Docker Compose                  │
│                                              │
│  ┌────────────────────┐                      │
│  │  main_app_web      │    Port 3002:80      │
│  │  (Nginx + Static)  │◄──── Browser         │
│  │  pokemon-frontend  │                      │
│  └────────┬───────────┘                      │
│           │                                  │
│           │ Internal network                 │
│           ▼                                  │
│  ┌────────────────────┐                      │
│  │  pokemon-backend   │    Port 3001:3001    │
│  │  (Node.js API)     │                      │
│  │  Health: /health   │                      │
│  └────────────────────┘                      │
│                                              │
│  Network: pokemon-network                    │
└─────────────────────────────────────────────┘
```

## File Structure Summary

| Path                        | Type       | Purpose                              |
|-----------------------------|-----------|--------------------------------------|
| `public/index.html`         | Template  | HTML shell with `#root` mount point  |
| `public/manifest.json`      | Config    | PWA metadata                         |
| `src/index.js`              | Entry     | React DOM bootstrap                  |
| `src/App.js`                | Component | Root component + state + logic       |
| `src/components/FilterBar.js` | Component | Search and filter controls          |
| `src/components/PokemonCard.js` | Component | Pokemon display card              |
| `src/components/LoadingSpinner.js` | Component | Loading animation              |
| `src/*.css`                 | Styles    | Component and global styles          |
| `package.json`              | Config    | Dependencies, scripts, metadata      |
| `.env.example`              | Config    | Environment variable template        |
| `.tr-codegen/Dockerfile`    | Deploy    | Multi-stage Docker build             |
| `.tr-codegen/docker-compose.yml` | Deploy | Full-stack orchestration          |
| `.tr-codegen/nginx.conf`    | Deploy    | Production web server config         |
