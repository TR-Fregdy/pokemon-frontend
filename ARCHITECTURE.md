# Architecture - Pokemon Frontend

## Overall Architecture

The Pokemon Frontend is a **React 18 single-page application** built with Create React App. It follows a container/presentational component pattern with unidirectional data flow. The app fetches data from the Pokemon Backend API and provides real-time client-side filtering.

```
┌─────────────────────────────────────────────────────────────┐
│                    Pokemon Frontend (React SPA)              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    App.js (Container)                  │  │
│  │  State: pokemons, filteredPokemons, types, filters,   │  │
│  │         loading, error                                │  │
│  │  Effects: fetchData (mount), applyFilters (on change) │  │
│  └────┬──────────────────┬──────────────────┬────────────┘  │
│       │                  │                  │               │
│       ▼                  ▼                  ▼               │
│  ┌──────────┐    ┌─────────────┐    ┌──────────────┐       │
│  │ Loading  │    │  FilterBar  │    │ PokemonCard  │       │
│  │ Spinner  │    │ (Controlled)│    │   (Grid)     │       │
│  └──────────┘    └─────────────┘    └──────────────┘       │
│                                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP (fetch API)
                           ▼
                ┌─────────────────────┐
                │  Pokemon Backend    │
                │  (Express API)      │
                │  Port 3001          │
                └─────────────────────┘
```

## Major Components & Responsibilities

### App.js - Container Component

The central hub of the application. Responsibilities:

| Responsibility | Implementation |
|---------------|----------------|
| State management | Six `useState` hooks for all application state |
| Data fetching | `useEffect` on mount fetches Pokemon + types via `Promise.all` |
| Filter logic | `useEffect` watches `filters`/`pokemons` and recomputes filtered list |
| Error handling | Catches fetch errors, displays error UI with retry |
| Layout orchestration | Renders header, FilterBar, results info, Pokemon grid |

### FilterBar.js - Filter Controls

A controlled component providing three filter inputs:

- **Name search** - Text input with case-insensitive substring matching
- **Type dropdown** - Select populated from `/api/types` response
- **Legendary status** - Select with All / Legendary Only / Non-Legendary Only
- **Clear Filters** - Button that appears when any filter is active

Communication: Receives `filters` and `types` as props; emits changes via `onFilterChange` callback.

### PokemonCard.js - Pokemon Display

A presentational component rendering a single Pokemon:

- Pokemon sprite image with error fallback
- Name and formatted ID (#001)
- Color-coded type badges (CSS classes per type)
- Legendary badge overlay
- Hover animation effects

### LoadingSpinner.js - Loading State

A pure static component showing a Pokeball-themed CSS animation during initial data fetch.

## Data Flow & Request Lifecycle

### Initial Load

```
1. App mounts
     │
     ▼
2. useEffect triggers fetchInitialData()
     │
     ▼
3. Promise.all([
     fetch(/api/pokemons),  ──→  Backend API
     fetch(/api/types)       ──→  Backend API
   ])
     │
     ▼
4. Set state: pokemons, filteredPokemons, types
     │
     ▼
5. loading = false → Render FilterBar + PokemonCard grid
```

### Filter Interaction

```
1. User types in search / selects dropdown
     │
     ▼
2. FilterBar calls onFilterChange({ ...filters, [field]: value })
     │
     ▼
3. App.setFilters(newFilters)
     │
     ▼
4. useEffect detects filters change
     │
     ▼
5. Apply filter chain to pokemons array:
   a. Name filter  → String.includes (case-insensitive)
   b. Type filter  → Array.some (case-insensitive exact)
   c. Legendary    → Boolean comparison
     │
     ▼
6. setFilteredPokemons(result)
     │
     ▼
7. React re-renders PokemonCard grid with filtered data
```

### Error Handling Flow

```
Fetch fails → setError(message) → Error UI with retry button
              setLoading(false)
                                    │
                                    ▼ User clicks Retry
                              window.location.reload()
```

## Key Architectural Decisions

### 1. Client-Side Filtering

**Decision:** Fetch all Pokemon data once on mount, filter entirely on the client.

**Rationale:** With only 12 Pokemon entries, client-side filtering provides instant feedback without network latency. The backend also supports server-side filtering, but client-side is used for UX responsiveness.

**Trade-off:** Would not scale well to thousands of records; would need pagination and server-side filtering.

### 2. No State Management Library

**Decision:** Use React's built-in `useState` and `useEffect` hooks only.

**Rationale:** The application has a flat component hierarchy (max 2 levels of prop drilling) and limited state complexity. Adding Redux or Zustand would be over-engineering.

**Trade-off:** If the app grows significantly, a state management library may be needed.

### 3. No Routing Library

**Decision:** Single-view application with no React Router.

**Rationale:** The current scope is a single list view with filtering. No navigation between pages is needed.

**Trade-off:** Adding detail pages or other views would require adding React Router.

### 4. CSS-per-Component (No CSS Modules/CSS-in-JS)

**Decision:** Each component has a co-located `.css` file with plain CSS.

**Rationale:** Simple, no build configuration needed, works out of the box with CRA. CSS class naming conventions prevent collisions.

**Trade-off:** Global CSS scope means naming discipline is required. No automatic scoping.

### 5. Create React App Toolchain

**Decision:** Use react-scripts (CRA) for build toolchain instead of custom Webpack/Vite.

**Rationale:** Zero-configuration setup, well-maintained, includes testing and linting out of the box.

**Trade-off:** Less control over build configuration. CRA is in maintenance mode; Vite could be a future alternative.

### 6. Multi-Stage Docker Build

**Decision:** Build with Node.js, serve with Nginx Alpine.

**Rationale:** Produces a minimal production image (~25MB) with only static files and Nginx. No Node.js runtime in production.

## Dependencies Between Modules

```
index.js
  └── App.js
        ├── App.css
        ├── FilterBar.js
        │     └── FilterBar.css
        ├── PokemonCard.js
        │     └── PokemonCard.css
        └── LoadingSpinner.js
              └── LoadingSpinner.css
```

All component dependencies flow downward from App.js. No sibling component imports or circular dependencies.

## External Integration

### Pokemon Backend API

```
Frontend (port 3000/3002)          Backend (port 3001)
         │                                  │
         │  GET /api/pokemons              │
         │ ───────────────────────────────→ │
         │  { success, count, data[] }      │
         │ ←─────────────────────────────── │
         │                                  │
         │  GET /api/types                  │
         │ ───────────────────────────────→ │
         │  { success, data[] }             │
         │ ←─────────────────────────────── │
```

- **Development:** Proxied via `package.json` `"proxy"` setting
- **Production:** Uses `REACT_APP_API_URL` environment variable
- **Docker:** Both services on `pokemon-network` bridge

### PokeAPI Sprites (External CDN)

Pokemon images are loaded directly from GitHub-hosted PokeAPI sprites:
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```
These URLs are provided by the backend in the `image` field of each Pokemon object.

## Full System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Docker Compose                               │
│                      (pokemon-network)                              │
│                                                                     │
│  ┌─────────────────────────┐    ┌────────────────────────────────┐  │
│  │   pokemon-frontend      │    │   pokemon-backend              │  │
│  │   (Nginx Alpine)        │    │   (Node.js Alpine)             │  │
│  │                         │    │                                │  │
│  │   Static React SPA      │    │   Express REST API             │  │
│  │   Port 80 (→ 3002)      │───│   Port 3001                    │  │
│  │                         │    │                                │  │
│  │   ┌─────────────────┐   │    │   ┌────────────────────────┐   │  │
│  │   │  App.js          │   │    │   │  server.js             │   │  │
│  │   │  ├─ FilterBar    │   │    │   │  ├─ GET /health        │   │  │
│  │   │  ├─ PokemonCard  │   │    │   │  ├─ GET /api/pokemons  │   │  │
│  │   │  └─ LoadingSpinner│  │    │   │  ├─ GET /api/pokemons/:id│  │  │
│  │   └─────────────────┘   │    │   │  └─ GET /api/types      │   │  │
│  │                         │    │   └────────────────────────┘   │  │
│  └─────────────────────────┘    └────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
           │                                      │
           ▼                                      ▼
    Browser (User)                    PokeAPI Sprites (CDN)
```

## Areas for Improvement

### Type Safety

- **Migrate to TypeScript**: The entire codebase is plain JavaScript with no type checking. Adding TypeScript would catch type-related bugs at compile time, improve IDE autocompletion, and make component prop interfaces self-documenting.

### Build Tooling

- **Migrate from Create React App to Vite**: CRA is in maintenance mode and no longer actively developed. Vite offers significantly faster development server startup, hot module replacement, and build times, along with a more modern and flexible configuration system.

### Testing

- **Add unit tests**: No test files exist despite Jest being available via react-scripts. Adding React Testing Library tests for each component would catch regressions in rendering and filter logic.
- **Add end-to-end tests**: Tools like Cypress or Playwright could verify the full user flow — loading data, applying filters, and seeing correct results.

### Scalability

- **Move to server-side filtering with pagination**: Currently, all Pokemon data is fetched on mount and filtered client-side. This works for 12 entries but will not scale. Implementing server-side filtering with pagination and on-demand fetching would handle larger datasets.
- **Add virtualized rendering**: If the dataset grows, rendering hundreds of `PokemonCard` components at once will degrade performance. A virtualized list (e.g., `react-window`) would render only visible items.

### State Management

- **Consider a state management library for growth**: The current `useState`/`useEffect` approach works well for the flat hierarchy, but if features like favoriting, comparison, or multi-page detail views are added, a lightweight library like Zustand would reduce prop drilling.

### Routing

- **Add client-side routing**: The app is a single view with no navigation. Adding React Router would enable Pokemon detail pages, bookmarkable filter URLs, and a more complete user experience.

### CSS Architecture

- **Adopt CSS Modules or a CSS-in-JS solution**: All CSS files are imported globally, which risks naming collisions as the component library grows. CSS Modules (supported by CRA out of the box) would provide automatic scoping with no migration cost.

### Accessibility

- **Add ARIA labels and keyboard navigation**: Filter inputs and Pokemon cards lack explicit ARIA attributes. Adding proper labels, roles, and keyboard focus management would make the app usable for screen reader and keyboard-only users.
- **Add skip navigation links**: A "Skip to content" link would help keyboard users bypass the header and filter bar.

### Error Handling & Resilience

- **Add React Error Boundaries**: There are no error boundaries. A runtime error in any component will crash the entire app. Wrapping key sections in error boundaries would allow graceful fallbacks.
- **Improve retry logic**: The current retry mechanism uses `window.location.reload()`, which discards all state. A targeted re-fetch of just the failed request would provide a smoother recovery.

### Performance

- **Add lazy loading for images**: Pokemon sprite images load eagerly. Adding `loading="lazy"` on `<img>` elements or using an intersection observer would reduce initial page load time.
- **Memoize filtered results**: The filter `useEffect` recomputes on every `filters` or `pokemons` change. Using `useMemo` instead of a separate state variable would eliminate unnecessary renders.
