# src - Source Code Directory

## Purpose

The `src/` directory contains all application source code including React components, styles, and entry points.

## Directory Structure

```
src/
├── components/          # Reusable React components
├── App.js              # Root application component
├── App.css             # Application styles
├── index.js            # React application entry point
└── index.css           # Base styles and CSS reset
```

## Key Files

### App.js
**Purpose**: Root React component that manages application state and orchestrates data flow.

**Responsibilities**:
- Initial data fetching from the Pokemon Backend API
- Managing Pokemon list state (`pokemons`, `filteredPokemons`)
- Managing available types state
- Managing filter state (name, type, legendary)
- Implementing client-side filtering logic
- Handling loading and error states
- Rendering conditional UI based on state

**Key Functions**:
- `fetchInitialData()`: Fetches pokemons and types from backend
- `applyFilters()`: Filters pokemons based on current filter values
- `handleFilterChange()`: Updates filter state
- `clearFilters()`: Resets all filters

### App.css
**Purpose**: Styling for the App component and global layout styles.

**Includes**:
- App container and header styling
- Main content area layout
- Results info display
- Error container styling
- Empty state styling
- Global button styling
- Responsive grid layout for Pokemon cards

### index.js
**Purpose**: React application entry point.

**Functionality**:
- Imports React and ReactDOM
- Imports the App component
- Renders App into the DOM at element with id "root"

### index.css
**Purpose**: Base styles, CSS reset, and global typography.

**Includes**:
- CSS reset (margin, padding, box-sizing)
- Font configuration
- Root color variables
- Base element styling
- Body and HTML styling

## Components

The `components/` subdirectory contains reusable React components. See [components/README.md](components/README.md) for detailed information.

### Component Overview

- **PokemonCard**: Displays individual Pokemon information
- **FilterBar**: Provides user controls for filtering Pokemon
- **LoadingSpinner**: Shows loading state with animated Pokeball

## API Communication

### Data Fetching
All API communication happens in `App.js` through the `fetchInitialData()` effect:

```javascript
// Fetches both endpoints in parallel
const [pokemonResponse, typesResponse] = await Promise.all([
  fetch(`${API_BASE_URL}/api/pokemons`),
  fetch(`${API_BASE_URL}/api/types`)
]);
```

### API Base URL
The backend URL is configured via the `REACT_APP_API_URL` environment variable:
- Default: `http://localhost:3001`
- Set via `.env` file or environment variables at build time

### Expected Response Format

**GET /api/pokemons**:
```json
{
  "success": true,
  "count": number,
  "data": [Pokemon objects...]
}
```

**GET /api/types**:
```json
{
  "success": true,
  "data": [type strings...]
}
```

## State Management

The application uses React hooks for state management (no Redux or Context API):

### App Component State
- `pokemons`: Original Pokemon array from API
- `filteredPokemons`: Pokemon after filters applied
- `types`: Available Pokemon types
- `filters`: Current filter values (name, type, legendary)
- `loading`: Boolean indicating data fetch in progress
- `error`: Error message string (or null)

### State Flow
1. Initial load: State is populated from API
2. User interaction: Filters state is updated
3. Filter change: Filtering logic runs, updating `filteredPokemons`
4. Re-render: Components receive updated props and re-render

## Styling Approach

### CSS Architecture
- No CSS frameworks (no Bootstrap, Tailwind, etc.)
- Custom CSS with modern features (Flexbox, Grid, CSS Variables)
- Component-scoped CSS files (collocated with components)
- Responsive design with media queries

### Design System
- **Color Scheme**: Glassmorphism with semi-transparent cards
- **Animations**: CSS keyframes for Pokeball spinner
- **Responsive**: Mobile-first with breakpoints for tablet and desktop
- **Type Colors**: Different background colors for different Pokemon types

## Performance Considerations

### Data Loading
- All Pokemon loaded upfront (acceptable for 12 items)
- Types fetched in parallel with Pokemon
- No pagination or lazy loading

### Filtering
- Client-side filtering (no additional API calls)
- Instant response to filter changes
- Efficient array operations using native methods

### Rendering
- Uncontrolled re-renders only when necessary
- State updates trigger component re-renders
- Child components are pure (same props = same output)

## Accessibility Features

- Form inputs have associated `<label>` elements
- Select elements have descriptive labels
- Error messages are visible and helpful
- Semantic HTML structure
- Proper ID attributes for form controls

## Error Handling

### API Errors
- Network errors are caught and displayed to user
- Error message explains the issue
- Retry button allows user to reload the page

### Image Errors
- Missing Pokemon images fall back to placeholder
- Handled in PokemonCard with image `onError` handler

### Component Errors
- Not currently using Error Boundaries
- Console errors logged for debugging

## Development Workflow

### Adding a New Feature

1. **New Filter**:
   - Add field to `filters` state
   - Add input control in FilterBar
   - Add filtering logic to `applyFilters()`

2. **New Component**:
   - Create `components/ComponentName.js`
   - Create `components/ComponentName.css`
   - Import in `App.js`
   - Add to render tree

3. **API Integration**:
   - Make fetch call in `App.js`
   - Add to state management
   - Pass data to components via props

## Testing

The Create React App provides:
- Jest test runner (via `npm test`)
- React Testing Library for component testing
- Default test files: `App.test.js`, etc.

## Building and Deployment

### Development
```bash
npm install   # Install dependencies
npm start     # Start dev server on port 3000
```

### Production
```bash
npm run build  # Create optimized build
# Outputs to build/ directory
```

### Docker
```bash
docker build -t pokemon-frontend .
docker run -p 3000:80 pokemon-frontend
```

## Dependencies

### Production Dependencies
- **react**: UI library
- **react-dom**: DOM rendering

### Development Dependencies
- **react-scripts**: Build tooling and scripts

## Environment Variables

- `REACT_APP_API_URL`: Backend API URL (used in App.js)

Note: Environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for system-level architecture
- See [CLAUDE.md](../CLAUDE.md) for AI agent guidance
- See [components/README.md](components/README.md) for component details
