# Pokemon Frontend - src/ Directory

This directory contains all the React source code for the Pokemon Frontend application.

## Directory Purpose

The `src/` directory is the root of the React application where the main application logic, components, and styles are organized. It serves as the entry point for the Create React App build process.

## Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── PokemonCard.js    # Individual Pokemon display component
│   ├── PokemonCard.css   # Pokemon card styling
│   ├── FilterBar.js      # Search and filter controls
│   ├── FilterBar.css     # Filter controls styling
│   ├── LoadingSpinner.js # Loading indicator component
│   └── LoadingSpinner.css # Loading spinner animation
├── App.js                # Main application component
├── App.css               # Application layout and global styles
├── index.js              # React DOM entry point
├── index.css             # Global base styles
└── README.md             # This file
```

## Key Files and Their Responsibilities

### **App.js** - Main Application Component
- **Purpose**: Root React component that manages all application state and logic
- **Responsibilities**:
  - Initialize and manage Pokemon data state
  - Manage filter state (name, type, legendary)
  - Fetch Pokemon and types from backend API on component mount
  - Apply client-side filtering logic
  - Handle loading and error states
  - Orchestrate child component rendering
- **Key Features**:
  - Parallel API calls using Promise.all
  - Two-tier filtering (fetch parameters not used, client-side only)
  - Error handling with user-friendly messages
  - Loading spinner during data fetch
- **State Management**:
  - `pokemons`: Full list of Pokemon from API
  - `filteredPokemons`: Filtered results based on active filters
  - `types`: Available Pokemon types
  - `filters`: Current filter values {name, type, legendary}
  - `loading`: Boolean loading state
  - `error`: Error message or null

### **index.js** - React Entry Point
- **Purpose**: Bootstrap the React application
- **Responsibilities**:
  - Import React and ReactDOM
  - Render App component into the DOM
  - Mount application to `#root` div from index.html
- **No state or logic**: Pure initialization file

### **index.css** - Global Styles
- **Purpose**: Base styles, typography, and color variables
- **Includes**:
  - CSS resets and normalizations
  - Global font stack and typography
  - Base color scheme
  - Default spacing and sizing

### **App.css** - Application Layout
- **Purpose**: Main application layout and structure styles
- **Includes**:
  - `.app` container grid layout
  - `.app-header` header styling
  - `.pokemon-grid` responsive grid for Pokemon cards
  - `.results-info` results count display
  - `.no-results` empty state messaging
  - `.error-container` error state styling
  - Media queries for responsive design

## Components Directory

The `components/` subdirectory contains reusable, presentational React components. See [components/README.md](./components/README.md) for detailed documentation.

### Component Summary
- **PokemonCard**: Renders individual Pokemon in card format with image, name, types, and legendary badge
- **FilterBar**: Provides name search and dropdown filters for type and legendary status
- **LoadingSpinner**: Animated loading indicator shown while fetching data

## Data Flow

```
1. App.js mounts → useEffect triggers
2. Parallel fetch of /api/pokemons and /api/types
3. API responses set state (pokemons, types)
4. FilterBar and PokemonCard components receive state via props
5. User interacts with FilterBar → onFilterChange callback
6. setFilters() updates state → second useEffect runs
7. applyFilters() logic updates filteredPokemons
8. Components re-render with new filtered data
```

## Styling Architecture

All styling uses plain CSS (no CSS-in-JS frameworks):
- **Responsive Design**: CSS Grid and Flexbox with media queries
- **Animations**: CSS keyframes for loading spinner and hover effects
- **Type Colors**: Type-specific badge colors defined in component CSS
- **Modern Features**: Glassmorphism design, semi-transparent backgrounds, blur effects

## API Integration

### Endpoints Consumed
- `GET /api/pokemons` - Fetch all Pokemon
- `GET /api/types` - Fetch available types

### Configuration
- Base URL: `process.env.REACT_APP_API_URL` (defaults to `http://localhost:3001`)
- Proxy: Development proxy configured in package.json

### Error Handling
- Network errors caught and displayed to user
- Retry functionality via page reload
- Fallback for missing Pokemon images

## State Management Pattern

- **Centralized State**: All state managed in App.js using React Hooks
- **Unidirectional Data Flow**: Props passed down, callbacks bubble up
- **No External Libraries**: No Redux, Context API, or other state managers
- **Simple Pattern**: Suitable for small-to-medium applications

## Key Development Patterns

1. **Functional Components**: All components are React functional components with hooks
2. **Separation of Concerns**: Components separate UI (presentation) from logic (App.js)
3. **Callback Props**: Child components communicate with parent via callback functions
4. **Conditional Rendering**: Different UI states (loading, error, data) rendered conditionally
5. **Event Handling**: Controlled inputs via onChange handlers

## How This Connects to Other Parts

- **Backend Connection**: App.js fetches from Pokemon Backend API at startup
- **Component Reuse**: PokemonCard and FilterBar used by App.js
- **Styling**: Individual component CSS files imported with components
- **Environment**: REACT_APP_API_URL environment variable configures backend URL

## Building and Running

### Development
```bash
npm start
# Starts development server on http://localhost:3000
# Hot reload enabled
```

### Production
```bash
npm run build
# Creates optimized build in build/ directory
# Served via Nginx in Docker container
```

## Related Files

- **CLAUDE.md**: AI agent guidance for this directory
- **ARCHITECTURE.md**: System-level architecture overview
- **package.json**: Scripts and dependencies
- **public/index.html**: HTML template with #root element
- **components/README.md**: Detailed component documentation

## Important Notes

1. **Create React App**: This project uses Create React App (react-scripts)
2. **Environment Variables**: All env vars must start with `REACT_APP_`
3. **No Service Worker**: No PWA features or offline support
4. **Client-Side Rendering**: All rendering happens in browser (no SSR)
5. **No Database**: Application does not persist data locally
