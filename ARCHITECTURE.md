# Architecture Overview - Pokemon Frontend

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Pokemon Explorer System                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────┐      ┌──────────────────────────────┐    │
│  │       React Frontend         │      │       Express Backend        │    │
│  │         (Port 3000)          │─────>│         (Port 3001)          │    │
│  │                              │ HTTP │                              │    │
│  │  ┌────────────────────────┐  │      │  ┌────────────────────────┐  │    │
│  │  │        App.js          │  │      │  │      server.js         │  │    │
│  │  │   (State Container)    │  │      │  │   (API Endpoints)      │  │    │
│  │  └───────────┬────────────┘  │      │  └────────────────────────┘  │    │
│  │              │               │      │                              │    │
│  │  ┌───────────┴───────────┐   │      └──────────────────────────────┘    │
│  │  │      Components       │   │                                          │
│  │  ├───────────────────────┤   │                                          │
│  │  │ FilterBar │ PokemonCard│  │                                          │
│  │  │ LoadingSpinner        │   │                                          │
│  │  └───────────────────────┘   │                                          │
│  └──────────────────────────────┘                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Header
│   ├── Title (h1)
│   └── Subtitle (p)
│
├── LoadingSpinner (conditional)
│
├── Error Container (conditional)
│   ├── Error Message
│   └── Retry Button
│
└── Main Content (default)
    ├── FilterBar
    │   ├── Name Input
    │   ├── Type Dropdown
    │   ├── Legendary Dropdown
    │   └── Clear Filters Button (conditional)
    │
    ├── Results Info
    │
    └── Pokemon Grid
        └── PokemonCard (repeated)
            ├── Image Container
            │   ├── Pokemon Image
            │   └── Legendary Badge (conditional)
            └── Pokemon Info
                ├── Name
                ├── Type Badges
                └── ID Number
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Flow Diagram                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Initial Load                                                    │
│     ┌─────┐        ┌─────────┐        ┌─────────┐                  │
│     │ App │──GET──>│ Backend │──JSON──>│  State  │                  │
│     └─────┘        │  /api/* │        │pokemons │                  │
│                    └─────────┘        │ types   │                  │
│                                       └─────────┘                  │
│                                                                     │
│  2. User Filtering                                                  │
│     ┌───────────┐     ┌─────────┐     ┌─────────────┐              │
│     │ FilterBar │────>│  App    │────>│ filteredPoke│              │
│     │  (input)  │     │(filter) │     │    mons     │              │
│     └───────────┘     └─────────┘     └─────────────┘              │
│                                              │                      │
│                                              ▼                      │
│                                       ┌─────────────┐              │
│                                       │ PokemonGrid │              │
│                                       │  (render)   │              │
│                                       └─────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## State Management

### App-Level State

| State Variable | Type | Description |
|----------------|------|-------------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Pokemon after filter application |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values `{ name, type, legendary }` |
| `loading` | Boolean | Loading state indicator |
| `error` | String/null | Error message if fetch fails |

### State Update Flow

```
User Action → Handler Function → setState → Re-render
     │                                          │
     │    ┌─────────────────────────────┐       │
     └───>│  handleFilterChange()       │───────┘
          │  clearFilters()             │
          │  fetchInitialData()         │
          └─────────────────────────────┘
```

## Styling Architecture

### CSS File Structure

```
src/
├── index.css          # Base reset, font imports
├── App.css            # Layout, header, grid, responsive
└── components/
    ├── FilterBar.css      # Filter controls styling
    ├── PokemonCard.css    # Card styling, type colors
    └── LoadingSpinner.css # Animation keyframes
```

### Type Color System

Pokemon types use gradient backgrounds defined in `PokemonCard.css`:

| Type | Colors |
|------|--------|
| Fire | `#ff6b6b` → `#ff8e53` |
| Water | `#4ecdc4` → `#44a08d` |
| Grass | `#95e1d3` → `#68d391` |
| Electric | `#fce38a` → `#f9ca24` |
| Psychic | `#e056fd` → `#c44569` |
| Ice | `#74b9ff` → `#0984e3` |
| Dragon | `#a29bfe` → `#6c5ce7` |
| Flying | `#fd79a8` → `#fdcb6e` |
| Poison | `#6c5ce7` → `#a29bfe` |

## API Integration Layer

### Endpoint Consumption

```javascript
// Initial data fetch in App.js useEffect
Promise.all([
  fetch(`${API_BASE_URL}/api/pokemons`),
  fetch(`${API_BASE_URL}/api/types`)
])
```

### Error Handling Strategy

1. **Network Error**: Display error message with retry button
2. **HTTP Error**: Check `response.ok`, throw on failure
3. **Empty Results**: Show "No Pokemon found" with clear filters option

## Deployment Architecture

### Production Build Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Multi-Stage Build                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Stage 1: Builder (node:20-alpine)                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  1. npm install (dependencies)                            │   │
│  │  2. npm run build (create optimized bundle)               │   │
│  │  3. Output: /app/build/                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           │                                      │
│                           ▼                                      │
│  Stage 2: Runtime (nginx:alpine)                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  1. Copy nginx.conf                                       │   │
│  │  2. Copy build files to /usr/share/nginx/html/           │   │
│  │  3. Serve on port 80                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Full-Stack Docker Compose

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                        │
│                     (pokemon-network)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐      ┌─────────────────────┐          │
│  │   main_app_web      │      │main_app_pokemon-    │          │
│  │   (Frontend)        │─────>│     backend         │          │
│  │   Port: 3002:80     │      │   Port: 3001:3001   │          │
│  │                     │      │                     │          │
│  │   depends_on:       │      │   healthcheck:      │          │
│  │   backend service   │      │   GET /health       │          │
│  └─────────────────────┘      └─────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| React functional components | Modern React patterns, better performance with hooks |
| Client-side filtering | Reduces API calls, instant feedback for small datasets |
| No state management library | App complexity doesn't warrant Redux/Context |
| CSS-per-component | Encapsulation without CSS-in-JS overhead |
| Nginx for production | Efficient static file serving, SPA routing support |
| Multi-stage Docker build | Smaller production image, faster deployments |

## Dependencies

### Runtime Dependencies

- `react`: UI component framework
- `react-dom`: DOM rendering
- `react-scripts`: Build toolchain (CRA)

### Development Proxy

The `package.json` includes a proxy configuration for development:
```json
"proxy": "http://localhost:3001"
```

This allows API calls to `/api/*` to be forwarded to the backend during development.
