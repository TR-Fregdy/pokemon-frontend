# Architecture Overview - Pokemon Frontend

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Pokemon Frontend (React SPA)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         App Component                               │ │
│  │  ┌──────────────────────────────────────────────────────────────┐  │ │
│  │  │                      State Management                         │  │ │
│  │  │  ┌───────────┐ ┌───────────────┐ ┌─────────┐ ┌───────────┐  │  │ │
│  │  │  │ pokemons  │ │filteredPokemon│ │  types  │ │  filters  │  │  │ │
│  │  │  └───────────┘ └───────────────┘ └─────────┘ └───────────┘  │  │ │
│  │  │  ┌───────────┐ ┌───────────────┐                             │  │ │
│  │  │  │  loading  │ │     error     │                             │  │ │
│  │  │  └───────────┘ └───────────────┘                             │  │ │
│  │  └──────────────────────────────────────────────────────────────┘  │ │
│  │                              │                                      │ │
│  │         ┌────────────────────┼────────────────────┐                │ │
│  │         │                    │                    │                │ │
│  │         ▼                    ▼                    ▼                │ │
│  │  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐       │ │
│  │  │  FilterBar  │    │LoadingSpinner│    │  PokemonCard[]  │       │ │
│  │  │  Component  │    │  Component   │    │   Components    │       │ │
│  │  └─────────────┘    └──────────────┘    └─────────────────┘       │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/JSON (fetch API)
                                    ▼
                        ┌─────────────────────┐
                        │   Pokemon Backend   │
                        │   API (Port 3001)   │
                        └─────────────────────┘
```

## Directory Structure

```
pokemon-frontend/
├── public/                      # Static assets
│   ├── index.html               # HTML template
│   └── manifest.json            # PWA manifest
│
├── src/                         # Source code
│   ├── index.js                 # React entry point
│   ├── index.css                # Global base styles
│   ├── App.js                   # Main application component
│   ├── App.css                  # App-level styles
│   └── components/              # Reusable components
│       ├── PokemonCard.js       # Pokemon display card
│       ├── PokemonCard.css      # Card styles
│       ├── FilterBar.js         # Filter controls
│       ├── FilterBar.css        # Filter styles
│       ├── LoadingSpinner.js    # Loading animation
│       └── LoadingSpinner.css   # Spinner styles
│
├── .tr-codegen/                 # Docker deployment
│   ├── Dockerfile               # Multi-stage build
│   ├── docker-compose.yml       # Container orchestration
│   └── nginx.conf               # Production web server
│
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment template
└── .gitignore                   # Git ignore rules
```

For detailed information about each directory, see:
- [src/README.md](./src/README.md) - Source code documentation
- [src/components/README.md](./src/components/README.md) - Components documentation
- [public/README.md](./public/README.md) - Public assets documentation

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.js                                  │
│              (React DOM Root Rendering)                          │
│                          │                                       │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      App.js                                │  │
│  │              (Main Container Component)                    │  │
│  │                                                            │  │
│  │  State:                                                    │  │
│  │  • pokemons[] - All fetched Pokemon                       │  │
│  │  • filteredPokemons[] - After filter application          │  │
│  │  • types[] - Available Pokemon types                      │  │
│  │  • filters{} - Current filter values                      │  │
│  │  • loading - Loading state                                │  │
│  │  • error - Error state                                    │  │
│  │                                                            │  │
│  │  Effects:                                                  │  │
│  │  • useEffect (mount) - Fetch initial data                 │  │
│  │  • useEffect (filters) - Apply filters to data            │  │
│  │                                                            │  │
│  │  Handlers:                                                 │  │
│  │  • handleFilterChange()                                   │  │
│  │  • clearFilters()                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│              │                    │                    │         │
│              ▼                    ▼                    ▼         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   FilterBar.js  │  │LoadingSpinner.js│  │  PokemonCard.js │  │
│  │                 │  │                 │  │                 │  │
│  │ Props:          │  │ Props: none     │  │ Props:          │  │
│  │ • filters       │  │                 │  │ • pokemon       │  │
│  │ • types         │  │ Renders:        │  │                 │  │
│  │ • onFilterChange│  │ • Pokeball      │  │ Renders:        │  │
│  │ • onClearFilters│  │   animation     │  │ • Image         │  │
│  │                 │  │ • Loading text  │  │ • Name/ID       │  │
│  │ Renders:        │  │                 │  │ • Type badges   │  │
│  │ • Name input    │  └─────────────────┘  │ • Legend badge  │  │
│  │ • Type select   │                       │                 │  │
│  │ • Legend select │                       └─────────────────┘  │
│  │ • Clear button  │                                            │
│  └─────────────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌─────────────────┐
│ Component Mount │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│          Parallel API Requests           │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │GET /pokemons │  │   GET /types     │ │
│  └──────────────┘  └──────────────────┘ │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│           Update State                   │
│  setPokemons(data)                       │
│  setFilteredPokemons(data)               │
│  setTypes(data)                          │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│          Render Pokemon Grid             │
│  filteredPokemons.map(p => <Card />)    │
└─────────────────────────────────────────┘
```

### Filter Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         FilterBar                                │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────────┐   │
│  │  Name Input   │  │ Type Dropdown │  │ Legendary Dropdown │   │
│  └───────┬───────┘  └───────┬───────┘  └──────────┬─────────┘   │
│          │                  │                     │              │
│          └──────────────────┼─────────────────────┘              │
│                             │                                    │
│                             ▼                                    │
│                   onFilterChange(newFilters)                     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      App Component                               │
│                                                                  │
│  setFilters(newFilters)                                          │
│           │                                                      │
│           ▼                                                      │
│  useEffect([filters, pokemons]) triggers                         │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Client-Side Filtering                       │    │
│  │  1. Start with [...pokemons]                            │    │
│  │  2. Filter by name (includes, case-insensitive)         │    │
│  │  3. Filter by type (exact match, case-insensitive)      │    │
│  │  4. Filter by legendary (boolean comparison)            │    │
│  └─────────────────────────────────────────────────────────┘    │
│           │                                                      │
│           ▼                                                      │
│  setFilteredPokemons(filtered)                                   │
│           │                                                      │
│           ▼                                                      │
│  Re-render PokemonCard grid                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React 18.2.0                           │  │
│  │          (Functional Components + Hooks)                  │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        UI Layer                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Custom CSS (No Framework)                  │  │
│  │  • Glassmorphism effects                                  │  │
│  │  • CSS Grid & Flexbox                                     │  │
│  │  • CSS Animations                                         │  │
│  │  • Responsive Design                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                      Build Layer                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Create React App (react-scripts)             │  │
│  │  • Webpack (bundling)                                     │  │
│  │  • Babel (transpiling)                                    │  │
│  │  • ESLint (linting)                                       │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                    Production Layer                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Nginx (Alpine)                         │  │
│  │  • Static file serving                                    │  │
│  │  • SPA routing fallback                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Build Process                          │
│                                                                  │
│  Stage 1: Builder (node:20-alpine)                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. npm install (install dependencies)                    │  │
│  │  2. npm run build (create production bundle)              │  │
│  │                                                           │  │
│  │  Output: /app/build/ (static files)                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │                                     │
│                            ▼                                     │
│  Stage 2: Runtime (nginx:alpine)                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. Copy nginx.conf to /etc/nginx/conf.d/                 │  │
│  │  2. Copy build/ to /usr/share/nginx/html/                 │  │
│  │                                                           │  │
│  │  Nginx Configuration:                                     │  │
│  │  • Listen on port 80                                      │  │
│  │  • Serve static files                                     │  │
│  │  • Fallback to index.html (SPA routing)                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │                                     │
│                            │ :80 (internal)                      │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ▼ :3002 (host)
                     ┌──────────────┐
                     │    Browser   │
                     └──────────────┘
```

## Full Stack Integration

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Docker Compose Network                            │
│                          (pokemon-network)                               │
│                                                                          │
│  ┌─────────────────────────────┐    ┌─────────────────────────────────┐ │
│  │    Frontend Container       │    │      Backend Container           │ │
│  │                             │    │                                  │ │
│  │  ┌───────────────────────┐  │    │  ┌────────────────────────────┐ │ │
│  │  │        Nginx          │  │    │  │       Node.js/Express      │ │ │
│  │  │  (Static File Server) │  │    │  │       (REST API)           │ │ │
│  │  └───────────────────────┘  │    │  └────────────────────────────┘ │ │
│  │           │                 │    │              │                   │ │
│  │           │ :80             │    │              │ :3001             │ │
│  └───────────┼─────────────────┘    └──────────────┼───────────────────┘ │
│              │                                     │                     │
│              │ :3002                               │ :3001               │
└──────────────┼─────────────────────────────────────┼─────────────────────┘
               │                                     │
               ▼                                     │
       ┌──────────────┐                              │
       │   Browser    │ ─────────────────────────────┘
       │              │    API calls to localhost:3001
       └──────────────┘
```

## Key Design Decisions

1. **Create React App**: Minimal configuration, fast setup
2. **Local State Only**: No Redux/Context for simplicity
3. **Client-Side Filtering**: Better UX (instant feedback), simple API
4. **CSS Per Component**: Maintainable, scoped styles
5. **Multi-Stage Docker**: Small production image (~23MB)
6. **Nginx for Production**: Fast, reliable static file serving

## Responsive Design Breakpoints

```
Desktop (> 768px)        Tablet (768px)           Mobile (< 768px)
┌───┬───┬───┬───┐       ┌───┬───┬───┐           ┌───────────┐
│   │   │   │   │       │   │   │   │           │           │
├───┼───┼───┼───┤       ├───┼───┼───┤           ├───────────┤
│   │   │   │   │       │   │   │   │           │           │
├───┼───┼───┼───┤       └───┴───┴───┘           ├───────────┤
│   │   │   │   │                               │           │
└───┴───┴───┴───┘                               └───────────┘
4 columns                3 columns               1 column
```

## Performance Optimizations

- CSS animations use GPU-accelerated transforms
- Images from external CDN (PokeAPI sprites)
- Minimal bundle (no heavy dependencies)
- Client-side filtering (no API calls on filter change)
