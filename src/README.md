# src Directory

## Purpose

This directory contains all React application source code, including components, styles, and the application entry point.

## Key Files

| File | Description |
|------|-------------|
| `index.js` | React application entry point; renders App to DOM |
| `index.css` | Global CSS styles and font configuration |
| `App.js` | Main application component with state management |
| `App.css` | Styles for App component and layout |

## File Responsibilities

### index.js

- Creates React root using `ReactDOM.createRoot`
- Renders `<App />` component wrapped in `<React.StrictMode>`
- Mounts application to `#root` element in `public/index.html`

### index.css

- Global body styles and font family stack
- Code/monospace font configuration

### App.js

- **State Management**: Manages all application state (pokemons, filters, loading, error)
- **Data Fetching**: Fetches Pokemon and types data from backend API on mount
- **Filter Logic**: Applies filters to Pokemon list when filter state changes
- **Conditional Rendering**: Shows loading spinner, error message, or main content
- **Layout**: Renders header, FilterBar, results info, and Pokemon grid

### App.css

- Application-wide layout styles
- Header gradient styling
- Pokemon grid layout (CSS Grid)
- Error container and message styles
- Results info panel
- Responsive breakpoints
- Clear button and retry button styles

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `components/` | Reusable React components (PokemonCard, FilterBar, LoadingSpinner) |

## Connection to Other Parts

- **Entry Point**: `index.js` is referenced by `public/index.html` via the build process
- **Components**: `App.js` imports and renders components from `components/` directory
- **Backend API**: `App.js` makes HTTP requests to Pokemon Backend API
- **Build Output**: Contents are compiled to `/build` directory for production

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for high-level system design
- See [components/README.md](./components/README.md) for component details
