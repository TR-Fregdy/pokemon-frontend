# Components Directory (`src/components/`)

This directory contains reusable React components for the Pokemon Frontend application.

> **Parent Documentation**: See [ARCHITECTURE.md](../../ARCHITECTURE.md) for the full architecture overview.

## Directory Structure

```
components/
├── PokemonCard.js        # Individual Pokemon display card
├── PokemonCard.css       # Card styles and type colors
├── FilterBar.js          # Search and filter controls
├── FilterBar.css         # Filter UI styles
├── LoadingSpinner.js     # Pokeball loading animation
└── LoadingSpinner.css    # Spinner animation styles
```

## Component Overview

| Component | Type | Props | Purpose |
|-----------|------|-------|---------|
| PokemonCard | Presentational | `pokemon` | Displays a single Pokemon card |
| FilterBar | Controlled | `filters`, `types`, `onFilterChange`, `onClearFilters` | Filter input controls |
| LoadingSpinner | Presentational | None | Loading animation |

---

## PokemonCard

Displays an individual Pokemon with its image, name, types, and legendary status.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `pokemon` | Object | Yes | Pokemon data object |

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

### Features
- Image with fallback on error
- Legendary badge overlay
- Type badges with color-coded backgrounds
- Hover animation (scale up)
- Golden border for legendary Pokemon

### CSS Classes
| Class | Purpose |
|-------|---------|
| `.pokemon-card` | Main card container |
| `.pokemon-card.legendary` | Golden border styling |
| `.pokemon-image` | Pokemon sprite |
| `.legendary-badge` | "Legendary" label |
| `.type-badge` | Type label |
| `.type-{name}` | Type-specific gradient colors |

### Type Color Classes
```css
.type-fire      /* Red-orange gradient */
.type-water     /* Teal gradient */
.type-grass     /* Green gradient */
.type-electric  /* Yellow gradient */
.type-psychic   /* Purple-pink gradient */
.type-ice       /* Blue gradient */
.type-dragon    /* Purple gradient */
.type-flying    /* Pink-yellow gradient */
.type-poison    /* Purple gradient */
```

---

## FilterBar

Provides input controls for filtering Pokemon by name, type, and legendary status.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | Object | Yes | Current filter values |
| `types` | Array | Yes | Available Pokemon types |
| `onFilterChange` | Function | Yes | Callback when filter changes |
| `onClearFilters` | Function | Yes | Callback to clear all filters |

**Filters Object Shape:**
```javascript
{
  name: string,      // Partial name match
  type: string,      // Exact type match (or empty)
  legendary: string  // 'true', 'false', or ''
}
```

### Features
- Text input for name search
- Dropdown for type filter
- Dropdown for legendary status
- Clear filters button (appears when filters active)
- Responsive grid layout

### CSS Classes
| Class | Purpose |
|-------|---------|
| `.filter-bar` | Main container with grid layout |
| `.filter-section` | Individual filter group |
| `.filter-label` | Input label |
| `.filter-input` | Text input styling |
| `.filter-select` | Dropdown styling |
| `.clear-filters-button` | Clear button styling |

### Usage Example
```jsx
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>
```

---

## LoadingSpinner

Displays an animated Pokeball while data is loading.

### Props
None - this is a simple presentational component.

### Features
- CSS-only Pokeball animation
- Rotating spin effect
- Pulsing center button
- "Loading Pokemon..." text

### CSS Classes
| Class | Purpose |
|-------|---------|
| `.loading-container` | Centering wrapper |
| `.pokeball-spinner` | Spinner wrapper |
| `.pokeball` | Main Pokeball element |
| `.pokeball-top` | Red top half |
| `.pokeball-bottom` | White bottom half |
| `.pokeball-middle` | Center line |
| `.pokeball-center` | Center button |
| `.loading-text` | Loading message |

### Animations
| Animation | Effect |
|-----------|--------|
| `spin` | 360° rotation (2s infinite) |
| `pulse` | Opacity/scale pulse (1s alternate) |

### Usage Example
```jsx
{loading && <LoadingSpinner />}
```

---

## Component Patterns

### File Structure Pattern
Each component follows this structure:
```
ComponentName.js   # React component
ComponentName.css  # Co-located styles
```

### Component Template
```jsx
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Styling Pattern
- Each component has its own CSS file
- Class names match component name (lowercase, hyphenated)
- Styles are scoped by class prefix
- No CSS modules or styled-components

---

## Adding New Components

1. Create `ComponentName.js`:
```jsx
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop }) => {
  return <div className="component-name">{/* ... */}</div>;
};

export default ComponentName;
```

2. Create `ComponentName.css`:
```css
.component-name {
  /* styles */
}
```

3. Import and use in parent:
```jsx
import ComponentName from './components/ComponentName';
```

---

## Related Documentation

- [../README.md](../README.md) - Source directory overview
- [../../ARCHITECTURE.md](../../ARCHITECTURE.md) - Full architecture
- [../../CLAUDE.md](../../CLAUDE.md) - AI agent guidance
