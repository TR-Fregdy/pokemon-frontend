# CLAUDE.md - AI Agent Guide for Pokemon Frontend

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Language** | JavaScript (JSX) |
| **Framework** | React 18.2.0 |
| **Build Tool** | Create React App (react-scripts 5.0.1) |
| **Port** | 3000 (dev), 80 (production) |
| **Entry Point** | `src/index.js` |
| **Package Manager** | npm |

## Technology Stack

### Core Technologies
- **React 18.2.0**: UI library with functional components and hooks
- **React DOM 18.2.0**: React rendering for web
- **Create React App**: Zero-config build tooling

### Styling
- **CSS3**: Custom stylesheets with glassmorphism design
- **CSS Grid & Flexbox**: Layout systems
- **CSS Animations**: Keyframe animations

### Containerization
- **Docker**: Multi-stage build (Node.js + Nginx)
- **Nginx**: Production web server
- **Docker Compose**: Full-stack orchestration

## Project Structure

```
pokemon-frontend/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   └── components/
│       ├── PokemonCard.js  # Pokemon display card
│       ├── PokemonCard.css # Card styles
│       ├── FilterBar.js    # Search/filter controls
│       ├── FilterBar.css   # Filter styles
│       ├── LoadingSpinner.js # Pokeball spinner
│       └── LoadingSpinner.css # Spinner styles
├── package.json            # Dependencies and scripts
├── .env.example            # Environment template
├── .gitignore              # Git ignore patterns
├── README.md               # User documentation
├── CLAUDE.md               # This file
├── ARCHITECTURE.md         # Architecture documentation
└── .tr-codegen/            # Docker configuration
    ├── Dockerfile          # Multi-stage build
    ├── docker-compose.yml  # Full-stack orchestration
    └── nginx.conf          # Production server config
```

## Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm start

# Production build
npm run build

# Run tests
npm test

# Docker build
npm run docker:build

# Docker run
npm run docker:run
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

### Setting Environment Variables
```bash
# Create .env file
cp .env.example .env

# Edit REACT_APP_API_URL for your environment
REACT_APP_API_URL=http://your-backend-url
```

## Component Architecture

### App.js (Main Component)
- **State Management**: React useState hooks
- **Side Effects**: React useEffect for data fetching
- **Props Flow**: Top-down data passing

| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | Array | Full Pokemon list from API |
| `filteredPokemons` | Array | Currently displayed Pokemon |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading state |
| `error` | String | Error message |

### FilterBar.js
- **Props**: `filters`, `types`, `onFilterChange`, `onClearFilters`
- **Pattern**: Controlled components with lifted state

### PokemonCard.js
- **Props**: `pokemon` object
- **Pattern**: Presentational component
- **Features**: Conditional legendary styling

### LoadingSpinner.js
- **Pattern**: Pure presentational component
- **Animation**: CSS keyframe-based Pokeball spinner

## API Integration

### Data Fetching Pattern
```javascript
// Parallel fetching on mount
useEffect(() => {
  const [pokemonRes, typesRes] = await Promise.all([
    fetch(`${API_BASE_URL}/api/pokemons`),
    fetch(`${API_BASE_URL}/api/types`)
  ]);
}, []);
```

### Expected API Response
```javascript
// /api/pokemons
{
  success: true,
  data: [{ id, name, type: [], legendary, image }]
}

// /api/types
{
  success: true,
  data: ['Electric', 'Fire', ...]
}
```

## CSS Architecture

### Design System
| Element | Style |
|---------|-------|
| Background | Linear gradient (purple tones) |
| Cards | Glassmorphism (blur + transparency) |
| Type Badges | Color-coded by Pokemon type |
| Animations | Hover transforms, loading spinner |

### Type Color Mapping
```css
.type-fire    → #ff6b6b → #ff8e53
.type-water   → #4ecdc4 → #44a08d
.type-grass   → #95e1d3 → #68d391
.type-electric → #fce38a → #f9ca24
.type-psychic → #e056fd → #c44569
.type-ice     → #74b9ff → #0984e3
.type-dragon  → #a29bfe → #6c5ce7
.type-flying  → #fd79a8 → #fdcb6e
.type-poison  → #6c5ce7 → #a29bfe
```

### Responsive Breakpoints
| Breakpoint | Grid Columns |
|------------|--------------|
| Desktop (>768px) | auto-fill, minmax(280px, 1fr) |
| Mobile (≤768px) | auto-fill, minmax(250px, 1fr) |

## Code Conventions

### Component Pattern
```javascript
// Functional component with hooks
const Component = ({ props }) => {
  const [state, setState] = useState(initial);

  useEffect(() => { /* effects */ }, [deps]);

  return <JSX />;
};

export default Component;
```

### Event Handler Naming
- `handleInputChange` - Input events
- `onFilterChange` - Prop callbacks
- `clearFilters` - Action handlers

### CSS Class Naming
- `.component-name` - Block
- `.component-element` - Element
- `.modifier-name` - Modifier state

## Common Tasks

### Adding a New Filter
1. Add state field in `App.js` filters object
2. Add filter logic in `applyFilters` useEffect
3. Add UI control in `FilterBar.js`
4. Style in `FilterBar.css`

### Adding a New Component
1. Create `ComponentName.js` in `src/components/`
2. Create `ComponentName.css` for styles
3. Import CSS in component file
4. Export default component

### Modifying Pokemon Card Display
1. Edit `PokemonCard.js` JSX structure
2. Update `PokemonCard.css` styles
3. Test with legendary and non-legendary Pokemon

### Changing API URL
1. Update `.env` file: `REACT_APP_API_URL=new-url`
2. Restart development server
3. For production: update environment in Docker/deployment

## Docker Notes

### Multi-Stage Build
1. **Builder Stage**: `node:20-alpine` - Compiles React app
2. **Runtime Stage**: `nginx:alpine` - Serves static files

### Nginx Configuration
- SPA routing support (`try_files $uri $uri/ /index.html`)
- Listens on port 80

### Production Ports
- **Container**: Port 80 (nginx)
- **Host Mapping**: Port 3002 (docker-compose)

## Testing

Uses Jest (via react-scripts):
```bash
npm test           # Watch mode
npm test -- --coverage  # Coverage report
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Debugging Tips

### Common Issues

| Issue | Solution |
|-------|----------|
| API connection error | Check REACT_APP_API_URL and backend status |
| Blank page | Check browser console for React errors |
| Styles not loading | Verify CSS imports in components |
| Images not showing | Check PokeAPI sprite URLs in data |

### Development Tools
- React DevTools browser extension
- Browser Network tab for API calls
- Console for error messages
