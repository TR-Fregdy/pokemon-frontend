# components - Reusable React Components

## Purpose

The `components/` directory contains reusable React components that build the user interface of the Pokemon Frontend application.

## Component Overview

```
components/
├── PokemonCard.js          # Individual Pokemon display component
├── PokemonCard.css         # Card styling
├── FilterBar.js            # Filter controls component
├── FilterBar.css           # Filter UI styling
├── LoadingSpinner.js       # Loading state indicator
└── LoadingSpinner.css      # Spinner animation styles
```

## Components

### PokemonCard

**Purpose**: Displays a single Pokemon's information in a card format.

**Location**: `PokemonCard.js`, `PokemonCard.css`

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
- Pokemon image with error fallback
- Pokemon name and ID (zero-padded to 3 digits)
- Type badges with color coding
- Legendary badge indicator
- Responsive card layout
- Hover effects

**Styling**:
- Card container with box shadow
- Image container with aspect ratio
- Type badges with different colors per type:
  - `.type-fire`: Red
  - `.type-water`: Blue
  - `.type-grass`: Green
  - `.type-electric`: Yellow
  - `.type-psychic`: Purple
  - `.type-ice`: Light blue
  - `.type-flying`: Light blue
  - `.type-dragon`: Purple
  - `.type-poison`: Green
- Legendary badge overlay with star emoji
- Grid layout for responsive card arrangements

**Error Handling**:
- Image `onError` handler: Falls back to `/placeholder-pokemon.png`
- Gracefully handles missing images

**Example Usage**:
```jsx
<PokemonCard pokemon={{ id: 1, name: 'Pikachu', type: ['Electric'], legendary: false, image: '...' }} />
```

---

### FilterBar

**Purpose**: Provides user controls for filtering Pokemon (search, type, legendary status).

**Location**: `FilterBar.js`, `FilterBar.css`

**Props**:
```javascript
{
  filters: {
    name: string,
    type: string,
    legendary: string  // '', 'true', or 'false'
  },
  types: string[],                      // Available types from API
  onFilterChange: (newFilters) => void, // Callback for filter updates
  onClearFilters: () => void            // Callback to reset filters
}
```

**Features**:
- **Name Search**: Text input for partial matching Pokemon names
- **Type Selector**: Dropdown with all available types (+ "All Types" option)
- **Legendary Filter**: Dropdown with options for All/Legendary Only/Non-Legendary Only
- **Clear Filters Button**: Conditionally shown when any filter is active
- Responsive layout with flex styling

**Event Handling**:
- `handleInputChange()`: Updates individual filter field
- Calls `onFilterChange()` with merged filter state
- All changes trigger immediate filtering in parent component

**Styling**:
- Filter bar container with horizontal layout
- Filter sections with input and label pairs
- Label styling with accessibility considerations
- Input and select styling with focus states
- Clear button styling (only visible when filters are active)

**Accessibility**:
- `<label htmlFor="...">` associations for all inputs
- Semantic form structure
- Clear placeholder text
- Descriptive option labels

**Example Usage**:
```jsx
<FilterBar
  filters={{ name: '', type: '', legendary: '' }}
  types={['Fire', 'Water', 'Grass']}
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onClearFilters={() => setFilters({ name: '', type: '', legendary: '' })}
/>
```

---

### LoadingSpinner

**Purpose**: Shows a loading indicator during initial data fetch.

**Location**: `LoadingSpinner.js`, `LoadingSpinner.css`

**Props**: None

**Features**:
- Animated Pokeball spinner
- Centered display
- Loading message
- Pure CSS animation (no external libraries)
- Scales responsively

**Animation**:
- Pokeball rotates continuously
- CSS keyframe animation: `spin` (360 degrees rotation)
- Animation duration: 1 second per rotation
- Smooth linear timing

**Styling**:
- Centered with flexbox
- Large spinner size (100px)
- "Loading..." text below spinner
- Semi-transparent background (optional)

**Example Usage**:
```jsx
{loading ? <LoadingSpinner /> : <YourContent />}
```

---

## Component Architecture

### Hierarchy
```
App
├── FilterBar
├── Pokemon Grid Container
│   └── PokemonCard × filtered count
└── LoadingSpinner (conditional)
```

### Data Flow
```
App (parent)
  ↓ props
  ├─→ FilterBar
  │   ↑ callback
  │   └─ onFilterChange
  │
  └─→ PokemonCard (multiple)
      ↑ no callbacks
      └─ props only
```

### Communication Patterns

1. **Parent → Child**: Props pass data and configuration
2. **Child → Parent**: Callbacks communicate user interactions
3. **Sibling Communication**: Routed through parent (App) component

## Styling

### CSS Organization
Each component has a corresponding CSS file:
- `ComponentName.js` → `ComponentName.css`
- Component-specific classes use component name as prefix
- No CSS modules or scoping beyond naming conventions

### Responsive Design
- Mobile-first approach
- Flexbox and CSS Grid for layout
- Media queries for breakpoints:
  - Mobile: default
  - Tablet: 768px and above
  - Desktop: 1024px and above

### Type Color Mapping
Type badges use class names like `.type-electric`, `.type-fire`, etc.:
```css
.type-fire { background-color: #FF6B6B; }
.type-water { background-color: #4ECDC4; }
.type-grass { background-color: #95E1D3; }
/* etc. */
```

## Adding New Components

### Steps
1. Create `ComponentName.js` file
2. Create `ComponentName.css` file
3. Import in parent component
4. Add to JSX render tree
5. Document props and purpose

### Component Template
```jsx
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

## Performance Considerations

### Rendering
- Components are pure functions (same props = same output)
- No unnecessary re-renders
- App manages state; components consume props

### Event Handling
- Event handlers use React synthetic events
- Arrow functions for callback binding
- No event delegation optimization needed

### CSS
- CSS files are loaded once
- Animations use GPU acceleration (transforms, opacity)
- No bloated CSS frameworks

## Accessibility

### Best Practices
- Semantic HTML (`<label>`, `<select>`, `<input>`)
- Proper ARIA attributes where needed
- Keyboard navigation support
- Clear focus states for form inputs
- Descriptive alt text for images

### Form Accessibility
- Labels are properly associated with inputs using `htmlFor` and `id`
- Clear placeholder text
- Helpful error messages
- Logical tab order

## Testing Components

### Unit Testing with Jest + React Testing Library

Example test structure:
```javascript
import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('renders pokemon name', () => {
  render(<PokemonCard pokemon={{ id: 1, name: 'Pikachu', ... }} />);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
```

## Troubleshooting

### Component Not Displaying
- Check import statement in parent
- Verify props are being passed correctly
- Check console for JavaScript errors

### Styling Issues
- Verify CSS file is imported in component
- Check class name spelling
- Use browser DevTools to inspect styles

### Event Handlers Not Working
- Verify callback props are passed from parent
- Check function names in event handlers
- Ensure callbacks are properly bound

## Related Documentation

- See [../ARCHITECTURE.md](../ARCHITECTURE.md) for component hierarchy details
- See [../CLAUDE.md](../CLAUDE.md) for development conventions
- See [../README.md](../README.md) for overall project information
