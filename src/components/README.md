# components Directory

This directory contains reusable React UI components for the Pokemon Frontend application.

## Contents

| Component | Files | Purpose |
|-----------|-------|---------|
| FilterBar | `FilterBar.js`, `FilterBar.css` | Search and filter controls |
| PokemonCard | `PokemonCard.js`, `PokemonCard.css` | Individual Pokemon display card |
| LoadingSpinner | `LoadingSpinner.js`, `LoadingSpinner.css` | Animated loading indicator |

## Component Details

### FilterBar

Search and filter controls for Pokemon filtering.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `filters` | Object | Current filter state `{ name, type, legendary }` |
| `types` | Array | Available Pokemon types for dropdown |
| `onFilterChange` | Function | Callback when filters change |
| `onClearFilters` | Function | Callback to reset all filters |

**Features:**
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status
- Clear filters button (shown when filters active)

### PokemonCard

Displays individual Pokemon information in a card format.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `pokemon` | Object | Pokemon data `{ id, name, type, legendary, image }` |

**Features:**
- Pokemon sprite image with error fallback
- Legendary badge for special Pokemon
- Type badges with color coding
- Hover animation effects

**Type Colors Defined:**
- Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Flying, Poison

### LoadingSpinner

Animated Pokeball spinner shown during data loading.

**Props:** None (pure presentational component)

**Features:**
- CSS-animated Pokeball design
- Spin and pulse animations
- "Loading Pokemon..." text

## Styling Conventions

- Each component has a co-located CSS file
- BEM-like class naming (e.g., `.pokemon-card`, `.pokemon-card.legendary`)
- Glassmorphism effects with `backdrop-filter`
- Responsive design with media queries

## Related Documentation

- See [../README.md](../README.md) for src directory overview
- See [ARCHITECTURE.md](../../ARCHITECTURE.md) for system architecture
