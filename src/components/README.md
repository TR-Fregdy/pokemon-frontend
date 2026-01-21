# components/ - UI Components

This directory contains reusable React components for the Pokemon Explorer application.

## Purpose

Houses all presentational and interactive UI components used throughout the application. Each component is self-contained with its own JavaScript logic and CSS styles.

## Components Overview

| Component | File | Purpose |
|-----------|------|---------|
| FilterBar | `FilterBar.js` | Search input and filter dropdown controls |
| PokemonCard | `PokemonCard.js` | Individual Pokemon display card |
| LoadingSpinner | `LoadingSpinner.js` | Animated Pokeball loading indicator |

## File Structure

```
components/
├── FilterBar.js          # Filter controls component
├── FilterBar.css         # Filter controls styles
├── PokemonCard.js        # Pokemon card component
├── PokemonCard.css       # Pokemon card styles (includes type colors)
├── LoadingSpinner.js     # Loading spinner component
└── LoadingSpinner.css    # Pokeball animation styles
```

## Component Details

### FilterBar

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `filters` | `object` | Current filter state `{ name, type, legendary }` |
| `types` | `string[]` | Available Pokemon types for dropdown |
| `onFilterChange` | `function` | Callback when filters change |
| `onClearFilters` | `function` | Callback to reset all filters |

**Features:**
- Text input for name search
- Dropdown for type selection
- Dropdown for legendary status
- Conditional clear button when filters are active

### PokemonCard

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | `object` | Pokemon data `{ id, name, type[], legendary, image }` |

**Features:**
- Pokemon sprite image with error fallback
- Type badges with gradient colors
- Legendary badge indicator
- Hover animations

**Type Color Classes:**
- `.type-fire`, `.type-water`, `.type-grass`, `.type-electric`
- `.type-psychic`, `.type-ice`, `.type-dragon`, `.type-flying`, `.type-poison`

### LoadingSpinner

**Props:** None (purely presentational)

**Features:**
- CSS-animated Pokeball
- Spinning animation
- Pulsing center dot

## Usage Example

```jsx
import FilterBar from './components/FilterBar';
import PokemonCard from './components/PokemonCard';
import LoadingSpinner from './components/LoadingSpinner';

// In parent component:
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>

{pokemons.map(pokemon => (
  <PokemonCard key={pokemon.id} pokemon={pokemon} />
))}

{loading && <LoadingSpinner />}
```

## Styling Convention

- Each component has a paired `.css` file
- Class names use kebab-case (e.g., `pokemon-card`, `filter-bar`)
- Responsive styles use `@media (max-width: 768px)` breakpoint
- Animations defined with `@keyframes`

## Architecture Reference

For the complete architecture overview, see [ARCHITECTURE.md](../../ARCHITECTURE.md).
