# src/components/ - React Presentational Components

## Purpose

This directory contains all reusable presentational React components for the Pokemon Frontend application. Each component is a stateless functional component that receives data via props from the parent `App` component. Every component has a co-located CSS file for its styles.

## Key Files and Their Responsibilities

### Components

| File               | Responsibility                                                                                          |
|--------------------|---------------------------------------------------------------------------------------------------------|
| `FilterBar.js`     | Renders search and filter controls: a text input for name search, a type dropdown (populated from API data), a legendary status dropdown, and a conditional "Clear Filters" button. Communicates user input back to `App` via `onFilterChange` and `onClearFilters` callback props. |
| `PokemonCard.js`   | Displays an individual Pokemon's information including its image (with error fallback), name, zero-padded ID (e.g., `#001`), color-coded type badges, and a legendary badge for legendary Pokemon. Accepts a single `pokemon` object prop. |
| `LoadingSpinner.js`| Renders a Pokeball-themed CSS animation with "Loading Pokemon..." text. Fully self-contained with no props. Displayed by `App` during initial data fetching. |

### Stylesheets

| File                  | Responsibility                                                                              |
|-----------------------|---------------------------------------------------------------------------------------------|
| `FilterBar.css`       | Styles for the filter bar layout, input fields, select dropdowns, and clear button with glassmorphism effects. |
| `PokemonCard.css`     | Card styles including hover animations, type-specific color badges (Fire, Water, Grass, etc.), legendary visual treatment, and responsive sizing. |
| `LoadingSpinner.css`  | Pokeball animation keyframes (rotation, pulse), spinner positioning, and loading text styles. |

## Component Props Interface

```
FilterBar
  ├── filters: { name: string, type: string, legendary: string }
  ├── types: string[]
  ├── onFilterChange: (newFilters) => void
  └── onClearFilters: () => void

PokemonCard
  └── pokemon: { id: number, name: string, type: string[], legendary: boolean, image: string }

LoadingSpinner
  └── (no props)
```

## How This Directory Connects to Other Parts of the System

- **Parent dependency**: All components are imported and rendered by `src/App.js`, the root container component
- **Data flow**: Props flow down from `App` (one-way data binding); user interactions in `FilterBar` flow back up via callback props
- **No inter-component dependencies**: Components do not import or reference each other; all coordination happens through the parent `App` component
- **Styling**: Each component imports its own CSS file. Class names are global (not CSS Modules), following a `kebab-case` naming convention prefixed by the component context (e.g., `pokemon-card`, `filter-bar`)

## Architecture Reference

For a high-level overview of the system architecture, component relationships, and data flow, see [ARCHITECTURE.md](../../ARCHITECTURE.md).
