# components/ - React UI Components

> Part of [Pokemon Frontend Architecture](../../ARCHITECTURE.md)
> Parent Directory: [src/README.md](../README.md)

## Overview

This directory contains all reusable React components for the Pokemon Explorer application. Each component is a functional component using React hooks where needed, with co-located CSS styling.

## Component Files

```
components/
├── PokemonCard.js        # Individual Pokemon display card
├── PokemonCard.css       # Card styles, type colors, animations
├── FilterBar.js          # Search and filter controls
├── FilterBar.css         # Filter form styling
├── LoadingSpinner.js     # Pokeball loading animation
└── LoadingSpinner.css    # Spinner animation keyframes
```

## Component Details

### PokemonCard

**File**: `PokemonCard.js`
**Styles**: `PokemonCard.css`

**Purpose**: Displays a single Pokemon with image, name, types, and legendary status.

**Props**:
```javascript
{
  pokemon: {
    id: number,          // Pokemon ID (displayed as #001 format)
    name: string,        // Pokemon name
    type: string[],      // Array of type names
    legendary: boolean,  // Legendary status
    image: string        // URL to sprite image
  }
}
```

**Features**:
- Hover animation (lift and shadow)
- Golden border for legendary Pokemon
- Type-specific colored badges
- Fallback image on error
- Sparkle animation on ID

**CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.pokemon-card` | Card container |
| `.pokemon-card.legendary` | Legendary variant (gold border) |
| `.pokemon-image-container` | Image wrapper |
| `.pokemon-image` | Pokemon sprite |
| `.legendary-badge` | "Legendary" label |
| `.pokemon-info` | Info section |
| `.pokemon-name` | Name display |
| `.pokemon-types` | Types container |
| `.type-badge` | Individual type pill |
| `.type-{typename}` | Type-specific colors |
| `.pokemon-id` | ID number display |

**Type Color Classes**:
- `.type-fire` - Red/orange gradient
- `.type-water` - Blue/teal gradient
- `.type-grass` - Green gradient
- `.type-electric` - Yellow gradient
- `.type-psychic` - Pink/purple gradient
- `.type-ice` - Light blue gradient
- `.type-dragon` - Purple gradient
- `.type-flying` - Pink/yellow gradient
- `.type-poison` - Purple gradient

---

### FilterBar

**File**: `FilterBar.js`
**Styles**: `FilterBar.css`

**Purpose**: Provides search and filter controls for Pokemon list.

**Props**:
```javascript
{
  filters: {
    name: string,       // Current name search value
    type: string,       // Currently selected type
    legendary: string   // 'true', 'false', or '' (all)
  },
  types: string[],      // Available types for dropdown
  onFilterChange: (newFilters) => void,  // Filter update callback
  onClearFilters: () => void             // Clear all filters callback
}
```

**Features**:
- Name search input (controlled component)
- Type dropdown with dynamic options
- Legendary status dropdown
- Clear filters button (appears when filters active)
- Responsive grid layout

**CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.filter-bar` | Container with glassmorphism |
| `.filter-section` | Individual filter group |
| `.filter-label` | Label text |
| `.filter-input` | Text input styling |
| `.filter-select` | Dropdown styling |
| `.clear-filters-button` | Red gradient clear button |

**Usage**:
```jsx
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>
```

---

### LoadingSpinner

**File**: `LoadingSpinner.js`
**Styles**: `LoadingSpinner.css`

**Purpose**: Displays a Pokeball animation during loading states.

**Props**: None

**Features**:
- CSS-only Pokeball animation
- Spinning rotation animation
- Pulsing center button effect
- "Loading Pokemon..." text

**CSS Classes**:
| Class | Purpose |
|-------|---------|
| `.loading-container` | Centered flex container |
| `.pokeball-spinner` | Wrapper for animation |
| `.pokeball` | Main pokeball container (has spin animation) |
| `.pokeball-top` | Red top half |
| `.pokeball-bottom` | White bottom half |
| `.pokeball-middle` | Black center stripe |
| `.pokeball-center` | Black center circle |
| `.pokeball-inner-center` | White button (has pulse animation) |
| `.loading-text` | "Loading Pokemon..." text |

**Animations**:
- `@keyframes spin` - 360° rotation over 2 seconds
- `@keyframes pulse` - Scale 0.8 to 1.2 over 1 second

**Usage**:
```jsx
{loading && <LoadingSpinner />}
```

## Component Hierarchy

```
App
├── FilterBar
│   └── (name input, type select, legendary select, clear button)
│
├── LoadingSpinner (conditional)
│   └── (pokeball animation, loading text)
│
└── PokemonCard[] (mapped from filteredPokemons)
    └── (image, name, type badges, ID, legendary badge)
```

## Styling Conventions

1. **Co-located CSS**: Each component has its own `.css` file
2. **Class Naming**: BEM-like pattern (`.component-element`)
3. **No Global Conflicts**: Component-specific class prefixes
4. **Responsive**: Media queries for mobile breakpoints
5. **Modern CSS**: Gradients, backdrop-filter, CSS Grid, transitions

## Adding New Components

1. Create `ComponentName.js` with functional component
2. Create `ComponentName.css` with component styles
3. Import CSS in component: `import './ComponentName.css';`
4. Export component: `export default ComponentName;`
5. Import and use in parent component (usually `App.js`)

**Template**:
```javascript
import React from 'react';
import './NewComponent.css';

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="new-component">
      {/* Component JSX */}
    </div>
  );
};

export default NewComponent;
```
