# CLAUDE.md - Pokemon Frontend

This file provides guidance for AI agents working with this codebase.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| React DOM | 18.2.0 | DOM rendering |
| React Scripts | 5.0.1 | Build tooling (Create React App) |
| CSS3 | - | Styling (no preprocessor) |
| Docker | - | Containerization |
| Nginx | Alpine | Production web server |

## Project Overview

A React-based single-page application for browsing and filtering Pokemon data. The frontend consumes a REST API from the Pokemon Backend service.

## Architecture Pattern

**Functional Component Architecture**

- All components use React functional components
- State management via React hooks (`useState`, `useEffect`)
- No external state library (Redux, MobX, etc.)
- Props drilling for component communication

## Key Files

```
pokemon-frontend/
├── public/
│   ├── index.html           # HTML template
│   └── manifest.json        # PWA manifest
├── src/
│   ├── index.js             # React entry point
│   ├── index.css            # Global styles
│   ├── App.js               # Root component (main logic)
│   ├── App.css              # App-level styles
│   └── components/
│       ├── PokemonCard.js   # Pokemon display card
│       ├── PokemonCard.css
│       ├── FilterBar.js     # Filter controls
│       ├── FilterBar.css
│       ├── LoadingSpinner.js # Pokeball spinner
│       └── LoadingSpinner.css
├── .tr-codegen/
│   ├── Dockerfile           # Multi-stage build
│   ├── docker-compose.yml   # Full-stack orchestration
│   └── nginx.conf           # Production server config
├── package.json             # Dependencies
├── .env.example             # Environment template
└── .gitignore
```

## Component Hierarchy

```
App
├── LoadingSpinner (conditional)
├── FilterBar
│   ├── Name input
│   ├── Type dropdown
│   ├── Legendary dropdown
│   └── Clear button
└── PokemonCard[] (mapped)
    ├── Image
    ├── Name
    ├── Type badges
    └── Legendary badge
```

## State Management

### App.js State

```javascript
const [pokemons, setPokemons] = useState([]);           // All Pokemon data
const [filteredPokemons, setFilteredPokemons] = useState([]); // After filtering
const [types, setTypes] = useState([]);                  // Available types
const [filters, setFilters] = useState({                 // Current filters
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## Data Flow

```
Backend API                    App State                  Components
─────────────────────────────────────────────────────────────────────
/api/pokemons ───────────▶ pokemons[] ──────▶ filteredPokemons[]
                                                      │
/api/types ──────────────▶ types[] ────────▶ FilterBar (dropdown)
                                                      │
                                              PokemonCard[] (rendered)
```

## API Integration

### Base URL Configuration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

### Endpoints Consumed

| Endpoint | Purpose | Used In |
|----------|---------|---------|
| GET `/api/pokemons` | Fetch Pokemon list | App.js `useEffect` |
| GET `/api/types` | Fetch available types | App.js `useEffect` |

### Fetch Pattern

```javascript
const response = await fetch(`${API_BASE_URL}/api/pokemons`);
const data = await response.json();
// data.data contains the array
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | http://localhost:3001 | Backend API URL |

## CSS Patterns

### Design System

- **Background**: Gradient purple (`#667eea` to `#764ba2`)
- **Cards**: White with glassmorphism (`backdrop-filter: blur`)
- **Accents**: Coral (`#ff6b6b`) and Teal (`#4ecdc4`)
- **Borders**: Rounded (8px-16px radius)

### Type Color Classes

```css
.type-fire { background: linear-gradient(45deg, #ff6b6b, #ff8e53); }
.type-water { background: linear-gradient(45deg, #4ecdc4, #44a08d); }
.type-grass { background: linear-gradient(45deg, #95e1d3, #68d391); }
.type-electric { background: linear-gradient(45deg, #fce38a, #f9ca24); }
.type-psychic { background: linear-gradient(45deg, #e056fd, #c44569); }
.type-ice { background: linear-gradient(45deg, #74b9ff, #0984e3); }
.type-dragon { background: linear-gradient(45deg, #a29bfe, #6c5ce7); }
.type-flying { background: linear-gradient(45deg, #fd79a8, #fdcb6e); }
.type-poison { background: linear-gradient(45deg, #6c5ce7, #a29bfe); }
```

### Responsive Breakpoints

```css
@media (max-width: 768px) { /* Tablet and below */ }
```

## Development Commands

```bash
npm install      # Install dependencies
npm start        # Start dev server (port 3000)
npm run build    # Production build
npm test         # Run tests (Jest)
```

## Docker Commands

```bash
npm run docker:build  # Build Docker image
npm run docker:run    # Run container (port 3002 -> 80)
```

## Common Tasks

### Adding a New Filter

1. Add state field in App.js `filters` object
2. Add filter control in FilterBar.js
3. Add filtering logic in App.js `applyFilters` effect
4. Clear the field in `clearFilters` function

### Adding a New Component

1. Create `ComponentName.js` in `src/components/`
2. Create `ComponentName.css` in same directory
3. Import CSS in the component file
4. Export default the component

### Adding a New Pokemon Property Display

1. Ensure backend returns the property
2. Add display element in PokemonCard.js
3. Add styling in PokemonCard.css

### Modifying Type Colors

Edit `.type-{typename}` classes in PokemonCard.css

## Error Handling

### Network Errors

```javascript
try {
  // fetch...
} catch (err) {
  setError('Failed to load Pokemon data...');
  console.error('Error fetching data:', err);
}
```

### Image Fallback

```jsx
onError={(e) => {
  e.target.src = '/placeholder-pokemon.png';
}}
```

## Testing

Create React App includes Jest. Test files:
- `*.test.js`
- `*.spec.js`
- Files in `__tests__/` directories

```bash
npm test           # Watch mode
npm test -- --coverage  # Coverage report
```

## Build Output

Production build creates `build/` directory:
- Static HTML, CSS, JS
- Optimized and minified
- Hashed filenames for caching

## Proxy Configuration

Development proxy in package.json:
```json
"proxy": "http://localhost:3001"
```

This allows `/api/*` requests during development to be forwarded to the backend.

## Performance Considerations

### Current Optimizations
- Client-side filtering (fast, no network)
- CSS animations for visual feedback
- Responsive images from CDN

### Potential Improvements
- React.memo for PokemonCard
- Virtualized list for large datasets
- Image lazy loading
- Service worker for offline support

## Browser Support

Defined in package.json `browserslist`:
- Production: >0.2%, not dead, not op_mini all
- Development: Last 1 version of Chrome, Firefox, Safari

## Integration Points

- **Backend API**: Pokemon Backend at configurable URL
- **PokeAPI Sprites**: External CDN for images (via backend data)
