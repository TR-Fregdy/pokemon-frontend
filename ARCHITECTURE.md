# Architecture Overview - Pokemon Frontend

This document provides a comprehensive overview of the Pokemon Frontend application architecture for developers and decision-makers.

## System Context

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Pokemon System                                  │
│                                                                          │
│  ┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐      │
│  │   Browser   │     │  Pokemon         │     │  Pokemon         │      │
│  │   (User)    │────>│  Frontend        │────>│  Backend API     │      │
│  │             │     │  (This Repo)     │     │  Port: 3001      │      │
│  └─────────────┘     │  Port: 3000/3002 │     └──────────────────┘      │
│                      └──────────────────┘              │                 │
│                              │                         │                 │
│                              │                         v                 │
│                              │                 ┌──────────────────┐      │
│                              │                 │  PokeAPI         │      │
│                              └────────────────>│  Sprites         │      │
│                            (Image URLs)        │  (GitHub)        │      │
│                                                └──────────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Application Architecture

### Component-Based Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         App Component                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ State: pokemons, filteredPokemons, types, filters,      │    │
│  │        loading, error                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│              ┌───────────────┼───────────────┐                  │
│              │               │               │                  │
│              v               v               v                  │
│       ┌──────────┐    ┌───────────┐   ┌──────────────┐         │
│       │ Loading  │    │ FilterBar │   │ PokemonCard  │         │
│       │ Spinner  │    │           │   │ (multiple)   │         │
│       └──────────┘    └───────────┘   └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
pokemon-frontend/
├── public/                    # Static assets
│   ├── index.html             # HTML template
│   └── manifest.json          # PWA manifest
├── src/                       # Source code
│   ├── components/            # Reusable components
│   │   ├── PokemonCard.js     # Pokemon display card
│   │   ├── PokemonCard.css
│   │   ├── FilterBar.js       # Filter controls
│   │   ├── FilterBar.css
│   │   ├── LoadingSpinner.js  # Loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js                 # Main component
│   ├── App.css                # App styles
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── .tr-codegen/               # Deployment files
│   ├── Dockerfile             # Multi-stage Docker build
│   ├── docker-compose.yml     # Container orchestration
│   └── nginx.conf             # Production server config
├── package.json               # Dependencies
├── .env.example               # Environment template
└── README.md                  # Documentation
```

### Directory Breakdown

| Directory | Purpose | Key Contents |
|-----------|---------|--------------|
| `public/` | Static assets served as-is | HTML template, manifest |
| `src/` | React application source | Components, styles, entry point |
| `src/components/` | Reusable UI components | Cards, filters, spinners |
| `.tr-codegen/` | Deployment configuration | Docker, Nginx config |

For detailed information about each directory, see:
- [src/components/README.md](src/components/README.md)

## Data Flow

### Initial Load

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌──────────┐
│ App     │     │ Backend │     │ App     │     │ UI       │
│ Mounts  │────>│ API     │────>│ State   │────>│ Renders  │
│         │     │ Fetch   │     │ Updates │     │ Pokemon  │
└─────────┘     └─────────┘     └─────────┘     └──────────┘
     │
     v
┌───────────────┐
│ Show Loading  │
│ Spinner       │
└───────────────┘
```

### Filter Flow

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ User    │     │ FilterBar│     │ App      │     │ Pokemon  │
│ Input   │────>│ onChange │────>│ useEffect│────>│ Grid     │
│         │     │          │     │ Filter   │     │ Updates  │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
```

## State Architecture

### State Location & Purpose

```javascript
// App.js - Central State Management
{
  pokemons: [],           // Source of truth - all Pokemon from API
  filteredPokemons: [],   // Derived - filtered Pokemon for display
  types: [],              // Reference data - available Pokemon types
  filters: {              // User input state
    name: '',
    type: '',
    legendary: ''
  },
  loading: boolean,       // UI state - loading indicator
  error: string | null    // UI state - error message
}
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     STATE MANAGEMENT                         │
│                                                              │
│  ┌──────────────┐    useEffect     ┌──────────────────┐     │
│  │   pokemons   │───────────────>  │ filteredPokemons │     │
│  │   (source)   │                  │    (derived)     │     │
│  └──────────────┘                  └──────────────────┘     │
│         ^                                   │                │
│         │ API Fetch                         │ Display        │
│         │                                   v                │
│  ┌──────────────┐                  ┌──────────────────┐     │
│  │   Backend    │                  │  PokemonCard[]   │     │
│  │     API      │                  │                  │     │
│  └──────────────┘                  └──────────────────┘     │
│                                                              │
│  ┌──────────────┐    onChange      ┌──────────────────┐     │
│  │   FilterBar  │───────────────>  │     filters      │     │
│  │              │                  │   (triggers      │     │
│  └──────────────┘                  │    useEffect)    │     │
│                                    └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Details

| Component | Type | Props | Responsibility |
|-----------|------|-------|----------------|
| `App` | Container | None | State management, layout |
| `FilterBar` | Presentational | filters, types, callbacks | User input for filtering |
| `PokemonCard` | Presentational | pokemon | Display single Pokemon |
| `LoadingSpinner` | Presentational | None | Loading animation |

### Props Flow

```
          App
           │
    ┌──────┴──────┐
    │             │
    v             v
FilterBar     PokemonCard[]
    │             │
    │ filters     │ pokemon
    │ types       │
    │ onFilterChange
    │ onClearFilters
```

## Styling Architecture

### CSS Organization

```
┌─────────────────────────────────────────────────────────────┐
│                     CSS LAYERS                               │
├─────────────────────────────────────────────────────────────┤
│  1. index.css        │ Global resets, base typography       │
│  2. App.css          │ Layout, grid, responsive breakpoints │
│  3. Component.css    │ Component-specific styles            │
└─────────────────────────────────────────────────────────────┘
```

### Design System

| Element | Style Approach |
|---------|----------------|
| Background | Gradient (`#667eea` to `#764ba2`) |
| Cards | Glassmorphism (blur + transparency) |
| Buttons | Gradient backgrounds with hover transforms |
| Animations | CSS keyframes (spin, pulse, sparkle) |
| Type badges | Type-specific gradient colors |

### Responsive Breakpoints

| Breakpoint | Grid Columns | Adjustments |
|------------|--------------|-------------|
| > 768px | Auto-fill 280px+ | Full layout |
| ≤ 768px | Auto-fill 250px+ | Smaller gaps, stacked filters |

## API Integration

### Backend Communication

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Initial data fetch (on mount)
Promise.all([
  fetch(`${API_BASE_URL}/api/pokemons`),
  fetch(`${API_BASE_URL}/api/types`)
]);
```

### Error Handling

```
┌─────────────────────────────────────────┐
│           Error States                   │
├─────────────────────────────────────────┤
│ Network Error  → Show error container    │
│ Empty Results  → Show "No Pokemon found" │
│ Image Error    → Fallback placeholder    │
│ Loading        → Show pokeball spinner   │
└─────────────────────────────────────────┘
```

## Build & Deployment

### Development Environment

```
npm start
    │
    v
┌─────────────────────────────────────────┐
│  Create React App Dev Server            │
│  - Hot Module Replacement               │
│  - Proxy to backend (package.json)      │
│  - Port: 3000                           │
└─────────────────────────────────────────┘
```

### Production Build

```
npm run build
    │
    v
┌─────────────────────────────────────────┐
│  Optimized Production Build             │
│  - Minified JS/CSS                      │
│  - Code splitting                       │
│  - Static assets in /build              │
└─────────────────────────────────────────┘
```

### Docker Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                Multi-Stage Docker Build                      │
│                                                              │
│  Stage 1: Builder (node:20-alpine)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ npm install → npm run build → /app/build              │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           v                                  │
│  Stage 2: Runtime (nginx:alpine)                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ COPY build/ → /usr/share/nginx/html                   │  │
│  │ nginx.conf → SPA routing support                      │  │
│  │ Port: 80 (mapped to 3002)                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Docker Compose Network

```
┌─────────────────────────────────────────────────────────────┐
│                 pokemon-network (bridge)                     │
│                                                              │
│  ┌─────────────────┐          ┌─────────────────┐           │
│  │ main_app_web    │          │ main_app_pokemon│           │
│  │ (Frontend)      │ -------> │ (Backend)       │           │
│  │ Port: 3002:80   │          │ Port: 3001:3001 │           │
│  └─────────────────┘          └─────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Performance Considerations

### Current Implementation

| Aspect | Approach | Impact |
|--------|----------|--------|
| Initial Load | Fetch all data | Single network request |
| Filtering | Client-side | Instant, no network |
| Images | External CDN | Parallel loading |
| Bundle | CRA defaults | ~200KB gzipped |

### Optimization Opportunities

1. **Lazy Loading**: Split code for large features
2. **Image Optimization**: Use smaller sprites or lazy load
3. **Memoization**: `useMemo` for filtered results
4. **Virtual List**: For large Pokemon datasets

## Security Considerations

| Aspect | Current | Recommendation |
|--------|---------|----------------|
| API URL | Environment variable | Use HTTPS in production |
| CORS | Backend handles | Validate frontend origin |
| Input | Sanitized by React | No XSS concerns |
| Auth | None | Add if user features needed |

## Future Architecture Considerations

### Potential Improvements

1. **State Management**: Redux/Zustand for complex state
2. **Routing**: React Router for multi-page features
3. **TypeScript**: Type safety for components and API
4. **Testing**: Jest + React Testing Library
5. **Storybook**: Component documentation
6. **PWA**: Service worker for offline support

### Scalability Path

```
Current:                    Future Potential:
┌──────────────┐            ┌──────────────────┐
│  Single Page │            │  Multi-Page SPA  │
│  App (SPA)   │    ──>     │  with Routing    │
│              │            │                  │
│ Client-side  │            │ Server-side +    │
│ Filter       │            │ Client Filter    │
└──────────────┘            └──────────────────┘
```
