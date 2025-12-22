# src/ - Source Code Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

## Overview

This directory contains all the React application source code, including components, styles, and the main entry point.

## Directory Structure

```
src/
├── index.js              # React DOM entry point
├── index.css             # Global base styles
├── App.js                # Main application component
├── App.css               # App-level styles and layout
└── components/           # Reusable UI components
    ├── PokemonCard.js    # Pokemon display card
    ├── PokemonCard.css   # Card styling
    ├── FilterBar.js      # Search/filter controls
    ├── FilterBar.css     # Filter styling
    ├── LoadingSpinner.js # Loading animation
    └── LoadingSpinner.css# Spinner styling
```

## Key Files

### index.js

**Purpose**: Application entry point - mounts React to the DOM

**Responsibilities**:
- Creates React root using `createRoot` (React 18 API)
- Renders `<App />` within `<React.StrictMode>`
- Targets the `#root` element in `public/index.html`

**Code Pattern**:
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### index.css

**Purpose**: Global base styles applied to the entire application

**Responsibilities**:
- Reset default body margin
- Set default font family (system fonts stack)
- Font smoothing for better rendering

### App.js

**Purpose**: Main application container component

**Responsibilities**:
- Manages all application state via `useState` hooks
- Fetches initial data from API on mount via `useEffect`
- Applies client-side filters when filter state changes
- Renders conditional UI based on loading/error/data states
- Coordinates child component interactions

**State Variables**:
| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | array | All Pokemon from API |
| `filteredPokemons` | array | Pokemon after filter application |
| `types` | array | Available Pokemon types |
| `filters` | object | Current filter values |
| `loading` | boolean | Loading indicator |
| `error` | string | Error message |

**API Integration**:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Fetches on mount:
// - GET /api/pokemons
// - GET /api/types
```

### App.css

**Purpose**: Application-level styles and layout

**Key Styles**:
- Global box-sizing reset
- Gradient background
- Header styling with gradient
- Main content container with max-width
- Pokemon grid (CSS Grid, responsive)
- Results info bar (glassmorphism)
- No results state
- Error container and message
- Responsive breakpoints

**CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.app` | Main container |
| `.app-header` | Header with title |
| `.main-content` | Content wrapper (max-width: 1200px) |
| `.pokemon-grid` | Responsive grid for cards |
| `.results-info` | Filter results count |
| `.no-results` | Empty state display |
| `.error-container` | Error state wrapper |
| `.error-message` | Error message card |

## components/ Subdirectory

See [components/README.md](./components/README.md) for detailed component documentation.

## Data Flow

```
index.js
    │
    └──► App.js (State Management)
            │
            ├──► useEffect (fetch data on mount)
            │       │
            │       └──► API calls to backend
            │
            ├──► useEffect (apply filters when filters/pokemons change)
            │
            └──► Render Components
                    │
                    ├──► FilterBar (receives filters, types, callbacks)
                    │
                    ├──► LoadingSpinner (when loading)
                    │
                    └──► PokemonCard[] (map over filteredPokemons)
```

## Environment Configuration

The app reads environment variables prefixed with `REACT_APP_`:

```javascript
// Read at build time by Create React App
process.env.REACT_APP_API_URL  // Backend API URL
```

Set in `.env` file:
```
REACT_APP_API_URL=http://localhost:3001
```

## Styling Architecture

Each component follows a co-located CSS pattern:

```
Component.js  ──imports──►  Component.css
```

This keeps styles scoped and maintainable. No CSS-in-JS or CSS modules (`.module.css`) are used - standard CSS files with unique class names.

## Adding New Features

1. **New Component**: Create `ComponentName.js` and `ComponentName.css` in `components/`
2. **New State**: Add `useState` in `App.js`, pass down via props
3. **New API Call**: Add to the `fetchInitialData` function or create new `useEffect`
4. **New Filter**: Extend `filters` state object and update `applyFilters` logic
