# Pokemon Frontend - Source Code (src/)

## Directory Purpose

The `src/` directory contains all React source code, components, and styling for the Pokemon Explorer frontend application. This is the main application directory where the React components, state management, and styling logic reside.

## Key Files & Responsibilities

### App.js - Main Application Component
**Purpose**: Root component and central state manager
**Responsibilities**:
- Initialize and manage application state (pokemons, filters, loading, error)
- Fetch data from backend API on component mount
- Implement filtering logic across all filters
- Handle user interactions through callbacks from child components
- Render conditional content (loading spinner, error message, main content)
- Coordinate data flow between FilterBar, PokemonCard components, and backend

**Key Functions**:
- `useEffect()` - Data fetching on mount and applying filters on state change
- `handleFilterChange()` - Update filters when user changes inputs
- `clearFilters()` - Reset all filters to empty state

**State Variables**:
- `pokemons` - All Pokemon from API
- `filteredPokemons` - Filtered result set based on user selections
- `types` - Available Pokemon types for filter dropdown
- `filters` - Object containing name, type, and legendary filter values
- `loading` - Boolean indicating data loading state
- `error` - Error message if API call fails

### App.css - Application Styling
**Purpose**: Main application layout and styling
**Contains**:
- Header styling with title and subtitle
- Main content layout and responsive grid
- Pokemon grid layout (Flexbox for responsive columns)
- Filter bar container styling
- Error container and error message styling
- No results message styling
- Results info counter styling
- Responsive design media queries for mobile/tablet/desktop

### index.js - React Entry Point
**Purpose**: Bootstrap React application
**Responsibilities**:
- Import React and ReactDOM
- Import root App component
- Render App component into DOM element with id "root"
- Load global CSS (index.css)

**Note**: Created by create-react-app, minimal modification needed

### index.css - Global Styles
**Purpose**: Global CSS reset and base styles
**Contains**:
- CSS reset (margin, padding, box-sizing)
- Base typography (font family, sizes)
- Body background and colors
- Link styling
- Foundation for component-specific styling

## Components Subdirectory

The `components/` subdirectory contains reusable React components. See `src/components/README.md` for detailed information about each component.

## Component Architecture

### Data Flow
```
App (State)
├─ useEffect → Fetch API data
├─ Filter state change → Apply filters
├─ User input → Update filters
└─ Re-render → Display updated UI

↓ Props Down

App
├─ FilterBar
│  ├─ name input (onChange)
│  ├─ type select (onChange)
│  ├─ legendary radio (onChange)
│  └─ buttons (onClick)
├─ LoadingSpinner (conditional)
├─ Error Message (conditional)
└─ Pokemon Grid
   └─ PokemonCard[] (repeated)

↑ Callbacks Up

FilterBar calls: onFilterChange(newFilters)
Buttons call: onClearFilters()
```

## Styling Organization

### App.css Structure
```css
/* Header and Title */
.app-header { }
.app-header h1 { }

/* Main Content Layout */
.app { }
.main-content { }

/* Grid Layout */
.pokemon-grid { }
  display: grid
  grid-template-columns: (responsive)
  gap: (consistent spacing)

/* Filter Bar */
.filter-bar-container { }

/* Results Info */
.results-info { }

/* No Results State */
.no-results { }

/* Error State */
.error-container { }
.error-message { }

/* Buttons */
.retry-button { }
.clear-button { }

/* Responsive Breakpoints */
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

### Responsive Design Strategy
- **Desktop (>1024px)**: 3-4 column grid
- **Tablet (600-1024px)**: 2-3 column grid
- **Mobile (<600px)**: 1 column, full-width

## API Integration

### Data Fetching (App.js)
```javascript
// Called on component mount
useEffect(() => {
  // Fetch both endpoints in parallel
  Promise.all([
    fetch(`${API_BASE_URL}/api/pokemons`),
    fetch(`${API_BASE_URL}/api/types`)
  ])
  // Parse responses
  // Update state (setPokemons, setFilteredPokemons, setTypes)
  // Handle errors
}, [])
```

### API Base URL
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

Set via `.env` file or default to localhost development server.

## Filtering Implementation

### Filter Application (App.js)
Located in `useEffect` with `[filters, pokemons]` dependencies:

```javascript
// Name filter: substring match, case-insensitive
if (filters.name) {
  filtered = filtered.filter(pokemon =>
    pokemon.name.toLowerCase().includes(filters.name.toLowerCase())
  );
}

// Type filter: exact match on any type, case-insensitive
if (filters.type) {
  filtered = filtered.filter(pokemon =>
    pokemon.type.some(t => t.toLowerCase() === filters.type.toLowerCase())
  );
}

// Legendary filter: boolean conversion from string
if (filters.legendary !== '') {
  const isLegendary = filters.legendary === 'true';
  filtered = filtered.filter(pokemon => pokemon.legendary === isLegendary);
}

setFilteredPokemons(filtered);
```

### Filter Types
1. **Name Search** - Substring match (case-insensitive) - e.g., "pika" matches "Pikachu"
2. **Type Selection** - Exact match on any type array element - e.g., "Electric" matches Pikachu
3. **Legendary Status** - Boolean filter - Show only legendary, only non-legendary, or all

### Filter Combination Logic
Filters combine with AND logic:
- Query: name="pika" AND type="electric" AND legendary="false"
- Result: Only Pikachu (matches all three filters)

## Error Handling

### Network Errors
- Caught in `try/catch` block of fetch
- User-friendly error message displayed
- "Retry" button allows user to reload the page
- Clear indication that backend must be running

### Empty Results
- When `filteredPokemons.length === 0`
- Shows "No Pokemon found" message
- Offers "Clear All Filters" button
- Helpful suggestion to adjust filters

### Missing Images
- PokemonCard handles image loading gracefully
- No error thrown if sprite fails to load
- Pokemon still displays with name and info

## State Management Pattern

### Centralized State
All state is managed in App.js, making it the single source of truth:
- No Redux, Context API, or external state management needed at this scale
- Props passed down to children
- Callbacks passed up for state updates

### State Updates Flow
```
User Action
  ↓
FilterBar (child) calls onFilterChange()
  ↓
App (parent) receives new filters
  ↓
setFilters() triggers state update
  ↓
App re-renders
  ↓
useEffect detects filters change
  ↓
applyFilters() executed
  ↓
setFilteredPokemons() updates result set
  ↓
App re-renders with new results
  ↓
UI displays filtered Pokemon
```

## Development Guidelines

### Adding New Components
1. Create `.js` and `.css` files in `components/` directory
2. Import component in `App.js`
3. Add to component tree with appropriate props
4. Implement callbacks for parent state updates
5. Add responsive styles in accompanying `.css` file

### Adding New Filters
1. Add filter field to `filters` state in App.js
2. Add filter input in FilterBar component
3. Add filter condition in `applyFilters()` function in App.js
4. Update type definitions if using TypeScript

### Modifying Styling
1. Update component-specific `.css` file
2. Test responsive behavior (mobile, tablet, desktop)
3. Use media queries for breakpoint-specific styles
4. Follow existing color scheme and spacing conventions

## Hooks Usage

### useEffect Hooks
1. **Data Fetching** - Mount dependency, fetch both endpoints
2. **Filter Application** - filters and pokemons dependency, apply filtering logic

### useState Hooks
- pokemons, filteredPokemons, types, filters, loading, error

### No Other Hooks
- No useContext, useReducer, or custom hooks (simple state sufficient)

## Performance Considerations

### Rendering Performance
- useEffect dependencies properly specified (prevents unnecessary runs)
- Filtering is O(n) but acceptable for 12 items
- No expensive re-renders (functional components, hooks)

### CSS Performance
- GPU-accelerated animations (transform, opacity)
- No inline styles (better CSS specificity)
- Media queries for responsive (not JavaScript resizing)

### Data Fetching
- Parallel requests with Promise.all() for faster load
- No polling or repeated fetches unless user retries
- Response data cached in React state

## Integration with Other Directories

See linked documentation:
- **ARCHITECTURE.md** - System-level design and data flow
- **CLAUDE.md** - AI agent guidance for code generation
- **components/README.md** - Component-specific documentation
- **public/README.md** - Public assets and HTML template

## Environment & Setup

### Required Environment Variables
- `REACT_APP_API_URL` - Backend API URL (optional, default: http://localhost:3001)

### Development Commands
- `npm start` - Start dev server with hot-reload
- `npm run build` - Create optimized production build
- `npm test` - Run test suite (if configured)

### Docker Support
- Dockerfile included for containerized deployment
- Multi-stage build: development stage, production Nginx stage

## Related Files
- `../README.md` - User-facing documentation
- `../ARCHITECTURE.md` - System-level architecture overview
- `../CLAUDE.md` - AI agent coding guidance
