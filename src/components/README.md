# components Directory

This directory contains reusable React UI components for the Pokemon Frontend application.

## Purpose

The `components` directory houses self-contained, reusable UI components. Each component consists of a JavaScript file and a paired CSS file for styling.

## Components

### PokemonCard

**Files**: `PokemonCard.js`, `PokemonCard.css`

Displays individual Pokemon information in a card format.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data object with id, name, type[], legendary, image |

**Features**:
- Displays Pokemon sprite image
- Shows name and formatted ID number
- Renders type badges with color coding
- Shows legendary badge for legendary Pokemon
- Hover effects and animations

### FilterBar

**Files**: `FilterBar.js`, `FilterBar.css`

Provides search and filter controls for the Pokemon list.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter state {name, type, legendary} |
| `types` | Array | Available Pokemon types for dropdown |
| `onFilterChange` | Function | Callback when filter values change |
| `onClearFilters` | Function | Callback to reset all filters |

**Features**:
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status
- Clear filters button (conditionally shown)

### LoadingSpinner

**Files**: `LoadingSpinner.js`, `LoadingSpinner.css`

Animated loading indicator displayed during data fetching.

**Props**: None

**Features**:
- Pokeball-themed CSS animation
- Spinning animation effect
- Pulse animation on center button
- Loading text message

## CSS Architecture

Each component's CSS file follows these conventions:
- Component-prefixed class names (e.g., `.pokemon-card`, `.filter-bar`)
- Self-contained styles with no global side effects
- Responsive breakpoints where needed
- CSS animations for interactive feedback

### Type Color Classes (PokemonCard.css)

Pokemon type badges use these CSS classes:
- `.type-fire` - Fire type gradient
- `.type-water` - Water type gradient
- `.type-grass` - Grass type gradient
- `.type-electric` - Electric type gradient
- `.type-psychic` - Psychic type gradient
- `.type-ice` - Ice type gradient
- `.type-dragon` - Dragon type gradient
- `.type-flying` - Flying type gradient
- `.type-poison` - Poison type gradient

## Usage Pattern

```jsx
import PokemonCard from './components/PokemonCard';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';

// In render:
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>

{loading ? (
  <LoadingSpinner />
) : (
  pokemons.map(pokemon => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ))
)}
```

## Connection to Project

These components are imported and used by `App.js`. They form the UI layer of the application. See [ARCHITECTURE.md](../../ARCHITECTURE.md) for the overall system architecture.
