# CLAUDE.md - Pokemon Frontend

This file provides guidance for AI agents working with the Pokemon Frontend codebase.

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.2.0 | UI library |
| React DOM | ^18.2.0 | DOM rendering |
| React Scripts | 5.0.1 | Build toolchain (Create React App) |
| CSS3 | - | Styling (no preprocessor) |
| Nginx | alpine | Production web server |

## Project Architecture

This is a **Single Page Application (SPA)** using Create React App:
- Functional components with React Hooks
- Client-side filtering of Pokemon data
- CSS modules per component (co-located styles)
- Fetch API for data retrieval

## Directory Structure

```
pokemon-frontend/
├── public/                  # Static assets
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/                     # Source code
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   ├── App.js              # Main application component
│   ├── App.css             # App-level styles
│   └── components/         # Reusable components
│       ├── PokemonCard.js  # Pokemon display card
│       ├── PokemonCard.css
│       ├── FilterBar.js    # Search/filter controls
│       ├── FilterBar.css
│       ├── LoadingSpinner.js  # Loading animation
│       └── LoadingSpinner.css
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore patterns
├── README.md               # User documentation
├── CLAUDE.md               # AI agent guidance (this file)
├── ARCHITECTURE.md         # Detailed architecture documentation
└── .tr-codegen/            # Docker deployment configuration
    ├── Dockerfile
    ├── docker-compose.yml
    └── nginx.conf
```

## Quick Commands

```bash
# Install dependencies
npm install

# Development server (port 3000)
npm start

# Production build
npm run build

# Run tests
npm test

# Docker build and run
npm run docker:build
npm run docker:run
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:3001 | Backend API URL |

Create a `.env` file from `.env.example` for local development.

## Component Hierarchy

```
App
├── LoadingSpinner (conditional)
├── FilterBar
│   ├── Name input
│   ├── Type dropdown
│   ├── Legendary dropdown
│   └── Clear button
└── PokemonCard[] (mapped from data)
    ├── Image
    ├── Name
    ├── Type badges
    └── Legendary badge
```

## State Management

The app uses React's `useState` hook for state management:

| State Variable | Type | Purpose |
|----------------|------|---------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Currently displayed Pokemon |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading state |
| `error` | String | Error message |

## Data Flow

```
1. App mounts
   └─► useEffect fetches /api/pokemons and /api/types
       └─► Sets pokemons, types, loading=false

2. User changes filter
   └─► FilterBar calls onFilterChange
       └─► App updates filters state
           └─► useEffect filters pokemons
               └─► Sets filteredPokemons

3. Pokemon display
   └─► Map filteredPokemons to PokemonCard components
```

## Styling Patterns

- **Glassmorphism**: Semi-transparent backgrounds with blur
- **Type Colors**: CSS classes for Pokemon type badges (`.type-fire`, `.type-water`, etc.)
- **Responsive Grid**: CSS Grid with `auto-fill` for card layout
- **Animations**: CSS keyframes for spinner and hover effects

## Code Patterns

### Component Structure
```javascript
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ props }) => {
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### API Calls
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

fetch(`${API_BASE_URL}/api/endpoint`)
  .then(response => response.json())
  .then(data => /* handle data */);
```

## Key Considerations for Modifications

1. **Adding new filters**:
   - Add to `filters` state object in App.js
   - Add filter control in FilterBar.js
   - Add filter logic in `applyFilters` function

2. **Adding new components**:
   - Create `.js` and `.css` files in `src/components/`
   - Import and use in parent component

3. **Changing API endpoint**:
   - Update `REACT_APP_API_URL` in `.env`
   - Or modify API_BASE_URL in App.js

4. **Adding routes**:
   - Would require installing `react-router-dom`
   - Wrap App in BrowserRouter

5. **Adding state management**:
   - Consider Redux or Context API for complex state
   - Current useState pattern works for this scale

## Testing Notes

- Create React App includes Jest test runner
- Run with `npm test`
- No tests currently implemented
- Test files should be named `*.test.js`

## Build Output

Production build creates optimized files in `/build`:
- Minified JavaScript bundles
- Optimized CSS
- Static assets with content hashes
- `index.html` with injected scripts

## Proxy Configuration

Development server proxies API requests to backend:
```json
"proxy": "http://localhost:3001"
```

This allows relative API calls without CORS issues in development.
