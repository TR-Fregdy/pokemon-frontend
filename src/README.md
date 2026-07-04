# src Directory

## Purpose

This directory contains the source code for the Pokemon Frontend React application, including the main application component, entry point, and reusable UI components.

## Key Files

| File | Description |
|------|-------------|
| `index.js` | React application entry point; renders App into DOM |
| `index.css` | Base CSS reset and font configuration |
| `App.js` | Main application component with state management and layout |
| `App.css` | Global application styles, layout, and responsive design |

## Subdirectories

| Directory | Description |
|-----------|-------------|
| `components/` | Reusable UI components (PokemonCard, FilterBar, LoadingSpinner) |

## File Responsibilities

### index.js

- Mounts the React application to the DOM
- Wraps App in React.StrictMode for development checks
- Entry point specified in `package.json`

### App.js

- **State Management**: Manages `pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`
- **Data Fetching**: Fetches initial Pokemon data and types from backend API
- **Filter Logic**: Applies name, type, and legendary filters to Pokemon list
- **Layout**: Renders header, filter bar, results grid, and handles loading/error states

### index.css

- CSS reset (box-sizing, margins)
- Font family configuration
- Base body styles

### App.css

- Header gradient styling
- Grid layout for Pokemon cards
- Results info and error message styling
- Clear/retry button styles
- Responsive breakpoints (768px)

## Connection to Other Parts

- **components/**: Child components imported and rendered by App.js
- **public/**: HTML template that mounts the React app
- **Backend API**: App.js fetches data from `REACT_APP_API_URL`

For overall project architecture, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
