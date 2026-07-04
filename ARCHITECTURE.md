# Architecture Overview - Pokemon Frontend

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          POKEMON FRONTEND APPLICATION                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                         React Application                             │ │
│  │                                                                       │ │
│  │   ┌─────────────────────────────────────────────────────────────────┐│ │
│  │   │                        App Component                            ││ │
│  │   │                                                                 ││ │
│  │   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ ││ │
│  │   │  │   State     │  │   Effects   │  │      Render Tree        │ ││ │
│  │   │  │             │  │             │  │                         │ ││ │
│  │   │  │ pokemons[]  │  │ fetchData() │  │  ┌─────────────────┐   │ ││ │
│  │   │  │ filtered[]  │  │ applyFilter │  │  │  LoadingSpinner │   │ ││ │
│  │   │  │ types[]     │──│             │──│  │  FilterBar      │   │ ││ │
│  │   │  │ filters{}   │  │             │  │  │  PokemonCard[]  │   │ ││ │
│  │   │  │ loading     │  │             │  │  └─────────────────┘   │ ││ │
│  │   │  │ error       │  │             │  │                         │ ││ │
│  │   │  └─────────────┘  └─────────────┘  └─────────────────────────┘ ││ │
│  │   │                                                                 ││ │
│  │   └─────────────────────────────────────────────────────────────────┘│ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  Development: localhost:3000    Production: Nginx on port 80               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP/REST (fetch)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           POKEMON BACKEND API                               │
│                          (localhost:3001)                                   │
│                                                                             │
│   GET /api/pokemons  ─────────  GET /api/types                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Component Hierarchy                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   index.js                                                                  │
│      │                                                                      │
│      └──▶ App.js (Root Component)                                          │
│              │                                                              │
│              ├──▶ LoadingSpinner.js                                        │
│              │    (Conditional: shown during data fetch)                   │
│              │                                                              │
│              ├──▶ Error Display                                            │
│              │    (Conditional: shown on fetch failure)                    │
│              │                                                              │
│              ├──▶ FilterBar.js                                             │
│              │    │                                                         │
│              │    ├── Name Input (text)                                    │
│              │    ├── Type Select (dropdown)                               │
│              │    ├── Legendary Select (dropdown)                          │
│              │    └── Clear Button (conditional)                           │
│              │                                                              │
│              └──▶ PokemonCard.js (mapped array)                            │
│                   │                                                         │
│                   ├── Pokemon Image                                        │
│                   ├── Pokemon Name                                         │
│                   ├── Type Badges (mapped array)                           │
│                   ├── Pokemon ID                                           │
│                   └── Legendary Badge (conditional)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Data Flow Diagram                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌────────────────┐                                                       │
│   │ Component Mount │                                                       │
│   └────────┬───────┘                                                       │
│            │                                                                │
│            ▼                                                                │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │  useEffect #1: fetchInitialData()                                  │   │
│   │                                                                     │   │
│   │  Promise.all([                                                      │   │
│   │    fetch('/api/pokemons'),  ────▶  setPokemons(data)               │   │
│   │    fetch('/api/types')      ────▶  setTypes(data)                  │   │
│   │  ])                                                                 │   │
│   │              │                                                      │   │
│   │              ▼                                                      │   │
│   │  setFilteredPokemons(pokemonData)  // Initial: all Pokemon         │   │
│   │                                                                     │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│            │                                                                │
│            ▼                                                                │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │  User Interaction ──▶ FilterBar ──▶ handleFilterChange()           │   │
│   │                                                                     │   │
│   │  setFilters({ ...filters, [field]: value })                        │   │
│   │                                                                     │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│            │                                                                │
│            ▼                                                                │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │  useEffect #2: applyFilters() [deps: filters, pokemons]            │   │
│   │                                                                     │   │
│   │  let filtered = [...pokemons]                                      │   │
│   │      │                                                              │   │
│   │      ├── if (filters.name)                                         │   │
│   │      │      filtered = filtered.filter(name match)                 │   │
│   │      │                                                              │   │
│   │      ├── if (filters.type)                                         │   │
│   │      │      filtered = filtered.filter(type match)                 │   │
│   │      │                                                              │   │
│   │      └── if (filters.legendary)                                    │   │
│   │             filtered = filtered.filter(legendary match)            │   │
│   │                                                                     │   │
│   │  setFilteredPokemons(filtered)                                     │   │
│   │                                                                     │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│            │                                                                │
│            ▼                                                                │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │  Re-render ──▶ PokemonCard.map(filteredPokemons)                   │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           State Architecture                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   App Component State (useState hooks)                                      │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  Source Data (from API)                                             │  │
│   │  ───────────────────────                                            │  │
│   │  pokemons[]     │  All Pokemon from /api/pokemons                  │  │
│   │  types[]        │  All types from /api/types                       │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  UI State (user interaction)                                        │  │
│   │  ────────────────────────────                                       │  │
│   │  filters {                                                          │  │
│   │    name: string       │  Text input value                          │  │
│   │    type: string       │  Selected type (or empty)                  │  │
│   │    legendary: string  │  'true', 'false', or ''                    │  │
│   │  }                                                                  │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  Derived State (computed from source + filters)                     │  │
│   │  ──────────────────────────────────────────────                     │  │
│   │  filteredPokemons[]  │  Result of applying filters to pokemons     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  Async State (loading indicators)                                   │  │
│   │  ─────────────────────────────────                                  │  │
│   │  loading: boolean    │  True during initial data fetch             │  │
│   │  error: string|null  │  Error message if fetch fails               │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
pokemon-frontend/
│
├── public/                        # Static assets (served directly)
│   │
│   ├── index.html                # HTML template
│   │                              # Contains: <div id="root">
│   │                              # Meta tags for SEO/PWA
│   │
│   └── manifest.json             # PWA manifest
│                                  # App name, colors, display mode
│
├── src/                           # React source code
│   │
│   ├── index.js                  # ENTRY POINT
│   │                              # ReactDOM.createRoot()
│   │                              # Renders <App />
│   │
│   ├── index.css                 # Global styles
│   │                              # Font family, base reset
│   │
│   ├── App.js                    # ROOT COMPONENT
│   │                              # All state management
│   │                              # API calls
│   │                              # Filter logic
│   │                              # Main layout
│   │
│   ├── App.css                   # App-level styles
│   │                              # Header, layout, grid
│   │                              # Error/no-results states
│   │
│   └── components/               # Reusable UI components
│       │
│       ├── PokemonCard.js        # Pokemon display card
│       │                          # Props: { pokemon }
│       │                          # Shows: image, name, types, id
│       │
│       ├── PokemonCard.css       # Card styles
│       │                          # Type color classes
│       │                          # Hover animations
│       │                          # Legendary styling
│       │
│       ├── FilterBar.js          # Filter controls
│       │                          # Props: { filters, types,
│       │                          #          onFilterChange,
│       │                          #          onClearFilters }
│       │
│       ├── FilterBar.css         # Filter form styles
│       │                          # Grid layout
│       │                          # Input/select styling
│       │
│       ├── LoadingSpinner.js     # Pokeball loading animation
│       │                          # Pure presentational
│       │
│       └── LoadingSpinner.css    # Spinner animation
│                                  # CSS keyframes
│
├── .tr-codegen/                   # Docker/deployment config
│   │
│   ├── Dockerfile                # Multi-stage build
│   │                              # Stage 1: node:20-alpine (build)
│   │                              # Stage 2: nginx:alpine (serve)
│   │
│   ├── docker-compose.yml        # Full-stack orchestration
│   │                              # Frontend + Backend services
│   │                              # Network configuration
│   │
│   └── nginx.conf                # Production web server
│                                  # SPA routing support
│
├── package.json                   # NPM configuration
│                                  # Dependencies, scripts
│                                  # Proxy configuration
│
├── .env.example                   # Environment template
│                                  # REACT_APP_API_URL
│
├── .gitignore                     # Git exclusions
│
├── .dockerignore                  # Docker build exclusions
│
├── README.md                      # Project documentation
│
├── CLAUDE.md                      # AI agent guidance
│
└── ARCHITECTURE.md               # This file
```

## Styling Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CSS Architecture                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   CSS File Organization (Component-Scoped)                                  │
│                                                                             │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│   │   index.css     │  │    App.css      │  │ Component.css   │           │
│   │   (globals)     │  │  (app layout)   │  │  (component)    │           │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘           │
│           │                    │                     │                     │
│           ▼                    ▼                     ▼                     │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │  • Font family          • Header styles     • Component-specific   │ │
│   │  • Base body styles     • Main layout       • Hover states         │ │
│   │  • Code font            • Grid system       • Animations           │ │
│   │                         • Error states      • Responsive           │ │
│   │                         • No-results        • Variants             │ │
│   └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│   Design Tokens                                                             │
│   ─────────────                                                             │
│   Colors:                                                                   │
│   • Primary Gradient: #667eea → #764ba2 (background)                       │
│   • Header Gradient: #ff6b6b → #4ecdc4                                     │
│   • Accent Red: #ff6b6b                                                     │
│   • Accent Teal: #4ecdc4                                                    │
│   • Card White: rgba(255, 255, 255, 0.95)                                   │
│   • Legendary Gold: #ffd700                                                 │
│                                                                             │
│   Spacing:                                                                  │
│   • Small: 0.5rem                                                           │
│   • Medium: 1rem                                                            │
│   • Large: 1.5rem - 2rem                                                    │
│                                                                             │
│   Border Radius:                                                            │
│   • Small: 8px                                                              │
│   • Medium: 12px                                                            │
│   • Large: 16px                                                             │
│   • Pill: 20px                                                              │
│                                                                             │
│   Breakpoints:                                                              │
│   • Mobile: < 768px                                                         │
│   • Desktop: >= 768px                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Network Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Network Flow                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DEVELOPMENT MODE (npm start)                                              │
│   ────────────────────────────                                              │
│                                                                             │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐       │
│   │   Browser    │────────▶│  Dev Server  │────────▶│   Backend    │       │
│   │              │  :3000  │  (Webpack)   │  proxy  │   (Express)  │       │
│   │              │◀────────│              │◀────────│   :3001      │       │
│   └──────────────┘   HMR   └──────────────┘         └──────────────┘       │
│                                                                             │
│   Proxy Configuration (package.json):                                       │
│   "proxy": "http://localhost:3001"                                         │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────    │
│                                                                             │
│   PRODUCTION MODE (Docker)                                                  │
│   ────────────────────────                                                  │
│                                                                             │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐       │
│   │   Browser    │────────▶│    Nginx     │         │   Backend    │       │
│   │              │  :3002  │   (static)   │         │   :3001      │       │
│   │              │◀────────│              │         │              │       │
│   └──────────────┘         └──────────────┘         └──────────────┘       │
│          │                                                  ▲               │
│          │              API calls via                       │               │
│          └─────────────────────────────────────────────────┘               │
│                    REACT_APP_API_URL                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Docker Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Docker Build Pipeline                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Multi-Stage Build                                                         │
│                                                                             │
│   STAGE 1: Build                                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  FROM node:20-alpine AS builder                                     │  │
│   │                                                                      │  │
│   │  WORKDIR /app                                                        │  │
│   │       │                                                              │  │
│   │       ├── COPY package*.json ./                                     │  │
│   │       ├── RUN npm install                                           │  │
│   │       ├── COPY . .                                                   │  │
│   │       └── RUN npm run build  ──▶  /app/build/                       │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                             │                                               │
│                             │ Artifacts: /app/build/*                       │
│                             ▼                                               │
│   STAGE 2: Runtime                                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  FROM nginx:alpine                                                   │  │
│   │                                                                      │  │
│   │  ├── COPY nginx.conf  ──▶  /etc/nginx/conf.d/default.conf          │  │
│   │  └── COPY --from=builder /app/build/  ──▶  /usr/share/nginx/html/  │  │
│   │                                                                      │  │
│   │  Exposed: Port 80                                                    │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Docker Compose Full Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    docker-compose.yml Architecture                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         pokemon-network (bridge)                            │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   ┌─────────────────────────┐     ┌─────────────────────────┐       │  │
│   │   │     main_app_web        │     │ main_app_pokemon-backend│       │  │
│   │   │   (pokemon-frontend)    │     │   (pokemon-backend)     │       │  │
│   │   │                         │     │                         │       │  │
│   │   │   Build:                │     │   Build:                │       │  │
│   │   │   context: .            │     │   context: ../backend   │       │  │
│   │   │   dockerfile: .tr-co... │     │   dockerfile: .tr-co... │       │  │
│   │   │                         │     │                         │       │  │
│   │   │   Ports: 3002:80        │     │   Ports: 3001:3001      │       │  │
│   │   │                         │────▶│                         │       │  │
│   │   │   depends_on:           │     │   Environment:          │       │  │
│   │   │   - pokemon-backend     │     │   - NODE_ENV=production │       │  │
│   │   │                         │     │   - PORT=3001           │       │  │
│   │   │                         │     │                         │       │  │
│   │   │                         │     │   Healthcheck: /health  │       │  │
│   │   └─────────────────────────┘     └─────────────────────────┘       │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   External Access:                                                          │
│   • Frontend: http://localhost:3002                                        │
│   • Backend:  http://localhost:3001                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Props Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Component Contracts                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   PokemonCard                                                               │
│   ───────────                                                               │
│   Props: {                                                                  │
│     pokemon: {                                                              │
│       id: number,                                                           │
│       name: string,                                                         │
│       type: string[],                                                       │
│       legendary: boolean,                                                   │
│       image: string                                                         │
│     }                                                                       │
│   }                                                                         │
│                                                                             │
│   FilterBar                                                                 │
│   ─────────                                                                 │
│   Props: {                                                                  │
│     filters: {                                                              │
│       name: string,                                                         │
│       type: string,                                                         │
│       legendary: string  // '', 'true', or 'false'                         │
│     },                                                                      │
│     types: string[],           // Available type options                   │
│     onFilterChange: (newFilters) => void,                                  │
│     onClearFilters: () => void                                             │
│   }                                                                         │
│                                                                             │
│   LoadingSpinner                                                            │
│   ──────────────                                                            │
│   Props: {} (no props)                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Error Handling                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Network Error Handling                                                    │
│   ──────────────────────                                                    │
│                                                                             │
│   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐            │
│   │ API Request   │────▶│ Response Check │────▶│ Parse JSON    │            │
│   │ fetch(...)    │     │ !response.ok   │     │               │            │
│   └───────────────┘     └───────────────┘     └───────────────┘            │
│           │                    │                      │                     │
│           │                    │ Error                │ Success             │
│           │                    ▼                      ▼                     │
│           │             ┌─────────────┐        ┌─────────────┐             │
│           │             │ throw Error │        │ setPokemons │             │
│           │             │             │        │ setTypes    │             │
│           │             └─────────────┘        └─────────────┘             │
│           │                    │                                            │
│     catch block ◀──────────────┘                                           │
│           │                                                                 │
│           ▼                                                                 │
│   ┌───────────────────────────────────────────────────────────┐            │
│   │  setError('Failed to load Pokemon data...')               │            │
│   │  console.error('Error fetching data:', err)               │            │
│   └───────────────────────────────────────────────────────────┘            │
│                                                                             │
│   UI Error State                                                            │
│   ──────────────                                                            │
│                                                                             │
│   ┌────────────────────────────────────────────────┐                       │
│   │  ⚠️ Connection Error                           │                       │
│   │                                                 │                       │
│   │  Failed to load Pokemon data. Please make      │                       │
│   │  sure the backend server is running.           │                       │
│   │                                                 │                       │
│   │  [ Retry ]                                      │                       │
│   │                                                 │                       │
│   └────────────────────────────────────────────────┘                       │
│                                                                             │
│   Image Error Handling                                                      │
│   ────────────────────                                                      │
│                                                                             │
│   onError={(e) => {                                                        │
│     e.target.src = '/placeholder-pokemon.png';                             │
│   }}                                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Build and Deployment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Deployment Options                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Option 1: Local Development                                               │
│   ───────────────────────────                                               │
│                                                                             │
│   npm start                                                                 │
│       │                                                                     │
│       └──▶ Webpack Dev Server                                              │
│                │                                                            │
│                ├── Hot Module Replacement                                   │
│                ├── Proxy to backend (:3001)                                │
│                └── http://localhost:3000                                   │
│                                                                             │
│   ───────────────────────────────────────────────────────────────────────  │
│                                                                             │
│   Option 2: Production Build (Local)                                        │
│   ──────────────────────────────────                                        │
│                                                                             │
│   npm run build                                                             │
│       │                                                                     │
│       └──▶ build/                                                          │
│                ├── index.html                                               │
│                ├── static/js/*.js                                          │
│                └── static/css/*.css                                        │
│                                                                             │
│   Serve with: npx serve -s build                                           │
│                                                                             │
│   ───────────────────────────────────────────────────────────────────────  │
│                                                                             │
│   Option 3: Docker                                                          │
│   ────────────────                                                          │
│                                                                             │
│   docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .             │
│   docker run -p 3002:80 pokemon-frontend                                   │
│                                                                             │
│   Access: http://localhost:3002                                            │
│                                                                             │
│   ───────────────────────────────────────────────────────────────────────  │
│                                                                             │
│   Option 4: Docker Compose (Full Stack)                                     │
│   ─────────────────────────────────────                                     │
│                                                                             │
│   docker-compose -f .tr-codegen/docker-compose.yml up -d                   │
│                                                                             │
│   Access:                                                                   │
│   • Frontend: http://localhost:3002                                        │
│   • Backend:  http://localhost:3001                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Performance Architecture                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Current Optimizations                                                     │
│   ─────────────────────                                                     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  • Client-side filtering (no network latency per filter change)    │  │
│   │  • Single initial API call (parallel fetch for pokemons + types)   │  │
│   │  • CSS-only animations (GPU accelerated)                            │  │
│   │  • External image CDN (PokeAPI sprites)                             │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   Potential Improvements                                                    │
│   ──────────────────────                                                    │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  • React.memo() on PokemonCard (prevent unnecessary re-renders)    │  │
│   │  • useMemo() for filtered results                                   │  │
│   │  • useCallback() for event handlers                                 │  │
│   │  • Virtualized list (react-window) for large datasets              │  │
│   │  • Image lazy loading (loading="lazy")                              │  │
│   │  • Service Worker for offline support                               │  │
│   │  • Code splitting with React.lazy()                                 │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
