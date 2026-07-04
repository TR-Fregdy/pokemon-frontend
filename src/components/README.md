# Pokemon Frontend - Components (src/components/)

## Directory Purpose

The `components/` directory contains reusable React components used throughout the Pokemon Explorer application. Each component is a self-contained unit with its own JavaScript file and styling, following React component composition patterns.

## Components Overview

### 1. FilterBar Component

**File**: `FilterBar.js` and `FilterBar.css`

**Purpose**: Provide user interface for filtering Pokemon by name, type, and legendary status

**Functionality**:
- Text input for Pokemon name search
- Dropdown select for Pokemon type filtering
- Radio buttons for legendary status filter (All, Legendary only, Non-legendary)
- Search button (for triggering manual search if needed)
- Clear filters button (resets all filters to default state)

**Props Accepted**:
```javascript
{
  filters: {
    name: string,           // Current search text
    type: string,           // Selected type filter
    legendary: string       // '' for all, 'true' for legendary, 'false' for non-legendary
  },
  types: string[],          // Available Pokemon types from backend
  onFilterChange: function, // Callback: (newFilters) => void
  onClearFilters: function  // Callback: () => void
}
```

**Callbacks Used**:
- `onFilterChange()` - Called when user changes any filter input
  - Passes entire new filters object to parent
  - Parent (App.js) updates state and triggers filtering
- `onClearFilters()` - Called when user clicks "Clear" button
  - Parent resets all filters to empty state

**Component Structure**:
```jsx
<div className="filter-bar">
  <div className="filter-group">
    <input // name search input
      type="text"
      placeholder="Search Pokemon..."
      value={filters.name}
      onChange={handleChange}
    />
  </div>
  
  <div className="filter-group">
    <select // type filter
      value={filters.type}
      onChange={handleChange}
    >
      <option value="">All Types</option>
      {types.map(type => <option key={type} value={type}>{type}</option>)}
    </select>
  </div>
  
  <div className="filter-group">
    <label>
      <input type="radio" name="legendary" value="" />
      All
    </label>
    <label>
      <input type="radio" name="legendary" value="true" />
      Legendary
    </label>
    <label>
      <input type="radio" name="legendary" value="false" />
      Non-Legendary
    </label>
  </div>
  
  <button onClick={clearFilters}>Clear Filters</button>
</div>
```

**Styling (FilterBar.css)**:
- Container layout with flexbox or grid
- Input, select, and radio button styling
- Responsive design (stack vertically on mobile)
- Button styling with hover effects
- Spacing and padding for usability
- Focus states for accessibility

**State**: None (all state in parent App.js)

**Key Methods**:
- `handleChange()` - Input change handler that calls onFilterChange
- `clearFilters()` - Button click handler that calls onClearFilters

---

### 2. PokemonCard Component

**File**: `PokemonCard.js` and `PokemonCard.css`

**Purpose**: Display individual Pokemon information in a visually appealing card format

**Functionality**:
- Display Pokemon sprite/image
- Show Pokemon name and ID number
- Render type badges with color coding
- Display legendary status badge if applicable
- Handle image loading errors gracefully

**Props Accepted**:
```javascript
{
  pokemon: {
    id: number,           // Pokemon ID (1-12)
    name: string,         // Pokemon name (e.g., "Pikachu")
    type: string[],       // Array of types (e.g., ["Electric"])
    legendary: boolean,   // Legendary status
    image: string         // URL to Pokemon sprite
  }
}
```

**Component Structure**:
```jsx
<div className="pokemon-card">
  <div className="pokemon-image">
    <img src={pokemon.image} alt={pokemon.name} />
  </div>
  
  <div className="pokemon-info">
    <h3>{pokemon.name}</h3>
    <p className="pokemon-id">#{pokemon.id}</p>
  </div>
  
  <div className="pokemon-types">
    {pokemon.type.map(t => (
      <span key={t} className={`type-badge type-${t.toLowerCase()}`}>
        {t}
      </span>
    ))}
  </div>
  
  {pokemon.legendary && (
    <div className="legendary-badge">
      ⭐ Legendary
    </div>
  )}
</div>
```

**Styling (PokemonCard.css)**:
- Card container with rounded corners and shadow
- Glassmorphism effect (semi-transparent, blur background)
- Image container with responsive sizing
- Type badges with Pokemon type-specific colors
  - Electric: Yellow
  - Fire: Red
  - Water: Blue
  - Grass: Green
  - Psychic: Purple
  - Ice: Cyan
  - Flying: Light Blue
  - Dragon: Dark Blue
  - Poison: Purple-ish
  - (etc. for each type)
- Legendary badge styling with star icon
- Hover effects and animations
- Responsive sizing for different screen sizes

**State**: None (all data passed via props)

**Unique Features**:
- Image error handling (graceful fallback if sprite fails to load)
- Type color mapping (each type has distinct color)
- Responsive card sizing (scales on mobile)
- Smooth animations on hover
- Clean information hierarchy

---

### 3. LoadingSpinner Component

**File**: `LoadingSpinner.js` and `LoadingSpinner.css`

**Purpose**: Display animated loading indicator while data is being fetched

**Functionality**:
- Render animated Pokeball spinning animation
- Center on screen
- Provide visual feedback that data is loading
- No user interaction (purely informational)

**Props Accepted**: None (stateless component)

**Component Structure**:
```jsx
<div className="loading-spinner-container">
  <div className="pokeball-spinner">
    <div className="pokeball-half red"></div>
    <div className="pokeball-line"></div>
    <div className="pokeball-half white"></div>
    <div className="pokeball-center"></div>
  </div>
  <p>Loading Pokemon...</p>
</div>
```

**Styling (LoadingSpinner.css)**:
- Container centered on screen (flexbox or absolute positioning)
- Pokeball shapes created with CSS (circles, divs)
- Pokeball colors:
  - Red (top half) - #FF0000 or similar
  - White (bottom half) - #FFFFFF or similar
  - Black line - #000000 (separating red/white)
  - Center dot - varies based on design
- Rotating animation (CSS keyframes, infinite loop)
- Smooth rotation (2-3 second duration)
- Text below spinner: "Loading Pokemon..."
- z-index sufficient to appear above content

**Key CSS Features**:
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pokeball-spinner {
  animation: spin 2s linear infinite;
}
```

**State**: None (purely presentational)

**Usage Context**: Shown in App.js when `loading === true`

---

## Component Hierarchy & Data Flow

```
App.js (State Manager)
├─ FilterBar
│  ├─ input[type="text"] (name search)
│  ├─ select (type filter)
│  ├─ input[type="radio"] × 3 (legendary filter)
│  └─ button × 2 (Search, Clear)
│
├─ LoadingSpinner (conditional, when loading)
│
├─ Error Message (conditional, when error)
│
└─ Main Content (conditional, when data loaded)
   └─ Pokemon Grid
      └─ PokemonCard[] (repeated for each filtered Pokemon)
         ├─ img (Pokemon sprite)
         ├─ h3 (Pokemon name)
         ├─ p (Pokemon ID)
         ├─ type badges (div.type-badge × n)
         └─ legendary badge (conditional)
```

## Props & Callbacks Flow

### FilterBar Props
```
App.js
  ├─ filters → FilterBar props.filters
  ├─ types → FilterBar props.types
  ├─ onFilterChange → FilterBar props.onFilterChange
  │   └─ FilterBar calls: props.onFilterChange(newFilters)
  │       └─ App.js: handleFilterChange(newFilters) → setFilters()
  └─ onClearFilters → FilterBar props.onClearFilters
      └─ FilterBar calls: props.onClearFilters()
          └─ App.js: clearFilters() → setFilters({name: '', type: '', legendary: ''})
```

### PokemonCard Props
```
App.js
  └─ filteredPokemons.map((pokemon) => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))
      └─ PokemonCard displays pokemon object properties
```

### LoadingSpinner Props
```
App.js
  └─ {loading && <LoadingSpinner />}
      └─ LoadingSpinner (no props needed, stateless)
```

## Styling Consistency

### Colors Used
- Primary text: Dark gray or black
- Background: Light/white or dark (glassmorphism background)
- Accents: Type-specific colors
- Borders: Light gray for card edges
- Shadows: Soft shadows for depth

### Spacing Conventions
- Card padding: 16px or similar
- Text margins: 8px, 12px, 16px
- Grid gap: 16px or 20px
- Input padding: 10px or 12px

### Typography
- Heading (h3): Larger, bold
- Subtitle: Medium weight
- Labels: Regular weight
- IDs: Smaller, muted

### Responsive Breakpoints
```css
@media (max-width: 1024px) {
  /* Tablet styles */
}

@media (max-width: 768px) {
  /* Small tablet/large mobile */
}

@media (max-width: 480px) {
  /* Mobile styles */
  /* Single column, full width */
  /* Stack elements vertically */
}
```

## File Organization

```
components/
├── PokemonCard.js          # Component code
├── PokemonCard.css         # Component styles
├── FilterBar.js            # Component code
├── FilterBar.css           # Component styles
├── LoadingSpinner.js       # Component code
├── LoadingSpinner.css      # Component styles
└── README.md               # This file (documentation)
```

## Import Pattern

Each component uses standard React import:

```javascript
import React from 'react';
import './ComponentName.css';

function ComponentName(props) {
  // Component logic
  return (
    // Component JSX
  );
}

export default ComponentName;
```

## Adding New Components

When adding new components to this directory:

1. Create `NewComponent.js` with component code
2. Create `NewComponent.css` with styles
3. Import component in parent (usually App.js)
4. Add component to JSX with appropriate props
5. Document component in this README.md
6. Follow existing naming conventions (PascalCase for components)
7. Export component as default export

## Testing Considerations

When testing components (future):

### FilterBar
- Test filter input changes trigger callbacks
- Test clear filters button resets all
- Test dropdown populates with types
- Test radio button selection

### PokemonCard
- Test Pokemon data displays correctly
- Test image loading (success and failure)
- Test type badges render for each type
- Test legendary badge conditional display

### LoadingSpinner
- Test visibility when loading
- Test hidden when not loading
- Test animation plays continuously

## Performance Optimization

### Current State
- Components are simple and fast
- No expensive computations
- Props are primitives or arrays (no complex objects)

### Future Optimizations (if needed)
- Use React.memo() for PokemonCard if parent frequently re-renders
- Use useCallback() for FilterBar callbacks
- Use useMemo() for expensive computations

## Integration Points

- **Parent**: App.js provides state and callbacks
- **Styling**: Global CSS (index.css) provides base styles
- **Data**: Props from App.js state (pokemons, types, filters)
- **API**: Indirectly (data fetched in App.js, passed to children)

## Related Documentation

- `../src/README.md` - Source code directory overview
- `../ARCHITECTURE.md` - System-level architecture
- `../CLAUDE.md` - AI agent guidance
- `../README.md` - User-facing documentation
