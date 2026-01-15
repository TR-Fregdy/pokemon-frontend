# CLAUDE.md - AI Agent Guidance for Pokemon Frontend

## Project Overview

This is a React 18 single-page application that displays and filters Pokemon data. It connects to the Pokemon Backend API to fetch and display Pokemon information with an interactive filtering interface.

## Technology Stack

- **Language**: JavaScript (ES6+, JSX)
- **Framework**: React 18.2.0
- **Build System**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS3 (no preprocessor)
- **HTTP Client**: Native Fetch API

## Architecture Pattern

- **Component-Based Architecture**: Functional components with React Hooks
- **Single-Page Application**: Client-side routing (no routing library)
- **State Management**: React useState and useEffect hooks
- **Unidirectional Data Flow**: Props down, callbacks up

## Key Files

| File | Purpose |
|------|---------|
| `src/index.js` | React application entry point |
| `src/App.js` | Main component with state management and data fetching |
| `src/components/FilterBar.js` | Filter controls component |
| `src/components/PokemonCard.js` | Individual Pokemon display card |
| `src/components/LoadingSpinner.js` | Loading animation component |

## Component Hierarchy

```
App
├── FilterBar (filters, types, onFilterChange, onClearFilters)
├── LoadingSpinner (no props)
└── PokemonCard (pokemon)
```

## State Management

### App Component State

```javascript
{
  pokemons: [],           // All Pokemon from API
  filteredPokemons: [],   // Pokemon after filtering
  types: [],              // Available Pokemon types
  filters: {              // Current filter values
    name: '',
    type: '',
    legendary: ''
  },
  loading: boolean,       // Loading state
  error: string | null    // Error message
}
```

## Data Flow

1. **Initial Load**: `useEffect` fetches Pokemon and types from API
2. **Filter Change**: `handleFilterChange` updates filters state
3. **Re-filter**: Second `useEffect` watches filters and applies them
4. **Render**: `filteredPokemons` mapped to `PokemonCard` components

## API Integration

### Endpoints Used

```javascript
GET ${API_BASE_URL}/api/pokemons  // Fetch all Pokemon
GET ${API_BASE_URL}/api/types     // Fetch all types
```

### Configuration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## Code Conventions

1. **Functional Components**: All components are functional with hooks
2. **Named Exports**: Default export for each component
3. **CSS Modules**: Each component has its own CSS file
4. **Props Destructuring**: Props destructured in function parameters
5. **Conditional Rendering**: Ternary operators and logical && operators

## Component Props Interface

### FilterBar

```javascript
{
  filters: { name, type, legendary },
  types: string[],
  onFilterChange: (newFilters) => void,
  onClearFilters: () => void
}
```

### PokemonCard

```javascript
{
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string
  }
}
```

### LoadingSpinner

No props required.

## Styling Approach

- **CSS Files**: Companion CSS file for each component
- **Class Naming**: BEM-like naming (e.g., `pokemon-card`, `pokemon-image`)
- **CSS Variables**: Not used (direct values)
- **Responsive Design**: Media queries for mobile breakpoints

### Key CSS Classes

| Class | Component | Purpose |
|-------|-----------|---------|
| `.pokemon-card` | PokemonCard | Card container |
| `.legendary` | PokemonCard | Legendary styling modifier |
| `.filter-bar` | FilterBar | Filter container |
| `.loading-container` | LoadingSpinner | Loading wrapper |

## Error Handling

1. **Network Errors**: Caught in try-catch, displayed with error message
2. **Image Fallback**: `onError` handler for missing images
3. **Empty Results**: Conditional render with "No Pokemon found" message

## Important Implementation Notes

1. **Client-Side Filtering**: Filtering happens in browser after initial fetch
2. **Parallel Fetching**: `Promise.all` for initial data load
3. **Strict Mode**: App wrapped in `React.StrictMode`
4. **Proxy Configuration**: `package.json` has proxy to `http://localhost:3001`

## Development Commands

```bash
npm start     # Development server on port 3000
npm run build # Production build to /build
npm test      # Run Jest tests
```

## Dependencies

### Production

- `react`: Core React library
- `react-dom`: DOM rendering
- `react-scripts`: CRA build tooling

### Browser Requirements

- ES6+ support required
- Fetch API support required
