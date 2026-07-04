# Components Directory

This directory contains reusable React UI components for the Pokemon Explorer application.

**Parent Architecture**: See [ARCHITECTURE.md](../../ARCHITECTURE.md) for system overview.

## Directory Structure

```
components/
├── PokemonCard.js       # Pokemon display card component
├── PokemonCard.css      # Card styling with type colors
├── FilterBar.js         # Filter controls component
├── FilterBar.css        # Filter form styling
├── LoadingSpinner.js    # Loading animation component
├── LoadingSpinner.css   # Spinner animation keyframes
└── README.md            # This file
```

## Component Catalog

### PokemonCard

Displays an individual Pokemon in a styled card format.

**File**: `PokemonCard.js`

**Props**:
```javascript
{
  pokemon: {
    id: number,          // Pokemon ID (displayed as #001 format)
    name: string,        // Pokemon name
    type: string[],      // Array of type names
    legendary: boolean,  // Shows legendary badge if true
    image: string        // URL to sprite image
  }
}
```

**Features**:
- Hover animation (lift effect)
- Image fallback on error
- Dynamic type badge colors
- Legendary badge with gold styling
- Responsive sizing

**CSS Classes**:
- `.pokemon-card` - Base card container
- `.pokemon-card.legendary` - Gold border variant
- `.type-badge` - Base type badge
- `.type-{typename}` - Type-specific colors (fire, water, etc.)
- `.legendary-badge` - Gold legendary indicator

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

Search and filter controls for Pokemon list.

**File**: `FilterBar.js`

**Props**:
```javascript
{
  filters: {
    name: string,      // Current name filter value
    type: string,      // Current type filter value
    legendary: string  // '', 'true', or 'false'
  },
  types: string[],              // Available type options
  onFilterChange: function,     // Callback: (newFilters) => void
  onClearFilters: function      // Callback: () => void
}
```

**Features**:
- Text input for name search
- Dropdown for type selection
- Dropdown for legendary status
- Clear button (conditional display)
- Responsive grid layout

**CSS Classes**:
- `.filter-bar` - Main container (CSS Grid)
- `.filter-section` - Individual filter group
- `.filter-label` - Label text
- `.filter-input` - Text input styling
- `.filter-select` - Dropdown styling
- `.clear-filters-button` - Reset button

**Usage**:
```jsx
import FilterBar from './components/FilterBar';

<FilterBar
  filters={{ name: '', type: '', legendary: '' }}
  types={['Fire', 'Water', 'Electric']}
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onClearFilters={() => setFilters({ name: '', type: '', legendary: '' })}
/>
```

---

### LoadingSpinner

Animated Pokeball loading indicator.

**File**: `LoadingSpinner.js`

**Props**: None (pure presentational)

**Features**:
- CSS-only Pokeball animation
- Rotation spin animation
- Center button pulse effect
- Loading text display

**CSS Classes**:
- `.loading-container` - Centered flex container
- `.pokeball-spinner` - Animation wrapper
- `.pokeball` - Main Pokeball structure
- `.pokeball-top` - Red top half
- `.pokeball-bottom` - White bottom half
- `.pokeball-middle` - Center line
- `.pokeball-center` - Button outer ring
- `.pokeball-inner-center` - Button inner (pulsing)
- `.loading-text` - "Loading Pokemon..." text

**Animations**:
- `spin` - 360° rotation, 2s linear infinite
- `pulse` - Opacity/scale pulse, 1s alternate infinite

**Usage**:
```jsx
import LoadingSpinner from './components/LoadingSpinner';

{loading && <LoadingSpinner />}
```

---

## Type Color Reference

Pokemon types have distinct gradient colors defined in `PokemonCard.css`:

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

1. Create `ComponentName.js` in this directory
2. Create `ComponentName.css` in this directory
3. Import CSS at top of component file
4. Export component as default
5. Document in this README

### Component Template

```jsx
// ComponentName.js
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## Styling Conventions

- **File Naming**: Component name in PascalCase, CSS file matches
- **Class Naming**: kebab-case (e.g., `.pokemon-card`)
- **BEM-like**: Use modifiers (e.g., `.pokemon-card.legendary`)
- **Colors**: Use gradients from design system
- **Animations**: CSS keyframes, GPU-accelerated properties
- **Responsive**: Mobile-first, breakpoint at 768px

## Component Dependencies

```
App.js
  ├── LoadingSpinner (no deps)
  ├── FilterBar (no deps)
  └── PokemonCard (no deps)
```

All components are leaf nodes with no child component dependencies.

## Testing Components

Components can be tested with Jest/React Testing Library:

```bash
npm test
```

Test file naming: `ComponentName.test.js`

Example test structure:
```javascript
import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('renders pokemon name', () => {
  render(<PokemonCard pokemon={{ id: 1, name: 'Pikachu', type: ['Electric'], legendary: false, image: '' }} />);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
```
