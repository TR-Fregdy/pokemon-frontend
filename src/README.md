# Source Directory (`src/`)

This directory contains all the source code for the Pokemon Frontend React application.

> **Parent Documentation**: See [ARCHITECTURE.md](../ARCHITECTURE.md) for the full architecture overview.

## Directory Structure

```
src/
├── index.js              # React DOM entry point
├── index.css             # Global base styles
├── App.js                # Main application component
├── App.css               # App layout and utility styles
└── components/           # Reusable React components
    └── (see components/README.md)
```

## File Descriptions

### Entry Point

| File | Purpose |
|------|---------|
| `index.js` | Initializes React, renders App into DOM |

```javascript
// Creates React root and renders App with StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Main Application

| File | Purpose |
|------|---------|
| `App.js` | Root component, state management, data fetching |
| `App.css` | Layout styles, grid, responsive design |

**App.js Responsibilities:**
- Manages all application state via `useState`
- Fetches Pokemon data and types on mount
- Implements client-side filtering logic
- Renders conditional UI (loading, error, main view)
- Passes state and handlers to child components

**State Variables:**
| State | Type | Description |
|-------|------|-------------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Currently visible Pokemon |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values (name, type, legendary) |
| `loading` | Boolean | Data loading state |
| `error` | String | Error message if any |

### Stylesheets

| File | Scope | Contains |
|------|-------|----------|
| `index.css` | Global | Body resets, font families |
| `App.css` | App | Header, layout, grid, responsive breakpoints |

## Data Flow

```
                    ┌──────────────────┐
                    │     index.js     │
                    │  (entry point)   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      App.js      │
                    │  (state owner)   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │ Loading  │   │ FilterBar│   │PokemonCard│
       │ Spinner  │   │          │   │  (×many) │
       └──────────┘   └──────────┘   └──────────┘
```

## Key Functions

### `fetchInitialData()` (App.js)
- Called on component mount via `useEffect`
- Fetches `/api/pokemons` and `/api/types` in parallel
- Sets state with response data
- Handles errors gracefully

### `applyFilters()` (App.js)
- Called when `filters` or `pokemons` change
- Filters the Pokemon array by name, type, legendary
- Updates `filteredPokemons` state

### `handleFilterChange()` (App.js)
- Receives new filter values from FilterBar
- Updates `filters` state

### `clearFilters()` (App.js)
- Resets all filters to empty values

## API Integration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints used:
// GET /api/pokemons - Fetch all Pokemon
// GET /api/types    - Fetch all unique types
```

## Styling Conventions

- **BEM-like naming**: `.pokemon-card`, `.pokemon-card-image`
- **Component CSS**: Each component has co-located `.css` file
- **Responsive**: Mobile-first with `@media (max-width: 768px)`
- **CSS Variables**: Not used; colors are hardcoded

## Adding New Features

### To add a new component:
1. Create `ComponentName.js` and `ComponentName.css` in `components/`
2. Import and use in `App.js` or parent component

### To add a new filter:
1. Add to `filters` state object in App.js
2. Add filter input in FilterBar.js
3. Add filter logic in `applyFilters()` function

### To add a new API endpoint:
1. Add fetch call in `fetchInitialData()` or new useEffect
2. Create state variable for response data

## Related Documentation

- [components/README.md](./components/README.md) - Component documentation
- [../ARCHITECTURE.md](../ARCHITECTURE.md) - Full architecture
- [../CLAUDE.md](../CLAUDE.md) - AI agent guidance
