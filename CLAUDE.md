# CLAUDE.md - AI Agent Guidance for Pokemon Frontend

## Project Identity

- **Name:** pokemon-frontend
- **Type:** Single-page web application (SPA)
- **Version:** 1.0.0
- **Private:** true

## Programming Languages & Versions

- **JavaScript (ES6+/JSX)** - Primary language
- **CSS3** - Styling (no preprocessor)
- **HTML5** - Document structure
- **Node.js v18+** - Development runtime (v20 Alpine for Docker builds)

## Frameworks & Major Libraries

| Library | Version | Role |
|---------|---------|------|
| React | ^18.2.0 | UI framework (functional components, hooks) |
| ReactDOM | ^18.2.0 | DOM rendering engine |
| react-scripts | 5.0.1 | Build toolchain (Create React App - includes Webpack, Babel, Jest, ESLint) |

**No additional runtime dependencies** beyond React core. No routing library, no state management library, no CSS-in-JS.

## Architecture Pattern

- **Container/Presentational component pattern**
  - `App.js` is the single container component (state, API calls, business logic)
  - `FilterBar`, `PokemonCard`, `LoadingSpinner` are presentational components (props in, UI out)
- **Hooks-based functional components** - No class components
- **Unidirectional data flow** - State lives in App, flows down via props
- **Client-side filtering** - Data fetched once on mount, filtered locally on state change

## File Structure

```
src/
├── index.js                # ReactDOM.createRoot entry point
├── index.css               # Global CSS (font, smoothing)
├── App.js                  # Main container: state, effects, API calls, layout
├── App.css                 # App-level styles: header, grid, error states
└── components/
    ├── FilterBar.js        # Controlled filter inputs (name, type, legendary)
    ├── FilterBar.css       # Filter bar responsive grid styles
    ├── PokemonCard.js      # Pokemon display card with type badges
    ├── PokemonCard.css     # Card styles with type-based color gradients
    ├── LoadingSpinner.js   # Pokeball-themed CSS loading animation
    └── LoadingSpinner.css  # Spinner keyframe animations
```

## State Management

All state managed in `App.js` via `useState`:

```javascript
pokemons          // Array - Raw data from API (source of truth)
filteredPokemons  // Array - Computed filtered subset
types             // Array - Available Pokemon types for dropdown
filters           // Object - { name: '', type: '', legendary: '' }
loading           // Boolean - Initial fetch loading state
error             // String|null - Error message from failed fetch
```

Two `useEffect` hooks:
1. **Mount effect** - Fetches `/api/pokemons` and `/api/types` in parallel via `Promise.all`
2. **Filter effect** - Runs when `filters` or `pokemons` change; applies all filter predicates

## API Integration

- **Base URL:** `process.env.REACT_APP_API_URL || 'http://localhost:3001'`
- **Dev proxy:** `package.json` has `"proxy": "http://localhost:3001"`
- **Fetch API** used (no axios or other HTTP library)
- **Endpoints consumed:**
  - `GET /api/pokemons` - Returns `{ data: Pokemon[] }`
  - `GET /api/types` - Returns `{ data: string[] }`

## Component Props Interface

### FilterBar
```javascript
{
  filters: { name: string, type: string, legendary: string },
  types: string[],
  onFilterChange: (newFilters: object) => void,
  onClearFilters: () => void
}
```

### PokemonCard
```javascript
{
  pokemon: {
    id: number,
    name: string,
    type: string[],
    legendary: boolean,
    image: string
  }
}
```

### LoadingSpinner
No props. Pure static component.

## CSS Conventions

- **One CSS file per component** - Co-located with the JS file
- **BEM-ish naming** - `.pokemon-card`, `.filter-bar`, `.type-badge`
- **Type-based classes** - `.type-fire`, `.type-water`, `.type-electric`, etc.
- **Glassmorphism design** - Semi-transparent backgrounds with backdrop blur
- **Responsive breakpoints** - Primary breakpoint at 768px
- **CSS Grid** - Used for Pokemon card grid layout with `auto-fill` and `minmax()`
- **No CSS modules** - Plain CSS files imported globally

## Constraints & Conventions

1. **No routing** - Single view; no React Router or URL-based navigation
2. **No global state library** - Local state with prop drilling (max 2 levels)
3. **No TypeScript** - Plain JavaScript with JSX
4. **No CSS preprocessor** - Plain CSS3 only
5. **Create React App** - Do not eject; follow CRA conventions
6. **Image fallback** - `onError` handler on `<img>` falls back to `/placeholder-pokemon.png`
7. **Controlled components** - All form inputs are controlled (value from props, onChange callback)
8. **No tests yet** - Test infrastructure exists (Jest via react-scripts) but no test files written

## Code Generation Notes

- New components should follow the pattern: functional component + co-located CSS file
- New components go in `src/components/` directory
- Import CSS at the top of the component file: `import './ComponentName.css'`
- Export components as default exports: `export default ComponentName`
- All state management happens in `App.js`; child components receive props
- When adding new filter criteria, update:
  1. The `filters` state initial value in `App.js`
  2. The filter application logic in the second `useEffect` in `App.js`
  3. The `FilterBar.js` component to add the new input
  4. The `FilterBar.css` for styling
- API calls should use `fetch()` with the `API_BASE_URL` constant
- Error handling should set the `error` state and display user-friendly messages

## Deployment

- **Multi-stage Docker build**: Node 20 Alpine (build) -> Nginx Alpine (serve)
- **Production port**: 80 (Nginx), mapped to 3002 externally
- **SPA routing**: Nginx `try_files` directive falls back to `index.html`
- **Docker Compose**: Orchestrates frontend + backend on `pokemon-network`
