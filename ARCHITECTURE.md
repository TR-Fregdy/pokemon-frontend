# Architecture Overview - Pokemon Frontend

This document provides a high-level architectural view of the Pokemon Frontend application.

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Pokemon Frontend                                    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                              App.js                                     │  │
│  │                         (Main Container)                                │  │
│  │                                                                         │  │
│  │   State: pokemons, filteredPokemons, types, filters, loading, error    │  │
│  │                                                                         │  │
│  │   ┌─────────────┐    ┌─────────────────┐    ┌────────────────────┐    │  │
│  │   │  useEffect  │───>│  Fetch API Data │───>│  Update State      │    │  │
│  │   │  (on mount) │    │  /api/pokemons  │    │  pokemons, types   │    │  │
│  │   │             │    │  /api/types     │    │                    │    │  │
│  │   └─────────────┘    └─────────────────┘    └────────────────────┘    │  │
│  │                                                                         │  │
│  │   ┌─────────────┐    ┌─────────────────┐    ┌────────────────────┐    │  │
│  │   │  useEffect  │───>│  Filter Logic   │───>│  filteredPokemons  │    │  │
│  │   │ (on filter  │    │  name/type/     │    │  state update      │    │  │
│  │   │  change)    │    │  legendary      │    │                    │    │  │
│  │   └─────────────┘    └─────────────────┘    └────────────────────┘    │  │
│  │                                                                         │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                     │                                         │
│           ┌─────────────────────────┼─────────────────────────┐              │
│           │                         │                         │              │
│           ▼                         ▼                         ▼              │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────┐      │
│  │   FilterBar     │    │  LoadingSpinner │    │   PokemonCard       │      │
│  │                 │    │                 │    │   (multiple)        │      │
│  │ - Name Input    │    │ - Pokeball CSS  │    │                     │      │
│  │ - Type Select   │    │ - Spin Animation│    │ - Image             │      │
│  │ - Legendary     │    │                 │    │ - Name & ID         │      │
│  │   Select        │    │                 │    │ - Type Badges       │      │
│  │ - Clear Button  │    │                 │    │ - Legendary Badge   │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────────┘      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP/JSON (fetch)
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Pokemon Backend                                     │
│                      (Express.js REST API)                                    │
│                         Port: 3001                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### App.js (Main Container)

| Responsibility | Description |
|----------------|-------------|
| State Management | Manages all application state using useState hooks |
| Data Fetching | Fetches Pokemon and types data on component mount |
| Filter Logic | Applies filtering based on user input |
| Conditional Rendering | Shows loading, error, or main content |

### FilterBar.js

| Responsibility | Description |
|----------------|-------------|
| User Input | Captures name search, type filter, legendary filter |
| Event Handling | Calls parent callbacks on filter changes |
| UI State | Shows/hides clear button based on active filters |

### PokemonCard.js

| Responsibility | Description |
|----------------|-------------|
| Data Display | Renders individual Pokemon information |
| Visual Styling | Applies type-based colors and legendary styling |
| Image Handling | Displays sprite with fallback on error |

### LoadingSpinner.js

| Responsibility | Description |
|----------------|-------------|
| Loading State | Displays animated Pokeball during data fetch |
| Pure Presentational | No props or state, purely visual |

## Data Flow

### Initial Load Sequence

```
┌─────────┐    ┌───────────┐    ┌─────────────┐    ┌──────────────┐
│  Mount  │───>│  Fetch    │───>│  Set State  │───>│   Render     │
│  App    │    │  Data     │    │  pokemons   │    │   Cards      │
└─────────┘    └───────────┘    │  types      │    └──────────────┘
                                └─────────────┘
```

### Filter Interaction Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  User Input │───>│  FilterBar  │───>│  App.js     │───>│  Re-render  │
│  (type,     │    │  onChange   │    │  setFilters │    │  Grid       │
│   search)   │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                             │
                                             ▼
                                      ┌─────────────┐
                                      │  useEffect  │
                                      │  (filters)  │
                                      │  applies    │
                                      │  filtering  │
                                      └─────────────┘
```

## Key Architectural Decisions

### 1. Client-Side Filtering

- **Decision**: Filter data in browser instead of server requests
- **Rationale**: Faster UX, reduced server load, small dataset
- **Trade-off**: All data loaded upfront; not suitable for large datasets

### 2. Local State Only

- **Decision**: Use React useState instead of Redux/Context
- **Rationale**: Simple application with limited state complexity
- **Trade-off**: State not easily shareable across deep component trees

### 3. CSS-per-Component

- **Decision**: Separate CSS file for each component
- **Rationale**: Better organization, easier maintenance
- **Trade-off**: No CSS-in-JS benefits (scoping, dynamic styles)

### 4. Proxy Configuration

- **Decision**: Use CRA proxy for API requests in development
- **Rationale**: Avoid CORS issues during development
- **Implementation**: `"proxy": "http://localhost:3001"` in package.json

## Module Dependencies

```
src/
├── index.js ──────────────> App.js
│                              │
│                              ├──> FilterBar.js
│                              │
│                              ├──> PokemonCard.js
│                              │
│                              └──> LoadingSpinner.js
│
└── index.css (global styles)
```

### External Dependencies

```
pokemon-frontend
├── react (^18.2.0)
│   └── useState, useEffect
├── react-dom (^18.2.0)
│   └── createRoot
└── react-scripts (5.0.1)
    └── Build tooling, dev server
```

## State Structure

```javascript
// App.js State
{
  pokemons: [                    // Raw data from API
    { id, name, type[], legendary, image }
  ],
  filteredPokemons: [            // After applying filters
    { id, name, type[], legendary, image }
  ],
  types: ['Dragon', 'Electric', ...], // Available types for dropdown
  filters: {
    name: '',                    // Search string
    type: '',                    // Selected type
    legendary: ''                // '', 'true', or 'false'
  },
  loading: boolean,              // Show spinner
  error: string | null           // Error message
}
```

## Request Lifecycle

```
1. Component Mounts
   │
   ▼
2. useEffect triggers (dependency: [])
   │
   ▼
3. setLoading(true)
   │
   ▼
4. Promise.all([fetch(/api/pokemons), fetch(/api/types)])
   │
   ├── Success ─────────────────────────────────┐
   │                                            │
   │   ▼                                        │
   │   setPokemons(data)                        │
   │   setFilteredPokemons(data)                │
   │   setTypes(data)                           │
   │   setError(null)                           │
   │                                            │
   └── Failure ─────────────────────────────────┤
                                                │
       ▼                                        │
       setError(message)                        │
                                                │
                                                ▼
5. setLoading(false)
   │
   ▼
6. Render appropriate view
```

## Styling Architecture

### CSS Organization

| File | Scope | Contents |
|------|-------|----------|
| `index.css` | Global | Base fonts, code styling |
| `App.css` | App-level | Layout, header, grid, error states |
| `FilterBar.css` | Component | Form controls, responsive |
| `PokemonCard.css` | Component | Card, types, badges, animations |
| `LoadingSpinner.css` | Component | Pokeball animation |

### Type Color System

```css
.type-fire     { background: linear-gradient(45deg, #ff6b6b, #ff8e53); }
.type-water    { background: linear-gradient(45deg, #4ecdc4, #44a08d); }
.type-grass    { background: linear-gradient(45deg, #95e1d3, #68d391); }
.type-electric { background: linear-gradient(45deg, #fce38a, #f9ca24); }
.type-psychic  { background: linear-gradient(45deg, #e056fd, #c44569); }
.type-ice      { background: linear-gradient(45deg, #74b9ff, #0984e3); }
.type-dragon   { background: linear-gradient(45deg, #a29bfe, #6c5ce7); }
.type-flying   { background: linear-gradient(45deg, #fd79a8, #fdcb6e); }
.type-poison   { background: linear-gradient(45deg, #6c5ce7, #a29bfe); }
```

## Scalability Considerations

### Current Limitations

1. All Pokemon loaded at once (memory intensive for large datasets)
2. No pagination or virtual scrolling
3. No caching of API responses
4. State not persisted across page refreshes

### Future Enhancement Paths

1. **Pagination**: Add page/limit params, paginated API calls
2. **Caching**: Use React Query or SWR for data fetching
3. **State Persistence**: LocalStorage or sessionStorage
4. **Routing**: Add React Router for detail pages
5. **Testing**: Add Jest/React Testing Library tests
6. **TypeScript**: Add type safety

## Security Considerations

| Aspect | Current State | Notes |
|--------|--------------|-------|
| XSS | Protected by React | JSX escapes by default |
| API Keys | None exposed | No sensitive data in frontend |
| HTTPS | Depends on deployment | Recommended for production |

## Environment Configuration

| Variable | Default | Usage |
|----------|---------|-------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |
| `PORT` | 3000 | Development server port |
