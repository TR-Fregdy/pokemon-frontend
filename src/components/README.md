# src/components/ — React UI Components

This directory contains the reusable, presentational React components that make up the Pokemon Frontend user interface. Each component follows a co-located pattern with its own JavaScript file and corresponding CSS stylesheet.

## Directory Structure

```
components/
├── FilterBar.js          # Search and filter controls component
├── FilterBar.css         # Filter bar styling
├── PokemonCard.js        # Individual Pokemon display card component
├── PokemonCard.css       # Card styling with type-based color mapping
├── LoadingSpinner.js     # Animated loading indicator component
└── LoadingSpinner.css    # Spinner animation keyframes and styles
```

## Key Files and Their Responsibilities

### FilterBar.js / FilterBar.css
- **Role:** Provides the search and filter controls for narrowing down the Pokemon list.
- **Props received from App.js:**
  - `filters` — Current filter state object `{ name, type, legendary }`.
  - `types` — Array of available Pokemon type strings for the dropdown.
  - `onFilterChange(name, value)` — Callback invoked when any filter input changes.
  - `onClearFilters()` — Callback to reset all filters to their defaults.
- **UI elements:** Text input for name search, dropdown for type selection, dropdown for legendary status, and a conditional "Clear Filters" button.
- **Behavior:** Purely presentational — delegates all state changes to the parent via callback props.

### PokemonCard.js / PokemonCard.css
- **Role:** Displays an individual Pokemon as a styled card with image, name, types, and legendary status.
- **Props received from App.js:**
  - `pokemon` — Object containing `{ id, name, image, type, legendary }`.
- **Features:**
  - Renders the Pokemon image with an `onError` fallback to `/placeholder-pokemon.png`.
  - Displays type badges with colors from a `typeColors` lookup map (supports Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Flying, Poison, and a default).
  - Shows a golden "Legendary" badge for legendary Pokemon.
  - Applies hover animations (card lift + image scale).
- **Behavior:** Stateless pure component — renders based on the `pokemon` prop.

### LoadingSpinner.js / LoadingSpinner.css
- **Role:** Animated loading indicator displayed during the initial data fetch.
- **Props:** None.
- **Features:**
  - CSS-based Pokeball-style spinner with rotation animation (2s infinite loop).
  - Pulsing center dot animation (1s alternate loop).
  - "Loading Pokemon..." text label.
- **Behavior:** Stateless, no props. Conditionally rendered by `App.js` when `loading` state is `true`.

## Component Conventions

| Convention | Detail |
|------------|--------|
| Component type | Functional components using arrow function syntax |
| State | None — all components are stateless presentational components |
| Styling | Co-located CSS file per component (e.g., `FilterBar.js` + `FilterBar.css`) |
| CSS naming | BEM-like class names scoped by component (e.g., `.pokemon-card`, `.filter-bar`) |
| Props pattern | Data flows down from `App.js`; user actions bubble up via callback props |

## How This Directory Connects to Other Parts

- **Parent:** All components are imported and rendered by `src/App.js`, the sole container component.
- **Data source:** Components receive data that `App.js` fetches from the backend REST API. They do not fetch data themselves.
- **Styling:** Each component imports its own CSS file. Global styles are defined in `src/index.css`.

## Architecture Reference

For the full component relationship diagram, data flow, and architectural decisions, see [ARCHITECTURE.md](../../ARCHITECTURE.md).
