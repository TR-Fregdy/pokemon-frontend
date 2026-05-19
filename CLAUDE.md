# Pokemon Frontend - AI Agent Guidance

## Project Overview

This is a modern React web application for browsing and filtering Pokemon data. It provides an interactive interface for searching, filtering by type, and viewing Pokemon information with a beautiful glassmorphism design.

## Technology Stack

### Runtime & Core
- **React**: ^18.2.0 - Component-based UI library with hooks
- **React DOM**: ^18.2.0 - React rendering for web
- **Node.js**: v18+ required

### Build & Development
- **react-scripts**: 5.0.1 - Create React App build tooling (Webpack, Babel, Jest)

### Styling
- **CSS3**: Custom CSS (no CSS-in-JS library)
  - Flexbox and CSS Grid for layout
  - CSS animations and transitions
  - Responsive design with media queries
  - Glassmorphism visual effects

### Container & Deployment
- **Docker**: Multi-stage builds for development and production
- **Nginx**: Production web server
- **create-react-app**: Default toolchain

## Architecture Pattern

The project follows a **component-based React architecture** with:
- **Functional components**: All components use hooks (useState, useEffect)
- **Local state management**: useState for component-level state
- **Effect-based data fetching**: useEffect for API calls
- **Props-based composition**: Component reusability via props
- **Separation of concerns**: Components, styles, and data fetching

## Code Structure

```
pokemon-frontend/
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── PokemonCard.js         # Individual Pokemon display card
│   │   ├── PokemonCard.css        # Card styling
│   │   ├── FilterBar.js           # Search and filter controls
│   │   ├── FilterBar.css          # Filter UI styling
│   │   ├── LoadingSpinner.js      # Loading animation
│   │   └── LoadingSpinner.css     # Spinner styling
│   ├── App.js                      # Main application component
│   ├── App.css                     # Application-level styling
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── public/
│   ├── index.html                  # HTML template
│   ├── favicon.ico                 # Favicon
│   └── manifest.json               # PWA manifest
├── package.json                    # Dependencies and scripts
├── Dockerfile                       # Docker configuration
├── docker-compose.yml              # Multi-container orchestration
├── nginx.conf                      # Production Nginx configuration
└── README.md                        # User documentation
```

## Key Components

### App.js (Main Component)
- **Purpose**: Root container and state management
- **Responsibilities**:
  - Manage global state (pokemons, filteredPokemons, filters)
  - Fetch Pokemon data and types from backend API
  - Implement filter logic and apply filters
  - Handle loading and error states
  - Coordinate child component communication

**State Structure**:
```javascript
{
  pokemons: Pokemon[],              // All Pokemon from API
  filteredPokemons: Pokemon[],       // Filtered result set
  types: string[],                  // Available type options
  filters: {
    name: string,                   // Search query
    type: string,                   // Selected type filter
    legendary: string               // Legendary status filter ('true'/'false'/'')
  },
  loading: boolean,                 // Data loading state
  error: string | null              // Error message
}
```

### FilterBar.js (Filter Controls)
- **Purpose**: User input for filtering
- **Responsibilities**:
  - Render search input field
  - Render type filter dropdown
  - Render legendary status filter radio buttons
  - Render clear filters button
  - Call parent's onFilterChange callback

**Props**:
```javascript
{
  filters: { name, type, legendary },
  types: string[],
  onFilterChange: (newFilters) => void,
  onClearFilters: () => void
}
```

### PokemonCard.js (Pokemon Display)
- **Purpose**: Display individual Pokemon
- **Responsibilities**:
  - Render Pokemon image/sprite
  - Display Pokemon name and ID
  - Show type badges with styling
  - Show legendary status indicator
  - Handle image loading errors

**Props**:
```javascript
{
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string (URL)
  }
}
```

### LoadingSpinner.js (Loading State)
- **Purpose**: Animated loading indicator
- **Responsibilities**:
  - Display animated Pokeball spinner
  - Indicate loading state to user
  - Minimal implementation for UX

**Props**: None (stateless)

## Data Flow

### Initialization (Mount)
```
App mounts
  ↓
useEffect (empty dependency)
  ├─ setLoading(true)
  ├─ Fetch /api/pokemons (Promise 1)
  ├─ Fetch /api/types (Promise 2)
  ├─ Promise.all() waits for both
  ├─ Parse JSON responses
  ├─ setPokemons(data)
  ├─ setFilteredPokemons(data)
  ├─ setTypes(data)
  ├─ setError(null)
  └─ setLoading(false)
```

### User Types in Search
```
User types in FilterBar name input
  ↓
FilterBar onChange handler
  ↓
onFilterChange() called with new filters
  ↓
App's handleFilterChange()
  ↓
setFilters(newFilters)
  ↓
useEffect triggered (filters dependency)
  ├─ Filter pokemons locally:
  │  ├─ name: substring match (case-insensitive)
  │  ├─ type: array includes check (case-insensitive)
  │  └─ legendary: boolean comparison
  ├─ setFilteredPokemons(filtered)
  └─ Re-render grid with new results
```

### User Selects Type Filter
```
User selects type from dropdown
  ↓
FilterBar onChange handler
  ↓
Same as above, but filters by type
  ↓
Grid updates with Pokemon of selected type
```

### User Changes Legendary Filter
```
User selects legendary/non-legendary/all
  ↓
FilterBar onChange handler
  ↓
Same filtering flow
  ↓
Grid updates to show only selected Pokemon
```

### Multiple Filters (AND Logic)
```
name=pika, type=electric, legendary=false
  ↓
Step 1: Filter name (substring match)
        [Pikachu]
  ↓
Step 2: Filter type (exact match on any)
        [Pikachu]
  ↓
Step 3: Filter legendary (boolean)
        [Pikachu]
  ↓
Result: Show only Pikachu
```

## API Integration

### Base URL
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

### Endpoints Called

#### Get All Pokemon
```
GET /api/pokemons
Response: { success: true, count: 12, data: Pokemon[] }
```

#### Get All Types
```
GET /api/types
Response: { success: true, data: string[] }
```

### Error Handling
```javascript
try {
  // Fetch both endpoints in parallel
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await response.json();
  // Process data
} catch (err) {
  setError('Failed to load Pokemon data. Please make sure the backend server is running.');
}
```

## Filtering Logic (Client-Side)

Located in `App.js` useEffect:

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

// Legendary filter: boolean conversion
if (filters.legendary !== '') {
  const isLegendary = filters.legendary === 'true';
  filtered = filtered.filter(pokemon => pokemon.legendary === isLegendary);
}
```

## Styling Architecture

### CSS Organization
- **App.css**: Main layout, grid, header, error states
- **FilterBar.css**: Filter controls styling
- **PokemonCard.css**: Card design and animations
- **LoadingSpinner.css**: Spinner animation
- **index.css**: Global reset and base styles

### Visual Design
- **Glassmorphism**: Semi-transparent cards with blur effects
- **Responsive Grid**: Adapts from desktop (multi-column) to mobile (single-column)
- **Animations**: Smooth transitions and loading spinner
- **Color Coding**: Type badges with Pokemon type colors (Fire=red, Water=blue, etc.)
- **Typography**: Readable, hierarchical

### Responsive Breakpoints
```css
Desktop:  Multiple columns (3+)
Tablet:   2-3 columns
Mobile:   1 column, touch-friendly
```

## Development Workflow

### Local Development
```bash
npm install                 # Install dependencies
npm start                   # Start dev server (http://localhost:3000)
npm test                    # Run tests
npm run build               # Build for production
```

### Environment Configuration
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3001
```

### Docker Development
```bash
npm run docker:build        # Build Docker image
npm run docker:run          # Run Docker container (http://localhost:3002)
```

## Environment Variables

- `REACT_APP_API_URL` (optional) - Backend API URL (default: http://localhost:3001)
  - **Important**: Prefix must be `REACT_APP_` for create-react-app to expose to frontend
  - Used in `src/App.js`: `process.env.REACT_APP_API_URL`
  - proxy fallback in package.json can also be used for development

## Component Communication

### Parent-Child Props
```
App (state manager)
  ├─ FilterBar (receives filters, callbacks)
  │   └─ Input elements (onChange → parent callback)
  ├─ LoadingSpinner (conditional render)
  └─ Pokemon Grid
      └─ PokemonCard (receives pokemon object)
```

### State Lifting
- State is lifted to `App.js` (single source of truth)
- Child components are "controlled components"
- Changes bubble up via callback props
- Prevents state synchronization issues

## Important Constraints & Conventions

### React Hooks
- **useState**: Local component state
- **useEffect**: Side effects (data fetching, subscriptions)
- No Redux, Context, or complex state management library
- Simple and sufficient for current scope

### Error Handling
- Network errors show user-friendly message
- Missing images don't break rendering
- Empty results show "No Pokemon found" message
- Loading state prevents rendering before data loads

### Performance Considerations
- Filtering is O(n) but acceptable (12 items)
- useEffect dependencies properly specified
- No unnecessary re-renders
- CSS animations use GPU-accelerated properties

### Frontend-Backend Contract
- Backend: `/api/pokemons`, `/api/types` endpoints
- Response format: `{ success, data, count }`
- Pokemon object: `{ id, name, type[], legendary, image }`
- Filter via query parameters (not body)

## Safe Code Generation Guidelines

### When Adding Features:
1. **New components**: Create in `src/components/` with `.js` and `.css` files
2. **New state**: Add to App.js useState, update filtering if needed
3. **New filtering**: Add filter condition in applyFilters() function
4. **Styling**: Add to respective `.css` files, follow media query pattern
5. **API calls**: Use fetch with try-catch, handle responses like existing code

### Component Template:
```javascript
import React from 'react';
import './ComponentName.css';

function ComponentName({ prop1, prop2, onCallback }) {
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
}

export default ComponentName;
```

### Avoid:
- Using class components (use functional + hooks)
- Global state without lifting to App
- Multiple API endpoints without centralized fetching
- Inline styles (use CSS files)
- DOM manipulation with `document.getElementById()` (use React state/refs)
- Changing data fetching to backend-side filtering without updating App logic

## Build & Deployment

### Production Build
```bash
npm run build               # Creates optimized build in /build
```

### Docker Production
- **Multi-stage Dockerfile**:
  1. Build stage: `npm install && npm run build`
  2. Production stage: Nginx serving static files from build

### Nginx Configuration
- Gzip compression enabled
- Static asset caching configured
- Client-side routing support (all routes → index.html)
- Security headers included

## Related Documentation
- See `README.md` for user-facing features and setup
- See `ARCHITECTURE.md` for system-level design overview
