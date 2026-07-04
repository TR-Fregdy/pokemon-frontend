# components Directory

This directory contains all reusable React components for the Pokemon Frontend application.

## Directory Purpose

The `components` directory holds modular, reusable UI components. Each component has its own JavaScript file and an accompanying CSS file for styling.

## Components Overview

| Component | Purpose |
|-----------|---------|
| `FilterBar` | Search and filter controls for Pokemon |
| `PokemonCard` | Individual Pokemon display card |
| `LoadingSpinner` | Animated Pokeball loading indicator |

## Component Details

### FilterBar

**Files**: `FilterBar.js`, `FilterBar.css`

**Purpose**: Provides interactive controls for filtering Pokemon by name, type, and legendary status.

**Props**:
```javascript
{
  filters: { name: string, type: string, legendary: string },
  types: string[],
  onFilterChange: (newFilters) => void,
  onClearFilters: () => void
}
```

**Features**:
- Text input for name search
- Dropdown for type selection
- Dropdown for legendary status filter
- Clear filters button (shown when filters are active)

---

### PokemonCard

**Files**: `PokemonCard.js`, `PokemonCard.css`

**Purpose**: Displays an individual Pokemon with image, name, types, and legendary status.

**Props**:
```javascript
{
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string
  }
}
```

**Features**:
- Pokemon sprite image with fallback
- Name and formatted ID number
- Type badges with color coding per type
- Legendary badge for legendary Pokemon
- Hover animations

**CSS Classes**:
- `.pokemon-card` - Base card styling
- `.pokemon-card.legendary` - Golden border for legendary Pokemon
- `.type-{typename}` - Color variants for each Pokemon type

---

### LoadingSpinner

**Files**: `LoadingSpinner.js`, `LoadingSpinner.css`

**Purpose**: Animated loading indicator displayed while fetching data.

**Props**: None

**Features**:
- Pokeball-shaped spinner
- CSS rotation animation
- Pulsing center animation
- "Loading Pokemon..." text

## File Structure

```
components/
├── FilterBar.js         # Filter controls component
├── FilterBar.css        # Filter controls styles
├── PokemonCard.js       # Pokemon card component
├── PokemonCard.css      # Card styles with type colors
├── LoadingSpinner.js    # Loading animation component
├── LoadingSpinner.css   # Spinner animation styles
└── README.md            # This file
```

## Usage in App

All components are imported and used in the main `App.js`:

```javascript
import PokemonCard from './components/PokemonCard';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
```

## Styling Conventions

- Each component has a companion CSS file
- CSS class names follow BEM-like naming: `component-name`, `component-name-element`
- Type-based styling uses `.type-{typename}` pattern
- Responsive breakpoints at 768px

## Architecture Reference

For high-level architecture information, see [../../ARCHITECTURE.md](../../ARCHITECTURE.md).
