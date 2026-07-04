# src Directory

This directory contains the source code for the Pokemon Frontend React application.

## Contents

| File/Directory | Purpose |
|----------------|---------|
| `index.js` | Application entry point, renders React app to DOM |
| `index.css` | Global CSS styles and resets |
| `App.js` | Main application component with state management |
| `App.css` | Layout and container styles |
| `components/` | Reusable UI components |

## Entry Point

`index.js` bootstraps the React application:
- Creates React root using `createRoot`
- Renders `App` component wrapped in `StrictMode`
- Mounts to `#root` element in `public/index.html`

## Main Application (App.js)

The `App` component serves as the main container:
- Manages all application state using React hooks
- Fetches Pokemon and type data from backend API
- Implements client-side filtering logic
- Renders child components based on state

### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Currently filtered Pokemon |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading indicator |
| `error` | String | Error message |

## Styling

- `index.css`: Font settings and global resets
- `App.css`: Header, layout grid, error states, responsive breakpoints

## Related Documentation

- See [components/README.md](./components/README.md) for component details
- See [ARCHITECTURE.md](../ARCHITECTURE.md) for system architecture
