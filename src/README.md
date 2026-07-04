# src Directory

This directory contains the React application source code for the Pokemon Frontend.

## Purpose

The `src` directory is the main source code location containing:
- React components
- Application styles
- Entry point configuration

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── PokemonCard.js   # Pokemon display card
│   ├── PokemonCard.css
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css
│   ├── LoadingSpinner.js # Loading animation
│   └── LoadingSpinner.css
├── App.js               # Main application component
├── App.css              # Main application styles
├── index.js             # React entry point
└── index.css            # Global styles
```

## Key Files

| File | Description |
|------|-------------|
| `index.js` | Application entry point, renders App to DOM |
| `App.js` | Root component with state management and API fetching |
| `App.css` | Main styles including layout, grid, and responsive design |
| `index.css` | Global CSS reset and base styles |

## Components Subdirectory

See [components/README.md](./components/README.md) for details on individual components.

## State Management

The `App.js` component manages all application state using React hooks:
- `pokemons` - Full Pokemon list from API
- `filteredPokemons` - Currently displayed Pokemon
- `types` - Available Pokemon types
- `filters` - Current filter settings
- `loading` - Loading state flag
- `error` - Error message (if any)

## Data Flow

1. `index.js` renders `App` into the DOM
2. `App.js` fetches data on mount via `useEffect`
3. User interactions in `FilterBar` update filter state
4. Filter changes trigger re-filtering in `App.js`
5. Filtered data is passed to `PokemonCard` components

## Styling Approach

Each component has a paired CSS file:
- Component-specific styles in component CSS files
- Global layout and utility styles in `App.css`
- CSS reset and base typography in `index.css`

## Connection to Project

This is the core application source. Files here are processed by Webpack during build. See [ARCHITECTURE.md](../ARCHITECTURE.md) for the overall system architecture.
