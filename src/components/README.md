# Components Directory

This directory contains all reusable React components for the Pokemon Frontend application.

> For detailed architecture information, see [ARCHITECTURE.md](../../ARCHITECTURE.md)

## Directory Structure

```
components/
├── FilterBar.js         # Search and filter controls
├── FilterBar.css        # FilterBar styles
├── PokemonCard.js       # Individual Pokemon display card
├── PokemonCard.css      # PokemonCard styles
├── LoadingSpinner.js    # Animated Pokeball loading indicator
├── LoadingSpinner.css   # LoadingSpinner styles
└── README.md            # This file
```

## Components Overview

### FilterBar

**Purpose**: Provides search and filtering controls for the Pokemon list.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `filters` | `Object` | Current filter state `{name, type, legendary}` |
| `types` | `Array<string>` | Available Pokemon types for dropdown |
| `onFilterChange` | `Function` | Callback when filters change |
| `onClearFilters` | `Function` | Callback to reset all filters |

**Features**:
- Name search input (text)
- Type filter dropdown (select)
- Legendary status dropdown (select)
- Clear filters button (conditional)

---

### PokemonCard

**Purpose**: Displays an individual Pokemon's information in a card format.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | `Object` | Pokemon data object |

**Pokemon Object Structure**:
```javascript
{
  id: Number,
  name: String,
  type: Array<String>,
  legendary: Boolean,
  image: String (URL)
}
```

**Features**:
- Pokemon image with error fallback
- Legendary badge (conditional)
- Type badges with color coding
- ID number display
- Hover animations

---

### LoadingSpinner

**Purpose**: Displays an animated Pokeball loading indicator during data fetching.

**Props**: None

**Features**:
- Animated spinning Pokeball
- Pulsing center button
- "Loading Pokemon..." text

## Styling Conventions

Each component has a dedicated CSS file with the following patterns:

- **Class naming**: Component-based (e.g., `.filter-bar`, `.pokemon-card`)
- **Animations**: Defined with `@keyframes`
- **Responsive**: Media queries for mobile support
- **Type colors**: Gradient backgrounds per Pokemon type

### Type Color Classes (PokemonCard.css)

```css
.type-fire     /* Red/Orange */
.type-water    /* Teal */
.type-grass    /* Green */
.type-electric /* Yellow */
.type-psychic  /* Purple/Pink */
.type-ice      /* Blue */
.type-dragon   /* Purple */
.type-flying   /* Pink/Yellow */
.type-poison   /* Purple */
```

## Usage Examples

### FilterBar

```jsx
import FilterBar from './components/FilterBar';

<FilterBar
  filters={{ name: '', type: '', legendary: '' }}
  types={['Fire', 'Water', 'Grass']}
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onClearFilters={() => setFilters({ name: '', type: '', legendary: '' })}
/>
```

### PokemonCard

```jsx
import PokemonCard from './components/PokemonCard';

<PokemonCard
  pokemon={{
    id: 25,
    name: 'Pikachu',
    type: ['Electric'],
    legendary: false,
    image: 'https://example.com/pikachu.png'
  }}
/>
```

### LoadingSpinner

```jsx
import LoadingSpinner from './components/LoadingSpinner';

{loading && <LoadingSpinner />}
```

## Adding New Components

1. Create `ComponentName.js` with functional component
2. Create `ComponentName.css` for styles
3. Export as default from the JS file
4. Import and use in parent component (typically `App.js`)

### Component Template

```jsx
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
