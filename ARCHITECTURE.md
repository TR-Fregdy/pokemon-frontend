# Architecture Documentation - Pokemon Frontend

## Overview

The Pokemon Frontend is a React-based single-page application (SPA) that provides an interactive interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch and display Pokemon information.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           POKEMON FRONTEND                                   │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              App.js                                    │  │
│  │                        (Main Application)                              │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                      STATE MANAGEMENT                            │  │  │
│  │  │                                                                  │  │  │
│  │  │  pokemons[]        filteredPokemons[]      types[]               │  │  │
│  │  │  filters{}         loading                 error                 │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                        │  │
│  │  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────┐   │  │
│  │  │    FilterBar     │  │   PokemonCard     │  │  LoadingSpinner  │   │  │
│  │  │                  │  │   (multiple)      │  │                  │   │  │
│  │  │  • Name search   │  │  • Image          │  │  • Pokeball      │   │  │
│  │  │  • Type filter   │  │  • Name/ID        │  │    animation     │   │  │
│  │  │  • Legendary     │  │  • Types          │  │  • Loading text  │   │  │
│  │  │    filter        │  │  • Legendary      │  │                  │   │  │
│  │  └──────────────────┘  │    badge          │  └──────────────────┘   │  │
│  │                         └───────────────────┘                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP/REST
                                      ▼
                        ┌────────────────────────┐
                        │   Pokemon Backend API   │
                        │   (localhost:3001)      │
                        └────────────────────────┘
```

## Component Hierarchy

```
App
├── Header
│   ├── Title: "Pokemon Explorer"
│   └── Subtitle
├── LoadingSpinner (conditional)
├── Error Display (conditional)
└── Main Content (conditional)
    ├── FilterBar
    │   ├── Name Input
    │   ├── Type Select
    │   ├── Legendary Select
    │   └── Clear Filters Button
    ├── Results Info
    ├── No Results Message (conditional)
    └── Pokemon Grid
        └── PokemonCard (multiple)
            ├── Image Container
            │   ├── Pokemon Image
            │   └── Legendary Badge
            └── Pokemon Info
                ├── Name
                ├── Type Badges
                └── ID Number
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                       │
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────────────┐│
│  │   Backend    │────►│    App.js    │────►│        Child Components      ││
│  │     API      │     │   (State)    │     │                              ││
│  └──────────────┘     └──────────────┘     │  ┌─────────┐  ┌───────────┐ ││
│                              │              │  │FilterBar│  │PokemonCard│ ││
│                              │              │  │         │  │           │ ││
│                              │              │  │ filters │  │ pokemon   │ ││
│                              │              │  │ types   │  │ data      │ ││
│                              │              │  │         │  │           │ ││
│                              │              │  └────┬────┘  └───────────┘ ││
│                              │              │       │                     ││
│                              │◄─────────────│───────┘                     ││
│                              │              │  onFilterChange             ││
│                         Filter Change       │  (Callback Props)           ││
│                              │              └──────────────────────────────┘│
│                              ▼                                               │
│                     ┌──────────────┐                                        │
│                     │   Filtered   │                                        │
│                     │   Pokemon    │                                        │
│                     │   Display    │                                        │
│                     └──────────────┘                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## State Management

### Application State (App.js)

| State Variable | Type | Description | Initial Value |
|----------------|------|-------------|---------------|
| `pokemons` | Array | Complete Pokemon list from API | `[]` |
| `filteredPokemons` | Array | Currently visible Pokemon | `[]` |
| `types` | Array | Available Pokemon types | `[]` |
| `filters` | Object | Current filter configuration | `{ name: '', type: '', legendary: '' }` |
| `loading` | Boolean | Data fetching in progress | `true` |
| `error` | String/null | Error message if any | `null` |

### State Updates Flow

```
User Action                    State Update                   UI Update
────────────────────────────────────────────────────────────────────────

Type in search box  ──────►  setFilters({...})  ──────►  Grid re-renders
                                    │
                                    ▼
                    useEffect triggers applyFilters()
                                    │
                                    ▼
                    setFilteredPokemons([...])
                                    │
                                    ▼
                           PokemonGrid updates
```

## Component Details

### App.js
```
Responsibilities:
├── Fetch initial data on mount
├── Manage global application state
├── Apply filters to Pokemon list
├── Handle loading and error states
└── Coordinate child components

Hooks Used:
├── useState (6 instances)
└── useEffect (2 instances)
    ├── Initial data fetch (runs once)
    └── Filter application (runs on filter/pokemon change)
```

### FilterBar.js
```
Responsibilities:
├── Render filter controls
├── Handle user input
└── Communicate changes to parent

Props:
├── filters: Object (current filter values)
├── types: Array (available type options)
├── onFilterChange: Function (callback)
└── onClearFilters: Function (callback)

Pattern: Controlled Components
└── Input values controlled by props, changes bubble up via callbacks
```

### PokemonCard.js
```
Responsibilities:
├── Display Pokemon information
├── Handle image loading errors
└── Apply conditional styling

Props:
├── pokemon: Object
    ├── id: Number
    ├── name: String
    ├── type: Array
    ├── legendary: Boolean
    └── image: String

Features:
├── Legendary badge (conditional)
├── Type color badges
├── Image fallback handler
└── Hover animations
```

### LoadingSpinner.js
```
Responsibilities:
└── Display animated Pokeball spinner

Pattern: Pure Presentational
└── No props, no state, purely visual

CSS Animation:
├── Spinning Pokeball (rotate)
└── Pulsing center dot (scale/opacity)
```

## API Integration

### Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/pokemons` | GET | Fetch all Pokemon |
| `/api/types` | GET | Fetch available types |

### Fetch Strategy

```javascript
// Parallel fetching for optimal performance
useEffect(() => {
  const fetchInitialData = async () => {
    const [pokemonResponse, typesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/pokemons`),
      fetch(`${API_BASE_URL}/api/types`)
    ]);
    // Process responses...
  };
  fetchInitialData();
}, []);
```

### Error Handling

```
┌─────────────────────────────────────────────────┐
│               ERROR HANDLING FLOW                │
│                                                  │
│  API Request                                     │
│      │                                           │
│      ▼                                           │
│  Response OK? ───No───► Set error message        │
│      │                        │                  │
│      │ Yes                    ▼                  │
│      ▼                  Display Error UI         │
│  Parse JSON                   │                  │
│      │                        ▼                  │
│      ▼                  [Retry Button]           │
│  Update State                                    │
│                                                  │
└─────────────────────────────────────────────────┘
```

## CSS Architecture

### File Organization

```
src/
├── index.css          # Global resets, fonts
├── App.css            # Application layout, header, grid
└── components/
    ├── PokemonCard.css    # Card styles, type colors
    ├── FilterBar.css      # Filter form styles
    └── LoadingSpinner.css # Spinner animation
```

### Design System

```
Colors:
├── Background Gradient: #667eea → #764ba2
├── Header Gradient: #ff6b6b → #4ecdc4
├── Card Background: rgba(255, 255, 255, 0.95)
├── Legendary Border: #ffd700 (gold)
└── Type Colors: Mapped per Pokemon type

Typography:
├── Font Family: 'Segoe UI', system fonts
├── Header: 2.5rem (2rem mobile)
└── Body: 1rem base

Spacing:
├── Container Max Width: 1200px
├── Card Padding: 1.5rem
├── Grid Gap: 1.5rem (1rem mobile)

Effects:
├── Glassmorphism: backdrop-filter: blur(10px)
├── Shadows: 0 8px 32px rgba(0,0,0,0.1)
├── Transitions: all 0.3s ease
└── Hover: translateY(-5px)
```

### Responsive Design

```
Desktop (>768px)                 Mobile (≤768px)
┌─────────────────────┐          ┌───────────────┐
│ [Filter] [Filter]   │          │ [Filter]      │
│ [Filter] [Clear]    │          │ [Filter]      │
├─────────────────────┤          │ [Filter]      │
│ [Card] [Card] [Card]│          │ [Clear]       │
│ [Card] [Card] [Card]│          ├───────────────┤
│ [Card] [Card] [Card]│          │ [Card]        │
└─────────────────────┘          │ [Card]        │
                                 │ [Card]        │
                                 └───────────────┘
```

## Build & Deployment

### Development Build

```
npm start
    │
    ▼
React Scripts (webpack-dev-server)
    │
    ├── Hot Module Replacement
    ├── Source Maps
    └── Proxy to Backend (/api → localhost:3001)
```

### Production Build

```
npm run build
    │
    ▼
React Scripts (webpack)
    │
    ├── Minification
    ├── Tree Shaking
    ├── Asset Hashing
    └── Output: /build directory
```

### Docker Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                    MULTI-STAGE DOCKER BUILD                      │
│                                                                  │
│  Stage 1: Builder (node:20-alpine)                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  1. Copy package*.json                                      │ │
│  │  2. npm install                                             │ │
│  │  3. Copy source files                                       │ │
│  │  4. npm run build → /app/build/                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  Stage 2: Runtime (nginx:alpine)                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  1. Copy nginx.conf                                         │ │
│  │  2. Copy /app/build → /usr/share/nginx/html                │ │
│  │  3. Expose port 80                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA client-side routing support
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Full-Stack Integration

### Network Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOCKER NETWORK                                   │
│                      (pokemon-network)                                   │
│                                                                          │
│  ┌─────────────────────────┐        ┌─────────────────────────┐        │
│  │   pokemon-frontend      │        │   pokemon-backend       │        │
│  │   (nginx:alpine)        │───────►│   (node:18-alpine)      │        │
│  │                         │  HTTP  │                         │        │
│  │   Port: 80 (internal)   │        │   Port: 3001 (internal) │        │
│  │   Port: 3002 (host)     │        │   Port: 3001 (host)     │        │
│  └─────────────────────────┘        └─────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                │                                    │
                ▼                                    ▼
         http://localhost:3002              http://localhost:3001
```

### Service Dependencies

```yaml
# docker-compose.yml
services:
  frontend:
    depends_on:
      - backend  # Frontend waits for backend to start
```

## Performance Considerations

### Current Implementation
- **Client-side filtering**: All Pokemon loaded once, filtered in browser
- **Parallel API requests**: Pokemon and types fetched simultaneously
- **CSS transitions**: Hardware-accelerated transforms

### Optimization Opportunities
1. **Lazy loading**: Load Pokemon images on scroll
2. **Memoization**: React.memo for PokemonCard
3. **Debouncing**: Delay filter application for typing
4. **Code splitting**: Dynamic imports for routes

## Security Considerations

### Current Implementation
- **No sensitive data handling**: Read-only Pokemon data
- **CORS**: Backend enables cross-origin requests
- **Input handling**: Filter inputs are read-only display values

### Production Recommendations
1. **Content Security Policy**: Add CSP headers in nginx
2. **HTTPS**: Enable SSL termination
3. **Environment variables**: Don't expose API URLs in client bundle

## Testing Strategy

### Component Testing (Jest + React Testing Library)
```javascript
// Example test structure
describe('PokemonCard', () => {
  it('renders Pokemon name', () => {...});
  it('shows legendary badge for legendary Pokemon', () => {...});
  it('displays all type badges', () => {...});
});
```

### Integration Testing
```javascript
// API integration tests
describe('App', () => {
  it('fetches and displays Pokemon on mount', () => {...});
  it('filters Pokemon by name', () => {...});
  it('handles API errors gracefully', () => {...});
});
```

## Future Architecture Considerations

### Routing (React Router)
```
/                    → Pokemon list
/pokemon/:id         → Pokemon detail
/favorites           → Saved favorites
```

### State Management (Redux/Context)
```
Store
├── pokemon/
│   ├── list
│   ├── filtered
│   └── loading
├── filters/
│   ├── name
│   ├── type
│   └── legendary
└── ui/
    ├── theme
    └── notifications
```

### Server-Side Rendering (Next.js)
- SEO optimization
- Faster initial page load
- API route consolidation
