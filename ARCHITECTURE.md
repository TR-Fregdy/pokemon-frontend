# Architecture Overview - Pokemon Frontend

## System Overview

The Pokemon Frontend is a React-based Single Page Application (SPA) that provides an interactive interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch and display Pokemon information.

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         REACT APPLICATION                               │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                          App Component                           │   │ │
│  │  │                                                                  │   │ │
│  │  │  State:                                                          │   │ │
│  │  │  • pokemons[]    • filteredPokemons[]    • types[]              │   │ │
│  │  │  • filters{}     • loading               • error                 │   │ │
│  │  │                                                                  │   │ │
│  │  │  ┌───────────────────────────────────────────────────────────┐  │   │ │
│  │  │  │                   Child Components                         │  │   │ │
│  │  │  │                                                            │  │   │ │
│  │  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │   │ │
│  │  │  │  │ FilterBar   │  │LoadingSpinner│  │   PokemonCard   │   │  │   │ │
│  │  │  │  │             │  │             │  │    (multiple)    │   │  │   │ │
│  │  │  │  │ • Name      │  │ • Pokeball  │  │                  │   │  │   │ │
│  │  │  │  │ • Type      │  │   animation │  │ • Image          │   │  │   │ │
│  │  │  │  │ • Legendary │  │             │  │ • Name/ID        │   │  │   │ │
│  │  │  │  └─────────────┘  └─────────────┘  │ • Types          │   │  │   │ │
│  │  │  │                                     │ • Legendary      │   │  │   │ │
│  │  │  │                                     └─────────────────┘   │  │   │ │
│  │  │  └───────────────────────────────────────────────────────────┘  │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ HTTP Requests (Fetch API)
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           POKEMON BACKEND API                                │
│                           (http://localhost:3001)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  GET /api/pokemons  │  GET /api/types  │  GET /health                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Tree

```
index.js (Entry Point)
    │
    └── App.js (Root Component)
            │
            ├── Header (inline JSX)
            │
            ├── LoadingSpinner.js (conditional)
            │       └── Animated Pokeball CSS
            │
            ├── Error Container (inline, conditional)
            │       └── Retry Button
            │
            ├── FilterBar.js
            │       ├── Name Input
            │       ├── Type Select
            │       ├── Legendary Select
            │       └── Clear Button (conditional)
            │
            ├── Results Info (inline)
            │
            ├── No Results (inline, conditional)
            │       └── Clear Button
            │
            └── Pokemon Grid (inline)
                    └── PokemonCard.js (mapped)
                            ├── Image Container
                            │       ├── Pokemon Image
                            │       └── Legendary Badge (conditional)
                            └── Info Container
                                    ├── Name
                                    ├── Type Badges (mapped)
                                    └── ID Number
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| `index.js` | React root initialization, StrictMode wrapper |
| `App.js` | State management, API calls, filtering logic, layout |
| `FilterBar.js` | Filter controls UI, input handling, clear button |
| `PokemonCard.js` | Individual Pokemon display, type badges, image handling |
| `LoadingSpinner.js` | Animated loading indicator |

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STATE FLOW DIAGRAM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

                     ┌─────────────────────────────────────┐
                     │           INITIAL MOUNT              │
                     │         useEffect([])                │
                     └─────────────────┬───────────────────┘
                                       │
                                       ▼
                     ┌─────────────────────────────────────┐
                     │      FETCH FROM API (parallel)      │
                     │  • GET /api/pokemons                │
                     │  • GET /api/types                   │
                     └─────────────────┬───────────────────┘
                                       │
                          ┌────────────┴────────────┐
                          ▼                         ▼
                   ┌────────────┐            ┌────────────┐
                   │  SUCCESS   │            │   ERROR    │
                   │            │            │            │
                   │ setPokemons│            │ setError   │
                   │ setTypes   │            │            │
                   └─────┬──────┘            └────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FILTER STATE CHANGES                                 │
│                                                                              │
│   User Input                                                                 │
│       │                                                                      │
│       ▼                                                                      │
│   FilterBar.handleInputChange()                                              │
│       │                                                                      │
│       ▼                                                                      │
│   App.handleFilterChange() ──▶ setFilters({...})                            │
│       │                                                                      │
│       ▼                                                                      │
│   useEffect([filters, pokemons])                                            │
│       │                                                                      │
│       ▼                                                                      │
│   applyFilters() ──▶ setFilteredPokemons([...])                             │
│       │                                                                      │
│       ▼                                                                      │
│   Re-render with filtered data                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### API Response to UI

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Backend   │────▶│  Fetch API  │────▶│   State     │────▶│    Props    │
│   Response  │     │  (Promise)  │     │ (useState)  │     │  (to child) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Browser    │◀────│  ReactDOM   │◀────│    JSX      │◀────│  Component  │
│    DOM      │     │   render    │     │  (Virtual)  │     │   Output    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Filter Logic Flow

```javascript
// Filtering algorithm (in App.js useEffect)

let filtered = [...pokemons]

if (filters.name) {
    filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.name.toLowerCase())
    )
}

if (filters.type) {
    filtered = filtered.filter(p =>
        p.type.some(t => t.toLowerCase() === filters.type.toLowerCase())
    )
}

if (filters.legendary !== '') {
    filtered = filtered.filter(p =>
        p.legendary === (filters.legendary === 'true')
    )
}

setFilteredPokemons(filtered)
```

## CSS Architecture

### Styling Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CSS FILE STRUCTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   src/                                                                       │
│   ├── index.css          Global resets, fonts                               │
│   ├── App.css            App layout, header, grid, buttons                  │
│   └── components/                                                            │
│       ├── FilterBar.css      Filter bar styles, inputs, selects            │
│       ├── PokemonCard.css    Card styles, type colors, animations          │
│       └── LoadingSpinner.css Pokeball animation styles                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Design System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DESIGN TOKENS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   COLORS                                                                     │
│   ├── Primary Gradient: #667eea → #764ba2 (background)                      │
│   ├── Header Gradient: #ff6b6b → #4ecdc4                                    │
│   ├── Accent: #4ecdc4 (teal)                                                │
│   └── Danger: #ff6b6b (red)                                                 │
│                                                                              │
│   EFFECTS                                                                    │
│   ├── Glassmorphism: rgba(255,255,255,0.95) + backdrop-filter               │
│   ├── Box Shadow: 0 8px 32px rgba(0,0,0,0.1)                                │
│   └── Border Radius: 8px (buttons), 12px (cards), 16px (large cards)        │
│                                                                              │
│   TYPOGRAPHY                                                                 │
│   ├── Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif         │
│   └── Sizes: 0.8rem (small) → 2.5rem (header)                               │
│                                                                              │
│   ANIMATIONS                                                                 │
│   ├── spin: 360° rotation (2s linear infinite)                              │
│   ├── pulse: scale + opacity (1s ease alternate)                            │
│   └── sparkle: scale bounce (2s infinite)                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Development Environment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT SETUP                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐                      ┌─────────────────────┐       │
│  │   React Dev Server  │                      │   Pokemon Backend    │       │
│  │                     │                      │                      │       │
│  │   Port: 3000        │─────── Proxy ───────▶│   Port: 3001         │       │
│  │                     │                      │                      │       │
│  │   • Hot Reload      │                      │   • Express API      │       │
│  │   • Source Maps     │                      │   • Mock Data        │       │
│  │   • ESLint          │                      │                      │       │
│  └─────────────────────┘                      └─────────────────────┘       │
│                                                                              │
│  Proxy configured in package.json: "proxy": "http://localhost:3001"         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Production Architecture (Docker)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DOCKER DEPLOYMENT                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   BUILD STAGE (node:20-alpine)                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  1. COPY package*.json ./                                            │   │
│   │  2. RUN npm install                                                  │   │
│   │  3. COPY . .                                                         │   │
│   │  4. RUN npm run build                                                │   │
│   │                                                                      │   │
│   │  Output: /app/build/ (static files)                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   RUNTIME STAGE (nginx:alpine)                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  1. COPY nginx.conf → /etc/nginx/conf.d/default.conf                 │   │
│   │  2. COPY --from=builder /app/build/ → /usr/share/nginx/html/         │   │
│   │                                                                      │   │
│   │  Port: 80 (internal)                                                 │   │
│   │  Features:                                                           │   │
│   │  • Static file serving                                               │   │
│   │  • SPA routing (try_files)                                           │   │
│   │  • Gzip compression (if enabled)                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Full Stack Docker Compose

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         pokemon-network (bridge)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────┐         ┌─────────────────────────┐            │
│  │    main_app_web         │         │   main_app_pokemon       │            │
│  │    (pokemon-frontend)   │         │   (pokemon-backend)      │            │
│  │                         │         │                          │            │
│  │    Nginx:80             │────────▶│    Express:3001          │            │
│  │    Host:3002            │         │    Host:3001             │            │
│  │                         │         │                          │            │
│  │    depends_on:          │         │    Health: /health       │            │
│  │    - main_app_pokemon   │         │                          │            │
│  └─────────────────────────┘         └─────────────────────────┘            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

External Access:
• Frontend: http://localhost:3002
• Backend:  http://localhost:3001
```

## Application States

### State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          APPLICATION STATES                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   INITIAL   │
                              │  loading:   │
                              │   true      │
                              └──────┬──────┘
                                     │
                          useEffect triggers fetch
                                     │
                    ┌────────────────┴────────────────┐
                    │                                  │
                    ▼                                  ▼
           ┌─────────────┐                    ┌─────────────┐
           │   SUCCESS   │                    │    ERROR    │
           │  loading:   │                    │  loading:   │
           │   false     │                    │   false     │
           │  error:     │                    │  error:     │
           │   null      │                    │   message   │
           └──────┬──────┘                    └──────┬──────┘
                  │                                   │
                  │                          User clicks Retry
                  │                                   │
                  │                           ┌──────┴──────┐
                  │                           │   Reload    │
                  │                           │   window    │
                  │                           └─────────────┘
                  │
                  ▼
           ┌─────────────┐
           │   READY     │
           │             │
           │  Shows:     │
           │  • Filter   │
           │  • Grid     │
           │  • Results  │
           └──────┬──────┘
                  │
         User changes filters
                  │
                  ▼
           ┌─────────────┐
           │  FILTERED   │
           │             │
           │  filteredPokemon
           │  changes    │
           └─────────────┘
```

## Error Handling

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ERROR HANDLING STRATEGY                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   API ERRORS                                                                 │
│   ├── Network failure    → Show error message + Retry button                │
│   ├── Non-OK response    → Show error message + Retry button                │
│   └── Parse error        → Caught in try/catch → error state                │
│                                                                              │
│   IMAGE ERRORS                                                               │
│   └── onError handler    → Fallback to placeholder image                    │
│                                                                              │
│   EMPTY RESULTS                                                              │
│   └── filteredPokemons.length === 0                                         │
│       → Show "No Pokemon found" + Clear Filters button                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Performance Considerations

### Current Implementation

1. **Initial Load**: Single API call with Promise.all for parallel fetching
2. **Filtering**: Client-side filtering (fast for small datasets)
3. **Re-renders**: Optimized via useState (only affected components re-render)
4. **Images**: External URLs from PokeAPI (CDN cached)

### Potential Optimizations

| Optimization | Implementation |
|--------------|----------------|
| Memoization | `useMemo` for filtered results |
| Component Memoization | `React.memo` for PokemonCard |
| Debouncing | Debounce name filter input |
| Virtual Scrolling | For large Pokemon lists |
| Image Lazy Loading | Intersection Observer |

## Testing Strategy

### Recommended Test Structure

```
src/
├── __tests__/
│   ├── App.test.js           Integration tests
│   ├── components/
│   │   ├── FilterBar.test.js
│   │   ├── PokemonCard.test.js
│   │   └── LoadingSpinner.test.js
│   └── utils/
│       └── filterHelpers.test.js
└── setupTests.js             Test configuration
```

### Test Categories

1. **Unit Tests**: Component rendering, prop handling
2. **Integration Tests**: Filter interactions, API mocking
3. **Snapshot Tests**: UI consistency
4. **E2E Tests**: Full user flows (with Cypress/Playwright)

## Security Considerations

- **No sensitive data**: Application only displays public Pokemon data
- **Environment variables**: API URL configured via `.env`
- **CORS**: Handled by backend, frontend just fetches
- **XSS**: React automatically escapes rendered content
- **No authentication**: Public application
