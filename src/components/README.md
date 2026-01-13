# components Directory

## Purpose

This directory contains reusable React components that make up the Pokemon Explorer user interface. Each component has an associated CSS file for styling.

## Key Files

| File | Description |
|------|-------------|
| `PokemonCard.js` | Displays individual Pokemon information in a card format |
| `PokemonCard.css` | Styles for Pokemon cards including type badges and animations |
| `FilterBar.js` | Search and filter controls for Pokemon list |
| `FilterBar.css` | Styles for filter input fields and buttons |
| `LoadingSpinner.js` | Animated Pokeball loading indicator |
| `LoadingSpinner.css` | CSS animations for the loading spinner |

## Component Responsibilities

### PokemonCard

**Purpose**: Render a single Pokemon as an interactive card

**Props**:
- `pokemon` (Object): Contains `id`, `name`, `type[]`, `legendary`, `image`

**Features**:
- Displays Pokemon sprite image with hover animation
- Shows Pokemon name and formatted ID number (#001)
- Renders type badges with gradient colors
- Applies special styling for legendary Pokemon
- Handles image load errors gracefully

### FilterBar

**Purpose**: Provide user controls for filtering the Pokemon list

**Props**:
- `filters` (Object): Current filter values `{ name, type, legendary }`
- `types` (Array): Available Pokemon types for dropdown
- `onFilterChange` (Function): Callback when filters change
- `onClearFilters` (Function): Callback to reset all filters

**Features**:
- Text input for name search (partial match)
- Dropdown for type selection
- Dropdown for legendary status (all/legendary/non-legendary)
- Clear filters button (visible when filters active)

### LoadingSpinner

**Purpose**: Display animated loading indicator during data fetch

**Props**: None

**Features**:
- CSS-animated Pokeball spinner
- "Loading Pokemon..." text
- Centered positioning

## Styling Approach

Each component has a dedicated CSS file with:

- **PokemonCard.css**: Card layout, hover effects, type color gradients (`.type-fire`, `.type-water`, etc.), legendary badge styling
- **FilterBar.css**: Grid layout for filter sections, input/select styling, focus states, responsive breakpoints
- **LoadingSpinner.css**: Pokeball SVG-like recreation with CSS, rotation and pulse animations

## Type Color Mapping

Pokemon type badges use gradient backgrounds:

| Type | Colors |
|------|--------|
| Fire | #ff6b6b → #ff8e53 |
| Water | #4ecdc4 → #44a08d |
| Grass | #95e1d3 → #68d391 |
| Electric | #fce38a → #f9ca24 |
| Psychic | #e056fd → #c44569 |
| Ice | #74b9ff → #0984e3 |
| Dragon | #a29bfe → #6c5ce7 |
| Flying | #fd79a8 → #fdcb6e |
| Poison | #6c5ce7 → #a29bfe |

## Connection to Other Parts

- **Parent Component**: All components are imported and used by `../App.js`
- **Data Flow**: Props passed down from App; callbacks bubble events up
- **Styling**: CSS files imported within their respective JS components

## Related Documentation

- See [ARCHITECTURE.md](../../ARCHITECTURE.md) for high-level system design
