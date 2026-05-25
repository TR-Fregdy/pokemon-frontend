# Pokemon Frontend - src/components/ Directory

This directory contains all reusable React components used in the Pokemon Frontend application.

## Directory Purpose

The `components/` directory houses presentational/UI components that are imported and used by the main App component. These components are designed to be reusable, focused on UI rendering, and receive their data and callbacks via props from the parent App component.

## Component Architecture Pattern

All components follow this pattern:
1. **Functional Components**: Use React function syntax, not class components
2. **Props-Only Input**: All data comes through component props, no direct state
3. **Callback Output**: User interactions trigger callback functions passed as props
4. **CSS Separation**: Each component has an associated `.css` file
5. **Stateless**: Components don't manage their own state (except LoadingSpinner)

## Components Overview

```
components/
├── PokemonCard/
│   ├── PokemonCard.js          # Component code
│   └── PokemonCard.css         # Component styles
├── FilterBar/
│   ├── FilterBar.js            # Component code
│   └── FilterBar.css           # Component styles
└── LoadingSpinner/
    ├── LoadingSpinner.js       # Component code
    └── LoadingSpinner.css      # Component styles
```

## Component Details

### **PokemonCard.js** - Pokemon Display Card

#### Purpose
Render a single Pokemon in an attractive card format showing image, name, types, and legendary status.

#### Props
```typescript
interface PokemonCardProps {
  pokemon: {
    id: number
    name: string
    type: string[]
    legendary: boolean
    image: string
  }
}
```

#### Responsibilities
- Display Pokemon sprite image from URL
- Show fallback image if image fails to load
- Render Pokemon name and ID (zero-padded to 3 digits)
- Display type badges with type-specific colors
- Show legendary badge if `pokemon.legendary === true`
- Apply conditional CSS class for legendary styling

#### Features
- **Image Fallback**: `onError` handler shows placeholder on image load failure
- **Type Badges**: Maps through `pokemon.type` array to show each type
- **Legendary Badge**: Shows "✨ Legendary" text badge for legendary Pokemon
- **Responsive**: Grid-based layout works on all screen sizes
- **Styling**: Glassmorphism design with semi-transparent background

#### Key Code Sections
```javascript
// Image with fallback
<img 
  src={pokemon.image} 
  alt={pokemon.name}
  onError={(e) => { e.target.src = '/placeholder-pokemon.png'; }}
/>

// Type badges with type-specific classes
{pokemon.type.map((type, index) => (
  <span className={`type-badge type-${type.toLowerCase()}`}>
    {type}
  </span>
))}

// Legendary badge
{pokemon.legendary && <div className="legendary-badge">✨ Legendary</div>}
```

#### CSS Classes
- `.pokemon-card` - Card container
- `.pokemon-card.legendary` - Card styling when legendary
- `.pokemon-image-container` - Image wrapper
- `.pokemon-image` - Image element
- `.legendary-badge` - "✨ Legendary" text styling
- `.pokemon-info` - Info section container
- `.pokemon-name` - Pokemon name heading
- `.pokemon-types` - Types container
- `.type-badge` - Individual type badge
- `.type-{type}` - Color-specific classes (type-fire, type-water, type-grass, type-electric, etc.)

#### Styling Notes
- Uses flexbox for layout within card
- Type badges have color-coded backgrounds (type-fire = red, type-water = blue, etc.)
- Hover effect scales card slightly for interactivity
- Legendary Pokemon have special border/glow effect
- Responsive padding and font sizes

#### Performance
- Pure presentational component (no state, no effects)
- Memoizable with React.memo if needed
- Image error handling prevents broken layouts

---

### **FilterBar.js** - Filter Controls

#### Purpose
Provide user interface controls for filtering Pokemon by name, type, and legendary status.

#### Props
```typescript
interface FilterBarProps {
  filters: {
    name: string
    type: string
    legendary: string  // '', 'true', or 'false'
  }
  types: string[]
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
}
```

#### Responsibilities
- Render name search input field
- Render type dropdown with "All Types" option
- Render legendary status dropdown with "All/Legendary/Non-Legendary" options
- Call `onFilterChange` when any filter control changes
- Show conditional "Clear Filters" button when filters are active
- Manage internal input state and propagate changes to parent

#### Features
- **Name Search**: Text input with placeholder for Pokemon name search
- **Type Dropdown**: Select with all available Pokemon types plus "All Types" option
- **Legendary Filter**: Select with three options (All, Legendary Only, Non-Legendary Only)
- **Conditional Clear Button**: Only shows when at least one filter is active
- **Accessibility**: All controls have associated labels with proper htmlFor attributes
- **Styling**: Flexbox layout responsive to screen size

#### Key Code Sections
```javascript
// Handle input change
const handleInputChange = (field, value) => {
  onFilterChange({
    ...filters,
    [field]: value
  });
};

// Check if filters are active
const hasActiveFilters = filters.name || filters.type || filters.legendary;

// Conditional clear button
{hasActiveFilters && (
  <button onClick={onClearFilters}>Clear Filters</button>
)}
```

#### Form Structure
- **Section 1**: Name search input
  - Label: "Search by Name:"
  - Input: Text input with placeholder
  - Input ID: "name-filter"

- **Section 2**: Type filter dropdown
  - Label: "Filter by Type:"
  - Select: Dropdown with "All Types" + each type
  - Select ID: "type-filter"

- **Section 3**: Legendary filter dropdown
  - Label: "Legendary Status:"
  - Select: Three options (All Pokemon, Legendary Only, Non-Legendary Only)
  - Select ID: "legendary-filter"

- **Section 4**: Clear button (conditional)
  - Shows when `hasActiveFilters === true`
  - Calls `onClearFilters` callback

#### CSS Classes
- `.filter-bar` - Main container (flexbox)
- `.filter-section` - Individual filter control section
- `.filter-label` - Label element
- `.filter-input` - Text input styling
- `.filter-select` - Dropdown select styling
- `.clear-filters-button` - Clear button styling

#### Interaction Flow
1. User types in input → `onChange` fires
2. `handleInputChange('name', value)` called
3. `onFilterChange({...filters, name: value})` called
4. Parent (App.js) receives callback and updates state
5. Parent re-renders with new filters
6. FilterBar receives updated props and re-renders

#### Styling Notes
- Flexbox layout wraps on smaller screens
- Responsive sizing for labels and inputs
- Type-specific colors inherited from theme
- Consistent spacing between filter sections
- Clear button has disabled appearance when no filters active

---

### **LoadingSpinner.js** - Loading Indicator

#### Purpose
Display an animated loading indicator (Pokeball) while data is being fetched from the backend.

#### Props
None - this is a pure presentational component with no props.

#### Responsibilities
- Render animated Pokeball spinner
- Display "Loading..." text below spinner
- No interaction needed
- Purely visual feedback

#### Features
- **Pokeball Animation**: Continuous rotation animation
- **Loading Text**: Text below spinner indicates loading state
- **Centered**: Positioned in center of viewport
- **CSS Animation**: No JavaScript animation logic

#### Structure
```javascript
return (
  <div className="spinner-container">
    <div className="pokeball"></div>
    <p>Loading...</p>
  </div>
);
```

#### CSS Classes
- `.spinner-container` - Center container with flexbox
- `.pokeball` - The animated element
- Animation: `@keyframes rotation` - 360° rotation

#### CSS Animation Details
```css
@keyframes rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pokeball {
  animation: rotation 1s linear infinite;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
```

#### Styling Notes
- Red and white Pokeball colors
- Smooth continuous rotation
- Visible on all backgrounds (semi-transparent white background)
- Responsive sizing with viewport

#### Usage in App.js
```javascript
{loading && (
  <div className="app">
    <header className="app-header">
      <h1>Pokemon Explorer</h1>
    </header>
    <LoadingSpinner />
  </div>
)}
```

---

## Component Usage in App.js

### Rendering Pattern
```javascript
// Single use for LoadingSpinner
{loading && <LoadingSpinner />}

// Single use for FilterBar
<FilterBar
  filters={filters}
  types={types}
  onFilterChange={handleFilterChange}
  onClearFilters={clearFilters}
/>

// Repeated use for PokemonCard
{filteredPokemons.map(pokemon => (
  <PokemonCard key={pokemon.id} pokemon={pokemon} />
))}
```

### Props Flow
```
App.js (state/logic)
  ├── → FilterBar.js (receives: filters, types, callbacks)
  │   └── ← onChange events (state updates in App.js)
  │
  └── → PokemonCard.js (repeated, receives: pokemon)
      └── (no callbacks, purely presentational)
```

## Styling Architecture

### Responsive Design
Each component CSS file includes media queries for:
- **Desktop**: 1200px+ (full size)
- **Tablet**: 768px - 1199px (adjusted sizes)
- **Mobile**: <768px (stacked layout, smaller sizes)

### Color Scheme
- **Primary Background**: Glassmorphic (semi-transparent white)
- **Type Colors**: 
  - Fire: Red/Orange
  - Water: Blue
  - Grass: Green
  - Electric: Yellow
  - Psychic: Purple
  - (and more for all types)
- **Text**: Dark on light, light on dark as appropriate
- **Accents**: Gold/yellow for legendary

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

## How Components Connect to System

### App.js Integration
- Components imported in App.js
- Receive filtered data and callbacks as props
- No external dependencies between components
- Unidirectional data flow (top-down)

### Backend Connection
- No direct backend calls in components
- All API calls in App.js useEffect hooks
- Components receive pre-processed data

### Styling
- Each component is self-contained with CSS
- Global styles in index.css and App.css
- Component CSS overrides global styles

## Development Guidelines

### Adding New Components
1. Create new folder: `ComponentName/`
2. Create `ComponentName.js` with functional component
3. Create `ComponentName.css` with styles
4. Export component in index.js? (Optional, use direct imports)
5. Import and use in App.js
6. Pass data as props, callbacks for user interaction
7. Keep components presentational (no heavy logic)

### Component Best Practices
- **One Responsibility**: Component should do one thing well
- **Props Only**: No internal fetching or side effects
- **Callback Functions**: Use props for communication with parent
- **Accessibility**: Use proper labels, IDs, semantic HTML
- **Performance**: Components are pure and memoizable
- **Testing**: Easy to test with mock props

### Naming Conventions
- Component file: `ComponentName.js` (PascalCase)
- CSS file: `ComponentName.css`
- CSS classes: `.component-name` (kebab-case)
- Props: camelCase

## Related Documentation

- **CLAUDE.md**: AI agent guidance for frontend
- **ARCHITECTURE.md**: System-level overview
- **../README.md**: src/ directory documentation
- **../App.js**: Main component using these components

## Performance Considerations

### Current Approach
- Components re-render when App.js state changes
- 12 Pokemon × 1 PokemonCard = minimal render count
- No optimization needed for current data size

### Potential Optimizations
- React.memo() for PokemonCard if filtering becomes expensive
- useMemo() for filter calculations
- useCallback() for event handlers
- Consider if Pokemon count grows significantly

## Testing Components

Each component can be tested independently:

### PokemonCard Tests
- Render with valid Pokemon data
- Show fallback image on error
- Display legendary badge correctly
- Show all type badges

### FilterBar Tests
- Input changes trigger callbacks
- Clear button visibility
- Type dropdown population
- All options selectable

### LoadingSpinner Tests
- Renders without crashing
- Animation plays
- Centered on screen

### Integration Tests
- Filters update filtered results
- Loading spinner shows during fetch
- Error states display correctly
