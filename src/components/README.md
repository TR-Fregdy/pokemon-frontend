# `src/components/` — Presentational Components

## Purpose

This directory contains the reusable React components rendered by `App.js`. They are intentionally **presentational** — each component takes props and returns JSX without owning long-lived state or performing side effects. All state and data-fetching live in `../App.js`.

## Components

### `PokemonCard.js` / `PokemonCard.css`

Renders a single Pokemon as a card.

- **Props:** `{ pokemon: { id, name, type[], legendary, image } }`.
- **Renders:** image (with `onError` fallback to `/placeholder-pokemon.png`), name, `#003`-style zero-padded ID, one badge per element of `pokemon.type` (colored via `.type-<lowercase-type>` CSS classes), and a "✨ Legendary" badge when `pokemon.legendary` is `true`.

### `FilterBar.js` / `FilterBar.css`

Controlled-input bar for searching and filtering.

- **Props:** `{ filters, types, onFilterChange, onClearFilters }`.
- **Renders:** a name text input, a type `<select>` populated from the `types` prop, a legendary status `<select>` (All / Legendary only / Non-Legendary only), and a "Clear Filters" button shown only when at least one filter is active.
- **Behavior:** every change calls `onFilterChange({ ...filters, [field]: value })`. The component never mutates props.

### `LoadingSpinner.js` / `LoadingSpinner.css`

Animated Pokeball used while the initial fetch is in flight.

- **Props:** none.
- **Renders:** a stack of styled `<div>` layers that compose a spinning Pokeball, plus a "Loading Pokemon..." label.

## How This Directory Connects to the Rest of the System

- `App.js` imports and composes all three components.
- `FilterBar` receives the `types` array that `App.js` fetched from `pokemon-backend`'s `/api/types` endpoint.
- `PokemonCard` consumes the Pokemon object shape returned by `pokemon-backend`'s `/api/pokemons` endpoint.

## Conventions

- One component per file, default-exported.
- One co-located `.css` file per component, imported at the top of the JS file.
- Class names are kebab-case and unscoped.
- No internal state unless explicitly required; controlled inputs receive `value` + `onChange` from the parent.

## See Also

- Parent directory: [`../README.md`](../README.md)
- Architectural overview: [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md)
