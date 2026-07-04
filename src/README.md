# /src Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains all source code for the Pokemon Frontend React application.

## Directory Structure

```
src/
├── index.js           # React entry point
├── index.css          # Global base styles
├── App.js             # Root application component
├── App.css            # Main application styles
└── components/        # Reusable UI components
    ├── FilterBar.js
    ├── FilterBar.css
    ├── PokemonCard.js
    ├── PokemonCard.css
    ├── LoadingSpinner.js
    └── LoadingSpinner.css
```

## Key Files

### index.js

**Purpose**: Application entry point that renders the React app to the DOM.

**Key Functions**:
- Creates React root using `createRoot`
- Renders `App` component inside `StrictMode`
- Mounts to `#root` element in `public/index.html`

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### index.css

**Purpose**: Global base styles and CSS resets.

**Contents**:
- Font family definitions
- Font smoothing settings
- Code block styling

### App.js

**Purpose**: Root component containing all application state and main layout.

**Key Functions**:
- State management for Pokemon data, filters, loading, and errors
- Data fetching from backend API
- Client-side filtering logic
- Layout composition of child components

**State Variables**:
| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | Array | Full Pokemon dataset |
| `filteredPokemons` | Array | Filtered display data |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading indicator |
| `error` | String/null | Error message |

**Hooks Used**:
- `useState` - State management
- `useEffect` - Data fetching and filter application

### App.css

**Purpose**: Main application styles including layout, header, grid, and error states.

**Key Classes**:
| Class | Purpose |
|-------|---------|
| `.app` | Root container |
| `.app-header` | Gradient header with title |
| `.main-content` | Centered content wrapper |
| `.pokemon-grid` | CSS Grid for cards |
| `.results-info` | Filter results counter |
| `.no-results` | Empty state display |
| `.error-container` | Error message layout |

## Components Subdirectory

See [components/README.md](./components/README.md) for detailed component documentation.

## Data Flow

```
index.js (mount)
    │
    v
App.js (state initialization)
    │
    ├──> useEffect: fetch /api/pokemons, /api/types
    │
    ├──> State: pokemons, types, loading, error
    │
    ├──> useEffect: apply filters when filters change
    │
    └──> Render: FilterBar + PokemonCard grid
```

## Development Notes

### Adding New Features

1. **New State**: Add to `App.js` using `useState`
2. **New Effects**: Add `useEffect` hooks in `App.js`
3. **New Components**: Create in `components/` directory
4. **New Styles**: Add to `App.css` or create component CSS

### Environment Configuration

The API URL is configured via environment variable:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

### Error Handling Pattern

```javascript
try {
  // API calls
} catch (err) {
  setError('User-friendly error message');
  console.error('Debug info:', err);
} finally {
  setLoading(false);
}
```

## Related Documentation

- [Main Architecture](../ARCHITECTURE.md)
- [Components](./components/README.md)
- [Public Assets](../public/README.md)
