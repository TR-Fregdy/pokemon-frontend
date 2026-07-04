# components Directory

## Purpose

This directory contains reusable React UI components for the Pokemon Explorer application. Each component consists of a JavaScript file and its paired CSS file for styling.

## Key Files

| File | Description |
|------|-------------|
| `PokemonCard.js` | Displays individual Pokemon with image, name, types, and badges |
| `PokemonCard.css` | Card styling, hover effects, and Pokemon type color gradients |
| `FilterBar.js` | Search input and dropdown filters for Pokemon filtering |
| `FilterBar.css` | Filter bar layout, input styling, and responsive design |
| `LoadingSpinner.js` | Animated Pokeball loading indicator |
| `LoadingSpinner.css` | Pokeball animation keyframes and styling |

## Component Details

### PokemonCard

**Props:**
- `pokemon` - Object containing `{ id, name, type[], legendary, image }`

**Features:**
- Displays Pokemon sprite image with fallback handling
- Shows type badges with color-coded gradients
- Displays legendary badge for legendary Pokemon
- Hover effects with card lift and image scale
- ID number displayed with zero-padding (e.g., #001)

### FilterBar

**Props:**
- `filters` - Object `{ name, type, legendary }` current filter values
- `types` - Array of available Pokemon types for dropdown
- `onFilterChange` - Callback function when filter changes
- `onClearFilters` - Callback function to reset all filters

**Features:**
- Text input for name search
- Dropdown for type selection
- Dropdown for legendary status
- Clear filters button (appears when filters active)

### LoadingSpinner

**Props:** None

**Features:**
- Animated Pokeball that spins
- Pulsing center button effect
- "Loading Pokemon..." text message

## Styling Conventions

- Each component has a dedicated CSS file
- BEM-like class naming (e.g., `.pokemon-card`, `.filter-bar`)
- Glassmorphism effects using `backdrop-filter`
- Responsive design with `@media (max-width: 768px)`

## Type Color Classes

Defined in `PokemonCard.css`:

```css
.type-fire      /* Orange-red gradient */
.type-water     /* Teal gradient */
.type-grass     /* Green gradient */
.type-electric  /* Yellow gradient */
.type-psychic   /* Purple-pink gradient */
.type-ice       /* Blue gradient */
.type-dragon    /* Purple gradient */
.type-flying    /* Pink-yellow gradient */
.type-poison    /* Purple gradient */
```

## Connection to Other Parts

- **App.js**: Parent component that imports and renders these components
- **Backend API**: FilterBar types come from `/api/types` endpoint
- **PokemonCard**: Receives data fetched from `/api/pokemons` endpoint

For overall project architecture, see [../../ARCHITECTURE.md](../../ARCHITECTURE.md).
