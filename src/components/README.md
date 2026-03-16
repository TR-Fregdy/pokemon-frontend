# src/components/

## Purpose

The `components/` directory contains reusable React UI components used by the main `App` component. Each component follows a consistent pattern: a functional React component file (`.js`) paired with a co-located CSS stylesheet (`.css`) of the same name.

## Key Files

### FilterBar (`FilterBar.js` / `FilterBar.css`)

**Responsibility**: Provides the user interface for searching and filtering Pokemon.

- Renders three controlled filter inputs:
  - **Name search**: Text input for case-insensitive name matching
  - **Type filter**: Dropdown select populated with available Pokemon types
  - **Legendary filter**: Dropdown select with options for All, Legendary Only, and Non-Legendary Only
- Displays a "Clear Filters" button when any filter is active
- Communicates filter changes to the parent via the `onFilterChange` callback prop
- **Props**: `filters` (object), `types` (string array), `onFilterChange` (function), `onClearFilters` (function)

### PokemonCard (`PokemonCard.js` / `PokemonCard.css`)

**Responsibility**: Displays an individual Pokemon's information in a styled card format.

- Renders the Pokemon image with an `onError` fallback to `/placeholder-pokemon.png`
- Shows a legendary badge for legendary Pokemon
- Displays the Pokemon name, type badges (color-coded via CSS classes like `type-fire`, `type-water`), and a zero-padded ID number
- Applies a golden border style to legendary Pokemon cards
- **Props**: `pokemon` (object with `id`, `name`, `type`, `image`, `legendary` fields)

### LoadingSpinner (`LoadingSpinner.js` / `LoadingSpinner.css`)

**Responsibility**: Provides visual feedback during data loading.

- Renders an animated Pokeball spinner with CSS keyframe animations (rotation + pulse)
- Displays "Loading Pokemon..." text below the spinner
- Pure presentational component with no props or internal state
- **Props**: None

## How This Directory Connects to the Rest of the System

- All three components are imported and used exclusively by `src/App.js`:
  - `FilterBar` is rendered in the main content area and receives filter state and callback props
  - `PokemonCard` is rendered inside a CSS Grid for each Pokemon in the filtered list
  - `LoadingSpinner` is rendered conditionally while the initial API fetch is in progress
- Components receive data via props from `App.js` (unidirectional data flow) and communicate user actions back through callback functions
- CSS files in this directory define component-scoped styles (though not using CSS Modules, so class names are globally scoped)

## Component Hierarchy

```
App (src/App.js)
├── LoadingSpinner    ← shown during data fetch
├── Error UI          ← shown on API failure (inline JSX in App.js)
├── FilterBar         ← always visible in normal state
└── PokemonCard[]     ← one per filtered Pokemon, rendered in a grid
```

For a high-level overview of the project architecture, see [ARCHITECTURE.md](../../ARCHITECTURE.md).
