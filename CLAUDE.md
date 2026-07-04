# CLAUDE.md - AI Agent Guidance for Pokemon Frontend

## Project Identity

- **Name**: Pokemon Frontend (pokemon-frontend)
- **Version**: 1.0.0
- **Type**: Single Page Application (SPA) - React-based web client
- **Purpose**: A browser-based Pokemon explorer that fetches Pokemon data from a backend API and provides search/filter capabilities with a modern glassmorphic UI.

## Programming Languages and Versions

- **JavaScript (ES6+)**: Primary language, using modern features (arrow functions, destructuring, template literals, async/await, optional chaining)
- **JSX**: React's syntax extension for declarative UI
- **CSS3**: Custom styling with animations, gradients, and glassmorphism effects
- **HTML5**: Entry point template in `public/index.html`

## Frameworks and Major Libraries

| Library          | Version  | Purpose                                      |
|------------------|----------|----------------------------------------------|
| React            | ^18.2.0  | UI component framework (functional components + hooks) |
| React DOM        | ^18.2.0  | Browser DOM rendering                        |
| react-scripts    | 5.0.1    | Create React App toolchain (Webpack, Babel, ESLint, Jest) |

## Architecture Pattern

- **Component-Based SPA**: Functional React components with hooks (`useState`, `useEffect`)
- **Unidirectional Data Flow**: State managed in `App.js`, passed down via props
- **Client-Side Filtering**: All filtering logic runs in the browser after initial data fetch
- **No routing library**: Single-page, single-view application

## Project Structure

```
pokemon-frontend/
├── public/              # Static assets served directly
│   ├── index.html       # HTML template with #root mount point
│   └── manifest.json    # PWA manifest
├── src/                 # Application source code
│   ├── components/      # Reusable React components
│   │   ├── FilterBar.js / .css
│   │   ├── LoadingSpinner.js / .css
│   │   └── PokemonCard.js / .css
│   ├── App.js / .css    # Main application component
│   ├── index.js         # React DOM entry point
│   └── index.css        # Global styles
├── .tr-codegen/         # Docker/deployment configuration
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variable template
```

## Key Conventions and Patterns

### Component Design
- All components are **functional** (no class components)
- Components use **arrow function** export pattern: `const Component = () => {}; export default Component;`
- Each component has a co-located `.css` file with the same base name
- Props are destructured in function parameters

### State Management
- State is centralized in `App.js` using `useState` hooks
- No external state management library (Redux, Zustand, etc.)
- Filter state shape: `{ name: string, type: string, legendary: string }`
- Parent-to-child communication via props; child-to-parent via callback functions

### Styling Conventions
- Plain CSS (no CSS-in-JS, no preprocessors like SASS)
- BEM-like class naming: `pokemon-card`, `filter-bar`, `pokemon-image-container`
- Type-specific classes: `type-${typeName.toLowerCase()}` for color-coded badges
- Responsive breakpoint at 768px

### API Communication
- Uses native `fetch` API (no Axios or other HTTP library)
- Base URL from `REACT_APP_API_URL` environment variable, defaults to `http://localhost:3001`
- Parallel requests with `Promise.all`
- Expected response format: `{ data: [...] }`

## API Endpoints Consumed

| Method | Endpoint         | Purpose               | Response Format              |
|--------|------------------|----------------------|------------------------------|
| GET    | `/api/pokemons`  | Fetch all Pokemon     | `{ data: [Pokemon, ...] }`  |
| GET    | `/api/types`     | Fetch all type names  | `{ data: [string, ...] }`   |

### Pokemon Object Shape
```javascript
{
  id: number,         // Unique numeric ID
  name: string,       // Pokemon name
  type: string[],     // Array of type names (e.g., ["Fire", "Flying"])
  image: string,      // URL to Pokemon image/sprite
  legendary: boolean  // Whether Pokemon is legendary
}
```

## Environment Variables

| Variable            | Required | Default                  | Description            |
|---------------------|----------|--------------------------|------------------------|
| `REACT_APP_API_URL` | No       | `http://localhost:3001`  | Backend API base URL   |

**Note**: Only variables prefixed with `REACT_APP_` are exposed to the browser (Create React App convention).

## Build and Run Commands

| Command              | Purpose                            |
|----------------------|-----------------------------------|
| `npm install`        | Install dependencies               |
| `npm start`          | Start dev server (port 3000)       |
| `npm run build`      | Production build to `/build`       |
| `npm test`           | Run Jest tests                     |
| `npm run docker:build` | Build Docker image               |
| `npm run docker:run`  | Run Docker container (port 3002)  |

## Constraints and Assumptions

1. **Backend dependency**: The app requires a running backend API at the configured URL. Without it, an error state is displayed.
2. **No client-side routing**: The app is a single view; there is no React Router or equivalent.
3. **No authentication**: The API calls are unauthenticated.
4. **No pagination**: All Pokemon are loaded at once and filtered client-side.
5. **No TypeScript**: The project uses plain JavaScript without type checking.
6. **Create React App**: The build configuration is managed by `react-scripts`; do not eject unless absolutely necessary.
7. **Proxy configured**: `package.json` has `"proxy": "http://localhost:3001"` for development API proxying.

## Safe Code Generation Notes

- When adding new components, follow the existing pattern: functional component + co-located CSS file in `src/components/`
- Do not introduce class components; the codebase is fully hooks-based
- Do not add state management libraries without explicit need; current props-drilling pattern is appropriate for this app's size
- All filter logic is in `App.js`; keep it centralized there
- Image error fallback points to `/placeholder-pokemon.png`; ensure this file exists if referenced
- The `browserslist` config targets modern browsers; do not add polyfills for IE11
- ESLint config extends `react-app` and `react-app/jest`; follow those rules
