# Architecture Document - Pokemon Frontend

## System Overview

The Pokemon Frontend is a React-based Single Page Application (SPA) that provides a user interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API and features a modern, responsive design.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    REACT APPLICATION                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │    App      │  │  FilterBar  │  │   PokemonCard   │   │  │
│  │  │  (State)    │──│  (Controls) │  │   (Display)     │   │  │
│  │  └──────┬──────┘  └─────────────┘  └─────────────────┘   │  │
│  │         │                                                  │  │
│  │         │ HTTP/Fetch API                                   │  │
│  └─────────┼─────────────────────────────────────────────────┘  │
│            │                                                     │
└────────────┼─────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POKEMON BACKEND API                           │
│                     (Port 3001)                                  │
│         /api/pokemons    /api/types    /health                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### React Component Tree

```
index.js (Entry Point)
    │
    └── App (Root Component)
         │
         ├── State Management
         │   ├── pokemons: Pokemon[]
         │   ├── filteredPokemons: Pokemon[]
         │   ├── types: String[]
         │   ├── filters: FilterState
         │   ├── loading: Boolean
         │   └── error: String|null
         │
         ├── [Conditional] LoadingSpinner
         │   └── Pokeball CSS Animation
         │
         ├── [Conditional] Error Message
         │   └── Retry Button
         │
         ├── FilterBar
         │   ├── Name Input (text)
         │   ├── Type Select (dropdown)
         │   ├── Legendary Select (dropdown)
         │   └── Clear Filters Button
         │
         └── Pokemon Grid
             └── PokemonCard (×N)
                 ├── Image Container
                 │   ├── Pokemon Image
                 │   └── [Conditional] Legendary Badge
                 └── Info Section
                     ├── Name
                     ├── Type Badges (×M)
                     └── ID Number
```

## Data Flow Architecture

### Initial Load Sequence

```
1. App Component Mounts
         │
         ▼
2. useEffect triggers fetchInitialData()
         │
         ▼
3. Parallel API Calls
   ┌─────────────────────────────────────┐
   │  Promise.all([                      │
   │    fetch('/api/pokemons'),          │
   │    fetch('/api/types')              │
   │  ])                                 │
   └─────────────────────┬───────────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
   pokemons response               types response
         │                               │
         ▼                               ▼
   setPokemons(data)               setTypes(data)
   setFilteredPokemons(data)
         │
         ▼
4. setLoading(false) → UI renders
```

### Filter Flow

```
User Input (FilterBar)
         │
         ▼
handleInputChange(field, value)
         │
         ▼
onFilterChange({ ...filters, [field]: value })
         │
         ▼
setFilters(newFilters)
         │
         ▼
useEffect detects filter change
         │
         ▼
applyFilters() executes
   ┌─────────────────────────────────────────┐
   │  1. Clone pokemons array                │
   │  2. Filter by name (if set)             │
   │  3. Filter by type (if set)             │
   │  4. Filter by legendary (if set)        │
   └─────────────────────┬───────────────────┘
                         │
                         ▼
setFilteredPokemons(filtered)
         │
         ▼
React re-renders Pokemon Grid
```

## State Management Design

### Centralized State in App.js

```javascript
// Data State
pokemons          // Source of truth (all Pokemon)
filteredPokemons  // Derived state (filtered view)
types             // Reference data for filter dropdown

// UI State
filters           // Current filter values
loading           // API call in progress
error             // Error message if API fails
```

### State Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        App State                              │
│                                                               │
│  ┌─────────┐      ┌──────────────────┐      ┌─────────────┐ │
│  │pokemons │──────│ filteredPokemons │──────│ PokemonCard │ │
│  │ (source)│      │    (derived)     │      │  (render)   │ │
│  └─────────┘      └──────────────────┘      └─────────────┘ │
│       ▲                    ▲                                 │
│       │                    │                                 │
│  API Fetch            Filter Logic                           │
│       ▲                    ▲                                 │
│       │                    │                                 │
│  ┌────┴────┐         ┌────┴────┐         ┌──────────────┐  │
│  │ loading │         │ filters │◀────────│  FilterBar   │  │
│  │  error  │         └─────────┘         │ (user input) │  │
│  └─────────┘                              └──────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## File Structure Analysis

```
pokemon-frontend/
│
├── public/                      # STATIC ASSETS
│   ├── index.html               # HTML template with root div
│   └── manifest.json            # PWA metadata
│
├── src/                         # SOURCE CODE
│   │
│   ├── index.js                 # ENTRY POINT
│   │   └── ReactDOM.createRoot() mounting
│   │
│   ├── index.css                # BASE STYLES
│   │   └── CSS reset, font definitions
│   │
│   ├── App.js                   # ROOT COMPONENT
│   │   ├── State definitions
│   │   ├── Data fetching logic
│   │   ├── Filter logic
│   │   └── Layout structure
│   │
│   ├── App.css                  # APP STYLES
│   │   ├── Layout styles
│   │   ├── Grid configuration
│   │   ├── Error/empty states
│   │   └── Responsive breakpoints
│   │
│   └── components/              # UI COMPONENTS
│       │
│       ├── PokemonCard.js       # Card component
│       ├── PokemonCard.css      # Card styles + type colors
│       │
│       ├── FilterBar.js         # Filter controls
│       ├── FilterBar.css        # Filter styles
│       │
│       ├── LoadingSpinner.js    # Loading indicator
│       └── LoadingSpinner.css   # Pokeball animation
│
├── .tr-codegen/                 # DEPLOYMENT CONFIG
│   ├── Dockerfile               # Multi-stage build
│   ├── docker-compose.yml       # Full stack orchestration
│   └── nginx.conf               # SPA routing rules
│
├── package.json                 # PROJECT MANIFEST
├── .env.example                 # Environment template
├── .gitignore                   # Git exclusions
└── .dockerignore                # Docker build exclusions
```

## CSS Architecture

### Styling Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    CSS ARCHITECTURE                          │
│                                                              │
│  ┌────────────────┐                                         │
│  │   index.css    │ ← Global reset, font stack              │
│  └────────────────┘                                         │
│          │                                                   │
│          ▼                                                   │
│  ┌────────────────┐                                         │
│  │    App.css     │ ← Layout, grid, shared utilities        │
│  └────────────────┘                                         │
│          │                                                   │
│  ┌───────┴───────────────────┐                              │
│  │                           │                              │
│  ▼                           ▼                              │
│ Component CSS files (co-located with components)            │
│  ├── PokemonCard.css                                        │
│  ├── FilterBar.css                                          │
│  └── LoadingSpinner.css                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Design System Elements

| Element | Implementation |
|---------|----------------|
| Colors | Gradients (45deg linear) |
| Cards | Glassmorphism (rgba + blur) |
| Shadows | Multi-layer box-shadow |
| Animations | CSS keyframes (spin, pulse) |
| Responsive | Flexbox + Grid + Media queries |

## Deployment Architecture

### Docker Multi-Stage Build

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD STAGE                               │
│                   (node:20-alpine)                           │
│                                                              │
│  1. Copy package*.json                                       │
│  2. npm install                                              │
│  3. Copy source files                                        │
│  4. npm run build                                            │
│                                                              │
│  Output: /app/build/ (static files)                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   RUNTIME STAGE                              │
│                   (nginx:alpine)                             │
│                                                              │
│  1. Copy nginx.conf to /etc/nginx/conf.d/                   │
│  2. Copy build/ to /usr/share/nginx/html/                   │
│  3. Serve on port 80                                         │
│                                                              │
│  SPA Routing: All paths → index.html                        │
└─────────────────────────────────────────────────────────────┘
```

### Full Stack Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                   docker-compose.yml                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 pokemon-network                      │   │
│  │                                                      │   │
│  │   ┌─────────────────┐      ┌─────────────────┐     │   │
│  │   │  main_app_web   │      │main_app_pokemon │     │   │
│  │   │   (frontend)    │─────▶│   (backend)     │     │   │
│  │   │                 │      │                 │     │   │
│  │   │ nginx:80        │      │ node:3001       │     │   │
│  │   │ exposed:3002    │      │ exposed:3001    │     │   │
│  │   └─────────────────┘      └─────────────────┘     │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Design Patterns

### 1. Container/Presentational Pattern

```
Container (App.js)
├── Manages all state
├── Handles data fetching
├── Contains business logic
└── Passes data down via props

Presentational (PokemonCard, FilterBar, LoadingSpinner)
├── Receive data via props
├── Render UI elements
├── Emit events via callbacks
└── No internal state (mostly)
```

### 2. Controlled Components

All form inputs are controlled:
```jsx
<input
  value={filters.name}                              // State controls value
  onChange={(e) => handleInputChange('name', e.target.value)} // Events update state
/>
```

### 3. Lifting State Up

Filter state is lifted to App.js so both FilterBar and Pokemon Grid can access it:
```
           App (owns filters state)
          /                       \
    FilterBar                Pokemon Grid
    (updates filters)        (reads filtered data)
```

## Performance Considerations

### Current Optimizations

1. **Parallel data fetching**: `Promise.all()` for initial load
2. **Client-side filtering**: No API calls for filter changes
3. **Key-based rendering**: Proper keys on mapped elements
4. **CSS animations**: GPU-accelerated transforms

### Potential Improvements

| Area | Current | Improvement |
|------|---------|-------------|
| Rendering | Re-render all cards | React.memo for PokemonCard |
| Images | No optimization | Lazy loading + blur placeholder |
| Bundle | Create React App default | Code splitting if app grows |
| State | useState | useReducer for complex state |

## Error Handling Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                   ERROR HANDLING FLOW                        │
│                                                              │
│  API Call                                                    │
│     │                                                        │
│     ├── Success → setData() → Clear error                   │
│     │                                                        │
│     └── Failure ──┐                                         │
│                   ▼                                          │
│            setError(message)                                 │
│                   │                                          │
│                   ▼                                          │
│         ┌─────────────────┐                                 │
│         │  Error Message  │                                 │
│         │    Component    │                                 │
│         │                 │                                 │
│         │  [Retry Button] │───▶ window.location.reload()   │
│         └─────────────────┘                                 │
│                                                              │
│  Image Load Error                                            │
│     │                                                        │
│     └── onError handler → Fallback image                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Security Considerations

| Aspect | Implementation |
|--------|----------------|
| XSS | React auto-escapes by default |
| API URL | Environment variable |
| User Input | No direct DOM manipulation |
| Dependencies | Regular npm audit recommended |

## Browser Support

Configured via browserslist in package.json:

- **Production**: >0.2% market share, not dead, not Opera Mini
- **Development**: Latest Chrome, Firefox, Safari

## Extension Points

### Adding New Features

1. **New Filter Type**: Add to filters state, FilterBar UI, and applyFilters logic
2. **New Pokemon Property**: Update PokemonCard to display it
3. **Pagination**: Add page state, modify API call, add pagination UI
4. **Favorites**: Add localStorage persistence, favorites state, toggle UI

### Integrating External Libraries

```javascript
// Example: Adding React Query for data fetching
import { useQuery } from 'react-query';

const { data, isLoading, error } = useQuery(
  'pokemons',
  () => fetch('/api/pokemons').then(r => r.json())
);
```
