# src/

## Purpose

The `src/` directory is the root of all application source code for the Pokemon Frontend. It contains the React entry point, the main application component with its state management and business logic, global styles, and a `components/` subdirectory with reusable UI components.

## Key Files

| File         | Responsibility                                                                                                 |
|--------------|----------------------------------------------------------------------------------------------------------------|
| `index.js`   | **Application entry point.** Bootstraps React by creating a root via `ReactDOM.createRoot()` and renders the `<App />` component inside `<React.StrictMode>`. Targets the `#root` DOM element from `public/index.html`. |
| `App.js`     | **Main application component and controller.** Manages all application state (`pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`) using `useState` hooks. Fetches initial data from the backend API via `useEffect`, implements client-side filtering logic, and orchestrates conditional rendering of loading, error, and content states. |
| `App.css`    | **Application-level styles.** Defines the overall layout, header styling with gradient background, main content area, Pokemon grid (CSS Grid with auto-fill), results info bar, empty-state messaging, error container, and responsive breakpoints (768px). |
| `index.css`  | **Global styles.** Sets base typography, body background gradient, box-sizing reset, and global font configuration. Applied before any component-specific styles. |

## Directory Structure

```
src/
├── components/          # Reusable React UI components
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css
│   ├── LoadingSpinner.js # Animated loading indicator
│   ├── LoadingSpinner.css
│   ├── PokemonCard.js   # Individual Pokemon display card
│   └── PokemonCard.css
├── App.js               # Root application component
├── App.css              # Application layout styles
├── index.js             # React DOM entry point
└── index.css            # Global base styles
```

## How It Connects to the Rest of the System

- **`public/index.html`** provides the HTML shell; `src/index.js` mounts React into the `#root` element defined there.
- **`App.js`** imports all three components from `src/components/` (`PokemonCard`, `FilterBar`, `LoadingSpinner`) and coordinates data flow between them.
- **Backend API**: `App.js` fetches data from the backend service at the URL specified by the `REACT_APP_API_URL` environment variable (default: `http://localhost:3001`). It calls `GET /api/pokemons` and `GET /api/types` on mount.
- **Build pipeline**: `react-scripts` (Webpack + Babel) processes all files in `src/` during build, transpiling JSX and bundling CSS.

## Data Flow

1. `index.js` renders `<App />`
2. `App.js` fetches Pokemon and types data from the backend API
3. `App.js` passes `types` and `filters` state to `<FilterBar />` as props
4. `FilterBar` calls back `onFilterChange` when the user modifies a filter
5. `App.js` re-filters the Pokemon list and passes filtered results to `<PokemonCard />` components
6. `PokemonCard` renders each Pokemon's visual representation

For a high-level overview of the project architecture, see [ARCHITECTURE.md](../ARCHITECTURE.md).
