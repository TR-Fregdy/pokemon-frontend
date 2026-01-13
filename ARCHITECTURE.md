# Architecture - Pokemon Frontend

## High-Level Overview

The Pokemon Frontend is a React Single Page Application (SPA) that provides an interactive interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch data and performs client-side filtering.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Pokemon Frontend                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │                              App                                      │ │
│   │  ┌─────────────┐  ┌─────────────────────────────────────────────┐   │ │
│   │  │   State     │  │                 UI Layer                     │   │ │
│   │  │  Management │  │  ┌───────────┐ ┌────────────┐ ┌──────────┐  │   │ │
│   │  │  (useState) │──│  │ FilterBar │ │PokemonCard │ │ Loading  │  │   │ │
│   │  │             │  │  │           │ │   (×N)     │ │ Spinner  │  │   │ │
│   │  └─────────────┘  │  └───────────┘ └────────────┘ └──────────┘  │   │ │
│   │                   └─────────────────────────────────────────────┘   │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│                                      │ HTTP Fetch                            │
│                                      ▼                                       │
│                         ┌─────────────────────────┐                         │
│                         │   Pokemon Backend API   │                         │
│                         │    (localhost:3001)     │                         │
│                         └─────────────────────────┘                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## System Architecture

### Component Hierarchy

```
index.js
    │
    └── App.js (Main Container)
            │
            ├── LoadingSpinner.js (Conditional: loading state)
            │
            ├── Error Display (Conditional: error state)
            │
            └── Main Content (Conditional: loaded state)
                    │
                    ├── FilterBar.js
                    │       ├── Name Search Input
                    │       ├── Type Select Dropdown
                    │       ├── Legendary Select Dropdown
                    │       └── Clear Filters Button
                    │
                    ├── Results Info
                    │
                    └── Pokemon Grid
                            └── PokemonCard.js (×N)
                                    ├── Image Container
                                    │       ├── Pokemon Image
                                    │       └── Legendary Badge
                                    └── Info Section
                                            ├── Name
                                            ├── Type Badges
                                            └── ID Number
```

## Major Components

### 1. App Component (`src/App.js`)

**Responsibilities**:
- Application state management
- API data fetching
- Filter logic orchestration
- Conditional rendering based on state

**State Variables**:
```javascript
{
  pokemons: [],         // Raw data from API
  filteredPokemons: [], // Data after filtering
  types: [],            // Available types for dropdown
  filters: {            // Current filter values
    name: '',
    type: '',
    legendary: ''
  },
  loading: true,        // Loading indicator
  error: null           // Error message
}
```

### 2. FilterBar Component (`src/components/FilterBar.js`)

**Responsibilities**:
- Render filter input controls
- Emit filter change events to parent
- Track active filter state for clear button

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter values |
| `types` | Array | Available Pokemon types |
| `onFilterChange` | Function | Callback for filter updates |
| `onClearFilters` | Function | Callback to reset filters |

### 3. PokemonCard Component (`src/components/PokemonCard.js`)

**Responsibilities**:
- Display individual Pokemon information
- Render type badges with appropriate colors
- Handle image loading errors
- Apply legendary styling when applicable

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data (id, name, type, legendary, image) |

### 4. LoadingSpinner Component (`src/components/LoadingSpinner.js`)

**Responsibilities**:
- Display animated Pokeball spinner
- Show loading text

## Data Flow

### Initial Data Loading

```
1. App mounts
        │
        ▼
2. useEffect triggers fetchInitialData()
        │
        ▼
3. Parallel API calls: /api/pokemons & /api/types
        │
        ├── Success: Update state (pokemons, types, filteredPokemons)
        │
        └── Failure: Set error state
```

### Filter Application

```
1. User interacts with FilterBar
        │
        ▼
2. FilterBar calls onFilterChange(newFilters)
        │
        ▼
3. App updates filters state
        │
        ▼
4. useEffect detects filter change
        │
        ▼
5. applyFilters() runs locally on pokemons array
        │
        ▼
6. filteredPokemons state updated
        │
        ▼
7. React re-renders PokemonCard components
```

### Filter Logic

```javascript
// Applied sequentially:
1. Name Filter:     pokemon.name.toLowerCase().includes(filter)
2. Type Filter:     pokemon.type.some(t => t === filter)
3. Legendary Filter: pokemon.legendary === (filter === 'true')
```

## Key Architectural Decisions

### 1. Client-Side Filtering

**Decision**: Filter data in browser after fetching all Pokemon

**Rationale**:
- Small dataset (12 Pokemon) doesn't benefit from server-side filtering
- Instant filter response without network latency
- Simpler user experience with immediate feedback

### 2. Local State Management

**Decision**: Use React's built-in useState/useEffect instead of Redux

**Rationale**:
- Simple application state structure
- No complex state sharing between distant components
- Reduced bundle size and complexity

### 3. CSS-per-Component

**Decision**: Separate CSS file for each component (not CSS modules)

**Rationale**:
- Clear organization of styles
- Easy to locate component-specific styles
- Global namespace with naming conventions (`.component-name`)

### 4. Proxy Configuration

**Decision**: Use CRA proxy for development API requests

**Rationale**:
- Avoid CORS issues during development
- Simpler local development setup
- Production uses environment variable for API URL

## Dependencies Between Modules

```
src/index.js
    └── imports App.js
            └── imports components/
                    ├── PokemonCard.js (+ .css)
                    ├── FilterBar.js (+ .css)
                    └── LoadingSpinner.js (+ .css)
```

## External Integrations

### Pokemon Backend API

- **Connection**: HTTP fetch requests
- **Base URL**: `REACT_APP_API_URL` or `http://localhost:3001`
- **Endpoints**:
  - `GET /api/pokemons` - Initial data load
  - `GET /api/types` - Type dropdown options

### PokeAPI Sprites (Indirect)

- Pokemon images are URLs to PokeAPI GitHub repository
- Images loaded directly in `<img>` tags
- Error handling for failed image loads

## Deployment Architecture

### Production Build

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Multi-Stage Build                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Stage 1: Builder (node:20-alpine)                              │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  npm install → npm run build → /app/build/              │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  Stage 2: Runtime (nginx:alpine)                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  COPY build/ → /usr/share/nginx/html/                   │    │
│  │                                                          │    │
│  │  nginx.conf: SPA routing (try_files → index.html)       │    │
│  │                                                          │    │
│  │  Port 80 ─────────────────────────────────────────────> │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Docker Compose Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    pokemon-network (bridge)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐     ┌─────────────────────────────┐   │
│  │   main_app_web      │     │  main_app_pokemon-backend   │   │
│  │   (Frontend)        │────>│  (Backend API)              │   │
│  │   Port 3002:80      │     │  Port 3001:3001             │   │
│  └─────────────────────┘     └─────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Responsive Design Breakpoints

| Breakpoint | Grid Columns | Notes |
|------------|--------------|-------|
| Desktop (>768px) | Auto-fill, min 280px | Multi-column grid |
| Mobile (≤768px) | Auto-fill, min 250px | Fewer columns, stacked filters |

## Browser Support

Configured in `package.json` browserslist:
- Production: >0.2% market share, not dead, not op_mini
- Development: Latest Chrome, Firefox, Safari
