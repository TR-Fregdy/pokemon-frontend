# `src/components/` – Reusable UI Components

Leaf React components used by `App.js`. Each component is a functional
component with co-located CSS. None of the components talk to the network –
they receive data through props and emit events via callbacks.

## Purpose

Encapsulate the three visual concerns of the Pokemon Explorer UI:

1. **Filter controls** – how the user expresses their query.
2. **Result cards** – how individual Pokemon are displayed.
3. **Loading state** – what the user sees while data is in flight.

## Key Files

| File                   | Component         | Responsibility                                                                                          |
|------------------------|-------------------|---------------------------------------------------------------------------------------------------------|
| `FilterBar.js`         | `<FilterBar>`     | Text input for name, `<select>` for type and legendary status, plus a "Clear Filters" button that appears when any filter is active. Calls `onFilterChange(newFilters)` and `onClearFilters()` from props. |
| `FilterBar.css`        | —                 | Styling for the filter bar: flex layout, input/select theming, clear-filters button hover state.        |
| `PokemonCard.js`       | `<PokemonCard>`   | Card for a single Pokemon: image with graceful `onError` fallback, legendary badge, name, list of type badges (CSS class `type-<name>`), and zero-padded id (e.g. `#025`). |
| `PokemonCard.css`      | —                 | Per-type badge colors, legendary highlight, hover animation, responsive card sizing.                    |
| `LoadingSpinner.js`    | `<LoadingSpinner>`| Animated Pokeball displayed by `App` while data is being fetched.                                       |
| `LoadingSpinner.css`   | —                 | Keyframe animation and Pokeball geometry.                                                               |

## Component APIs

### `<FilterBar>`

```text
Props:
  filters: { name: string, type: string, legendary: '' | 'true' | 'false' }
  types: string[]                       // populated from /api/types
  onFilterChange(newFilters): void
  onClearFilters(): void
```

### `<PokemonCard>`

```text
Props:
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string (URL)
  }
```

### `<LoadingSpinner>`

No props. Purely presentational.

## How It Connects

- Imported exclusively by `../App.js`.
- Styles are self-contained; no component imports a sibling's CSS.
- None of these components perform I/O – they are fully driven by props.

## Editing Notes

- Add new components as `ComponentName.js` + `ComponentName.css` pairs in this
  directory. Export as `default`.
- Keep network calls out of `components/` – place them in `App.js` or a future
  `hooks/` module.
- When adding a new type color, extend `PokemonCard.css` with a
  `.type-<lowercase>` class.

## Related Docs

- Parent directory → [`../README.md`](../README.md)
- Project overview → [`../../README.md`](../../README.md)
- System architecture → [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md)
