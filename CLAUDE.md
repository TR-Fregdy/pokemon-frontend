# CLAUDE.md - Pokemon Frontend

This file provides guidance for AI agents working with this codebase.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^18.2.0 |
| Build Tool | Create React App | 5.0.1 |
| Language | JavaScript (ES6+) | - |
| Styling | CSS3 | Custom styles |
| Container | Docker (multi-stage) | Alpine-based |
| Web Server | Nginx | Alpine |

## Project Overview

This is a **React single-page application** for browsing and filtering Pokemon data. It consumes the Pokemon Backend API and provides a responsive, modern UI.

## Architecture Pattern

- **Component-based React architecture**
- Functional components with React Hooks
- Client-side state management (useState, useEffect)
- CSS-per-component styling pattern

## Key Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main application component |
| `src/index.js` | React entry point |
| `src/components/` | Reusable UI components |
| `public/index.html` | HTML template |
| `.tr-codegen/Dockerfile` | Multi-stage Docker build |
| `.tr-codegen/nginx.conf` | Production web server config |

## Component Structure

| Component | File | Purpose |
|-----------|------|---------|
| App | `src/App.js` | Main container, state management, API calls |
| FilterBar | `src/components/FilterBar.js` | Search and filter controls |
| PokemonCard | `src/components/PokemonCard.js` | Individual Pokemon display card |
| LoadingSpinner | `src/components/LoadingSpinner.js` | Pokeball loading animation |

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:3001 | Backend API URL |

## API Integration

The app fetches data from the Pokemon Backend API:

```javascript
// Endpoints used
GET ${API_BASE_URL}/api/pokemons  // Fetch all Pokemon
GET ${API_BASE_URL}/api/types     // Fetch all types
```

## State Management

The app uses React hooks for state:

```javascript
// Main state in App.js
const [pokemons, setPokemons] = useState([]);           // All Pokemon
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered list
const [types, setTypes] = useState([]);                 // Available types
const [filters, setFilters] = useState({...});          // Current filters
const [loading, setLoading] = useState(true);           // Loading state
const [error, setError] = useState(null);               // Error state
```

## Styling Conventions

- **CSS-per-component**: Each component has its own `.css` file
- **Glassmorphism design**: Semi-transparent backgrounds with blur
- **CSS Grid**: Responsive layout for Pokemon cards
- **Type-based colors**: Dynamic class names for Pokemon types
- **Animations**: Hover effects, loading spinner, transitions

### CSS Class Naming

```css
/* Component-based naming */
.pokemon-card { }
.filter-bar { }
.loading-container { }

/* Type-specific colors */
.type-fire { }
.type-water { }
.type-electric { }
```

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop (>768px) | Multi-column grid |
| Mobile (≤768px) | Single column, stacked filters |

## Docker Configuration

### Multi-stage Build

1. **Build stage**: Node 20 Alpine, compiles React app
2. **Production stage**: Nginx Alpine, serves static files

### Nginx Configuration

- Serves static files from `/usr/share/nginx/html`
- Client-side routing support (`try_files`)
- Listens on port 80

## Code Style Guidelines

- Functional components only (no class components)
- React Hooks for state and side effects
- Destructured props
- CSS modules pattern (separate CSS files)
- Error boundaries for graceful error handling
- Loading states for async operations

## Data Flow

```
API Response → App State → Filter Logic → Filtered State → Rendered Cards
                  ↑                              │
                  └────── Filter Controls ◄──────┘
```

## Error Handling

- Network errors display user-friendly message
- Image load errors show placeholder
- Empty results show helpful messaging with clear filters option
