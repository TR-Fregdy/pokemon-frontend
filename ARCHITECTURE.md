# Architecture Overview - Pokemon Frontend

This document provides a comprehensive overview of the Pokemon Frontend application architecture.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Pokemon Frontend Application                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         src/App.js                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │   State     │  │   Effects   │  │     Event Handlers      │  │   │
│  │  │ Management  │  │ (useEffect) │  │  (filter, clear, etc)   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│              ┌───────────────┼───────────────┐                         │
│              ▼               ▼               ▼                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          │
│  │   FilterBar     │ │  PokemonCard    │ │ LoadingSpinner  │          │
│  │   Component     │ │   Component     │ │   Component     │          │
│  │                 │ │                 │ │                 │          │
│  │ - Name search   │ │ - Image display │ │ - Pokeball      │          │
│  │ - Type filter   │ │ - Type badges   │ │   animation     │          │
│  │ - Legendary     │ │ - Legendary     │ │                 │          │
│  │   filter        │ │   badge         │ │                 │          │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP (fetch)
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     Pokemon Backend API                                  │
│                   (http://localhost:3001)                               │
└─────────────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
pokemon-frontend/
├── public/                    # Static assets and HTML template
│   ├── index.html            # Main HTML file
│   └── manifest.json         # PWA manifest
├── src/                       # Application source code
│   ├── components/           # Reusable React components
│   │   ├── FilterBar.js      # Search and filter controls
│   │   ├── FilterBar.css
│   │   ├── PokemonCard.js    # Pokemon display card
│   │   ├── PokemonCard.css
│   │   ├── LoadingSpinner.js # Loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js                # Main application component
│   ├── App.css               # Main application styles
│   ├── index.js              # React entry point
│   └── index.css             # Global styles
├── .tr-codegen/              # Docker configuration
│   ├── Dockerfile            # Multi-stage build
│   ├── docker-compose.yml    # Full-stack orchestration
│   └── nginx.conf            # Production server config
├── package.json              # Dependencies and scripts
├── .env.example              # Environment template
└── README.md                 # Project documentation
```

For detailed information about each directory, see:
- [src/ README](./src/README.md)
- [src/components/ README](./src/components/README.md)
- [public/ README](./public/README.md)

## Component Architecture

### Component Hierarchy

```
App (Container)
├── Header
│   └── Title & Description
├── LoadingSpinner (conditional)
├── Error Display (conditional)
└── Main Content
    ├── FilterBar
    │   ├── Name Input
    │   ├── Type Select
    │   ├── Legendary Select
    │   └── Clear Button
    ├── Results Info
    ├── No Results (conditional)
    └── Pokemon Grid
        └── PokemonCard (×n)
            ├── Image Container
            │   ├── Pokemon Image
            │   └── Legendary Badge
            └── Info Section
                ├── Name
                ├── Type Badges
                └── ID
```

### Component Responsibilities

| Component | Responsibilities |
|-----------|-----------------|
| **App** | State management, API calls, filtering logic, layout |
| **FilterBar** | User input handling, filter state display |
| **PokemonCard** | Pokemon data display, type styling |
| **LoadingSpinner** | Loading state visualization |

## Data Flow

```
┌───────────────┐
│  API Request  │ ──────────────────────────────────────────────────┐
└───────────────┘                                                   │
       │                                                            │
       ▼                                                            │
┌───────────────┐      ┌───────────────┐      ┌───────────────┐    │
│   pokemons    │ ───▶ │    filters    │ ───▶ │ filteredPokemon│   │
│    (state)    │      │   (state)     │      │    (state)    │    │
└───────────────┘      └───────────────┘      └───────────────┘    │
                              ▲                       │              │
                              │                       ▼              │
                       ┌──────┴──────┐         ┌───────────────┐    │
                       │  FilterBar  │         │  Pokemon Grid │    │
                       │  Component  │         │ (PokemonCards)│    │
                       └─────────────┘         └───────────────┘    │
                              │                                      │
                              └──────────── User Interaction ◄───────┘
```

## State Management

### State Variables

```javascript
// App.js State
{
  pokemons: Pokemon[],          // Full list from API
  filteredPokemons: Pokemon[],  // After filters applied
  types: string[],              // Available Pokemon types
  filters: {
    name: string,               // Name search term
    type: string,               // Selected type
    legendary: string           // '', 'true', or 'false'
  },
  loading: boolean,             // API loading state
  error: string | null          // Error message
}
```

### State Updates Flow

```
User Action → Event Handler → setFilters() → useEffect → setFilteredPokemons()
```

## Styling Architecture

### CSS Strategy

```
┌─────────────────────────────────────────────┐
│              Global Styles                   │
│  ┌─────────────────────────────────────┐    │
│  │          index.css                   │    │
│  │  - Font families                     │    │
│  │  - Base reset                        │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│           Application Styles                 │
│  ┌─────────────────────────────────────┐    │
│  │           App.css                    │    │
│  │  - Layout (grid, flex)              │    │
│  │  - Header styles                    │    │
│  │  - Responsive breakpoints           │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│          Component Styles                    │
│  ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  │FilterBar   │ │PokemonCard │ │Loading   │ │
│  │.css        │ │.css        │ │Spinner   │ │
│  │            │ │            │ │.css      │ │
│  └────────────┘ └────────────┘ └──────────┘ │
└─────────────────────────────────────────────┘
```

### Design System

| Element | Value |
|---------|-------|
| Primary Gradient | `#667eea → #764ba2` |
| Header Gradient | `#ff6b6b → #4ecdc4` |
| Card Background | `rgba(255, 255, 255, 0.95)` |
| Border Radius | 8px (inputs), 12px (cards), 16px (large cards) |
| Transition | 0.3s ease |

### Pokemon Type Colors

```css
Fire:     #ff6b6b → #ff8e53
Water:    #4ecdc4 → #44a08d
Grass:    #95e1d3 → #68d391
Electric: #fce38a → #f9ca24
Psychic:  #e056fd → #c44569
Ice:      #74b9ff → #0984e3
Dragon:   #a29bfe → #6c5ce7
Flying:   #fd79a8 → #fdcb6e
Poison:   #6c5ce7 → #a29bfe
```

## API Integration

### Fetch Pattern

```javascript
// Initial data fetch on mount
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [pokemonRes, typesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/pokemons`),
        fetch(`${API_BASE_URL}/api/types`)
      ]);
      // Handle responses...
    } catch (err) {
      setError('Failed to load...');
    } finally {
      setLoading(false);
    }
  };
  fetchInitialData();
}, []);
```

### Error Handling Strategy

```
API Error → catch block → setError() → Error UI rendered → Retry button
```

## Build & Deployment

### Development Flow

```
npm start
    │
    ▼
Create React App Dev Server (port 3000)
    │
    ▼
Hot Module Replacement (HMR)
    │
    ▼
Proxy to Backend (port 3001)
```

### Production Build

```
npm run build
    │
    ▼
┌─────────────────────────┐
│  Webpack Compilation    │
│  - Minification         │
│  - Tree shaking         │
│  - Asset optimization   │
└─────────────────────────┘
    │
    ▼
build/ directory (static files)
```

### Docker Deployment

```
┌─────────────────────────────────────────────────┐
│              Build Stage                         │
│  node:20-alpine                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  npm install → npm run build              │  │
│  │  Output: /app/build/                      │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│            Production Stage                      │
│  nginx:alpine                                   │
│  ┌───────────────────────────────────────────┐  │
│  │  COPY build/ → /usr/share/nginx/html/     │  │
│  │  nginx.conf for SPA routing               │  │
│  │  Serves on port 80                        │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Performance Considerations

### Current Optimizations
- Client-side filtering (no API calls on filter change)
- Parallel API requests on initial load
- CSS transitions instead of JavaScript animations
- Functional components (smaller bundle)

### Future Improvements
- React.memo for PokemonCard components
- Virtual scrolling for large lists
- Image lazy loading
- Service worker for offline support
- Code splitting

## Security Considerations

### Current Implementation
- No user authentication
- Environment variables for API URL
- No sensitive data handling

### Production Recommendations
- HTTPS only
- Content Security Policy headers
- XSS protection
- API URL validation
