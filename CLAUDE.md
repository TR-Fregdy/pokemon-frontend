# CLAUDE.md - AI Agent Guidance

This document provides context for AI agents working with the Pokemon Frontend codebase.

## Project Overview

A React-based single-page application (SPA) for browsing and filtering Pokemon data. The application connects to the Pokemon Backend API and provides a responsive, modern UI for exploring Pokemon by name, type, and legendary status.

## Technology Stack

- **Runtime**: Node.js v18+
- **Framework**: React 18.2.x with Create React App (react-scripts 5.0.1)
- **Language**: JavaScript (ES6+) with JSX
- **Styling**: CSS3 with custom animations and glassmorphism effects
- **Build Tool**: Create React App (Webpack under the hood)
- **Production Server**: Nginx (Alpine)
- **Containerization**: Docker with multi-stage builds

## Architecture Pattern

- **Pattern**: Component-based architecture with React functional components
- **State Management**: React hooks (useState, useEffect) - no external state library
- **Data Fetching**: Native Fetch API with async/await

## Key Constraints

1. **Backend Dependency**: Requires Pokemon Backend API running on port 3001
2. **Environment Variable**: `REACT_APP_API_URL` must be set for non-default backend URLs
3. **Proxy Configuration**: Development proxy configured in package.json pointing to localhost:3001
4. **No Router**: Single-page application without client-side routing

## Code Conventions

- **Components**: Functional components with hooks (no class components)
- **File Organization**: One component per file, CSS file paired with component
- **Naming**: PascalCase for components, camelCase for functions and variables
- **CSS Classes**: BEM-like naming with component prefix
- **Props**: Destructured in function parameters

## File Structure

```
pokemon-frontend/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── PokemonCard.js  # Individual Pokemon card display
│   │   ├── PokemonCard.css
│   │   ├── FilterBar.js    # Search and filter controls
│   │   ├── FilterBar.css
│   │   ├── LoadingSpinner.js  # Pokeball loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js              # Main application component
│   ├── App.css             # Main application styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── .tr-codegen/
│   ├── Dockerfile          # Multi-stage Docker build
│   ├── docker-compose.yml  # Full-stack orchestration
│   └── nginx.conf          # Production web server config
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore configuration
└── README.md               # Project documentation
```

## Component Hierarchy

```
App
├── LoadingSpinner (conditional)
├── FilterBar
│   └── Filter controls (name, type, legendary)
└── PokemonCard[] (mapped from filtered data)
```

## State Management

| State Variable | Type | Purpose |
|---------------|------|---------|
| `pokemons` | Array | All Pokemon from API |
| `filteredPokemons` | Array | Currently displayed Pokemon |
| `types` | Array | Available Pokemon types |
| `filters` | Object | Current filter values |
| `loading` | Boolean | Loading state |
| `error` | String | Error message |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API base URL |

## Development Commands

```bash
npm install     # Install dependencies
npm start       # Start development server (port 3000)
npm run build   # Create production build
npm test        # Run test suite
```

## Docker Commands

```bash
npm run docker:build  # Build Docker image
npm run docker:run    # Run Docker container (port 3002)
```

## Safe Code Generation Notes

- When adding new components, create both `.js` and `.css` files in `src/components/`
- Follow the existing functional component pattern with hooks
- Maintain the glassmorphism design aesthetic in CSS
- API calls should use the `API_BASE_URL` constant from `App.js`
- Error states should be user-friendly with retry options
- Ensure responsive design for all new components
- Type colors are defined in `PokemonCard.css` - add new type classes as needed
