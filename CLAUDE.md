# CLAUDE.md - AI Agent Guidance

## Project Identity

- **Project Name**: Pokemon Frontend
- **Repository**: TR-Fregdy/pokemon-frontend
- **Type**: Single-Page Application (SPA) - React frontend client

## Programming Languages and Versions

- **JavaScript (ES6+)**: Primary language
- **CSS3**: Styling with modern features (glassmorphism, CSS Grid, Flexbox, animations)
- **HTML5**: Base template in `public/index.html`

## Frameworks and Major Libraries

| Library         | Version  | Purpose                        |
|-----------------|----------|--------------------------------|
| React           | ^18.2.0  | UI component library           |
| React DOM       | ^18.2.0  | DOM rendering for React        |
| React Scripts   | 5.0.1    | Build tooling (Create React App) |

> **Note**: This project has **zero** additional runtime dependencies beyond React core. No routing library, no state management library, no HTTP client library - all functionality is built with native browser APIs (`fetch`) and React built-in hooks (`useState`, `useEffect`).

## Architecture Pattern

- **Component-based architecture** with a flat component hierarchy
- **Container/Presentational pattern**: `App.js` acts as the stateful container; child components (`PokemonCard`, `FilterBar`, `LoadingSpinner`) are presentational
- **Client-side filtering**: All Pokemon data is fetched once on mount, filtering is performed entirely in the browser
- **No routing**: Single-page, single-view application (no React Router)

## Key Files

| File                            | Role                                         |
|---------------------------------|----------------------------------------------|
| `src/index.js`                  | React entry point, renders `<App />` into DOM |
| `src/App.js`                    | Root component, state management, API calls  |
| `src/components/PokemonCard.js` | Displays individual Pokemon data             |
| `src/components/FilterBar.js`   | Search and filter controls                   |
| `src/components/LoadingSpinner.js` | Pokeball-themed loading animation         |

## API Integration

- **Backend URL**: Configured via `REACT_APP_API_URL` environment variable (defaults to `http://localhost:3001`)
- **Proxy**: `package.json` includes `"proxy": "http://localhost:3001"` for development
- **Endpoints consumed**:
  - `GET /api/pokemons` - Returns `{ data: [...] }` with all Pokemon objects
  - `GET /api/types` - Returns `{ data: [...] }` with all type strings
- **Pokemon object shape**: `{ id: number, name: string, type: string[], legendary: boolean, image: string }`

## Constraints and Conventions

1. **No TypeScript** - Project uses plain JavaScript with JSX
2. **CSS Modules not used** - Each component has a co-located `.css` file imported directly
3. **Functional components only** - No class components; uses React hooks exclusively
4. **No testing setup beyond CRA defaults** - `react-scripts test` runs Jest in interactive watch mode. CRA includes the following testing libraries out of the box:
   - **Jest** — test runner and assertion library (provides `describe`, `it`, `expect`, `jest.fn()`, etc.)
   - **@testing-library/react** — utilities for rendering components and querying the DOM (`render`, `screen`, `fireEvent`)
   - **@testing-library/jest-dom** — custom Jest matchers for DOM assertions (`toBeInTheDocument`, `toHaveClass`, `toBeVisible`, etc.)
   - **@testing-library/user-event** — simulates realistic user interactions (clicks, typing, etc.)
   - Test files should follow the naming convention `*.test.js` or be placed in a `__tests__/` directory. No test files currently exist in this project.
5. **No linting config beyond CRA defaults** - ESLint configuration is defined in `package.json` under `eslintConfig` and extends two presets:
   - **`react-app`** — the base CRA ESLint preset, which includes:
     - React-specific rules (e.g., no missing `key` props, valid JSX usage)
     - React Hooks rules via `eslint-plugin-react-hooks` (enforces Rules of Hooks and exhaustive dependency arrays)
     - JSX accessibility rules via `eslint-plugin-jsx-a11y` (e.g., images must have `alt` text, interactive elements need keyboard support)
     - Import/export validation via `eslint-plugin-import` (e.g., no unresolved imports, consistent import ordering)
   - **`react-app/jest`** — adds Jest-specific linting:
     - Recognizes Jest globals (`describe`, `it`, `expect`, `beforeEach`, etc.) so they don't trigger `no-undef` errors
     - Includes `eslint-plugin-testing-library` rules that enforce best practices when using Testing Library
6. **Component naming**: PascalCase for component files, matching the exported component name
7. **CSS class naming**: kebab-case (e.g., `pokemon-card`, `filter-bar`, `loading-container`)
8. **Image error handling**: `PokemonCard` falls back to `/placeholder-pokemon.png` on image load failure

## Environment Variables

| Variable             | Required | Default                  | Description             |
|----------------------|----------|--------------------------|-------------------------|
| `REACT_APP_API_URL`  | No       | `http://localhost:3001`  | Backend API base URL    |

## Build and Deployment

- **Development**: `npm start` (runs on port 3000 by default via CRA)
- **Production build**: `npm run build` (outputs to `/build`)
- **Docker**: Multi-stage build (Node 20-alpine for build, Nginx alpine for serving)
- **Docker Compose**: Frontend on port 3002, depends on backend service on port 3001
- **Nginx**: Configured for SPA routing (`try_files $uri $uri/ /index.html`)

## Notes for Safe Code Generation

- When adding new components, create both a `.js` and co-located `.css` file in `src/components/`
- The `App.js` filter logic uses `Array.prototype.filter()` with case-insensitive matching - maintain this pattern
- Pokemon types are matched using `pokemon.type.some()` since `type` is an array
- The legendary filter compares against string `'true'`/`'false'` values from the select element
- All data fetching happens in `App.js` via `useEffect` - child components receive data as props
- No authentication or authorization is implemented
- The project expects a companion backend service (`pokemon-backend`) to be running
