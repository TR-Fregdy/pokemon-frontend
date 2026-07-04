# Source Directory (src)

This directory contains all the source code for the Pokemon Frontend React application.

> For detailed architecture information, see [ARCHITECTURE.md](../ARCHITECTURE.md)

## Directory Structure

```
src/
├── index.js             # React entry point
├── index.css            # Global styles
├── App.js               # Main application component
├── App.css              # App-level styles
├── components/          # Reusable React components
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css
│   ├── PokemonCard.js   # Individual Pokemon display
│   ├── PokemonCard.css
│   ├── LoadingSpinner.js # Loading animation
│   ├── LoadingSpinner.css
│   └── README.md
└── README.md            # This file
```

## Files Overview

### Entry Point

#### `index.js`
React application entry point that:
- Creates the React root using `createRoot`
- Wraps the app in `React.StrictMode`
- Renders the `App` component into the DOM

### Main Application

#### `App.js`
The root component that manages:
- **State**: All application state using `useState`
- **API Calls**: Fetches Pokemon and types on mount using `useEffect`
- **Filtering**: Applies filters to Pokemon data client-side
- **Layout**: Header, filter bar, results info, and Pokemon grid

**State Structure**:
```javascript
{
  pokemons: [],          // All Pokemon from API
  filteredPokemons: [],  // Filtered results
  types: [],             // Available Pokemon types
  filters: {
    name: '',
    type: '',
    legendary: ''
  },
  loading: true,
  error: null
}
```

### Styles

#### `index.css`
Global styles including:
- Body margin/padding reset
- Font family definition
- Font smoothing

#### `App.css`
Application-level styles including:
- Body background gradient
- Header styles
- Pokemon grid layout
- Results info box
- No results message
- Error container
- Button styles
- Responsive media queries

## Data Flow

```
API (Backend)
     │
     ▼
index.js (Entry)
     │
     ▼
App.js (State & Logic)
     │
     ├──▶ FilterBar (User Input)
     │         │
     │         └──▶ handleFilterChange()
     │
     └──▶ PokemonCard[] (Display)
```

## API Integration

The application fetches data from the backend API:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints
GET ${API_BASE_URL}/api/pokemons  // Fetch all Pokemon
GET ${API_BASE_URL}/api/types     // Fetch available types
```

## Component Hierarchy

```
App
├── Header (inline)
├── LoadingSpinner (conditional)
├── Error Container (conditional)
├── FilterBar
├── Results Info (inline)
├── No Results (conditional)
└── Pokemon Grid
    └── PokemonCard (mapped)
```

## Development

### Adding a New Feature

1. **New State**: Add to `App.js` useState declarations
2. **New API Call**: Add to `fetchInitialData` in useEffect
3. **New UI**: Create component in `components/` or add inline JSX
4. **New Styles**: Add to appropriate CSS file or create new one

### Modifying Filters

1. Add new filter key to `filters` state object
2. Add filter UI in `FilterBar.js`
3. Add filter logic in `applyFilters()` function

### Environment Configuration

API URL can be configured via environment variable:
```bash
REACT_APP_API_URL=http://localhost:3001
```
