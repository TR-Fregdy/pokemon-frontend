# src/components/ - Reusable UI Components

## Purpose

This directory contains all reusable presentational React components used by the main `App.js` container. Each component follows the convention of a functional component file paired with a co-located CSS file for styling.

## Key Files

| File | Responsibility |
|------|---------------|
| `FilterBar.js` | Controlled form component providing three filter inputs: a text input for name search, a `<select>` dropdown for Pokemon type filtering (populated from API data), and a `<select>` dropdown for legendary status filtering. Includes a conditional "Clear Filters" button that appears when any filter is active. Communicates with the parent via `onFilterChange` and `onClearFilters` callback props. |
| `FilterBar.css` | Responsive grid layout for the filter controls. Styles the inputs, selects, labels, and the clear button with gradient backgrounds and focus states. |
| `PokemonCard.js` | Presentational component that renders a single Pokemon card. Displays the Pokemon sprite image (with `onError` fallback), name, formatted ID (`#001`), color-coded type badges using CSS classes like `.type-fire`, and a "Legendary" badge overlay for legendary Pokemon. |
| `PokemonCard.css` | Card styling with glassmorphism effects (semi-transparent backgrounds, backdrop blur), hover animations (scale transform), type-based gradient colors for each Pokemon type (Fire, Water, Grass, Electric, etc.), and special golden border for legendary cards. |
| `LoadingSpinner.js` | Pure static component rendering a custom Pokeball-themed CSS loading animation with a "Loading Pokemon..." text message. Displayed by `App.js` during the initial data fetch. |
| `LoadingSpinner.css` | CSS keyframe animations for the spinning Pokeball effect and pulsing center dot animation. |

## Component Props

### FilterBar

| Prop | Type | Description |
|------|------|-------------|
| `filters` | `{ name: string, type: string, legendary: string }` | Current filter values |
| `types` | `string[]` | Available Pokemon types for the dropdown |
| `onFilterChange` | `(newFilters) => void` | Callback when any filter value changes |
| `onClearFilters` | `() => void` | Callback to reset all filters |

### PokemonCard

| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | `{ id, name, type[], legendary, image }` | Pokemon data object |

### LoadingSpinner

No props. Pure static component.

## How It Connects to the System

- All three components are imported and rendered by `src/App.js` (the container component)
- **FilterBar** receives state and callbacks from App; it is a controlled component where form values come from parent state
- **PokemonCard** receives individual Pokemon objects from the filtered array in App; rendered in a `.map()` loop
- **LoadingSpinner** is conditionally rendered when `loading` state is `true`
- No component in this directory imports from another component in this directory - all relationships flow through `App.js`

## Architecture Reference

For a high-level overview of the project architecture, see [../../ARCHITECTURE.md](../../ARCHITECTURE.md).
