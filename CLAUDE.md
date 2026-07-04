# CLAUDE.md - AI Agent Guidance for Pokemon Frontend

## Project Overview

This is a React-based web application for browsing and filtering Pokemon data. It provides a modern, responsive UI that consumes the Pokemon Backend API.

## Technology Stack

- **Runtime**: Node.js v18+
- **Framework**: React v18.2.0 (Create React App)
- **Build Tool**: react-scripts v5.0.1
- **Styling**: CSS3 with custom styles (no CSS framework)
- **Containerization**: Multi-stage Docker build with Nginx

## Architecture Pattern

- **Pattern**: Component-based React application with hooks
- **State Management**: React useState hooks (no Redux/Context API)
- **Data Fetching**: Native Fetch API
- **Styling**: Component-scoped CSS files

## Project Structure

```
pokemon-frontend/
├── public/                    # Static assets
│   ├── index.html            # HTML entry point
│   └── manifest.json         # PWA manifest
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── PokemonCard.js    # Pokemon display card
│   │   ├── PokemonCard.css
│   │   ├── FilterBar.js      # Search/filter controls
│   │   ├── FilterBar.css
│   │   ├── LoadingSpinner.js # Loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js                # Main application component
│   ├── App.css               # Global app styles
│   ├── index.js              # React entry point
│   └── index.css             # Base CSS reset
├── .tr-codegen/              # Docker configuration
│   ├── Dockerfile            # Multi-stage build
│   ├── docker-compose.yml    # Full-stack orchestration
│   └── nginx.conf            # Production web server config
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variable template
└── .gitignore                # Git ignore rules
```

## Code Conventions

### React Components

- Functional components with hooks (no class components)
- Props destructuring in function parameters
- Component files match component names (PascalCase)
- Each component has a paired CSS file

### State Management

- `useState` for local component state
- `useEffect` for data fetching and side effects
- State lifted to App.js for shared state (filters, pokemon data)

### Styling Conventions

- BEM-like class naming (e.g., `pokemon-card`, `pokemon-card__image`)
- Glassmorphism effects using `backdrop-filter: blur()`
- Type-based color classes (e.g., `.type-fire`, `.type-water`)
- Responsive breakpoints at 768px

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3001` |

## Component API

### App.js (Main Container)
- Manages global state: `pokemons`, `filteredPokemons`, `types`, `filters`, `loading`, `error`
- Fetches initial data on mount
- Applies client-side filtering

### PokemonCard ({ pokemon })
- Displays single Pokemon with image, name, types, legendary badge
- Props: `pokemon` object with `{ id, name, type[], legendary, image }`

### FilterBar ({ filters, types, onFilterChange, onClearFilters })
- Search input and dropdown filters
- Callbacks for filter changes

### LoadingSpinner ()
- Animated Pokeball loading indicator
- No props required

## Development Commands

```bash
npm install    # Install dependencies
npm start      # Start dev server (port 3000)
npm run build  # Production build
npm test       # Run tests
```

## Docker Commands

```bash
npm run docker:build  # Build Docker image
npm run docker:run    # Run container on port 3002
```

## API Integration

The frontend expects the backend API at `REACT_APP_API_URL` with these endpoints:
- `GET /api/pokemons` - Fetch all Pokemon
- `GET /api/types` - Fetch available types

## Safe Code Generation Notes

- Maintain functional component pattern with hooks
- Keep styling in separate CSS files (no inline styles)
- Follow existing filter state structure: `{ name: '', type: '', legendary: '' }`
- Error handling pattern: display user-friendly message with retry button
- Images use PokeAPI sprite URLs with fallback on error

## Browser Support

Targets modern browsers via browserslist configuration:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
