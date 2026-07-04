# Architecture Overview

## High-Level System Architecture

Pokemon Frontend is a React 18 single-page application that consumes a REST API backend to display, search, and filter Pokemon data. The application follows a simple container/presentational component pattern with client-side filtering.

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Browser (Client)                            │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                        App (Container)                         │  │
│  │  - State: pokemons, filteredPokemons, types, filters           │  │
│  │  - Data fetching (useEffect + fetch)                           │  │
│  │  - Client-side filtering logic                                 │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐   │  │
│  │  │  FilterBar   │  │ PokemonCard  │  │  LoadingSpinner   │   │  │
│  │  │  (Controls)  │  │  (Display)   │  │  (Feedback)       │   │  │
│  │  └──────────────┘  └──────────────┘  └───────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                               │                                      │
└───────────────────────────────┼──────────────────────────────────────┘
                                │ HTTP (fetch API)
                                ▼
                ┌───────────────────────────────┐
                │    Pokemon Backend API         │
                │    (http://localhost:3001)      │
                │                               │
                │  GET /api/pokemons            │
                │  GET /api/types               │
                └───────────────────────────────┘
```

## Major Components and Responsibilities

### 1. App (`src/App.js`) - Container Component

The root component and the sole stateful component in the application. It manages:

- **Data fetching**: Calls `GET /api/pokemons` and `GET /api/types` on mount using `Promise.all` for parallel loading
- **State management**: Holds all application state via `useState` hooks:
  - `pokemons` - Complete list of Pokemon from the API
  - `filteredPokemons` - Subset of Pokemon matching current filters
  - `types` - List of available Pokemon types from the API
  - `filters` - Current filter values (`name`, `type`, `legendary`)
  - `loading` - Boolean loading state
  - `error` - Error message string or null
- **Filter logic**: Applies filters client-side via `useEffect` whenever `filters` or `pokemons` change
- **Rendering**: Conditionally renders loading, error, or main content states

### 2. FilterBar (`src/components/FilterBar.js`) - Presentational Component

Renders the search and filter controls:

- **Name search**: Text input for case-insensitive substring matching
- **Type filter**: Dropdown populated from the types API response
- **Legendary filter**: Dropdown with All/Legendary/Non-Legendary options
- **Clear filters**: Button that appears only when filters are active

### 3. PokemonCard (`src/components/PokemonCard.js`) - Presentational Component

Displays individual Pokemon information:

- Pokemon image with error fallback
- Name, zero-padded ID (e.g., `#001`)
- Type badges with color-coded CSS classes
- Legendary badge (conditional)
- Visual distinction for legendary Pokemon via CSS class

### 4. LoadingSpinner (`src/components/LoadingSpinner.js`) - Presentational Component

A themed loading indicator:

- Animated Pokeball using pure CSS
- Displayed during initial data fetch

## Data Flow and Request Lifecycle

### Initial Load

```
1. Browser loads index.html
2. React renders <App /> in StrictMode
3. App mounts → useEffect fires
4. Parallel API requests:
   ├── GET /api/pokemons → pokemonData.data → setPokemons()
   └── GET /api/types    → typesData.data   → setTypes()
5. setFilteredPokemons(pokemonData.data)  (show all initially)
6. setLoading(false)
7. App renders FilterBar + PokemonCard grid
```

### Filtering Flow

```
1. User interacts with FilterBar (input/select change)
2. FilterBar calls onFilterChange({ ...filters, [field]: value })
3. App updates filters state via setFilters()
4. useEffect triggers (dependency: [filters, pokemons])
5. Filter pipeline applies in sequence:
   ├── Name filter:      case-insensitive substring match
   ├── Type filter:      type array inclusion check
   └── Legendary filter: boolean equality check
6. setFilteredPokemons(filtered)
7. React re-renders PokemonCard grid with filtered results
```

### Error Handling Flow

```
1. API request fails (network error or non-OK status)
2. Error caught in try/catch
3. setError('Failed to load Pokemon data...')
4. setLoading(false)
5. App renders error UI with retry button
6. Retry button → window.location.reload()
```

## Key Architectural Decisions

### 1. Client-Side Filtering

All Pokemon data is fetched once and stored in memory. Filtering is performed entirely in the browser rather than making API calls for each filter change. This provides:
- **Instant feedback** on filter changes (no network latency)
- **Reduced backend load** (single fetch on page load)
- **Trade-off**: Higher memory usage for large datasets

### 2. No State Management Library

The application uses React's built-in `useState` and `useEffect` hooks instead of Redux, Zustand, or Context API. This is appropriate given:
- Flat component hierarchy (only 1 level deep)
- Single data source (one API)
- No shared state between unrelated components

### 3. No Client-Side Routing

The application is a single-view SPA with no navigation. Despite this, the Nginx configuration supports SPA routing (`try_files`) to accommodate future routing additions.

### 4. Co-located CSS Files

Each component has a corresponding `.css` file in the same directory rather than using CSS Modules, styled-components, or Tailwind. This keeps styling simple but means class names are global.

### 5. Create React App (CRA) Toolchain

The project uses CRA (`react-scripts`) for build tooling, providing zero-configuration webpack, Babel, ESLint, and development server setup.

## Dependencies Between Modules

```
src/index.js
    └── src/App.js
         ├── src/components/FilterBar.js      (receives: filters, types, callbacks)
         ├── src/components/PokemonCard.js     (receives: pokemon object)
         └── src/components/LoadingSpinner.js  (no props)
```

- **App** depends on all three child components
- **FilterBar** depends on App for `filters`, `types`, `onFilterChange`, and `onClearFilters`
- **PokemonCard** depends on App for the `pokemon` object
- **LoadingSpinner** is fully self-contained (no props)
- **No child-to-child dependencies** exist; all communication flows through App

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│                Docker Compose Network                │
│              (pokemon-network: bridge)               │
│                                                      │
│  ┌─────────────────────┐   ┌──────────────────────┐ │
│  │  pokemon-frontend    │   │  pokemon-backend     │ │
│  │  (Nginx Alpine)      │   │  (Node.js API)       │ │
│  │  Port: 3002 → 80    │──>│  Port: 3001 → 3001   │ │
│  │                      │   │                      │ │
│  │  Static React build  │   │  REST API            │ │
│  │  SPA routing support │   │  /api/pokemons       │ │
│  └─────────────────────┘   │  /api/types           │ │
│                             └──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Build Pipeline

```
Multi-stage Docker Build:
  Stage 1 (Builder):  Node 20-alpine → npm install → npm run build
  Stage 2 (Runtime):  Nginx alpine   → Copy /build → Serve static files
```

## Potential Improvements

The following areas have been identified as opportunities for improvement, organized by category.

### Testing

- **No test suite exists**: Despite `react-scripts test` being configured and `react-app/jest` in the ESLint config, there are zero test files in the project. Unit tests should be added for filter logic, component rendering, and API error handling.
- **No end-to-end tests**: There is no integration or E2E testing setup (e.g., Cypress or Playwright) to verify the full user workflow of searching and filtering Pokemon.

### Type Safety

- **No TypeScript**: The project uses plain JavaScript with no type annotations. Migrating to TypeScript would catch type-related bugs at compile time, especially around the Pokemon data shapes (`pokemon.type`, `pokemon.legendary`, `pokemon.id`) and filter state.
- **No PropTypes**: Components receive props without any runtime validation. At minimum, `prop-types` should be added to document and validate component interfaces until a TypeScript migration is feasible.

### Error Handling

- **No React Error Boundaries**: If a child component throws during rendering (e.g., `pokemon.type.map` on undefined), the entire app crashes with a white screen. Error Boundaries should wrap the Pokemon grid to provide graceful degradation.
- **Full page reload for retry**: The error state retry button uses `window.location.reload()`, which resets all application state. A better approach would re-invoke the data fetch function without reloading the page.
- **No AbortController on fetch**: API requests are not cancelled when the component unmounts, which can lead to state updates on unmounted components and potential memory leaks.

### Performance

- **No pagination or virtualization**: All Pokemon are rendered to the DOM simultaneously. For large datasets, this can cause performance issues. Implementing virtual scrolling (e.g., `react-window`) or pagination would improve rendering performance.
- **No API response caching**: Every page load fetches all Pokemon data from scratch. Caching responses (e.g., via `localStorage`, `sessionStorage`, or a library like `react-query`/`swr`) would reduce redundant API calls and improve perceived performance.
- **Array copy on every filter change**: The filter `useEffect` creates a new array copy (`[...pokemons]`) on every filter state change, even when filters are empty. Memoization via `useMemo` would be more efficient.

### Styling and Theming

- **Incomplete Pokemon type colors**: Only 9 of 18 standard Pokemon types have CSS color definitions (`fire`, `water`, `grass`, `electric`, `psychic`, `ice`, `dragon`, `flying`, `poison`). Missing types include: `normal`, `fighting`, `rock`, `ground`, `bug`, `ghost`, `steel`, `dark`, and `fairy`. These types will render without a background color.
- **Global CSS class names**: CSS files use plain class names (e.g., `.pokemon-card`, `.filter-bar`) without any scoping mechanism. This risks naming collisions as the app grows. CSS Modules, styled-components, or a utility framework like Tailwind CSS would provide proper style isolation.
- **No dark mode support**: The application has a fixed light theme with no option for dark mode or theme customization.

### Accessibility

- **No ARIA attributes on the Pokemon grid**: The card grid lacks `role`, `aria-label`, and live region announcements for screen readers. Filter result count changes are not announced to assistive technology.
- **No keyboard navigation for cards**: Pokemon cards are not focusable or interactive via keyboard. If cards were to become clickable (e.g., for a detail view), proper focus management and keyboard handlers would be needed.
- **No skip navigation link**: There is no mechanism for keyboard users to skip past the filter controls directly to the results.

### Tooling and Build

- **Create React App is deprecated**: The project uses `react-scripts` 5.0.1, which is no longer actively maintained. Migrating to a modern build tool like [Vite](https://vitejs.dev/) or a framework like [Next.js](https://nextjs.org/) would provide better performance, active support, and modern features.
- **No linting or formatting configuration beyond defaults**: The project relies on CRA's built-in ESLint config with no custom rules, Prettier integration, or pre-commit hooks (e.g., Husky + lint-staged) to enforce code consistency.

### Missing Assets

- **Placeholder image does not exist**: `PokemonCard.js` references `/placeholder-pokemon.png` as an image fallback on error, but this file does not exist in the `public/` directory. Failed image loads will result in a broken image icon.

### Scalability

- **Single-component state management**: All application state lives in the `App` component. While appropriate for the current scale (3 child components, 1 data source), adding features like Pokemon detail views, favorites, or compare functionality would benefit from a dedicated state management solution (React Context, Zustand, or Redux Toolkit).
- **No client-side routing**: The app is a single view with no URL-based navigation. Adding `react-router` would enable deep linking, browser history support, and potential detail pages for individual Pokemon.
- **No environment variable documentation**: Only a `.env.example` file exists. A dedicated section in the README or a configuration guide would help new developers set up the project correctly.

## File Structure Overview

```
pokemon-frontend/
├── public/                  # Static assets and HTML template
│   ├── index.html           # Root HTML (mounts React app)
│   └── manifest.json        # PWA manifest configuration
├── src/                     # React source code
│   ├── index.js             # Entry point - ReactDOM.createRoot
│   ├── index.css            # Global styles (body, reset)
│   ├── App.js               # Root component (state + logic)
│   ├── App.css              # App-level styles (layout, grid)
│   └── components/          # Presentational components
│       ├── FilterBar.js     # Search and filter controls
│       ├── FilterBar.css    # Filter bar styles
│       ├── PokemonCard.js   # Individual Pokemon display
│       ├── PokemonCard.css  # Card styles with type colors
│       ├── LoadingSpinner.js# Pokeball loading animation
│       └── LoadingSpinner.css# Spinner animation styles
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
├── .dockerignore            # Docker build exclusions
└── .tr-codegen/             # Docker deployment configuration
    ├── Dockerfile           # Multi-stage build definition
    ├── docker-compose.yml   # Service orchestration
    └── nginx.conf           # Nginx SPA routing config
```
