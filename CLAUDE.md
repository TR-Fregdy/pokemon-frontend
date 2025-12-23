# CLAUDE.md - Pokemon Frontend

This file provides context for AI agents working with this codebase.

## Project Overview

Pokemon Frontend is a React-based Single Page Application (SPA) that provides a user interface for browsing and filtering Pokemon data from the backend API.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.2.0 | UI framework |
| React DOM | ^18.2.0 | DOM rendering |
| Create React App | 5.0.1 | Build tooling |
| CSS3 | - | Styling with animations |
| Docker | Multi-stage | Containerization |
| Nginx | Alpine | Production server |

## Architecture

- **Pattern**: Component-Based UI Architecture
- **State Management**: React useState/useEffect hooks
- **Styling**: CSS modules per component
- **Build Tool**: Create React App (Webpack under the hood)

## Key Files and Directories

| Path | Description |
|------|-------------|
| `src/App.js` | Main component with state management and data fetching |
| `src/index.js` | React DOM entry point |
| `src/components/` | Reusable UI components |
| `public/index.html` | HTML template |
| `.tr-codegen/` | Docker deployment configs |

## Component Structure

```
App.js (Main Container)
├── FilterBar.js      - Search and filter controls
├── PokemonCard.js    - Individual Pokemon display
└── LoadingSpinner.js - Loading state indicator
```

### Component Props

| Component | Props |
|-----------|-------|
| `PokemonCard` | `pokemon: { id, name, type[], legendary, image }` |
| `FilterBar` | `filters, types[], onFilterChange, onClearFilters` |
| `LoadingSpinner` | None |

## State Management

App.js manages all application state:

```javascript
const [pokemons, setPokemons] = useState([]);          // Full dataset
const [filteredPokemons, setFilteredPokemons] = useState([]);  // Filtered results
const [types, setTypes] = useState([]);                // Available types
const [filters, setFilters] = useState({               // Current filters
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## API Integration

Backend API URL configured via environment variable:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

### API Calls

| Endpoint | Purpose | Called When |
|----------|---------|-------------|
| `GET /api/pokemons` | Fetch all Pokemon | Component mount |
| `GET /api/types` | Fetch filter options | Component mount |

## Development Commands

```bash
npm install     # Install dependencies
npm start       # Start dev server (port 3000)
npm run build   # Production build
npm test        # Run tests
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | `http://localhost:3001` | Backend API URL |

## CSS Architecture

Each component has its own CSS file:

| File | Scope |
|------|-------|
| `index.css` | Global base styles |
| `App.css` | Layout, grid, responsive |
| `PokemonCard.css` | Card styles, type colors |
| `FilterBar.css` | Form controls |
| `LoadingSpinner.css` | Pokeball animation |

### Type Color Classes

```css
.type-fire, .type-water, .type-grass, .type-electric,
.type-psychic, .type-ice, .type-dragon, .type-flying, .type-poison
```

## Common Tasks

### Adding a New Component

1. Create `src/components/NewComponent.js`
2. Create `src/components/NewComponent.css`
3. Import and use in `App.js`

### Modifying Filters

Update `filters` state structure in `App.js` and `FilterBar.js`.

### Adding New API Calls

Add fetch logic in `App.js` useEffect or create new effect.

### Styling Changes

- Global: Edit `src/App.css`
- Component: Edit corresponding `.css` file
- Type colors: Edit `src/components/PokemonCard.css`

## Build and Deployment

### Development

```bash
npm start  # Starts on http://localhost:3000
```

### Production Build

```bash
npm run build  # Creates optimized build in /build
```

### Docker

```bash
# Build image
docker build -t pokemon-frontend .

# Run container
docker run -p 3002:80 pokemon-frontend

# Full stack with docker-compose
docker-compose -f .tr-codegen/docker-compose.yml up
```

## Testing

Uses Create React App's built-in Jest setup:

```bash
npm test
```

Currently no tests implemented.

## Design Patterns Used

| Pattern | Implementation |
|---------|----------------|
| Container/Presentational | App.js (container) vs PokemonCard (presentational) |
| Controlled Components | FilterBar form inputs |
| Lifting State Up | All state in App.js |
| CSS per Component | Modular styling |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Documentation

- See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture
- See [src/README.md](./src/README.md) for source code details
- See [src/components/README.md](./src/components/README.md) for component docs
