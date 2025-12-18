# CLAUDE.md - Pokemon Frontend

This file provides essential context for AI agents working with this codebase.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^18.2.0 |
| Build Tool | Create React App | 5.0.1 |
| Runtime | Node.js | 18+ (build) / 20 (Docker) |
| Production Server | Nginx | Alpine |
| Styling | CSS3 | Custom (no framework) |

## Project Overview

This is a React-based single-page application (SPA) for browsing and filtering Pokemon data. It consumes the Pokemon Backend API and provides a responsive, modern UI with real-time filtering capabilities.

## Architecture Pattern

- **Functional Components** - All components use React hooks
- **Client-side filtering** - Data fetched once, filtered in browser
- **Prop-driven state** - Parent component manages filter state
- **CSS Modules** - Component-scoped CSS files

## Key Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main application component, state management |
| `src/index.js` | React entry point |
| `src/components/PokemonCard.js` | Individual Pokemon display card |
| `src/components/FilterBar.js` | Search and filter controls |
| `src/components/LoadingSpinner.js` | Pokeball loading animation |
| `public/index.html` | HTML template |

## Component Hierarchy

```
App (src/App.js)
├── LoadingSpinner (conditional)
├── FilterBar
│   ├── Name search input
│   ├── Type select dropdown
│   ├── Legendary select dropdown
│   └── Clear filters button
└── PokemonCard[] (mapped)
    ├── Pokemon image
    ├── Legendary badge (conditional)
    ├── Name
    ├── Type badges
    └── ID display
```

## State Management

```javascript
// App.js state
const [pokemons, setPokemons] = useState([]);           // All Pokemon
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered
const [types, setTypes] = useState([]);                 // Available types
const [filters, setFilters] = useState({                // Filter values
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## API Integration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints consumed:
// GET /api/pokemons  - Fetch all Pokemon
// GET /api/types     - Fetch all types
```

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
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

## CSS Architecture

### File Structure
- `src/index.css` - Global base styles
- `src/App.css` - App layout, grid, responsive design
- `src/components/*.css` - Component-specific styles

### Design Features
- Glassmorphism (backdrop-filter blur)
- Gradient backgrounds
- CSS animations (hover, loading spinner)
- Responsive grid layout
- Type-specific color badges

### Type Colors (CSS Classes)
```css
.type-fire     → Orange/Red gradient
.type-water    → Teal gradient
.type-grass    → Green gradient
.type-electric → Yellow gradient
.type-psychic  → Purple/Pink gradient
.type-ice      → Blue gradient
.type-dragon   → Purple gradient
.type-flying   → Pink/Yellow gradient
.type-poison   → Purple gradient
```

## Code Patterns

### Effect Hook for Data Fetching
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };
  fetchData();
}, []);
```

### Effect Hook for Filtering
```javascript
useEffect(() => {
  let filtered = [...pokemons];
  if (filters.name) {
    filtered = filtered.filter(p => /* condition */);
  }
  setFilteredPokemons(filtered);
}, [filters, pokemons]);
```

### Conditional Rendering
```javascript
{loading && <LoadingSpinner />}
{error && <ErrorMessage />}
{!loading && !error && <Content />}
```

## Docker Configuration

- Multi-stage build (Node.js → Nginx)
- Production build served via Nginx
- Client-side routing support via `try_files`
- Exposed port: 80 (mapped to 3002)

## Proxy Configuration

Development proxy configured in `package.json`:
```json
{
  "proxy": "http://localhost:3001"
}
```

## Important Notes

1. **Client-side Filtering**: All filtering happens in the browser after initial data fetch
2. **No Router**: Single-page app without React Router
3. **External Images**: Pokemon sprites loaded from PokeAPI GitHub
4. **Error Fallback**: Images have `onError` handler for missing sprites
5. **No Testing**: Test command exists but no test files present
