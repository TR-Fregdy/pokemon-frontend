# src Directory

> Source code for the Pokemon Explorer React application

## Purpose

This directory contains all the React application source code including the main entry point, root component, global styles, and reusable components.

## Directory Structure

```
src/
├── index.js           # React entry point
├── index.css          # Global CSS resets and fonts
├── App.js             # Main application component
├── App.css            # Application-level styles
├── components/        # Reusable UI components
│   ├── PokemonCard.js
│   ├── PokemonCard.css
│   ├── FilterBar.js
│   ├── FilterBar.css
│   ├── LoadingSpinner.js
│   ├── LoadingSpinner.css
│   └── README.md
└── README.md          # This file
```

## Files

### index.js
**React entry point** - Mounts the App component to the DOM.

- Creates React root using `ReactDOM.createRoot`
- Wraps App in `React.StrictMode`
- Targets `#root` element in `public/index.html`

### index.css
**Global styles** - Base CSS applied to entire application.

- CSS reset (margin, font-family)
- System font stack definition
- Font smoothing settings

### App.js
**Main application component** - Core application logic and layout.

**State Management**:
| State | Purpose |
|-------|---------|
| `pokemons` | Full Pokemon list from API |
| `filteredPokemons` | Currently displayed Pokemon |
| `types` | Available Pokemon types |
| `filters` | Current filter configuration |
| `loading` | Loading state boolean |
| `error` | Error message string |

**Key Functions**:
- `fetchInitialData()` - Fetches Pokemon and types on mount
- `applyFilters()` - Filters Pokemon based on current filters
- `handleFilterChange()` - Updates filter state
- `clearFilters()` - Resets all filters

**Renders**:
1. Header with title
2. LoadingSpinner (when loading)
3. Error display (when error)
4. FilterBar (when loaded)
5. Pokemon grid or "no results" message

### App.css
**Application styles** - Layout, header, grid, and error styles.

**Key Classes**:
- `.app` - Root container
- `.app-header` - Gradient header with title
- `.main-content` - Centered content area (max-width: 1200px)
- `.pokemon-grid` - Responsive CSS Grid layout
- `.error-container` - Error message styling
- `.no-results` - Empty state styling

## Components Subdirectory

See [components/README.md](./components/README.md) for detailed component documentation.

| Component | Purpose |
|-----------|---------|
| `PokemonCard` | Individual Pokemon display card |
| `FilterBar` | Search and filter controls |
| `LoadingSpinner` | Animated Pokeball loading indicator |

## Data Flow

```
API (Backend)
     │
     ▼
App.js (State)
     │
     ├──► FilterBar (filters, types, callbacks)
     │        │
     │        └──► User input triggers onFilterChange
     │                    │
     │                    ▼
     │              App.js updates filters state
     │                    │
     │                    ▼
     │              useEffect applies filters
     │                    │
     │                    ▼
     └──► PokemonCard[] (filtered Pokemon data)
```

## Environment Configuration

The App uses the `REACT_APP_API_URL` environment variable:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

Set in `.env` file at project root:
```
REACT_APP_API_URL=http://localhost:3001
```

## Styling Architecture

| File | Scope | Contents |
|------|-------|----------|
| `index.css` | Global | Resets, fonts |
| `App.css` | Application | Layout, header, grid |
| `components/*.css` | Component | Specific component styles |

## Development Notes

### Adding New Features

1. **New State**: Add `useState` hook in App.js
2. **New API Endpoint**: Add fetch call in `useEffect`
3. **New Component**: Create in `components/` directory
4. **New Filter**: Update `filters` state shape and `applyFilters` logic

### File Naming Convention
- Components: PascalCase (`PokemonCard.js`)
- CSS: Matching component name (`PokemonCard.css`)
- Utilities: camelCase (if added)

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Full system architecture
- [CLAUDE.md](../CLAUDE.md) - AI agent reference
- [public/](../public/) - Static assets and HTML template
