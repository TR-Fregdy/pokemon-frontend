# CLAUDE.md - AI Assistant Guide for Pokemon Frontend

## Technology Stack & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.2.0 | UI framework |
| React DOM | ^18.2.0 | DOM rendering |
| React Scripts | 5.0.1 | Create React App build tooling |
| Node.js | 18-20+ | Development runtime |
| Nginx | alpine | Production web server |

## Project Overview

This is a **React Single Page Application (SPA)** for browsing and filtering Pokemon. It consumes the Pokemon Backend API and provides a modern, responsive user interface with filtering capabilities.

## Architecture Pattern

- **Pattern**: Component-based SPA (Create React App)
- **State Management**: React useState hooks (local state)
- **Styling**: CSS modules per component
- **Build Tool**: Create React App (react-scripts)

## Key Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main application component with state and logic |
| `src/index.js` | React entry point, renders App to DOM |
| `src/components/PokemonCard.js` | Individual Pokemon display card |
| `src/components/FilterBar.js` | Search and filter controls |
| `src/components/LoadingSpinner.js` | Pokeball loading animation |
| `public/index.html` | HTML template |
| `.tr-codegen/Dockerfile` | Multi-stage Docker build |
| `.tr-codegen/nginx.conf` | Production Nginx configuration |

## Component Hierarchy

```
App
├── FilterBar (search/filter controls)
├── LoadingSpinner (loading state)
└── PokemonCard[] (Pokemon grid)
```

## State Management

The App component manages all application state:

```javascript
const [pokemons, setPokemons] = useState([]);           // All Pokemon
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered list
const [types, setTypes] = useState([]);                 // Available types
const [filters, setFilters] = useState({                // Current filters
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## API Integration

The app fetches from the backend API:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints used:
// GET ${API_BASE_URL}/api/pokemons  - Fetch all Pokemon
// GET ${API_BASE_URL}/api/types     - Fetch all types
```

## Development Commands

```bash
npm install       # Install dependencies
npm start         # Start dev server (port 3000)
npm run build     # Production build
npm test          # Run tests
npm run docker:build  # Build Docker image
npm run docker:run    # Run Docker container (port 3002)
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:3001 | Backend API URL |

## CSS Architecture

Each component has its own CSS file:
- `App.css` - Global styles, layout, responsive grid
- `PokemonCard.css` - Card styling, type colors, animations
- `FilterBar.css` - Filter controls styling
- `LoadingSpinner.css` - Pokeball animation keyframes

## Code Style & Conventions

- ES6+ JavaScript with JSX
- Functional components with hooks
- Named exports for components
- CSS classes follow BEM-like naming
- No TypeScript
- ESLint configured via react-app preset

## Important Notes for Code Generation

1. **Create React App**: Uses react-scripts, don't eject unless necessary
2. **Port 3000**: Default dev port (production uses Nginx on 80)
3. **Proxy Configuration**: `package.json` has proxy to localhost:3001
4. **No Router**: Single page, no react-router configured
5. **No Redux/Context**: Simple useState for state management
6. **Client-side Filtering**: Filters applied in browser after initial fetch

## Component Props

### PokemonCard
```javascript
props: {
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string
  }
}
```

### FilterBar
```javascript
props: {
  filters: { name: string, type: string, legendary: string },
  types: string[],
  onFilterChange: (newFilters) => void,
  onClearFilters: () => void
}
```

### LoadingSpinner
```javascript
props: {} // No props
```

## Docker Configuration

- **Build Stage**: node:20-alpine (compiles React app)
- **Runtime Stage**: nginx:alpine (serves static files)
- **Exposed Port**: 80 (internal), 3002 (host mapped)
- **Client-side Routing**: Nginx configured for SPA fallback

## Styling Features

- Glassmorphism effects (backdrop-filter)
- Gradient backgrounds
- CSS animations (spin, pulse, hover effects)
- Responsive grid layout
- Type-specific color badges
- Legendary Pokemon gold border treatment
