# components Directory

> Part of [Pokemon Frontend](../../ARCHITECTURE.md)

This directory contains reusable React components for the Pokemon Explorer application.

## Purpose

The `components` directory houses presentational components that receive data via props and render UI elements. All components are functional components using React hooks where needed.

## Files

```
components/
├── PokemonCard.js       # Pokemon display card component
├── PokemonCard.css      # Card styling with type colors
├── FilterBar.js         # Filter controls component
├── FilterBar.css        # Filter form styling
├── LoadingSpinner.js    # Pokeball loading animation
└── LoadingSpinner.css   # Spinner animation styles
```

## Component Details

### PokemonCard

**Purpose**: Displays an individual Pokemon with image, name, types, and ID.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data object |
| `pokemon.id` | Number | Pokemon ID |
| `pokemon.name` | String | Pokemon name |
| `pokemon.type` | String[] | Array of type names |
| `pokemon.legendary` | Boolean | Legendary status |
| `pokemon.image` | String | Sprite image URL |

**Features**:
- Conditional legendary styling (gold border, badge)
- Type badges with type-specific gradient colors
- Hover animation (scale, shadow)
- Image error fallback handling
- ID display with zero-padding (#001)

**CSS Classes**:
- `.pokemon-card` - Base card container
- `.pokemon-card.legendary` - Legendary variant
- `.pokemon-image` - Pokemon sprite
- `.legendary-badge` - "Legendary" label
- `.type-badge` - Type label
- `.type-{name}` - Type-specific colors (fire, water, etc.)

### FilterBar

**Purpose**: Provides search and filter controls for Pokemon list.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter state |
| `filters.name` | String | Name search value |
| `filters.type` | String | Selected type |
| `filters.legendary` | String | Legendary filter ("", "true", "false") |
| `types` | String[] | Available Pokemon types |
| `onFilterChange` | Function | Callback when filters change |
| `onClearFilters` | Function | Callback to reset filters |

**Form Elements**:
1. **Name Input**: Text field for partial name search
2. **Type Select**: Dropdown with all available types
3. **Legendary Select**: Dropdown (All/Legendary/Non-Legendary)
4. **Clear Button**: Resets all filters (shown when filters active)

**CSS Classes**:
- `.filter-bar` - Container with grid layout
- `.filter-section` - Individual filter group
- `.filter-label` - Input labels
- `.filter-input` - Text input styling
- `.filter-select` - Dropdown styling
- `.clear-filters-button` - Reset button

### LoadingSpinner

**Purpose**: Animated Pokeball spinner shown during data loading.

**Props**: None (stateless)

**Features**:
- Pure CSS Pokeball animation
- Rotating spin animation
- Pulsing center button
- "Loading Pokemon..." text

**CSS Classes**:
- `.loading-container` - Centered container
- `.pokeball-spinner` - Animation wrapper
- `.pokeball` - Ball structure
- `.pokeball-top` - Red upper half
- `.pokeball-bottom` - White lower half
- `.pokeball-middle` - Black center line
- `.pokeball-center` - Center button
- `.loading-text` - Status text

## Type Color Reference

| Type | CSS Class | Colors |
|------|-----------|--------|
| Fire | `.type-fire` | Orange to Red |
| Water | `.type-water` | Teal gradient |
| Grass | `.type-grass` | Green gradient |
| Electric | `.type-electric` | Yellow gradient |
| Psychic | `.type-psychic` | Purple to Pink |
| Ice | `.type-ice` | Blue gradient |
| Dragon | `.type-dragon` | Purple gradient |
| Flying | `.type-flying` | Pink to Yellow |
| Poison | `.type-poison` | Purple gradient |

## Component Usage

```jsx
// In App.js
import PokemonCard from './components/PokemonCard';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';

// FilterBar
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>

// PokemonCard (mapped)
{pokemons.map(pokemon => (
  <PokemonCard key={pokemon.id} pokemon={pokemon} />
))}

// LoadingSpinner
{loading && <LoadingSpinner />}
```

## Design Patterns

### Presentational Components
All components in this directory are presentational:
- Receive data via props
- No internal state management
- Focus on rendering UI
- Styling co-located in CSS files

### Prop Destructuring
```javascript
const PokemonCard = ({ pokemon }) => {
  // Direct access to pokemon properties
};
```

### Controlled Inputs
FilterBar uses controlled input pattern:
```javascript
<input
  value={filters.name}
  onChange={(e) => handleInputChange('name', e.target.value)}
/>
```

## Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - Full system architecture overview
- [src/README.md](../README.md) - Source directory overview
- [CLAUDE.md](../../CLAUDE.md) - AI agent context and quick reference
