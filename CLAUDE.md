# AI Agent Guidance - Pokemon Frontend

## Overview

This is a React-based web application for browsing and filtering Pokemon data. It provides a modern, responsive UI with search and filter capabilities.

## Programming Languages and Versions

- **JavaScript (ES6+)**: Primary language
- **JSX**: React component syntax
- **CSS3**: Styling with animations and responsive design
- **Node.js**: v18 or later recommended
- **npm**: Package manager

## Frameworks and Major Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | ^18.2.0 | UI component framework |
| React DOM | ^18.2.0 | DOM rendering for React |
| react-scripts | 5.0.1 | Create React App build tooling |

## Architecture Pattern

- **Component-Based Architecture**: Modular React functional components
- **Client-Side Rendering**: Single Page Application (SPA)
- **Unidirectional Data Flow**: Props down, callbacks up

## Component Structure

```
App (Main Container)
├── FilterBar (Search/Filter Controls)
├── LoadingSpinner (Loading State)
├── PokemonCard (Pokemon Display) × N
└── Error Display (Error State)
```

## State Management

Uses React's built-in `useState` and `useEffect` hooks:

| State Variable | Type | Purpose |
|----------------|------|---------|
| `pokemons` | Array | All fetched Pokemon data |
| `filteredPokemons` | Array | Pokemon after filter application |
| `types` | Array | Available Pokemon types for filter dropdown |
| `filters` | Object | Current filter values (name, type, legendary) |
| `loading` | Boolean | Loading state indicator |
| `error` | String/null | Error message if fetch fails |

## API Integration

- **Base URL**: Configurable via `REACT_APP_API_URL` environment variable
- **Default**: `http://localhost:3001`
- **Proxy**: Development proxy configured in `package.json` for port 3001
- **Endpoints Used**:
  - `GET /api/pokemons` - Fetch all Pokemon
  - `GET /api/types` - Fetch available types

## Constraints and Conventions

1. **Environment Variables**: Must be prefixed with `REACT_APP_` for CRA
2. **Functional Components**: All components use functional style with hooks
3. **CSS Modules**: Each component has dedicated CSS file (not CSS modules)
4. **Image Fallback**: Handles missing images with `onError` callback
5. **No External State Management**: No Redux/MobX; uses local state only

## File Structure

```
pokemon-frontend/
├── public/
│   ├── index.html        # HTML template
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/
│   │   ├── PokemonCard.js/.css   # Individual Pokemon display
│   │   ├── FilterBar.js/.css     # Filter controls
│   │   └── LoadingSpinner.js/.css # Loading animation
│   ├── App.js/.css       # Main application component
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
├── .tr-codegen/          # Docker deployment config
│   ├── Dockerfile        # Multi-stage build
│   ├── docker-compose.yml # Full-stack orchestration
│   └── nginx.conf        # Production web server config
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variable template
└── .gitignore           # Git ignore configuration
```

## Development Notes

- **Start Command**: `npm start` (development server on port 3000)
- **Build Command**: `npm run build` (production build to `/build`)
- **Testing**: CRA's Jest setup (`npm test`)
- **Linting**: ESLint with `react-app` config

## Styling Approach

- **CSS Features**: Flexbox, Grid, animations, glassmorphism
- **Responsive**: Media queries for mobile/tablet/desktop
- **Type Colors**: Pokemon type badges have gradient backgrounds
- **Animations**: Card hover effects, loading spinner rotation

## Code Generation Considerations

When generating code for this project:

1. **Follow Component Pattern**: Functional components with hooks
2. **Maintain CSS Naming**: Component-specific CSS with `.component-name` prefixes
3. **Keep Filtering Client-Side**: Current approach filters locally after fetch
4. **Preserve Loading/Error States**: Maintain graceful state handling
5. **Responsive Design**: Ensure new components work on mobile
6. **Environment Variables**: Use `REACT_APP_` prefix for any new env vars
7. **No TypeScript**: Plain JavaScript; avoid type annotations
8. **Image Handling**: Include error handlers for image loading
