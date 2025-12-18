# Source Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains the main application source code for the Pokemon Explorer frontend.

## Directory Structure

```
src/
├── components/           # Reusable React components
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css
│   ├── PokemonCard.js   # Pokemon display card
│   ├── PokemonCard.css
│   ├── LoadingSpinner.js # Loading animation
│   ├── LoadingSpinner.css
│   └── README.md        # Components documentation
├── App.js               # Main application component
├── App.css              # Application styles
├── index.js             # React entry point
├── index.css            # Global styles
└── README.md            # This file
```

## Files Overview

### index.js

React application entry point.

**Responsibilities:**
- Creates React root element
- Renders App component
- Wraps app in StrictMode

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### App.js

Main application container component.

**Responsibilities:**
- Application state management
- API data fetching
- Filter logic implementation
- Layout and routing

**State Variables:**
| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | `array` | All Pokemon from API |
| `filteredPokemons` | `array` | Pokemon after filters |
| `types` | `array` | Available Pokemon types |
| `filters` | `object` | Current filter values |
| `loading` | `boolean` | Loading indicator |
| `error` | `string` | Error message |

**Key Functions:**
- `fetchInitialData()` - Fetches Pokemon and types on mount
- `applyFilters()` - Filters Pokemon based on current filters
- `handleFilterChange()` - Updates filter state
- `clearFilters()` - Resets all filters

---

### index.css

Global styles applied to the entire application.

**Contents:**
- Base font family stack
- Font smoothing
- Code font styling

---

### App.css

Main application layout and styling.

**Key Styles:**
- `.app` - Main container
- `.app-header` - Header with gradient
- `.main-content` - Content area with max-width
- `.pokemon-grid` - CSS Grid layout for cards
- `.results-info` - Filter results count
- `.no-results` - Empty state
- `.error-container` - Error state display

**Responsive Breakpoints:**
- Desktop: Multi-column grid
- Mobile (≤768px): Single column layout

## Subdirectories

### [components/](./components/README.md)

Contains reusable React components:
- **FilterBar** - Search and filter controls
- **PokemonCard** - Individual Pokemon display
- **LoadingSpinner** - Loading animation

## Data Flow

```
index.js
    │
    └── App.js (state management)
          │
          ├── useEffect (API fetch)
          │     └── setPokemons, setTypes
          │
          ├── useEffect (filter logic)
          │     └── setFilteredPokemons
          │
          └── Render
                ├── FilterBar (filter controls)
                ├── Results Info
                └── Pokemon Grid
                      └── PokemonCard (×n)
```

## API Integration

The app connects to the Pokemon Backend API:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints used
GET /api/pokemons  → pokemons state
GET /api/types     → types state
```

## Adding New Features

1. **New Component**: Create in `components/` with matching CSS
2. **New State**: Add to App.js state management
3. **New API Call**: Add to `fetchInitialData` or create new effect
4. **New Styles**: Add to component CSS or App.css for layout
