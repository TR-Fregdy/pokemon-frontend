# src/ — Application Source Code

This directory contains all the React application source code, including the main entry point, the container component, global styles, and the `components/` subdirectory.

## Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css    # Filter bar styles
│   ├── PokemonCard.js   # Individual Pokemon display card
│   ├── PokemonCard.css  # Card styles with type-based colors
│   ├── LoadingSpinner.js# Animated loading indicator
│   └── LoadingSpinner.css# Spinner animation styles
├── App.js               # Main container component (state + logic)
├── App.css              # Application layout and main styles
├── index.js             # React entry point (mounts App into DOM)
└── index.css            # Global base styles (body, fonts, resets)
```

## Key Files and Their Responsibilities

### index.js
- **Role:** Application entry point.
- Imports React and ReactDOM, mounts the `<App />` component into the `#root` DOM element defined in `public/index.html`.
- Wraps the app in `React.StrictMode` for development warnings.

### App.js
- **Role:** Main container component and application shell.
- **State management:** Owns all application state via `useState` hooks — `pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, and `error`.
- **Data fetching:** Uses `useEffect` to fetch Pokemon data and type data from the backend API on mount via `Promise.all()`.
- **Filter orchestration:** Implements `applyFilters()` which chains `.filter()` calls for name search, type matching, and legendary status filtering.
- **UI rendering:** Renders the page header, result count, `FilterBar`, Pokemon grid of `PokemonCard` components, `LoadingSpinner`, error states, and empty states.
- **API base URL:** Reads `REACT_APP_API_URL` from environment variables (defaults to `http://localhost:3001`).

### App.css
- **Role:** Styles for the `App` component.
- Defines the overall page layout, header gradient styling, Pokemon grid (CSS Grid with `auto-fill`), error and empty state styling, and responsive breakpoints at 768px.

### index.css
- **Role:** Global base styles applied to the entire application.
- Sets the body font family, background color, margin reset, and base typography.

## How This Directory Connects to Other Parts

- **Upstream:** `public/index.html` provides the HTML shell with the `#root` div where `index.js` mounts the React app.
- **Downstream:** `App.js` imports and renders components from `src/components/`.
- **External:** `App.js` communicates with the backend REST API (configured via `REACT_APP_API_URL`) to fetch Pokemon and type data.
- **Build:** The `react-scripts` build process (configured in `package.json`) bundles this directory into optimized static assets.

## Architecture Reference

For full architectural details, data flow diagrams, and design decisions, see [ARCHITECTURE.md](../ARCHITECTURE.md).
