# CLAUDE.md - Pokemon Frontend

This file provides guidance for AI agents working with this codebase.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React DOM | 18.2.0 | DOM rendering |
| react-scripts | 5.0.1 | Build tooling (Create React App) |
| Node.js | 20.x | Build environment |
| Nginx | Alpine | Production web server |

## Project Structure

```
pokemon-frontend/
├── public/
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── PokemonCard.js/css    # Individual Pokemon display
│   │   ├── FilterBar.js/css      # Search and filter controls
│   │   └── LoadingSpinner.js/css # Loading state animation
│   ├── App.js             # Main application component
│   ├── App.css            # Main application styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── .tr-codegen/           # Docker deployment configuration
│   ├── Dockerfile         # Multi-stage build definition
│   ├── docker-compose.yml # Full-stack orchestration
│   └── nginx.conf         # Production server config
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variable template
└── .dockerignore          # Docker build exclusions
```

## Architecture Pattern

**Component-Based SPA**: This is a React Single Page Application using:

- Functional components with React Hooks
- Client-side state management (useState, useEffect)
- CSS modules (component-specific stylesheets)
- Client-side filtering logic

## Key Commands

```bash
# Development
npm install        # Install dependencies
npm start          # Start dev server (port 3000)
npm run build      # Production build
npm test           # Run tests

# Docker
npm run docker:build  # Build Docker image
npm run docker:run    # Run container on port 3002
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API base URL |

## Component Hierarchy

```
App
├── LoadingSpinner (conditional)
├── Error Message (conditional)
└── Main Content
    ├── FilterBar
    │   ├── Name Input
    │   ├── Type Select
    │   ├── Legendary Select
    │   └── Clear Button
    └── Pokemon Grid
        └── PokemonCard (repeated)
```

## State Management

All state is managed in `App.js`:

```javascript
const [pokemons, setPokemons] = useState([]);          // Full dataset
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered results
const [types, setTypes] = useState([]);                // Available types
const [filters, setFilters] = useState({               // Current filter values
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);          // Loading state
const [error, setError] = useState(null);              // Error state
```

## Data Flow

```
Backend API ──> App.js (fetch) ──> pokemons state
                                        │
filters state ──────────────────────────┤
                                        v
                              useEffect (apply filters)
                                        │
                                        v
                              filteredPokemons state
                                        │
                                        v
                              PokemonCard components
```

## Styling Approach

- **CSS Files**: Each component has a co-located `.css` file
- **Design System**: Glassmorphism with backdrop blur effects
- **Colors**: Gradient-based color scheme (purple, coral, teal)
- **Responsiveness**: CSS Grid with auto-fill for responsive layout
- **Type Colors**: Predefined gradients for each Pokemon type

## API Integration

The app communicates with the backend via fetch:

```javascript
// Initial data fetch
const [pokemonResponse, typesResponse] = await Promise.all([
  fetch(`${API_BASE_URL}/api/pokemons`),
  fetch(`${API_BASE_URL}/api/types`)
]);
```

## Common Development Tasks

### Adding a New Filter

1. Add state property in `App.js` filters object
2. Add filter UI in `FilterBar.js`
3. Add filter logic in `applyFilters()` function
4. Clear filter in `clearFilters()` function

### Adding a New Component

1. Create `ComponentName.js` in `src/components/`
2. Create `ComponentName.css` in `src/components/`
3. Import CSS in the component file
4. Export component as default
5. Import and use in parent component

### Modifying Pokemon Card Display

Edit `src/components/PokemonCard.js` for structure and `PokemonCard.css` for styling.

### Adding a New Pokemon Type Color

Add to `PokemonCard.css`:

```css
.type-newtype { background: linear-gradient(45deg, #color1, #color2); }
```

## Build Configuration

The project uses Create React App (react-scripts) which includes:

- Webpack bundling
- Babel transpilation
- ESLint configuration
- Jest testing setup
- Development server with hot reload

## Production Deployment

Multi-stage Docker build:

1. **Build Stage**: Node.js 20 Alpine, runs `npm run build`
2. **Runtime Stage**: Nginx Alpine, serves static files

Nginx is configured for SPA routing (all routes serve `index.html`).

## Proxy Configuration

Development proxy configured in `package.json`:

```json
{
  "proxy": "http://localhost:3001"
}
```

This allows API calls without CORS issues during development.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

See `browserslist` in `package.json` for specific targets.
