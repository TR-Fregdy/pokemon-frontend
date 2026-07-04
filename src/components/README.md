# /src/components Directory

> Part of [Pokemon Frontend Architecture](../../ARCHITECTURE.md)

This directory contains reusable React components for the Pokemon Frontend application.

## Directory Structure

```
components/
├── FilterBar.js         # Search and filter controls
├── FilterBar.css        # Filter styling
├── PokemonCard.js       # Individual Pokemon display
├── PokemonCard.css      # Card styling with type colors
├── LoadingSpinner.js    # Loading animation component
└── LoadingSpinner.css   # Pokeball spinner animation
```

## Components

### FilterBar

**File**: `FilterBar.js`
**Styles**: `FilterBar.css`

**Purpose**: Provides search and filtering controls for the Pokemon list.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter values `{name, type, legendary}` |
| `types` | Array | Available Pokemon types for dropdown |
| `onFilterChange` | Function | Callback when filters change |
| `onClearFilters` | Function | Callback to reset all filters |

**Features**:
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status
- Clear filters button (conditional)

**Usage**:
```jsx
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>
```

**Key CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.filter-bar` | Grid container for filter sections |
| `.filter-section` | Individual filter group |
| `.filter-input` | Text input styling |
| `.filter-select` | Dropdown styling |
| `.clear-filters-button` | Red gradient clear button |

---

### PokemonCard

**File**: `PokemonCard.js`
**Styles**: `PokemonCard.css`

**Purpose**: Displays individual Pokemon information in a card format.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data `{id, name, type, legendary, image}` |

**Features**:
- Pokemon sprite image with hover animation
- Name display with capitalization
- Type badges with color coding
- Legendary badge for legendary Pokemon
- ID number with leading zeros
- Hover lift effect

**Usage**:
```jsx
<PokemonCard pokemon={pokemonData} />
```

**Key CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.pokemon-card` | Card container with glassmorphism |
| `.pokemon-card.legendary` | Gold border for legendary |
| `.pokemon-image` | Sprite with scale animation |
| `.legendary-badge` | Gold floating badge |
| `.type-badge` | Colored type pill |
| `.type-{type}` | Type-specific gradient colors |

**Type Color Classes**:
- `.type-fire` - Orange/red gradient
- `.type-water` - Teal gradient
- `.type-grass` - Green gradient
- `.type-electric` - Yellow gradient
- `.type-psychic` - Pink/purple gradient
- `.type-ice` - Blue gradient
- `.type-dragon` - Purple gradient
- `.type-flying` - Pink/yellow gradient
- `.type-poison` - Purple gradient

---

### LoadingSpinner

**File**: `LoadingSpinner.js`
**Styles**: `LoadingSpinner.css`

**Purpose**: Displays an animated Pokeball loading indicator.

**Props**: None

**Features**:
- CSS-only Pokeball animation
- Spinning rotation animation
- Pulsing center button
- "Loading Pokemon..." text

**Usage**:
```jsx
<LoadingSpinner />
```

**Key CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.loading-container` | Centered flex container |
| `.pokeball` | Main Pokeball container |
| `.pokeball-top` | Red top half |
| `.pokeball-bottom` | White bottom half |
| `.pokeball-middle` | Black dividing line |
| `.pokeball-center` | Center button |

**Animations**:
| Animation | Duration | Effect |
|-----------|----------|--------|
| `spin` | 2s | 360° rotation |
| `pulse` | 1s | Scale and opacity |

## Component Design Patterns

### File Organization

Each component follows a consistent pattern:
1. Import React and hooks
2. Import component-specific CSS
3. Define functional component
4. Export as default

```javascript
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ props }) => {
  return (
    // JSX
  );
};

export default ComponentName;
```

### Styling Approach

- Each component has a co-located CSS file
- CSS uses BEM-inspired naming
- No CSS-in-JS or CSS modules (plain CSS imports)
- Responsive design via media queries

### Props Pattern

- Destructure props in function signature
- Use default values where appropriate
- Pass callbacks for state updates (lifting state up)

## Adding New Components

1. Create `ComponentName.js` in this directory
2. Create `ComponentName.css` for styles
3. Follow the existing file organization pattern
4. Import and use in parent component (`App.js` or other)
5. Document props and purpose in this README

## Related Documentation

- [Main Architecture](../../ARCHITECTURE.md)
- [Source Directory](../README.md)
- [CLAUDE.md](../../CLAUDE.md)
