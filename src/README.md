# Source Directory (src)

> Part of [Pokemon Frontend](../ARCHITECTURE.md) | [Full Architecture](../ARCHITECTURE.md)

## Purpose

This directory contains all React source code for the Pokemon Explorer application, including components, styles, and the application entry point.

## Directory Structure

```
src/
├── index.js              # React DOM entry point
├── index.css             # Global CSS reset
├── App.js                # Main application component
├── App.css               # Application layout styles
├── components/           # Reusable UI components
│   ├── PokemonCard.js
│   ├── PokemonCard.css
│   ├── FilterBar.js
│   ├── FilterBar.css
│   ├── LoadingSpinner.js
│   ├── LoadingSpinner.css
│   └── README.md
└── README.md             # This file
```

## File Descriptions

### Entry Points

| File | Purpose |
|------|---------|
| `index.js` | React 18 root mounting, StrictMode wrapper |
| `index.css` | Base CSS reset, font stack definition |

### Application Core

| File | Purpose |
|------|---------|
| `App.js` | Root component with state management, API calls, layout |
| `App.css` | Header, grid, error states, responsive breakpoints |

### Components Subdirectory

Contains reusable UI components. See [components/README.md](./components/README.md) for details.

## Key Files

### index.js

```javascript
// Entry point - mounts React app to DOM
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### App.js

Main component responsibilities:
- **State Management**: pokemons, filters, loading, error states
- **Data Fetching**: Initial API calls on mount
- **Filter Logic**: Client-side filtering of Pokemon
- **Layout**: Header, FilterBar, Pokemon Grid

State structure:
```javascript
{
  pokemons: [],           // All Pokemon from API
  filteredPokemons: [],   // Currently visible Pokemon
  types: [],              // Available filter types
  filters: {              // Current filter values
    name: '',
    type: '',
    legendary: ''
  },
  loading: true,          // Initial loading state
  error: null             // Error message if API fails
}
```

## API Integration

The application fetches data from the backend API:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Endpoints used:
GET ${API_BASE_URL}/api/pokemons  // List all Pokemon
GET ${API_BASE_URL}/api/types     // Get available types
```

## Styling Architecture

```
index.css (Global Reset)
    │
    ▼
App.css (Layout + Shared Styles)
    │
    ├── Header styles
    ├── Main content layout
    ├── Grid configuration
    ├── Error/empty states
    └── Responsive breakpoints
    │
    ▼
Component CSS Files (Scoped Styles)
```

## Development

### Running the App

```bash
npm start    # Starts development server on port 3000
```

### Environment Variables

Create `.env` file in project root:
```
REACT_APP_API_URL=http://localhost:3001
```

### Adding New Features

1. **New Component**: Add to `components/` directory
2. **New Global Style**: Add to `App.css`
3. **New State**: Add to App.js state declarations
4. **New API Call**: Add to App.js useEffect or new handler

## Related Documentation

- [Frontend Architecture](../ARCHITECTURE.md) - System architecture overview
- [CLAUDE.md](../CLAUDE.md) - AI agent quick reference
- [Components README](./components/README.md) - Component documentation
