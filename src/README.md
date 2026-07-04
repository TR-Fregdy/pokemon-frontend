# src Directory

> Part of [Pokemon Frontend](../ARCHITECTURE.md)

This directory contains the React application source code for the Pokemon Explorer frontend.

## Purpose

The `src` directory holds all JavaScript/JSX source files, CSS styles, and React components that make up the Pokemon Explorer application.

## Structure

```
src/
├── components/          # Reusable UI components
│   ├── PokemonCard.js   # Individual Pokemon display
│   ├── PokemonCard.css
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css
│   ├── LoadingSpinner.js # Loading animation
│   └── LoadingSpinner.css
├── App.js               # Main application component
├── App.css              # App-level styles
├── index.js             # React entry point
└── index.css            # Global base styles
```

## Key Files

### index.js

**Purpose**: Application entry point that bootstraps React.

**Responsibilities**:
- Creates the React root
- Renders the App component
- Enables React StrictMode

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### App.js

**Purpose**: Main application component managing state and layout.

**Responsibilities**:
- Fetches Pokemon and types data from API on mount
- Manages filter state (name, type, legendary)
- Applies client-side filtering
- Handles loading and error states
- Renders header, FilterBar, and PokemonCard grid

**State Variables**:
| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Pokemon after filter applied |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading indicator |
| `error` | String/null | Error message |

### index.css

**Purpose**: Global CSS reset and base typography.

**Contains**:
- Body margin reset
- System font stack
- Font smoothing

### App.css

**Purpose**: Application layout and component styles.

**Contains**:
- Header styling with gradient background
- Main content container with max-width
- Pokemon grid layout (CSS Grid, auto-fill)
- Results info styling
- No results / error states
- Responsive breakpoints (768px)

## Component Subdirectory

See [components/README.md](components/README.md) for detailed component documentation.

## Data Flow

```
index.js
    │
    └──> App.js
           │
           ├──> useEffect (fetch data)
           │        │
           │        └──> API: /api/pokemons, /api/types
           │
           ├──> useEffect (apply filters)
           │        │
           │        └──> Updates filteredPokemons
           │
           └──> Render
                  │
                  ├──> FilterBar (receives filters, types, callbacks)
                  │
                  └──> PokemonCard[] (receives pokemon objects)
```

## API Integration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Fetched endpoints:
// GET /api/pokemons  - All Pokemon data
// GET /api/types     - Available type values
```

## Styling Approach

- **No CSS Framework**: Custom CSS for full control
- **Component CSS**: Each component has co-located `.css` file
- **CSS Grid**: Used for responsive Pokemon card layout
- **Glassmorphism**: Cards use backdrop-filter blur
- **Gradients**: Header and buttons use linear gradients
- **Animations**: Loading spinner, hover effects

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Full system architecture overview
- [CLAUDE.md](../CLAUDE.md) - AI agent context and quick reference
- [components/README.md](components/README.md) - Component documentation
