# Pokemon Frontend - AI Agent Guidance

## Overview

This is a React-based web application for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch and display Pokemon information with real-time filtering capabilities.

## Technology Stack

- **Runtime**: Node.js (v18 or later)
- **Framework**: React (^18.2.0)
- **Rendering**: React DOM (^18.2.0)
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS3 (custom, no CSS framework)
- **Containerization**: Docker with Nginx reverse proxy

## Architecture Pattern

This is a **single-page application (SPA)** with the following characteristics:

- **Component-based architecture**: Reusable React components
- **Functional components**: All components use hooks (useState, useEffect)
- **Client-side routing**: No explicit routing (single page)
- **State management**: Local component state with useState
- **Unidirectional data flow**: Props down, callbacks up

## Key Design Decisions

1. **Client-Side Filtering**: Data is fetched once from the backend, then filtered on the client for instant UI responsiveness.

2. **Dual Filtering**: Implements filtering both on the backend (for API consistency) and frontend (for better UX).

3. **Mock Environment Configuration**: Uses `REACT_APP_API_URL` environment variable to support different backend URLs (local development vs. production).

4. **Component Composition**: Breaking down UI into reusable components (PokemonCard, FilterBar, LoadingSpinner) for maintainability.

5. **CSS Modules Approach**: Each component has its own CSS file (not true CSS modules, but logical organization).

## Code Structure

```
src/
├── App.js                    # Main component with state and data fetching
├── App.css                   # Global and App-specific styles
├── index.js                  # React entry point
├── index.css                 # Global base styles
└── components/
    ├── PokemonCard.js       # Individual Pokemon display
    ├── PokemonCard.css
    ├── FilterBar.js         # Search and filter controls
    ├── FilterBar.css
    ├── LoadingSpinner.js    # Loading animation
    └── LoadingSpinner.css
```

## Core Components

### App Component
- **Purpose**: Root container, data fetching, global state management
- **State**: 
  - `pokemons`: Full list from API
  - `filteredPokemons`: Filtered results
  - `types`: Available Pokemon types
  - `filters`: Current filter state (name, type, legendary)
  - `loading`: Loading state
  - `error`: Error messages
- **Responsibilities**:
  - Fetch initial data from API (pokemons and types)
  - Manage filter state
  - Apply client-side filters
  - Display appropriate UI (loading, error, or content)
  - Pass props to child components

### FilterBar Component
- **Purpose**: User input controls for filtering
- **Props**: 
  - `filters`: Current filter state
  - `types`: List of available types
  - `onFilterChange`: Callback for filter updates
  - `onClearFilters`: Callback to reset filters
- **Features**:
  - Name search input (text)
  - Type selector (dropdown)
  - Legendary status selector (dropdown)
  - Clear filters button (conditionally shown)

### PokemonCard Component
- **Purpose**: Individual Pokemon display
- **Props**: `pokemon` object
- **Features**:
  - Pokemon image with fallback
  - Name and ID
  - Type badges
  - Legendary indicator badge
  - Responsive card layout

### LoadingSpinner Component
- **Purpose**: Loading state indicator
- **Features**:
  - Pokeball animation
  - Centered display
  - CSS-based animation (no libraries)

## Important Constraints & Assumptions

1. **Assumes Backend is Running**: The app expects the backend API to be available at `REACT_APP_API_URL`.

2. **No Authentication**: Frontend doesn't implement authentication.

3. **Client-Side Filtering Only**: All filtering happens in the browser after initial data load. The app doesn't make separate requests for filtered results.

4. **Uncontrolled Error Recovery**: Users must manually retry on connection errors (button click or page reload).

5. **No Data Persistence**: Local storage is not used; data reloads on page refresh.

6. **Fixed API Contract**: Assumes backend returns specific JSON structure:
   ```javascript
   // Pokemon list response
   { data: [...], count: number, success: boolean }
   
   // Types response
   { data: [...], success: boolean }
   ```

7. **Image Fallback**: Pokemon images use external PokeAPI URLs; missing images fall back to `/placeholder-pokemon.png`.

## Environment Variables

- `REACT_APP_API_URL`: Backend API base URL (default: http://localhost:3001)
  - Must be set before build time (Create React App limitation)
  - Used in `App.js` to construct API URLs

## Development Conventions

1. **Component Naming**:
   - Pascal case (PokemonCard, FilterBar)
   - Descriptive names reflecting functionality
   
2. **State Management**:
   - Use `useState` for component state
   - Lift state to parent (App) if shared between siblings
   - Keep state as simple as possible
   
3. **Props Convention**:
   - Callbacks are prefixed with `on` (onFilterChange, onClearFilters)
   - Data props are not prefixed
   
4. **CSS Organization**:
   - Separate CSS file per component
   - Component-specific classes use component name prefix (`.filter-bar`, `.pokemon-card`)
   - Global styles in `App.css` and `index.css`
   
5. **Error Handling**:
   - Network errors are caught in try-catch
   - Errors are stored in state and displayed to user
   - Console errors for debugging

## Common Modifications

If you need to modify this frontend:

1. **Adding a new filter**: 
   - Add filter field to `filters` state in App.js
   - Add input in FilterBar component
   - Add filter logic in `applyFilters` function

2. **Adding a new component**:
   - Create ComponentName.js and ComponentName.css
   - Import in App.js
   - Add props documentation as comments

3. **Changing API URL**:
   - Modify `REACT_APP_API_URL` environment variable
   - Or change default in App.js

4. **Styling changes**:
   - Global styles in `App.css` or `index.css`
   - Component-specific styles in corresponding CSS files

## API Integration Points

The frontend makes requests to these backend endpoints:

1. **Initial Load**:
   ```
   GET /api/pokemons        → Fetch all Pokemon
   GET /api/types           → Fetch available types
   ```

2. **No dynamic requests**: Filtering is done client-side, so no additional API calls are made after initial load.

## Accessibility Features

- Form inputs have `htmlFor` linked labels
- Select elements use `id` attributes
- Semantic HTML structure
- Error messages are visible and descriptive

## Performance Considerations

1. **Data Loading**: All 12 Pokemon are loaded upfront (acceptable for small dataset)
2. **Client-Side Filtering**: Instant response to filter changes (no network latency)
3. **CSS Animations**: GPU-accelerated (using transforms)
4. **Image Loading**: PokeAPI sprites are small (< 10KB each)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS3 support required (flexbox, grid, transitions)
- ES6+ JavaScript support

## Known Limitations

1. **No Pagination**: All Pokemon loaded at once (works for 12 items)
2. **No Sorting**: Results maintain API order
3. **No Caching**: Full refetch on page reload
4. **No Offline Support**: Requires active internet connection
5. **No Search History**: No previous searches remembered
6. **Image Dependency**: Requires external PokeAPI access for sprites

## Docker Deployment

The frontend uses a multi-stage Docker build:
1. **Build stage**: Node.js image builds React app
2. **Production stage**: Nginx serves static files
3. **Port**: 3000 (development) or 80 (Docker)
