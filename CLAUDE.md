# CLAUDE.md - AI Agent Guidelines for Pokemon Frontend

This document provides essential information for AI agents working with this codebase.

## Technology Stack & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| ReactDOM | 18.2.0 | DOM rendering |
| React Scripts | 5.0.1 | Build tooling (CRA) |
| Node.js | 18+ / 20+ | Build environment |
| Nginx | Alpine | Production server |
| Docker | Multi-stage | Containerization |

## Project Type

**Single Page Application (SPA)** - A React-based web application for browsing and filtering Pokemon data from the companion backend API.

## Architecture Pattern

**Component-Based Architecture**
- Functional components with React Hooks
- Props-based state management (no external state library)
- CSS modules per component

## Quick Start Commands

```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Docker
npm run docker:build
npm run docker:run
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | http://localhost:3001 | Backend API URL |

Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

## Project Structure

```
pokemon-frontend/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.js            # Entry point (React root)
│   ├── index.css           # Global styles
│   ├── App.js              # Main application component
│   ├── App.css             # App-level styles
│   └── components/
│       ├── PokemonCard.js  # Individual Pokemon display
│       ├── PokemonCard.css
│       ├── FilterBar.js    # Search/filter controls
│       ├── FilterBar.css
│       ├── LoadingSpinner.js # Pokeball loading animation
│       └── LoadingSpinner.css
├── .tr-codegen/            # Docker configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── package.json
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

## Component Hierarchy

```
App
├── Header (inline)
├── LoadingSpinner (conditional)
├── Error Container (conditional)
├── FilterBar
│   ├── Name Search Input
│   ├── Type Select Dropdown
│   ├── Legendary Select Dropdown
│   └── Clear Filters Button
├── Results Info (inline)
├── No Results (conditional)
└── Pokemon Grid
    └── PokemonCard (mapped)
```

## State Management

The application uses React's built-in `useState` hook with the following state structure:

```javascript
// App.js state
{
  pokemons: [],          // All Pokemon from API
  filteredPokemons: [],  // After applying filters
  types: [],             // Available Pokemon types
  filters: {
    name: '',            // Search term
    type: '',            // Selected type
    legendary: ''        // '', 'true', or 'false'
  },
  loading: true,         // Loading state
  error: null           // Error message
}
```

## API Integration

The frontend communicates with the backend API:

```javascript
// Endpoints used
GET ${REACT_APP_API_URL}/api/pokemons  // Fetch all Pokemon
GET ${REACT_APP_API_URL}/api/types     // Fetch available types

// Response handling
const response = await fetch(url);
const data = await response.json();
// data.data contains the actual array
```

## Code Conventions

- **Functional Components** - No class components
- **React Hooks** - useState, useEffect
- **CSS per Component** - Each component has its own CSS file
- **No TypeScript** - Plain JavaScript with JSX
- **No prop-types** - No runtime type checking
- **ES6+ Syntax** - Arrow functions, destructuring, spread operator

## Styling Approach

- **CSS3** with custom properties
- **Glassmorphism** design with backdrop-filter
- **CSS Gradients** for backgrounds and buttons
- **Flexbox/Grid** for layouts
- **CSS Animations** (@keyframes)
- **Responsive Design** via media queries

### Type Color Classes

```css
.type-fire    /* Red/Orange gradient */
.type-water   /* Teal gradient */
.type-grass   /* Green gradient */
.type-electric /* Yellow gradient */
.type-psychic  /* Purple/Pink gradient */
.type-ice      /* Blue gradient */
.type-dragon   /* Purple gradient */
.type-flying   /* Pink/Yellow gradient */
.type-poison   /* Purple gradient */
```

## Key Implementation Details

1. **Proxy Configuration** - `package.json` includes proxy to `http://localhost:3001`
2. **Client-side Filtering** - Filters applied in React after initial data fetch
3. **Error Boundaries** - No React error boundaries (manual error handling)
4. **Image Fallback** - Pokemon images have onError handler for broken images
5. **Loading State** - Animated Pokeball spinner during data fetch

## Adding New Features

### New Component

1. Create `ComponentName.js` in `src/components/`
2. Create `ComponentName.css` in `src/components/`
3. Import and use in parent component

### New Filter

1. Add filter state in `App.js` filters object
2. Add filter UI in `FilterBar.js`
3. Add filter logic in `App.js` useEffect

### New API Endpoint

1. Add fetch call in `App.js` useEffect
2. Store response in appropriate state
3. Create UI to display data

## Docker Deployment

### Multi-Stage Build

```
Stage 1 (builder): node:20-alpine
  - Install dependencies
  - Build React app

Stage 2 (runtime): nginx:alpine
  - Copy built static files
  - Serve with Nginx
```

### Production Notes

- Frontend runs on port 80 inside container
- Exposed to host on port 3002 (configurable)
- Client-side routing supported via Nginx try_files
- Depends on backend service in docker-compose

## Browser Support

```json
{
  "production": [">0.2%", "not dead", "not op_mini all"],
  "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
}
```

## Testing

Create React App includes Jest test runner:

```bash
npm test          # Interactive watch mode
npm test -- --coverage  # Coverage report
```

Currently no test files are implemented.
