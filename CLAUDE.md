# Pokemon Frontend - AI Agent Guidance

## Project Overview

A React 18 web application for browsing and filtering Pokemon data with a modern, responsive UI. The frontend communicates with the Pokemon Backend API to fetch and filter Pokemon data.

## Programming Language & Runtime

- **Language**: JavaScript (React/JSX)
- **Node Version**: 14.0.0 or later
- **Runtime**: Browser (React 18) + Node.js (build/dev tooling)
- **Package Manager**: npm
- **Build Tool**: Create React App (react-scripts)

## Frameworks & Core Libraries

- **react** (^18.2.0) - UI library and component framework
- **react-dom** (^18.2.0) - DOM rendering for React components
- **react-scripts** (5.0.1) - Build tool, development server, and testing suite from Create React App
- **CSS3** - Custom styling with CSS modules/plain CSS

## Architecture Pattern

**Single-Page Application (SPA)** with component-based architecture:
- Centralized state management in main App component using React Hooks
- Reusable presentational components for UI elements
- Data fetching on component mount with error handling
- Real-time filtering applied both client-side and server-side

## Directory Structure Overview

```
pokemon-frontend/
├── public/
│   ├── index.html              # HTML entry point
│   └── manifest.json           # PWA manifest
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── PokemonCard.js       # Individual Pokemon display
│   │   ├── PokemonCard.css      # Card styling
│   │   ├── FilterBar.js         # Search and filter controls
│   │   ├── FilterBar.css        # Filter control styling
│   │   ├── LoadingSpinner.js    # Loading indicator
│   │   └── LoadingSpinner.css   # Spinner animation
│   ├── App.js                   # Main application component
│   ├── App.css                  # Application-wide styles
│   ├── index.js                 # React DOM render entry
│   └── index.css                # Global styles
├── nginx.conf                   # Production web server config
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Container orchestration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
└── .env.example                 # Environment variables template
```

## Critical Files & Their Responsibilities

### **src/App.js** (169 lines)
- **Purpose**: Main application component and state manager
- **Responsibilities**:
  - Fetch initial Pokemon data and types on component mount (useEffect)
  - Manage filter state (name, type, legendary)
  - Apply client-side filtering based on filter state
  - Handle error states and loading states
  - Render header, filter bar, and Pokemon grid
  - Provide callback functions to child components
- **Key Functions**:
  - `fetchInitialData()`: Parallel fetch of Pokemon list and types
  - `applyFilters()`: Client-side filtering logic mirror
  - `handleFilterChange()`: Update filter state
  - `clearFilters()`: Reset all filters to default
- **State**:
  - `pokemons`: All Pokemon from API
  - `filteredPokemons`: Filtered display list
  - `types`: Available Pokemon types
  - `filters`: Current filter values {name, type, legendary}
  - `loading`: Boolean for loading state
  - `error`: Error message or null
- **API Integration**:
  - Fetches from `REACT_APP_API_URL/api/pokemons` (or http://localhost:3001)
  - Fetches from `REACT_APP_API_URL/api/types`

### **src/components/PokemonCard.js** (40 lines)
- **Purpose**: Display a single Pokemon in a card format
- **Props**:
  - `pokemon`: Object with {id, name, type[], legendary, image}
- **Responsibilities**:
  - Render Pokemon image with fallback on error
  - Display Pokemon name and ID with formatting
  - Show type badges with type-specific styling
  - Show legendary badge if applicable
  - Handle image loading errors
- **Styling**: Conditional CSS class for legendary Pokemon

### **src/components/FilterBar.js** (81 lines)
- **Purpose**: Provide search and filtering interface
- **Props**:
  - `filters`: Current filter state
  - `types`: Array of available types
  - `onFilterChange`: Callback to update filters
  - `onClearFilters`: Callback to reset filters
- **Features**:
  - Name search input (text)
  - Type dropdown selector
  - Legendary status dropdown
  - Conditional clear button (shows only when filters active)
- **Logic**: `handleInputChange()` merges field updates into filter state

### **src/components/LoadingSpinner.js** (25 lines)
- **Purpose**: Show loading indicator while data fetches
- **Rendering**: Animated Pokeball spinner CSS animation

### **src/index.js**
- **Purpose**: React DOM entry point
- **Renders**: App component into `#root` div in index.html

### **public/index.html**
- **Purpose**: HTML template and root element
- **Contains**: `<div id="root"></div>` for React mounting
- **Manifest**: Links to manifest.json for PWA support

## API Integration

### Backend Endpoints Used

**GET /api/pokemons** (with query parameters)
```javascript
fetch(`${API_BASE_URL}/api/pokemons`)
// Response: { success: true, count: X, data: [...] }
```

**GET /api/types**
```javascript
fetch(`${API_BASE_URL}/api/types`)
// Response: { success: true, data: [...] }
```

### API Configuration
- **Base URL**: `process.env.REACT_APP_API_URL || 'http://localhost:3001'`
- **Proxy Config**: `"proxy": "http://localhost:3001"` in package.json (development)
- **CORS**: Handled by backend (frontend runs on port 3000, backend on 3001)

## Key Constraints & Conventions

1. **Component Structure**:
   - Functional components with React Hooks
   - Each component has associated CSS file
   - No component folders (flat structure)

2. **State Management**:
   - All state in App.js using useState/useEffect
   - Props passed down to child components
   - No Redux, Context API, or external state management

3. **Data Flow**:
   - Unidirectional: API → App state → Components
   - Child components are presentational (receive props only)
   - Callbacks bubble up to App for state updates

4. **Styling**:
   - CSS files co-located with components
   - Global styles in index.css and App.css
   - CSS-in-JS not used (plain CSS only)
   - Responsive design with media queries

5. **Filter Behavior**:
   - Client-side filtering applied by App component
   - Server-side filtering not used (could be optimized)
   - Filters are combined with AND logic
   - Case-insensitive matching

6. **Error Handling**:
   - Try-catch around API fetch
   - Graceful fallback for image loading errors
   - User-friendly error messages
   - Retry button that reloads page

7. **Loading States**:
   - Shows spinner while data loads
   - Conditional rendering based on loading/error states
   - Empty results message when no Pokemon match

## Component Hierarchy

```
App
├── header (h1 + p)
├── (if loading) LoadingSpinner
├── (if error) Error message + Retry button
└── (if data)
    ├── FilterBar
    │   ├── Name input
    │   ├── Type select
    │   ├── Legendary select
    │   └── Clear button (conditional)
    ├── Results info (count)
    └── Pokemon grid
        └── PokemonCard (repeated)
            ├── Image + Legendary badge
            └── Info section (name, types, ID)
```

## Styling Architecture

### Global Styles
- **index.css**: Base colors, fonts, resets
- **App.css**: Layout, grid, header, error container

### Component Styles
- **FilterBar.css**: Filter controls layout and appearance
- **PokemonCard.css**: Card styling, type badge colors, animations
- **LoadingSpinner.css**: Pokeball animation keyframes

### CSS Features Used
- **Grid Layout**: `display: grid` for Pokemon gallery
- **Flexbox**: `display: flex` for filter bar and card content
- **Glassmorphism**: Semi-transparent backgrounds with blur (modern design)
- **Animations**: Pokeball spinner rotation, hover effects
- **Type Badge Colors**: Specific colors for each Pokemon type
- **Responsive Design**: Media queries for tablet and mobile layouts

## Environment Variables

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `REACT_APP_API_URL` | Backend API base URL | http://localhost:3001 | https://api.example.com |

**Note**: Variables must start with `REACT_APP_` to be accessible in Create React App

## Development Workflow

### Scripts
- **npm start**: Start development server (port 3000)
- **npm run build**: Create optimized production build
- **npm test**: Run tests with Jest/react-scripts
- **npm run docker:build**: Build Docker image
- **npm run docker:run**: Run Docker container

### Development Server
- Hot reload on file changes
- Proxy to backend API (configured in package.json)
- Error overlay in browser

### Production Build
- Minified and optimized code
- Served via Nginx (see Docker config)
- Static file caching enabled

## Important Assumptions & Notes

1. **Backend Availability**: Assumes Pokemon Backend is running and accessible
2. **CORS Not an Issue**: Backend has CORS enabled for all origins
3. **No Error Recovery**: Failed loads require manual page reload
4. **Client-Side Filtering**: Filtering happens on frontend (redundant with server filtering)
5. **No Persistence**: No local storage - state lost on refresh
6. **Image URLs**: Depends on external PokeAPI sprite URLs
7. **Modern Browser**: Requires ES6 support (no IE11 compatibility)
8. **No Service Worker**: No offline capability

## Code Generation Guidelines

When extending this frontend:

1. **Create new components** in `src/components/` with `.js` and `.css` pair
2. **Fetch new data endpoints** in App.js useEffect hooks
3. **Pass data as props** - maintain unidirectional data flow
4. **Add to state** in App.js if filters/data need to be global
5. **Use the same CSS patterns** for consistency (flexbox, grid, responsive)
6. **Handle loading and error states** for any new API calls
7. **Update component tree** documentation when adding components
8. **Test filtering logic** with edge cases (empty, case variations)

## Docker & Production

### Multi-Stage Build
1. **Build Stage**: Node.js image builds React app with `npm run build`
2. **Production Stage**: Nginx serves static files from build directory

### Nginx Configuration
- Static file serving with caching headers
- Client-side routing support (fallback to index.html)
- Security headers (X-Frame-Options, etc.)
- Gzip compression for smaller file sizes

### Container Execution
```bash
docker build -t pokemon-frontend .
docker run -p 3000:80 pokemon-frontend
```

Note: Frontend accessible on port 80 in container (3000 from docker-compose)

## Related Documentation

- **README.md**: Installation, features, and browser support
- **package.json**: Dependencies and build scripts
- **ARCHITECTURE.md**: System-level design and data flow
- **Backend**: Connected to pokemon-backend via HTTP API calls
