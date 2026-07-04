# Architecture Overview - Pokemon Frontend

This document provides a comprehensive overview of the Pokemon Frontend application architecture.

## System Overview

The Pokemon Frontend is a React-based Single Page Application (SPA) that provides an interactive interface for browsing and filtering Pokemon data. It communicates with the Pokemon Backend API to fetch and display data.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Pokemon Frontend                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────────────────┐│
│  │   index.js  │───>│    App.js    │───>│     Component Tree          ││
│  │  (Entry)    │    │ (Root State) │    │  ┌─────────────────────────┐││
│  └─────────────┘    └──────────────┘    │  │      FilterBar          │││
│                            │            │  ├─────────────────────────┤││
│                            v            │  │    LoadingSpinner       │││
│                     ┌──────────────┐    │  ├─────────────────────────┤││
│                     │    Hooks     │    │  │    PokemonCard (n)      │││
│                     │  useState    │    │  └─────────────────────────┘││
│                     │  useEffect   │    └─────────────────────────────┘│
│                     └──────────────┘                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/REST
                                    v
                          ┌─────────────────┐
                          │  Backend API    │
                          │  (port 3001)    │
                          └─────────────────┘
```

## Architecture Pattern

### Component-Based Architecture

The application follows React's component-based architecture with:

- **Functional Components**: All components are functional using React Hooks
- **Unidirectional Data Flow**: Data flows down through props
- **Centralized State**: Main state lives in `App.js`
- **Presentational Components**: Child components focus on rendering

### Component Hierarchy

```
App (Container)
│
├── LoadingSpinner (Presentational)
│   └── CSS Animation
│
├── Error Display (Inline)
│   └── Retry Button
│
├── FilterBar (Smart)
│   ├── Name Input
│   ├── Type Dropdown
│   ├── Legendary Dropdown
│   └── Clear Button
│
└── Pokemon Grid (Layout)
    └── PokemonCard (Presentational) × N
        ├── Image
        ├── Name
        ├── Type Badges
        └── Legendary Badge
```

## Directory Structure Analysis

### `/public` - Static Assets

Contains static files served directly:

| File | Purpose |
|------|---------|
| `index.html` | HTML template with root div |
| `manifest.json` | PWA configuration |

See: [public/README.md](./public/README.md)

### `/src` - Source Code

Main application source code:

| File/Dir | Purpose |
|----------|---------|
| `index.js` | React DOM entry point |
| `App.js` | Root component with state |
| `App.css` | Global app styles |
| `index.css` | Base CSS styles |
| `components/` | Reusable UI components |

See: [src/README.md](./src/README.md)

### `/src/components` - UI Components

Reusable component library:

| Component | Files | Purpose |
|-----------|-------|---------|
| FilterBar | `.js`, `.css` | Search and filter controls |
| PokemonCard | `.js`, `.css` | Pokemon display card |
| LoadingSpinner | `.js`, `.css` | Loading animation |

See: [src/components/README.md](./src/components/README.md)

### `/.tr-codegen` - Deployment

Docker and deployment configuration:

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage container build |
| `docker-compose.yml` | Full-stack orchestration |
| `nginx.conf` | Production web server |

## Data Flow

### Initial Load Sequence

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Mount   │────>│ Fetch   │────>│ Update  │────>│ Render  │
│ App     │     │ Data    │     │ State   │     │ Cards   │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │
     │               v               v               v
     │         ┌─────────┐     ┌─────────┐     ┌─────────┐
     │         │ /api/   │     │pokemons │     │Pokemon  │
     │         │pokemons │     │types    │     │Card × N │
     │         │ /api/   │     │filters  │     │         │
     │         │ types   │     │         │     │         │
     │         └─────────┘     └─────────┘     └─────────┘
     │
     └──> Show LoadingSpinner while fetching
```

### Filter Flow

```
User Input ──> FilterBar ──> onFilterChange ──> App (setFilters)
                                                      │
                                                      v
                                               useEffect trigger
                                                      │
                                                      v
                                               applyFilters()
                                                      │
                                                      v
                                               setFilteredPokemons
                                                      │
                                                      v
                                               Re-render grid
```

## State Architecture

### State Location

All application state resides in `App.js`:

```javascript
// Data State
pokemons          // Complete dataset from API
filteredPokemons  // Currently displayed subset
types             // Available type options

// Filter State
filters: {
  name: '',       // Search string
  type: '',       // Selected type
  legendary: ''   // Legendary filter
}

// UI State
loading           // Loading indicator
error             // Error message
```

### State Updates

| Action | State Changed | Effect |
|--------|---------------|--------|
| Initial fetch | pokemons, types, loading | Populate data |
| Type filter | filters.type | Re-filter data |
| Name search | filters.name | Re-filter data |
| Legendary toggle | filters.legendary | Re-filter data |
| Clear filters | filters | Reset all filters |
| API error | error, loading | Show error UI |

## Styling Architecture

### CSS Organization

```
src/
├── index.css          # Base/reset styles
├── App.css            # Layout and global styles
└── components/
    ├── FilterBar.css      # Filter component styles
    ├── PokemonCard.css    # Card component styles
    └── LoadingSpinner.css # Spinner animation
```

### Design System

| Aspect | Implementation |
|--------|----------------|
| Layout | CSS Grid with auto-fill |
| Effects | Glassmorphism (backdrop-filter) |
| Colors | CSS gradients |
| Animation | CSS keyframes |
| Responsiveness | Media queries |

### Type Color Mapping

```css
.type-fire     → #ff6b6b to #ff8e53
.type-water    → #4ecdc4 to #44a08d
.type-grass    → #95e1d3 to #68d391
.type-electric → #fce38a to #f9ca24
.type-psychic  → #e056fd to #c44569
.type-ice      → #74b9ff to #0984e3
.type-dragon   → #a29bfe to #6c5ce7
.type-flying   → #fd79a8 to #fdcb6e
.type-poison   → #6c5ce7 to #a29bfe
```

## Build and Deployment

### Development Build

```
npm start
    │
    v
react-scripts start
    │
    v
Webpack Dev Server (port 3000)
    │
    ├── Hot Module Replacement
    ├── Proxy to backend (3001)
    └── Source maps enabled
```

### Production Build

```
npm run build
    │
    v
react-scripts build
    │
    v
/build directory
    │
    ├── Static HTML
    ├── Minified JS bundles
    ├── Optimized CSS
    └── Asset manifest
```

### Docker Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Build                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Stage 1: Builder (node:20-alpine)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ npm install → npm run build → /app/build            │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          v                                  │
│  Stage 2: Runtime (nginx:alpine)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ COPY build → /usr/share/nginx/html                  │   │
│  │ COPY nginx.conf → /etc/nginx/conf.d/                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Integration Architecture

### Full-Stack Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                  Docker Compose Network                      │
│                  (pokemon-network)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐        │
│  │   Frontend          │    │   Backend           │        │
│  │   (nginx:alpine)    │───>│   (node:18-alpine)  │        │
│  │   Port: 3002:80     │    │   Port: 3001:3001   │        │
│  └─────────────────────┘    └─────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Performance Considerations

### Current Optimizations

- Client-side filtering (no API calls on filter change)
- Parallel data fetching (Promise.all)
- CSS animations (GPU accelerated)
- React strict mode for detecting issues

### Future Optimizations

- Implement React.memo for PokemonCard
- Add virtualization for large datasets
- Implement service worker for caching
- Add code splitting for larger apps

## Error Handling

```
API Error ──> catch block ──> setError() ──> Error UI
                                               │
                                               v
                                          Retry Button
                                               │
                                               v
                                          window.reload()
```

## File Reference

| Path | Purpose | Details |
|------|---------|---------|
| `src/index.js` | Entry | React DOM render |
| `src/App.js` | Root | State and layout |
| `src/components/` | Components | UI building blocks |
| `public/` | Static | HTML and manifest |
| `.tr-codegen/` | Deploy | Docker configs |
