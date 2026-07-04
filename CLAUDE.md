# CLAUDE.md - AI Agent Guidance

## Project Overview

This is the Pokemon Frontend - a React-based web application for browsing and filtering Pokemon data from the backend API.

## Technology Stack

- **Runtime**: Node.js v18+
- **Framework**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Language**: JavaScript (ES6+, JSX)
- **Styling**: CSS3 with custom properties
- **Production Server**: Nginx (Alpine)

## Architecture

- **Pattern**: Component-based SPA (Single Page Application)
- **State Management**: React useState/useEffect hooks
- **Data Fetching**: Native Fetch API
- **Styling**: CSS Modules (separate CSS file per component)

## Key Files & Directories

| Path | Purpose |
|------|---------|
| `src/App.js` | Main application component with state management |
| `src/index.js` | React entry point, renders App to DOM |
| `src/components/` | Reusable UI components |
| `public/index.html` | HTML template |
| `.tr-codegen/` | Docker and deployment configs |

## Component Structure

| Component | File | Purpose |
|-----------|------|---------|
| App | `src/App.js` | Main container, state, API calls |
| PokemonCard | `src/components/PokemonCard.js` | Individual Pokemon display |
| FilterBar | `src/components/FilterBar.js` | Search and filter controls |
| LoadingSpinner | `src/components/LoadingSpinner.js` | Pokeball loading animation |

## State Management

```javascript
// App.js state variables
pokemons        // Full Pokemon list from API
filteredPokemons // Currently filtered list
types           // Available Pokemon types
filters         // { name, type, legendary }
loading         // API loading state
error           // Error message state
```

## API Integration

- Base URL configured via `REACT_APP_API_URL` environment variable
- Default: `http://localhost:3001`
- Proxy configured in package.json for development

### API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /api/pokemons` | Fetch all Pokemon |
| `GET /api/types` | Fetch available types |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

## Running the Application

```bash
# Development
npm start           # Starts on port 3000

# Production build
npm run build

# Docker
docker-compose -f .tr-codegen/docker-compose.yml up
```

## Conventions

- Components use functional style with hooks
- Each component has its own CSS file
- CSS classes use BEM-like naming
- Type colors defined in PokemonCard.css
- Responsive design with CSS Grid

## CSS Architecture

- Global styles in `src/index.css` and `src/App.css`
- Component-specific styles co-located with components
- Glassmorphism design pattern with `backdrop-filter`
- CSS custom animations for loading and hover effects

## Code Generation Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Place new components in `src/components/`
- Create corresponding CSS file for each component
- Import components in App.js as needed
- Use consistent error handling patterns
- Maintain responsive design principles

## Constraints & Assumptions

- Requires backend API to be running
- Client-side filtering (data already loaded)
- No authentication required
- Single-page application (no routing)
- Browser support: Chrome, Firefox, Safari, Edge (latest)
