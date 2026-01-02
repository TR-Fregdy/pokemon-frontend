# Components Directory

> Reusable React components for the Pokemon Explorer application

## Purpose

This directory contains all React UI components used throughout the application. Each component follows a pattern of having both a JavaScript file (.js) for logic/structure and a corresponding CSS file for styling.

## Components

### PokemonCard

**Files**: `PokemonCard.js`, `PokemonCard.css`

Displays an individual Pokemon in a card format.

| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data object |
| `pokemon.id` | Number | Unique identifier |
| `pokemon.name` | String | Pokemon name |
| `pokemon.type` | Array | Array of type strings |
| `pokemon.legendary` | Boolean | Legendary status |
| `pokemon.image` | String | URL to Pokemon sprite |

**Features**:
- Glassmorphism card design
- Hover animations (scale, shadow)
- Legendary badge and gold border
- Type badges with color coding
- Image error fallback handling

**Usage**:
```jsx
import PokemonCard from './components/PokemonCard';

<PokemonCard pokemon={{
  id: 25,
  name: 'Pikachu',
  type: ['Electric'],
  legendary: false,
  image: 'https://...'
}} />
```

---

### FilterBar

**Files**: `FilterBar.js`, `FilterBar.css`

Search and filter controls for Pokemon list.

| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter values `{ name, type, legendary }` |
| `types` | Array | Available Pokemon types for dropdown |
| `onFilterChange` | Function | Callback when any filter changes |
| `onClearFilters` | Function | Callback to reset all filters |

**Features**:
- Name search input (text)
- Type dropdown selector
- Legendary status dropdown
- Clear filters button (shown when filters active)
- Responsive grid layout

**Usage**:
```jsx
import FilterBar from './components/FilterBar';

<FilterBar
  filters={{ name: '', type: '', legendary: '' }}
  types={['Electric', 'Fire', 'Water']}
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onClearFilters={() => setFilters(initialFilters)}
/>
```

---

### LoadingSpinner

**Files**: `LoadingSpinner.js`, `LoadingSpinner.css`

Animated Pokeball spinner for loading states.

**Props**: None (pure presentational component)

**Features**:
- CSS-animated spinning Pokeball
- Pulsing center dot animation
- "Loading Pokemon..." text

**Usage**:
```jsx
import LoadingSpinner from './components/LoadingSpinner';

{isLoading && <LoadingSpinner />}
```

## CSS Architecture

Each component has its own CSS file with scoped class names following the pattern:
- `.component-name` - Main container
- `.component-element` - Child elements
- `.component-modifier` - State variations

### Type Color Classes (PokemonCard.css)
```css
.type-fire     /* Fire type gradient */
.type-water    /* Water type gradient */
.type-grass    /* Grass type gradient */
.type-electric /* Electric type gradient */
.type-psychic  /* Psychic type gradient */
.type-ice      /* Ice type gradient */
.type-dragon   /* Dragon type gradient */
.type-flying   /* Flying type gradient */
.type-poison   /* Poison type gradient */
```

## Component Patterns

### Controlled Components
FilterBar uses controlled inputs where values are passed via props and changes are communicated via callbacks.

### Presentational Components
PokemonCard and LoadingSpinner are primarily presentational, receiving data via props and rendering UI without managing their own state.

## Adding New Components

1. Create `ComponentName.js` in this directory
2. Create `ComponentName.css` for styles
3. Import CSS in the component file
4. Export the component as default
5. Update this README with component documentation

## Related Documentation

- [App.js](../App.js) - Main application using these components
- [ARCHITECTURE.md](../../ARCHITECTURE.md) - Component hierarchy and data flow
- [CLAUDE.md](../../CLAUDE.md) - AI agent reference guide
