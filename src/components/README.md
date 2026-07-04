# src/components/

Reusable, **presentational** (stateless) React components consumed by
`App.js`. None of these components own application state; they receive
data and callbacks via props and render UI.

## Purpose

Separate UI building blocks from the stateful container. `App.js`
holds the data and the filter state; each component here is a
focused rendering primitive.

## Key Files

| Component          | File(s)                                 | Responsibility                                                                            |
| ------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `FilterBar`        | `FilterBar.js`, `FilterBar.css`         | Renders the three filter controls (name input, type `<select>`, legendary `<select>`) plus a conditional "Clear Filters" button. Emits the updated filter object via `onFilterChange`. |
| `PokemonCard`      | `PokemonCard.js`, `PokemonCard.css`     | Renders a single Pokemon tile: image (with broken-image fallback), name, zero-padded id, per-type color-coded badges, and a "✨ Legendary" ribbon when `pokemon.legendary` is true. |
| `LoadingSpinner`   | `LoadingSpinner.js`, `LoadingSpinner.css` | Decorative Pokeball-shaped CSS animation shown while the initial data fetch is in flight. |

## Component Contracts

### `FilterBar`
```jsx
<FilterBar
  filters={{ name, type, legendary }}
  types={string[]}
  onFilterChange={(newFilters) => void}
  onClearFilters={() => void}
/>
```
- Stateless. Every keystroke / selection calls
  `onFilterChange({ ...filters, [field]: value })`.
- The `legendary` prop is a **string** (`''`, `'true'`, `'false'`) to
  match `<select>` values.
- The "Clear Filters" button is only rendered when at least one
  filter is non-empty.

### `PokemonCard`
```jsx
<PokemonCard pokemon={{ id, name, type, legendary, image }} />
```
- Stateless. Fully driven by the `pokemon` prop.
- Type-specific styling is applied via the class `type-{lowercase}`
  (e.g. `type-fire`). When a new elemental type is introduced on the
  backend, add a matching CSS rule in `PokemonCard.css`.

### `LoadingSpinner`
```jsx
<LoadingSpinner />
```
- No props. Pure presentation.

## How They Connect

```
App.js
  ├─▶ <FilterBar filters types onFilterChange onClearFilters />
  ├─▶ <LoadingSpinner/>                 (while loading)
  └─▶ <PokemonCard pokemon={...} />     (×N, keyed by id)
```

State direction is strictly **top-down**: `App.js` owns and mutates
state; these components only render props and bubble events upward.

## Conventions

- Functional components with hooks only (in practice, no hooks are
  needed here because the components are stateless).
- Default export per file.
- One component per file; co-located `.css` file imported at the top.
- Class names kebab-case; the Pokemon-type badges follow the
  `type-{lowercase}` pattern.

## Related

- Parent source index: [../README.md](../README.md)
- Project overview: [../../README.md](../../README.md)
- AI-agent guidance: [../../CLAUDE.md](../../CLAUDE.md)
- Architecture: [../../ARCHITECTURE.md](../../ARCHITECTURE.md)
