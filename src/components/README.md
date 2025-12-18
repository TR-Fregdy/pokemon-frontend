# Components Directory

> Part of [Pokemon Frontend Architecture](../../ARCHITECTURE.md)

This directory contains reusable React components for the Pokemon Explorer application.

## Directory Structure

```
components/
├── FilterBar.js          # Search and filter controls
├── FilterBar.css         # FilterBar styles
├── PokemonCard.js        # Individual Pokemon display card
├── PokemonCard.css       # PokemonCard styles
├── LoadingSpinner.js     # Pokeball loading animation
├── LoadingSpinner.css    # LoadingSpinner styles
└── README.md             # This file
```

## Components Overview

### FilterBar

**File:** `FilterBar.js`

Search and filter controls for the Pokemon list.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `filters` | `object` | Current filter state `{name, type, legendary}` |
| `types` | `string[]` | Available Pokemon types for dropdown |
| `onFilterChange` | `function` | Callback when any filter changes |
| `onClearFilters` | `function` | Callback to reset all filters |

**Features:**
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status
- Clear filters button (shown when filters active)

**Usage:**
```jsx
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>
```

---

### PokemonCard

**File:** `PokemonCard.js`

Displays an individual Pokemon with image, name, types, and ID.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | `object` | Pokemon data object |

**Pokemon Object Shape:**
```javascript
{
  id: number,
  name: string,
  type: string[],
  legendary: boolean,
  image: string
}
```

**Features:**
- Pokemon sprite image with hover zoom
- Type badges with color-coded backgrounds
- Legendary badge for legendary Pokemon
- Fallback placeholder for missing images
- Hover elevation effect

**Usage:**
```jsx
<PokemonCard pokemon={pokemonData} />
```

**CSS Classes:**
- `.pokemon-card` - Base card container
- `.pokemon-card.legendary` - Golden border for legendary Pokemon
- `.type-badge` - Base type badge
- `.type-{typename}` - Type-specific colors (e.g., `.type-fire`, `.type-water`)

---

### LoadingSpinner

**File:** `LoadingSpinner.js`

Animated Pokeball loading indicator.

**Props:** None

**Features:**
- CSS-only Pokeball animation
- Spinning rotation effect
- Pulsing center button
- "Loading Pokemon..." text

**Usage:**
```jsx
<LoadingSpinner />
```

## Styling Conventions

Each component follows these patterns:

1. **Dedicated CSS file** - Each `.js` file has a matching `.css` file
2. **Component-prefixed classes** - Classes start with component name (e.g., `.filter-bar`, `.pokemon-card`)
3. **BEM-like naming** - Nested elements use descriptive suffixes (e.g., `.pokemon-card-image`)
4. **Responsive design** - Mobile breakpoint at 768px
5. **Smooth transitions** - 0.3s ease transitions for interactive elements

## Type Color Reference

| Type | Gradient Colors |
|------|-----------------|
| Fire | `#ff6b6b` → `#ff8e53` |
| Water | `#4ecdc4` → `#44a08d` |
| Grass | `#95e1d3` → `#68d391` |
| Electric | `#fce38a` → `#f9ca24` |
| Psychic | `#e056fd` → `#c44569` |
| Ice | `#74b9ff` → `#0984e3` |
| Dragon | `#a29bfe` → `#6c5ce7` |
| Flying | `#fd79a8` → `#fdcb6e` |
| Poison | `#6c5ce7` → `#a29bfe` |

## Adding New Components

When creating new components:

1. Create `ComponentName.js` in this directory
2. Create matching `ComponentName.css`
3. Use functional component with hooks
4. Export as default
5. Document props and usage in this README
