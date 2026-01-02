# Components Directory

> Part of [Pokemon Frontend](../../ARCHITECTURE.md) | [Full Architecture](../../ARCHITECTURE.md#component-architecture)

## Purpose

This directory contains reusable React UI components for the Pokemon Explorer application. Each component is self-contained with its own CSS file for styling.

## Directory Structure

```
components/
├── PokemonCard.js        # Pokemon display card component
├── PokemonCard.css       # Card styles and type colors
├── FilterBar.js          # Search and filter controls
├── FilterBar.css         # Filter input styles
├── LoadingSpinner.js     # Pokeball loading animation
├── LoadingSpinner.css    # Spinner animation styles
└── README.md             # This file
```

## Components

### PokemonCard

**File:** `PokemonCard.js`

Displays a single Pokemon with image, name, types, and legendary status.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data with id, name, type[], legendary, image |

**Features:**
- Hover animation (lift + scale)
- Golden border for legendary Pokemon
- Type badges with gradient backgrounds
- Image error fallback

**Usage:**
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

**File:** `FilterBar.js`

Provides search and filter controls for the Pokemon list.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter values `{name, type, legendary}` |
| `types` | String[] | Available Pokemon types for dropdown |
| `onFilterChange` | Function | Callback when filters change |
| `onClearFilters` | Function | Callback to reset all filters |

**Features:**
- Text input for name search
- Dropdown for type filter
- Dropdown for legendary status
- Clear button (visible when filters active)

**Usage:**
```jsx
import FilterBar from './components/FilterBar';

<FilterBar
  filters={{ name: '', type: '', legendary: '' }}
  types={['Electric', 'Fire', 'Water']}
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onClearFilters={() => resetFilters()}
/>
```

---

### LoadingSpinner

**File:** `LoadingSpinner.js`

Displays a rotating Pokeball animation during data loading.

**Props:** None

**Features:**
- CSS-only animation (no JavaScript)
- Spinning Pokeball design
- Pulsing center button
- "Loading Pokemon..." text

**Usage:**
```jsx
import LoadingSpinner from './components/LoadingSpinner';

{loading && <LoadingSpinner />}
```

## CSS Architecture

Each component has a co-located CSS file with:
- Component-specific class names
- No global styles (scoped to component)
- Responsive breakpoints where needed

### Type Color Mapping (PokemonCard.css)

The following type classes are defined:
- `.type-fire` - Red/orange gradient
- `.type-water` - Teal gradient
- `.type-grass` - Green gradient
- `.type-electric` - Yellow gradient
- `.type-psychic` - Purple/pink gradient
- `.type-ice` - Blue gradient
- `.type-dragon` - Purple gradient
- `.type-flying` - Pink/yellow gradient
- `.type-poison` - Purple gradient

## Adding New Components

1. Create `ComponentName.js` with functional component
2. Create `ComponentName.css` with styles
3. Import CSS at top of component file
4. Export component as default
5. Update this README

## Related Documentation

- [Frontend Architecture](../../ARCHITECTURE.md) - Overall system design
- [CLAUDE.md](../../CLAUDE.md) - Quick reference for AI agents
- [App.js](../App.js) - Parent component that uses these components
