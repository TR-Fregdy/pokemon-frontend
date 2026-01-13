# Architecture Overview

This document provides a high-level architectural view of the Pokemon Frontend application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Pokemon Frontend (React SPA)                        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                              App Component                               ││
│  │  ┌─────────────┐  ┌──────────────────┐  ┌────────────────────────────┐ ││
│  │  │   State     │  │    useEffect     │  │        Render              │ ││
│  │  │ Management  │──│    Hooks         │──│        Logic               │ ││
│  │  └─────────────┘  └──────────────────┘  └────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│            ┌───────────────────────┼───────────────────────┐                │
│            v                       v                       v                │
│  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐        │
│  │    FilterBar     │   │  LoadingSpinner  │   │   PokemonCard    │        │
│  │    Component     │   │    Component     │   │    Component     │        │
│  └──────────────────┘   └──────────────────┘   └──────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ HTTP/JSON (Fetch API)
                    v
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Pokemon Backend API                                 │
│                         (Express.js - Port 3001)                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Major Components

### 1. App Component (`src/App.js`)

The root component that:
- Manages application-wide state
- Fetches initial data from the API
- Applies filters to Pokemon data
- Handles loading and error states
- Renders child components

### 2. FilterBar Component (`src/components/FilterBar.js`)

Search and filter controls providing:
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status filtering
- Clear filters button

### 3. PokemonCard Component (`src/components/PokemonCard.js`)

Individual Pokemon display card showing:
- Pokemon sprite image
- Name and ID
- Type badges with color coding
- Legendary badge (conditional)

### 4. LoadingSpinner Component (`src/components/LoadingSpinner.js`)

Animated loading indicator:
- Pokeball-themed CSS animation
- Displayed during data fetching

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Backend    │────>│   App.js     │────>│   State      │
│   API        │     │  useEffect   │     │   Updates    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
        ┌────────────────────────────────────────┤
        v                                        v
┌──────────────┐                         ┌──────────────┐
│  FilterBar   │                         │ PokemonCard  │
│  Receives    │                         │   Receives   │
│   filters    │                         │   pokemon    │
└──────────────┘                         └──────────────┘
        │
        │ onChange callbacks
        v
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Filter     │────>│   App.js     │────>│  Filtered    │
│   Changes    │     │  useEffect   │     │    Data      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### State Flow

1. **Initial Load**:
   - App mounts, triggers `useEffect`
   - Parallel fetch of `/api/pokemons` and `/api/types`
   - State updated: `pokemons`, `types`, `filteredPokemons`

2. **Filter Change**:
   - User interacts with FilterBar
   - `onFilterChange` callback updates `filters` state
   - `useEffect` dependency on `filters` triggers re-filtering
   - `filteredPokemons` state updated
   - PokemonCard grid re-renders

3. **Error Handling**:
   - Network errors caught in try/catch
   - `error` state set with user-friendly message
   - Error UI rendered with retry button

## Component Communication

```
                    ┌─────────────────────────────────────┐
                    │              App                    │
                    │                                     │
                    │  state: {                          │
                    │    pokemons, filteredPokemons,     │
                    │    types, filters, loading, error  │
                    │  }                                 │
                    └─────────────────────────────────────┘
                           │                    │
          ┌────────────────┴────────┐   ┌──────┴──────────────┐
          │                         │   │                      │
          v                         v   v                      v
┌──────────────────┐    ┌──────────────────────┐    ┌──────────────────┐
│    FilterBar     │    │    PokemonCard[]     │    │  LoadingSpinner  │
│                  │    │                      │    │                  │
│ Props:           │    │ Props:               │    │ (no props)       │
│  - filters       │    │  - pokemon           │    │                  │
│  - types         │    │                      │    │                  │
│  - onFilterChange│    │                      │    │                  │
│  - onClearFilters│    │                      │    │                  │
└──────────────────┘    └──────────────────────┘    └──────────────────┘
```

## Key Architectural Decisions

### 1. React Hooks over Class Components

Using functional components with hooks (`useState`, `useEffect`) for modern React patterns.

**Trade-offs**:
- (+) Cleaner, more readable code
- (+) Easier to test individual logic
- (+) Better performance with proper memoization
- (-) Learning curve for developers new to hooks

### 2. Client-Side Filtering

Filtering is performed on the frontend after initial data fetch.

**Trade-offs**:
- (+) Instant filter response (no network latency)
- (+) Reduced API calls
- (-) All data must be loaded initially
- (-) Not scalable for large datasets

### 3. CSS Modules Approach (Manual)

Each component has its own paired CSS file.

**Trade-offs**:
- (+) Simple to understand
- (+) No build configuration needed
- (-) Potential class name conflicts
- (-) No CSS-in-JS benefits

### 4. No State Management Library

Using React's built-in state management (hooks).

**Trade-offs**:
- (+) No additional dependencies
- (+) Simple for small applications
- (-) Prop drilling for deeper component trees
- (-) More complex for global state needs

### 5. Native Fetch API

Using browser's Fetch API instead of axios or other libraries.

**Trade-offs**:
- (+) No additional dependencies
- (+) Modern browser support
- (-) No automatic request/response interceptors
- (-) More verbose error handling

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Production Deployment                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Docker Container                       │ │
│  │                                                         │ │
│  │  ┌───────────────────────────────────────────────────┐ │ │
│  │  │                 Nginx (Alpine)                    │ │ │
│  │  │                                                   │ │ │
│  │  │  ┌─────────────────────────────────────────────┐ │ │ │
│  │  │  │         Static Files (React Build)          │ │ │ │
│  │  │  │              /usr/share/nginx/html          │ │ │ │
│  │  │  └─────────────────────────────────────────────┘ │ │ │
│  │  │                                                   │ │ │
│  │  │  - Port 80                                       │ │ │
│  │  │  - SPA routing: try_files $uri /index.html      │ │ │
│  │  └───────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│                         ↓ Port 3002:80                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ API Requests
                          v
┌─────────────────────────────────────────────────────────────┐
│                  Pokemon Backend API                         │
│                     Port 3001                                │
└─────────────────────────────────────────────────────────────┘
```

### Build Process

1. **Build Stage** (Node.js):
   - Install dependencies
   - Run `npm run build`
   - Output: `/app/build/` static files

2. **Production Stage** (Nginx):
   - Copy nginx configuration
   - Copy built static files
   - Serve on port 80

## Dependencies Between Components

```
App.js
  └── depends on: FilterBar, PokemonCard, LoadingSpinner
  └── fetches from: Backend API

FilterBar.js
  └── depends on: filters state (from App)
  └── callbacks to: App (onFilterChange, onClearFilters)

PokemonCard.js
  └── depends on: pokemon prop (from App)
  └── self-contained display component

LoadingSpinner.js
  └── self-contained, no dependencies
```

## Future Scalability Considerations

If the application needs to scale:

1. **State Management**: Add Redux or Zustand for complex state
2. **Routing**: Add React Router for multiple pages
3. **API Layer**: Create dedicated API service module
4. **Testing**: Add Jest unit tests and React Testing Library
5. **TypeScript**: Migrate to TypeScript for type safety
6. **Code Splitting**: Implement lazy loading for larger component trees
7. **Server-Side Rendering**: Consider Next.js for SEO and performance
