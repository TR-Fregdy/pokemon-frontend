# CLAUDE.md - AI Agent Context for Pokemon Frontend

## Quick Reference

```bash
# Development
npm install          # Install dependencies
npm start            # Start dev server (port 3000)
npm run build        # Production build
npm test             # Run tests

# Docker
npm run docker:build # Build Docker image
npm run docker:run   # Run container on port 3002
```

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^18.2.0 |
| Build Tool | Create React App | 5.0.1 |
| Styling | CSS3 | Custom (no framework) |
| Container | Docker | Multi-stage (Node + Nginx) |
| Web Server | Nginx | Alpine |

## Architecture Overview

This is a **React SPA** with component-based architecture:

```
pokemon-frontend/
├── public/
│   ├── index.html             # HTML template
│   └── manifest.json          # PWA manifest
├── src/
│   ├── index.js               # React entry point
│   ├── App.js                 # Main application component
│   ├── App.css                # Global styles
│   ├── index.css              # Base CSS reset
│   └── components/
│       ├── PokemonCard.js     # Pokemon display card
│       ├── PokemonCard.css
│       ├── FilterBar.js       # Search/filter controls
│       ├── FilterBar.css
│       ├── LoadingSpinner.js  # Pokeball loading animation
│       └── LoadingSpinner.css
├── .tr-codegen/
│   ├── Dockerfile             # Multi-stage build
│   ├── docker-compose.yml     # Full stack deployment
│   └── nginx.conf             # SPA routing config
└── package.json
```

## Component Hierarchy

```
App (Main Container)
├── LoadingSpinner (conditional)
├── Error Message (conditional)
├── FilterBar
│   ├── Name Input
│   ├── Type Select
│   ├── Legendary Select
│   └── Clear Button
└── Pokemon Grid
    └── PokemonCard (×N)
        ├── Image
        ├── Legendary Badge
        ├── Name
        ├── Type Badges
        └── ID
```

## State Management

Uses React hooks (useState, useEffect):

```javascript
// App.js state
const [pokemons, setPokemons] = useState([]);           // All Pokemon
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered results
const [types, setTypes] = useState([]);                  // Available types
const [filters, setFilters] = useState({                 // Current filters
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);            // Loading state
const [error, setError] = useState(null);                // Error state
```

## API Integration

### Backend Communication

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints used:
// GET ${API_BASE_URL}/api/pokemons
// GET ${API_BASE_URL}/api/types
```

### Data Fetching Pattern

```javascript
useEffect(() => {
  Promise.all([
    fetch(`${API_BASE_URL}/api/pokemons`),
    fetch(`${API_BASE_URL}/api/types`)
  ]).then(/* handle responses */);
}, []);
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:3001 | Backend API URL |

## Component Specifications

### PokemonCard

**Props:**
```javascript
{
  pokemon: {
    id: Number,
    name: String,
    type: String[],
    legendary: Boolean,
    image: String
  }
}
```

**Features:**
- Hover animation (translateY + scale)
- Golden border for legendary Pokemon
- Type badges with gradient colors
- Fallback image on error

### FilterBar

**Props:**
```javascript
{
  filters: { name: String, type: String, legendary: String },
  types: String[],
  onFilterChange: Function,
  onClearFilters: Function
}
```

**Features:**
- Controlled inputs
- Real-time filtering
- Clear all button (shows when filters active)

### LoadingSpinner

**Props:** None

**Features:**
- CSS-only Pokeball animation
- Spinning + pulsing effects

## Styling Patterns

### CSS Architecture

- **Global styles**: `index.css`, `App.css`
- **Component styles**: Co-located CSS files
- **Design system**: Gradient backgrounds, glassmorphism effects
- **Responsive**: Mobile-first with media queries at 768px

### Type Color Mapping

```css
.type-fire    { background: linear-gradient(45deg, #ff6b6b, #ff8e53); }
.type-water   { background: linear-gradient(45deg, #4ecdc4, #44a08d); }
.type-grass   { background: linear-gradient(45deg, #95e1d3, #68d391); }
.type-electric { background: linear-gradient(45deg, #fce38a, #f9ca24); }
.type-psychic { background: linear-gradient(45deg, #e056fd, #c44569); }
.type-ice     { background: linear-gradient(45deg, #74b9ff, #0984e3); }
.type-dragon  { background: linear-gradient(45deg, #a29bfe, #6c5ce7); }
.type-flying  { background: linear-gradient(45deg, #fd79a8, #fdcb6e); }
.type-poison  { background: linear-gradient(45deg, #6c5ce7, #a29bfe); }
```

## Docker Configuration

### Multi-Stage Build

```
Stage 1: node:20-alpine (Builder)
├── npm install
├── npm run build
└── Output: /app/build/

Stage 2: nginx:alpine (Runtime)
├── Copy nginx.conf
├── Copy build artifacts
└── Serve on port 80
```

### Nginx Configuration

- SPA routing: All routes → index.html
- Static file serving from /usr/share/nginx/html

## Development Workflow

### Adding a New Component

1. Create `ComponentName.js` and `ComponentName.css` in `src/components/`
2. Import CSS in the component file
3. Export default the component
4. Import and use in parent component

### Adding a New Filter

1. Add state field in App.js filters object
2. Add UI control in FilterBar.js
3. Add filter logic in App.js applyFilters function

## Code Patterns

### Conditional Rendering

```jsx
{loading && <LoadingSpinner />}
{error && <ErrorMessage />}
{!loading && !error && <Content />}
```

### Event Handling

```jsx
const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
};
```

### CSS Classes with Conditions

```jsx
className={`pokemon-card ${pokemon.legendary ? 'legendary' : ''}`}
```

## Proxy Configuration

Development proxy in package.json:
```json
{
  "proxy": "http://localhost:3001"
}
```

This allows `/api/*` requests to be proxied to backend during development.

## Common Issues

1. **CORS errors**: Start backend first, or check REACT_APP_API_URL
2. **Images not loading**: PokeAPI CDN may be slow/blocked
3. **Build failures**: Clear node_modules and reinstall
4. **Blank page**: Check browser console for JS errors
