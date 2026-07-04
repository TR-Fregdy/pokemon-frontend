# CLAUDE.md - AI Agent Guidance for Pokemon Frontend

This document provides context for AI agents working with this codebase.

## Project Overview

- **Type**: Single Page Application (SPA)
- **Language**: JavaScript (ES6+ with JSX)
- **Framework**: React 18
- **Build Tool**: Create React App (react-scripts)

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| UI Library | React | ^18.2.0 |
| DOM Rendering | React DOM | ^18.2.0 |
| Build Tool | react-scripts | 5.0.1 |
| Styling | CSS3 | - |

## Architecture Pattern

- **Pattern**: Component-based architecture
- **State Management**: React useState hooks (local state)
- **Data Fetching**: Native fetch API with useEffect
- **Styling**: CSS Modules (component-level CSS files)

## Key Files and Responsibilities

| File | Purpose |
|------|---------|
| `src/index.js` | React entry point, renders App to DOM |
| `src/App.js` | Main container component with state and data fetching |
| `src/components/FilterBar.js` | Search input and filter dropdowns |
| `src/components/PokemonCard.js` | Individual Pokemon display card |
| `src/components/LoadingSpinner.js` | Pokeball-styled loading animation |

## Component Hierarchy

```
App
├── LoadingSpinner (conditional)
├── Error View (conditional)
└── Main Content
    ├── FilterBar
    │   ├── Name Input
    │   ├── Type Select
    │   ├── Legendary Select
    │   └── Clear Filters Button
    └── Pokemon Grid
        └── PokemonCard (multiple)
```

## State Management

### App.js State

```javascript
const [pokemons, setPokemons] = useState([]);           // All Pokemon from API
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered results
const [types, setTypes] = useState([]);                 // Available Pokemon types
const [filters, setFilters] = useState({                // Current filter values
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);           // Loading state
const [error, setError] = useState(null);               // Error state
```

## Data Flow

```
1. App mounts → useEffect fetches /api/pokemons and /api/types
2. Data stored in pokemons and types state
3. User interacts with FilterBar → updates filters state
4. useEffect watches filters → applies filtering logic
5. filteredPokemons updates → PokemonCard components re-render
```

## API Integration

### Endpoints Used

| Endpoint | Purpose | Called In |
|----------|---------|-----------|
| `GET /api/pokemons` | Fetch all Pokemon | App.js useEffect (mount) |
| `GET /api/types` | Fetch Pokemon types | App.js useEffect (mount) |

### API Base URL

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## Conventions and Patterns

### Component Structure

```javascript
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### CSS Naming

- Class names use kebab-case (e.g., `pokemon-card`, `filter-bar`)
- Component-specific styles in separate CSS files
- Type-based classes for Pokemon types (e.g., `type-fire`, `type-water`)

### Props Patterns

| Component | Props |
|-----------|-------|
| FilterBar | `filters`, `types`, `onFilterChange`, `onClearFilters` |
| PokemonCard | `pokemon` (object with id, name, type, legendary, image) |
| LoadingSpinner | None |

## Styling Architecture

### CSS Files

| File | Scope |
|------|-------|
| `index.css` | Global base styles |
| `App.css` | App layout, header, grid, error states |
| `FilterBar.css` | Filter controls styling |
| `PokemonCard.css` | Card styling, type colors, badges |
| `LoadingSpinner.css` | Pokeball animation |

### Design System

- **Colors**: Gradient backgrounds (purple/pink), type-specific colors
- **Effects**: Glassmorphism (backdrop-filter blur, transparency)
- **Animations**: Hover transforms, loading spin, pulse effects
- **Typography**: 'Segoe UI' font family

## Safe Code Generation Guidelines

### Adding New Components

1. Create `ComponentName.js` and `ComponentName.css` in `src/components/`
2. Use functional components with hooks
3. Import and use component-scoped CSS
4. Export as default

### Modifying Filters

1. Add new filter field to `filters` state in App.js
2. Add filtering logic in the `applyFilters` function
3. Add UI control in FilterBar.js
4. Update `hasActiveFilters` check

### Adding API Calls

1. Use fetch with async/await pattern
2. Handle loading and error states
3. Use `API_BASE_URL` constant for endpoints

### Styling New Elements

1. Add styles to component's CSS file
2. Use existing color variables and patterns
3. Include responsive breakpoints (@media queries)
4. Follow BEM-like naming conventions

## Development Commands

```bash
npm install     # Install dependencies
npm start       # Start dev server (port 3000)
npm run build   # Production build
npm test        # Run tests
```

## Constraints and Assumptions

1. **Backend Required**: App expects backend on port 3001
2. **Proxy Configuration**: package.json proxy set to localhost:3001
3. **No Routing**: Single page with no React Router
4. **No State Library**: Uses React's built-in useState
5. **Client-Side Filtering**: Filtering happens in browser after initial fetch

## Error Handling

- Network errors show error container with retry button
- Image load errors fallback to placeholder
- Empty results show "No Pokemon found" message

## Browser Compatibility

- Uses modern CSS (backdrop-filter, grid)
- Requires JavaScript enabled
- ES6+ syntax (arrow functions, destructuring)
