# Architecture Overview - Pokemon Frontend

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Pokemon Frontend                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        App Component                         │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │                    State Management                  │    │   │
│  │  │  pokemons | filteredPokemons | types | filters      │    │   │
│  │  │  loading | error                                    │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│              ┌───────────────┼───────────────┐                     │
│              v               v               v                      │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │   FilterBar   │  │ LoadingSpinner│  │  PokemonCard  │          │
│  │   Component   │  │   Component   │  │   Component   │          │
│  └───────────────┘  └───────────────┘  └───────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              v
┌─────────────────────────────────────────────────────────────────────┐
│                       Pokemon Backend API                            │
│                    (http://localhost:3001)                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
index.js
└── App.js
    ├── Header (inline)
    ├── LoadingSpinner.js (conditional)
    ├── Error View (conditional, inline)
    ├── FilterBar.js
    ├── Results Info (inline)
    ├── No Results View (conditional, inline)
    └── Pokemon Grid
        └── PokemonCard.js (repeated)
```

## Data Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  API Fetch   │───>│  App State   │───>│   Render     │
│  (useEffect) │    │  (useState)  │    │  Components  │
└──────────────┘    └──────────────┘    └──────────────┘
                          │
                          v
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   FilterBar  │───>│   Filters    │───>│   Filtered   │
│    Input     │    │   State      │    │   Display    │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Component Responsibilities

### App.js (Container Component)
- Manages all application state
- Fetches initial data from API
- Applies filters to Pokemon list
- Handles loading and error states
- Orchestrates child components

### FilterBar.js (Input Component)
- Renders search input and select dropdowns
- Receives filter state as props
- Calls parent handler on input changes
- Shows clear button when filters active

### PokemonCard.js (Display Component)
- Renders individual Pokemon information
- Displays image, name, types, and ID
- Shows legendary badge for special Pokemon
- Handles image loading errors

### LoadingSpinner.js (UI Component)
- Displays animated Pokeball spinner
- Shown during API fetch operations
- Pure presentational component

## State Architecture

```javascript
// Centralized state in App.js
{
  pokemons: Pokemon[],        // All Pokemon from API
  filteredPokemons: Pokemon[], // Currently displayed
  types: string[],            // Available type options
  filters: {
    name: string,             // Search text
    type: string,             // Selected type
    legendary: string         // '' | 'true' | 'false'
  },
  loading: boolean,           // API request in progress
  error: string | null        // Error message
}
```

## API Integration

### Initial Load (useEffect)
```
Component Mount
      │
      v
┌─────────────────┐
│ setLoading(true)│
└────────┬────────┘
         │
         v
┌─────────────────────────────────┐
│ Promise.all([                   │
│   fetch('/api/pokemons'),       │
│   fetch('/api/types')           │
│ ])                              │
└────────────────┬────────────────┘
                 │
         ┌───────┴───────┐
         │               │
    Success           Failure
         │               │
         v               v
┌─────────────┐  ┌─────────────┐
│ Set Pokemon │  │ Set Error   │
│ & Types     │  │ Message     │
└─────────────┘  └─────────────┘
         │               │
         └───────┬───────┘
                 v
       ┌─────────────────┐
       │setLoading(false)│
       └─────────────────┘
```

## CSS Architecture

```
src/
├── index.css          # Global reset and base styles
├── App.css            # Layout and container styles
└── components/
    ├── FilterBar.css      # Filter controls styling
    ├── PokemonCard.css    # Card and type badge styles
    └── LoadingSpinner.css # Pokeball animation
```

### Design Patterns Used
- **Glassmorphism**: Semi-transparent backgrounds with blur
- **CSS Grid**: Responsive card layout
- **CSS Variables**: (potential for theming)
- **BEM-like naming**: Component-scoped class names

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Container                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                Build Stage (Node.js)                   │ │
│  │  npm install → npm run build → /app/build/            │ │
│  └───────────────────────────────────────────────────────┘ │
│                           │                                 │
│                           v                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Production Stage (Nginx)                  │ │
│  │                                                       │ │
│  │  /usr/share/nginx/html/ ← Static build files         │ │
│  │                                                       │ │
│  │  nginx.conf:                                         │ │
│  │  - Serves static files                               │ │
│  │  - SPA routing fallback                              │ │
│  │  - Port 80                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Module Dependencies

```
pokemon-frontend
    │
    ├── react (18.2.0)
    │   └── UI component library
    │
    ├── react-dom (18.2.0)
    │   └── DOM rendering
    │
    └── react-scripts (5.0.1)
        └── Build tooling (webpack, babel, etc.)
```

## Key Design Decisions

### 1. Client-Side Filtering
Filtering happens in the browser after all data is loaded. This reduces API calls but requires all data to fit in memory.

### 2. No State Management Library
useState/useEffect hooks are sufficient for this app's complexity. Redux/MobX would add unnecessary overhead.

### 3. CSS Per Component
Each component has its own CSS file for maintainability. CSS Modules or styled-components could be alternatives.

### 4. No Router
Single-page view with no navigation. React Router would be needed for multi-page features.

## Future Scalability Considerations

| Current State | Potential Enhancement |
|---------------|----------------------|
| Client-side filtering | Server-side pagination |
| Local state | Redux for complex state |
| Fetch API | React Query for caching |
| CSS files | CSS-in-JS or Tailwind |
| No routing | React Router |
| No testing | Jest + React Testing Library |
