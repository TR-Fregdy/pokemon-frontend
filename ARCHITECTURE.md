# Architecture Overview - Pokemon Frontend

This document provides a comprehensive architectural overview of the Pokemon Frontend application.

## Table of Contents

- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Directory Structure](#directory-structure)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Styling Architecture](#styling-architecture)
- [Deployment Architecture](#deployment-architecture)

## System Overview

The Pokemon Frontend is a React-based Single Page Application that provides a user interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch data and implements client-side filtering.

### Key Characteristics

| Aspect | Implementation |
|--------|----------------|
| Framework | React 18 with Hooks |
| Build Tool | Create React App |
| State Management | Local component state (useState) |
| Styling | CSS3 with modular files |
| Deployment | Nginx in Docker |

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Pokemon Frontend                                  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         index.js                                    │ │
│  │                    (React DOM Entry Point)                          │ │
│  │                            │                                        │ │
│  │                            ▼                                        │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │                        App.js                                │   │ │
│  │  │               (Main Container Component)                     │   │ │
│  │  │                                                              │   │ │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │   │ │
│  │  │  │   State     │  │   Effects   │  │      Handlers        │ │   │ │
│  │  │  │ - pokemons  │  │ - fetchData │  │ - handleFilterChange │ │   │ │
│  │  │  │ - filtered  │  │ - applyFilt │  │ - clearFilters       │ │   │ │
│  │  │  │ - types     │  │             │  │                      │ │   │ │
│  │  │  │ - filters   │  │             │  │                      │ │   │ │
│  │  │  │ - loading   │  │             │  │                      │ │   │ │
│  │  │  │ - error     │  │             │  │                      │ │   │ │
│  │  │  └─────────────┘  └─────────────┘  └──────────────────────┘ │   │ │
│  │  │                            │                                 │   │ │
│  │  │            ┌───────────────┼───────────────┐                │   │ │
│  │  │            ▼               ▼               ▼                │   │ │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │   │ │
│  │  │  │  FilterBar  │  │ PokemonCard │  │LoadingSpinner│        │   │ │
│  │  │  │  (filters)  │  │  (display)  │  │  (loading)  │         │   │ │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘         │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  External API: http://localhost:3001                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
pokemon-frontend/
├── public/                    # Static assets (see public/README.md)
│   ├── index.html             # HTML template
│   └── manifest.json          # PWA manifest
├── src/                       # Source code (see src/README.md)
│   ├── components/            # UI components (see src/components/README.md)
│   │   ├── PokemonCard.js     # Pokemon display card
│   │   ├── PokemonCard.css
│   │   ├── FilterBar.js       # Filter controls
│   │   ├── FilterBar.css
│   │   ├── LoadingSpinner.js  # Loading indicator
│   │   └── LoadingSpinner.css
│   ├── App.js                 # Main container component
│   ├── App.css                # Application styles
│   ├── index.js               # React entry point
│   └── index.css              # Base styles
├── .tr-codegen/               # Docker configs
│   ├── Dockerfile             # Multi-stage build
│   ├── docker-compose.yml     # Full-stack orchestration
│   └── nginx.conf             # Production server config
├── package.json               # Dependencies
├── .env.example               # Environment template
├── .gitignore                 # Git exclusions
└── .dockerignore              # Docker exclusions
```

## Component Architecture

### Component Hierarchy

```
<React.StrictMode>
  └── <App>                           # Container Component
      ├── <header>                    # Static header
      ├── <LoadingSpinner />          # Conditional: loading state
      ├── <div.error-container>       # Conditional: error state
      └── <main.main-content>         # Conditional: success state
          ├── <FilterBar />           # Filter controls
          ├── <div.results-info>      # Result count
          ├── <div.no-results>        # Conditional: empty results
          └── <div.pokemon-grid>      # Pokemon list
              └── <PokemonCard />[]   # Mapped Pokemon cards
```

### Component Specifications

#### App.js (Container)

| Responsibility | Implementation |
|----------------|----------------|
| State Management | useState for all app state |
| Data Fetching | useEffect on mount |
| Filter Logic | useEffect on filter change |
| Event Handling | handleFilterChange, clearFilters |
| Conditional Rendering | Loading, error, success states |

#### FilterBar.js (Presentational)

| Prop | Type | Purpose |
|------|------|---------|
| filters | object | Current filter values |
| types | string[] | Available type options |
| onFilterChange | function | Filter update callback |
| onClearFilters | function | Reset filters callback |

#### PokemonCard.js (Presentational)

| Prop | Type | Purpose |
|------|------|---------|
| pokemon | object | Pokemon data to display |

#### LoadingSpinner.js (Presentational)

No props - self-contained animated component.

## Data Flow

### Initial Load Flow

```
┌─────────────────┐
│  Component      │
│    Mount        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  useEffect      │────▶│  fetch()        │
│  (empty deps)   │     │  /api/pokemons  │
└─────────────────┘     │  /api/types     │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  setPokemons()  │
                        │  setTypes()     │
                        │  setFiltered()  │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Re-render      │
                        │  with data      │
                        └─────────────────┘
```

### Filter Flow

```
┌─────────────────┐
│  User Input     │
│  (FilterBar)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ handleFilterChange│
│ setFilters()    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  useEffect      │
│  (filters dep)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  applyFilters() │
│  (client-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│setFilteredPokemons│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Re-render      │
│  PokemonCards   │
└─────────────────┘
```

### State Shape

```javascript
{
  pokemons: [                    // Original data from API
    { id, name, type[], legendary, image }
  ],
  filteredPokemons: [            // Filtered subset
    { id, name, type[], legendary, image }
  ],
  types: ['Dragon', 'Electric', ...],  // Filter options
  filters: {
    name: '',                    // Text search
    type: '',                    // Type dropdown
    legendary: ''                // '' | 'true' | 'false'
  },
  loading: false,
  error: null
}
```

## Styling Architecture

### CSS File Organization

```
src/
├── index.css          # Base styles, fonts
├── App.css            # Layout, grid, error/loading
└── components/
    ├── PokemonCard.css   # Card, types, badges
    ├── FilterBar.css     # Form controls
    └── LoadingSpinner.css # Animation
```

### CSS Class Naming

| Pattern | Example | Purpose |
|---------|---------|---------|
| Component class | `.pokemon-card` | Root component |
| Element class | `.pokemon-name` | Child element |
| State class | `.legendary` | Conditional style |
| Type class | `.type-fire` | Pokemon type colors |

### Responsive Breakpoints

```css
@media (max-width: 768px) {
  /* Tablet/Mobile styles */
}
```

### CSS Features Used

| Feature | Usage |
|---------|-------|
| CSS Grid | Pokemon card layout |
| Flexbox | Filter bar, card content |
| Gradients | Backgrounds, type badges |
| Animations | Loading spinner, hover effects |
| Backdrop filter | Glassmorphism effects |
| Custom properties | Theme consistency |

## Deployment Architecture

### Multi-Stage Docker Build

```
┌─────────────────────────────────────────────────────────────┐
│                    STAGE 1: Builder                         │
│                    (node:20-alpine)                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  /app                                                │   │
│  │  ├── package.json    ───▶ npm install               │   │
│  │  ├── src/            ───▶ npm run build             │   │
│  │  └── build/          ◀─── Optimized output          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STAGE 2: Runtime                         │
│                    (nginx:alpine)                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  /usr/share/nginx/html/                             │   │
│  │  ├── index.html                                     │   │
│  │  ├── static/js/*.js                                 │   │
│  │  └── static/css/*.css                               │   │
│  │                                                      │   │
│  │  /etc/nginx/conf.d/default.conf                     │   │
│  │  └── SPA routing config                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  EXPOSE: 80                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Nginx Configuration

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;

    # SPA client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker Compose Full Stack

```
┌─────────────────────────────────────────────────────────────┐
│                  pokemon-network (bridge)                    │
│                                                              │
│  ┌────────────────────────┐  ┌────────────────────────────┐ │
│  │    main_app_web        │  │  main_app_pokemon-backend  │ │
│  │    (Frontend)          │  │  (Backend)                 │ │
│  │                        │  │                            │ │
│  │  Port: 80 → 3002       │  │  Port: 3001                │ │
│  │  Image: nginx:alpine   │  │  Image: node:18-alpine     │ │
│  │                        │  │                            │ │
│  │  depends_on: backend   │──│                            │ │
│  └────────────────────────┘  └────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Design Decisions

### Why Create React App?

- **Zero Configuration**: Fast setup, no webpack config
- **Best Practices**: ESLint, testing, build optimization included
- **Community Standard**: Well-documented and maintained

### Why Local State (Not Redux)?

- **Simplicity**: Small app with limited state
- **Performance**: No overhead from global store
- **Colocation**: State close to where it's used

### Why Client-Side Filtering?

- **Responsiveness**: Instant feedback without API calls
- **Reduced Load**: Fewer requests to backend
- **Data Size**: Small dataset fits in memory

### Why Separate CSS Files?

- **Modularity**: Easy to maintain per component
- **No Build Complexity**: No CSS-in-JS setup needed
- **Familiar**: Standard CSS everyone knows

## Future Considerations

When scaling this application, consider:

1. **State Management**: Add Redux/Zustand for complex state
2. **TypeScript**: Add type safety for larger codebase
3. **Testing**: Add React Testing Library tests
4. **Code Splitting**: Lazy load components for performance
5. **API Layer**: Abstract fetch calls into service modules
6. **Error Boundaries**: Add React error boundaries
7. **Accessibility**: Add ARIA labels and keyboard navigation
8. **Internationalization**: Add i18n support with react-i18next
