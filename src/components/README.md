# Components Directory

> Part of [Pokemon Frontend Architecture](../../ARCHITECTURE.md)

This directory contains reusable React components for the Pokemon Explorer application.

## Directory Structure

```
components/
├── PokemonCard.js       # Pokemon display card component
├── PokemonCard.css      # Card styling with type colors
├── FilterBar.js         # Search and filter controls
├── FilterBar.css        # Filter form styling
├── LoadingSpinner.js    # Pokeball loading animation
└── LoadingSpinner.css   # Spinner animation styles
```

## Component Specifications

### PokemonCard

**File**: `PokemonCard.js`

**Purpose**: Displays an individual Pokemon with its image, name, types, and legendary status.

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `pokemon` | object | Yes | Pokemon data object |

**Pokemon Object Shape**:
```javascript
{
  id: number,
  name: string,
  type: string[],
  legendary: boolean,
  image: string
}
```

**Features**:
- Displays Pokemon sprite image with fallback
- Shows name and ID number (formatted as #001)
- Renders type badges with color coding
- Displays "Legendary" badge for legendary Pokemon
- Hover effects with scale animation
- Golden border for legendary Pokemon

**CSS Classes**:

| Class | Purpose |
|-------|---------|
| `.pokemon-card` | Card container |
| `.pokemon-card.legendary` | Legendary card styling |
| `.pokemon-image-container` | Image wrapper |
| `.pokemon-image` | Sprite image |
| `.legendary-badge` | Golden legendary tag |
| `.pokemon-info` | Info section |
| `.pokemon-name` | Name display |
| `.pokemon-types` | Type badges container |
| `.type-badge` | Individual type badge |
| `.type-{type}` | Type-specific colors |
| `.pokemon-id` | ID number display |

**Type Color Classes**:
- `.type-fire` - Red/orange gradient
- `.type-water` - Blue/teal gradient
- `.type-grass` - Green gradient
- `.type-electric` - Yellow gradient
- `.type-psychic` - Pink/purple gradient
- `.type-ice` - Light blue gradient
- `.type-dragon` - Purple gradient
- `.type-flying` - Pink/yellow gradient
- `.type-poison` - Purple gradient

---

### FilterBar

**File**: `FilterBar.js`

**Purpose**: Provides search and filter controls for the Pokemon list.

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | object | Yes | Current filter values |
| `types` | string[] | Yes | Available type options |
| `onFilterChange` | function | Yes | Callback when filters change |
| `onClearFilters` | function | Yes | Callback to reset filters |

**Filters Object Shape**:
```javascript
{
  name: string,      // Text search value
  type: string,      // Selected type ('' for all)
  legendary: string  // '' | 'true' | 'false'
}
```

**Features**:
- Text input for name search
- Dropdown for type filtering
- Dropdown for legendary status
- Clear filters button (appears when filters active)
- Responsive grid layout

**CSS Classes**:

| Class | Purpose |
|-------|---------|
| `.filter-bar` | Container with grid layout |
| `.filter-section` | Individual filter group |
| `.filter-label` | Input labels |
| `.filter-input` | Text input styling |
| `.filter-select` | Dropdown styling |
| `.clear-filters-button` | Clear button |

**Controlled Component Pattern**:
```javascript
<input
  value={filters.name}
  onChange={(e) => handleInputChange('name', e.target.value)}
/>
```

---

### LoadingSpinner

**File**: `LoadingSpinner.js`

**Purpose**: Displays an animated Pokeball spinner during loading states.

**Props**: None

**Features**:
- Pure CSS Pokeball animation
- Spinning rotation animation
- Pulsing center button
- "Loading Pokemon..." text

**CSS Classes**:

| Class | Purpose |
|-------|---------|
| `.loading-container` | Centered flex container |
| `.pokeball-spinner` | Spinner wrapper |
| `.pokeball` | Main pokeball element |
| `.pokeball-top` | Red top half |
| `.pokeball-bottom` | White bottom half |
| `.pokeball-middle` | Center line |
| `.pokeball-center` | Center button |
| `.pokeball-inner-center` | Button highlight |
| `.loading-text` | Text below spinner |

**Animations**:
- `@keyframes spin` - 360° rotation (2s linear)
- `@keyframes pulse` - Size/opacity pulse (1s ease)

---

## Usage Examples

### PokemonCard

```jsx
import PokemonCard from './components/PokemonCard';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: ['Electric'],
  legendary: false,
  image: 'https://...'
};

<PokemonCard pokemon={pokemon} />
```

### FilterBar

```jsx
import FilterBar from './components/FilterBar';

const [filters, setFilters] = useState({
  name: '',
  type: '',
  legendary: ''
});

<FilterBar
  filters={filters}
  types={['Electric', 'Fire', 'Water']}
  onFilterChange={setFilters}
  onClearFilters={() => setFilters({ name: '', type: '', legendary: '' })}
/>
```

### LoadingSpinner

```jsx
import LoadingSpinner from './components/LoadingSpinner';

{loading && <LoadingSpinner />}
```

## Component Design Principles

| Principle | Implementation |
|-----------|----------------|
| Single Responsibility | Each component does one thing well |
| Prop-Driven | All data passed via props |
| Stateless | No internal state (managed by parent) |
| CSS Isolation | Separate CSS file per component |
| Accessibility | Labels for form inputs |

## Related Documentation

- [../README.md](../README.md) - Source directory overview
- [../../ARCHITECTURE.md](../../ARCHITECTURE.md) - Full architecture
- [../../CLAUDE.md](../../CLAUDE.md) - AI agent context
