# Architecture Documentation - Pokemon Frontend

This document provides a comprehensive overview of the Pokemon Frontend application architecture, designed to help developers understand the system design and make informed decisions.

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Data Flow](#data-flow)
7. [Styling Architecture](#styling-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Technology Decisions](#technology-decisions)

---

## System Overview

The Pokemon Frontend is a React-based Single Page Application (SPA) that provides an interactive interface for browsing and filtering Pokemon data. It communicates with the [Pokemon Backend](../pokemon-backend) API.

### Key Characteristics

- **SPA Architecture**: Client-side rendering with React
- **Component-Based**: Modular, reusable UI components
- **Responsive**: Mobile-first design with CSS Grid
- **Client-Side Filtering**: Immediate filter response without API calls

---

## Architecture Diagram

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                         │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        REACT APPLICATION                                │ │
│  │                                                                         │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │                           App.js                                  │  │ │
│  │  │                    (Root Component)                               │  │ │
│  │  │                                                                   │  │ │
│  │  │   ┌─────────────────────────────────────────────────────────┐    │  │ │
│  │  │   │                    STATE                                 │    │  │ │
│  │  │   │  • pokemons[]        • filters{}                        │    │  │ │
│  │  │   │  • filteredPokemons[]• loading                          │    │  │ │
│  │  │   │  • types[]           • error                            │    │  │ │
│  │  │   └─────────────────────────────────────────────────────────┘    │  │ │
│  │  │                              │                                    │  │ │
│  │  │            ┌─────────────────┼─────────────────┐                  │  │ │
│  │  │            ▼                 ▼                 ▼                  │  │ │
│  │  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │  │ │
│  │  │   │ LoadingSpinner│ │  FilterBar   │  │ PokemonCard[]│           │  │ │
│  │  │   │ (conditional) │  │              │  │ (mapped)     │           │  │ │
│  │  │   └──────────────┘  └──────────────┘  └──────────────┘           │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                 │                                       │ │
│  │                          fetch() API                                    │ │
│  │                                 │                                       │ │
│  └─────────────────────────────────┼───────────────────────────────────────┘ │
│                                    │                                          │
└────────────────────────────────────┼──────────────────────────────────────────┘
                                     │ HTTP
                                     ▼
                    ┌─────────────────────────────────┐
                    │       POKEMON BACKEND API       │
                    │    http://localhost:3001        │
                    │                                 │
                    │   GET /api/pokemons             │
                    │   GET /api/types                │
                    └─────────────────────────────────┘
                                     │
                                     ▼
                    ┌─────────────────────────────────┐
                    │       EXTERNAL RESOURCES        │
                    │   (PokeAPI Sprite Images)       │
                    │   githubusercontent.com         │
                    └─────────────────────────────────┘
```

### Component Tree

```
index.js
   │
   └─► App
        │
        ├─► [loading=true]
        │       │
        │       └─► LoadingSpinner
        │
        ├─► [error]
        │       │
        │       └─► Error Message (inline)
        │
        └─► [data loaded]
                │
                ├─► FilterBar
                │       │
                │       ├─► Name Input
                │       ├─► Type Select
                │       ├─► Legendary Select
                │       └─► Clear Button (conditional)
                │
                └─► Pokemon Grid
                        │
                        └─► PokemonCard (× n)
                                │
                                ├─► Image
                                ├─► Legendary Badge (conditional)
                                ├─► Name
                                ├─► Type Badges
                                └─► ID
```

---

## Project Structure

```
pokemon-frontend/
│
├── public/                          # Static public assets
│   ├── index.html                   # HTML entry point
│   └── manifest.json                # PWA configuration
│
├── src/                             # Source code
│   ├── index.js                     # React DOM entry point
│   ├── index.css                    # Global base styles
│   ├── App.js                       # Root component + state
│   ├── App.css                      # App layout styles
│   │
│   └── components/                  # Reusable components
│       ├── PokemonCard.js           # Individual Pokemon display
│       ├── PokemonCard.css          # Card styles + type colors
│       ├── FilterBar.js             # Filter controls
│       ├── FilterBar.css            # Filter UI styles
│       ├── LoadingSpinner.js        # Loading animation
│       └── LoadingSpinner.css       # Spinner styles
│
├── .tr-codegen/                     # Deployment configuration
│   ├── Dockerfile                   # Multi-stage build
│   ├── docker-compose.yml           # Full-stack orchestration
│   └── nginx.conf                   # Production web server
│
├── package.json                     # Dependencies & scripts
├── .env.example                     # Environment template
├── .gitignore                       # Git exclusions
├── README.md                        # User documentation
├── CLAUDE.md                        # AI agent guidance
└── ARCHITECTURE.md                  # This file
```

### Directory Documentation

| Directory | README | Description |
|-----------|--------|-------------|
| `/src` | [README](./src/README.md) | Main source code |
| `/src/components` | [README](./src/components/README.md) | React components |
| `/public` | [README](./public/README.md) | Static assets |

---

## Component Architecture

### Component Responsibilities

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| **App** | Root container, state management, data fetching | - | pokemons, filteredPokemons, types, filters, loading, error |
| **FilterBar** | User input for filters | filters, types, onFilterChange, onClearFilters | - |
| **PokemonCard** | Display single Pokemon | pokemon | - |
| **LoadingSpinner** | Loading animation | - | - |

### Component Details

#### App.js
```javascript
// Main application component
// - Manages all application state
// - Fetches data on mount
// - Handles filter logic
// - Renders conditional UI based on state
```

#### FilterBar.js
```javascript
// Filter controls component
// - Name text input (partial match)
// - Type select dropdown
// - Legendary status select
// - Clear filters button (shows when filters active)
```

#### PokemonCard.js
```javascript
// Pokemon display card
// - Shows Pokemon image with fallback
// - Displays name and ID
// - Type badges with color coding
// - Legendary indicator badge
// - Hover animation effects
```

#### LoadingSpinner.js
```javascript
// Animated Pokeball loading indicator
// - CSS-only animation
// - Displays during data fetching
```

---

## State Management

### State Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         App Component State                          │
├──────────────────┬──────────────────────────────────────────────────┤
│                  │                                                   │
│   ┌──────────────┼─────────────────────────────────────────┐        │
│   │              ▼                                         │        │
│   │     ┌────────────────┐                                 │        │
│   │     │    useState    │                                 │        │
│   │     └───────┬────────┘                                 │        │
│   │             │                                          │        │
│   │    ┌────────┴───────────────────────────────┐          │        │
│   │    │                                        │          │        │
│   │    ▼                                        ▼          │        │
│   │ pokemons[]                            filters{}        │        │
│   │ filteredPokemons[]                    • name: ''       │        │
│   │ types[]                               • type: ''       │        │
│   │ loading: bool                         • legendary: ''  │        │
│   │ error: string|null                                     │        │
│   │                                                        │        │
│   └────────────────────────────────────────────────────────┘        │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │                     useEffect Hooks                       │      │
│   ├──────────────────────────────────────────────────────────┤      │
│   │                                                           │      │
│   │   useEffect #1: Data Fetching (on mount)                  │      │
│   │   ┌─────────────────────────────────────────────┐         │      │
│   │   │ fetch('/api/pokemons') ─► setPokemons()     │         │      │
│   │   │ fetch('/api/types') ─────► setTypes()       │         │      │
│   │   │ ──────────────────────────► setLoading(false)│        │      │
│   │   └─────────────────────────────────────────────┘         │      │
│   │                                                           │      │
│   │   useEffect #2: Filter Application (on filter/data change)│      │
│   │   ┌─────────────────────────────────────────────┐         │      │
│   │   │ Apply name filter                            │         │      │
│   │   │ Apply type filter                            │         │      │
│   │   │ Apply legendary filter                       │         │      │
│   │   │ ─────────────► setFilteredPokemons()         │         │      │
│   │   └─────────────────────────────────────────────┘         │      │
│   │                                                           │      │
│   └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### State Transitions

```
INITIAL STATE
     │
     ▼
loading: true ─────────────────────► LOADING VIEW
     │                                     │
     │ fetch success                       │
     ▼                                     │
loading: false                             │
error: null ───────────────────────► MAIN VIEW
     │                                     │
     │ filter change                       │
     ▼                                     │
filteredPokemons updated ──────────► UPDATED VIEW
     │
     │ fetch error
     ▼
error: "message" ──────────────────► ERROR VIEW
```

---

## Data Flow

### Initial Data Load

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌──────────┐
│  Mount  │ ──► │  useEffect  │ ──► │   fetch()   │ ──► │ Backend  │
└─────────┘     └─────────────┘     └─────────────┘     └──────────┘
                                           │                  │
                                           │    JSON Response │
                                           │◄─────────────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │ setPokemons │
                                    │  setTypes   │
                                    │ setLoading  │
                                    └─────────────┘
```

### Filter Flow

```
┌──────────────┐     ┌─────────────────┐     ┌────────────────┐
│  User Input  │ ──► │ handleInputChange│ ──► │ onFilterChange │
│ (FilterBar)  │     │   (FilterBar)    │     │    (App)       │
└──────────────┘     └─────────────────┘     └────────────────┘
                                                     │
                                                     ▼
                                              ┌─────────────┐
                                              │ setFilters  │
                                              └─────────────┘
                                                     │
                                                     ▼
                                              ┌─────────────┐
                                              │  useEffect  │
                                              │  (filter)   │
                                              └─────────────┘
                                                     │
                                                     ▼
                                    ┌─────────────────────────────┐
                                    │    Filter Logic             │
                                    │  • name.includes()          │
                                    │  • type.some()              │
                                    │  • legendary ===            │
                                    └─────────────────────────────┘
                                                     │
                                                     ▼
                                          ┌───────────────────┐
                                          │setFilteredPokemons│
                                          └───────────────────┘
                                                     │
                                                     ▼
                                          ┌───────────────────┐
                                          │   Re-render Grid  │
                                          └───────────────────┘
```

---

## Styling Architecture

### CSS Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        STYLING LAYERS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Global Resets (index.css)                              │
│  ├── CSS Reset / Normalize                                       │
│  ├── Font family definitions                                     │
│  └── Base element styling                                        │
│                                                                  │
│  Layer 2: App Layout (App.css)                                   │
│  ├── Page layout (header, main)                                  │
│  ├── Grid container                                              │
│  ├── Responsive breakpoints                                      │
│  └── Utility classes (buttons, errors)                           │
│                                                                  │
│  Layer 3: Component Styles (*.css per component)                 │
│  ├── PokemonCard.css - Card styles, type colors                  │
│  ├── FilterBar.css - Input/select styling                        │
│  └── LoadingSpinner.css - Animation keyframes                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Design System

#### Color Palette

| Purpose | Color | CSS Variable/Class |
|---------|-------|-------------------|
| Primary Gradient | #667eea → #764ba2 | body background |
| Header Gradient | #ff6b6b → #4ecdc4 | .app-header |
| Card Background | rgba(255,255,255,0.95) | .pokemon-card |
| Fire Type | #ff6b6b → #ff8e53 | .type-fire |
| Water Type | #4ecdc4 → #44a08d | .type-water |
| Electric Type | #fce38a → #f9ca24 | .type-electric |
| Legendary | #ffd700 | .legendary |

#### Responsive Breakpoints

```css
/* Mobile First */
.pokemon-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* Tablet and below */
@media (max-width: 768px) {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

---

## Deployment Architecture

### Docker Multi-Stage Build

```
┌─────────────────────────────────────────────────────────────────┐
│                     BUILD STAGE (node:20-alpine)                 │
│                                                                  │
│  1. COPY package*.json                                           │
│  2. npm install                                                  │
│  3. COPY source code                                             │
│  4. npm run build                                                │
│                       │                                          │
│                       ▼                                          │
│              /app/build/ (static files)                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        │ COPY --from=builder
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PRODUCTION STAGE (nginx:alpine)                 │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Nginx Web Server                        │  │
│  │                                                            │  │
│  │   /etc/nginx/conf.d/default.conf (custom config)           │  │
│  │   /usr/share/nginx/html/ (build files)                     │  │
│  │                                                            │  │
│  │   • Serves static files                                    │  │
│  │   • SPA routing (try_files → /index.html)                  │  │
│  │   • Port 80                                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Full-Stack Docker Compose

```
┌─────────────────────────────────────────────────────────────────┐
│                    docker-compose.yml                            │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                  pokemon-network (bridge)                 │  │
│   │                                                           │  │
│   │  ┌─────────────────────┐    ┌─────────────────────────┐  │  │
│   │  │  pokemon-frontend   │    │   pokemon-backend       │  │  │
│   │  │  (nginx:alpine)     │    │   (node:18-alpine)      │  │  │
│   │  │                     │    │                         │  │  │
│   │  │  Port: 3002:80      │◄───│   Port: 3001:3001       │  │  │
│   │  │                     │API │                         │  │  │
│   │  │  depends_on:        │────►   healthcheck: /health  │  │  │
│   │  │    - backend        │    │                         │  │  │
│   │  └─────────────────────┘    └─────────────────────────┘  │  │
│   │                                                           │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Decisions

### Why React?

| Consideration | Decision |
|--------------|----------|
| Component model | Reusable, testable UI components |
| Virtual DOM | Efficient updates for filtered lists |
| Ecosystem | Large community, many resources |
| Hooks | Simple state management without classes |

### Why Create React App?

| Consideration | Decision |
|--------------|----------|
| Zero config | Webpack, Babel preconfigured |
| Best practices | ESLint, testing setup included |
| Fast start | No build tool setup required |
| Eject option | Can customize if needed |

### Why CSS (not Sass/Tailwind)?

| Consideration | Decision |
|--------------|----------|
| Simplicity | No build step for styles |
| Co-location | CSS files next to components |
| Specificity | Class-based, no utility conflicts |
| Size | Small app doesn't need CSS framework |

### Trade-offs

| Current State | Trade-off |
|--------------|-----------|
| No TypeScript | Faster development, less type safety |
| No routing | Single page only, can't deep link |
| Client filtering | Instant response, but all data loaded |
| No tests | Fast iteration, but risky refactoring |

### Future Considerations

1. **TypeScript**: Add for larger team/codebase
2. **React Router**: For multi-page navigation
3. **State Management**: Redux/Zustand for complex state
4. **Testing**: Jest + React Testing Library
5. **CSS-in-JS**: Styled-components for dynamic styles
6. **PWA**: Service worker for offline support
7. **Performance**: React.memo, useMemo for optimization

---

## Related Documentation

- [README.md](./README.md) - Quick start guide
- [CLAUDE.md](./CLAUDE.md) - AI agent guidance
- [src/README.md](./src/README.md) - Source code documentation
- [src/components/README.md](./src/components/README.md) - Component documentation
- [public/README.md](./public/README.md) - Public assets documentation
- [Pokemon Backend](../pokemon-backend/ARCHITECTURE.md) - Backend architecture
