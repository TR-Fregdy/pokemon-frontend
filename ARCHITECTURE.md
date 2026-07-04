# Pokemon Frontend - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   Pokemon Frontend (React SPA)                  │
│              Running on port 3000 (dev) or 80 (Docker)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               React Application                          │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐│  │
│  │  │         App Component (Root)                         ││  │
│  │  │  • Global State Management                          ││  │
│  │  │  • API Data Fetching                                ││  │
│  │  │  • Filter Logic                                     ││  │
│  │  │  • Conditional Rendering (loading/error/content)   ││  │
│  │  └─────────────────────────────────────────────────────┘│  │
│  │                          │                               │  │
│  │          ┌───────────────┼───────────────┐               │  │
│  │          ▼               ▼               ▼               │  │
│  │  ┌──────────────┐ ┌─────────────┐ ┌─────────────┐      │  │
│  │  │ FilterBar    │ │ Pokemon     │ │ Loading     │      │  │
│  │  │ Component    │ │ Grid        │ │ Spinner     │      │  │
│  │  │              │ │             │ │             │      │  │
│  │  │ • Search     │ │ PokemonCard │ │ • Animation │      │  │
│  │  │ • Type       │ │ Components  │ │ • Message   │      │  │
│  │  │ • Legendary  │ │ (12 cards)  │ └─────────────┘      │  │
│  │  │ • Clear All  │ └─────────────┘                      │  │
│  │  └──────────────┘                                       │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                    │
│                           │ HTTP Requests (JSON)              │
│                           │                                    │
└───────────────────────────┼────────────────────────────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │  Pokemon Backend API     │
              │  (Express.js)            │
              │  Port: 3001              │
              │                          │
              │  Routes:                 │
              │  • /api/pokemons         │
              │  • /api/types            │
              │  • /health               │
              └──────────────────────────┘
```

## Component Hierarchy

```
App
├── Header (static)
├── FilterBar
│   ├── Name Search Input
│   ├── Type Dropdown Select
│   ├── Legendary Status Dropdown
│   └── Clear Filters Button
├── Results Info Display
└── Content (conditional)
    ├── LoadingSpinner (during initial load)
    ├── Error Message (on API failure)
    ├── No Results Message (when filtered list is empty)
    └── Pokemon Grid
        └── PokemonCard (×filtered count)
            ├── Image Container (with optional Legendary Badge)
            ├── Pokemon Name
            ├── Type Badges (×type count)
            └── Pokemon ID
```

## State Management Flow

```
App Component State
│
├── pokemons: Pokemon[]           (Original data from API)
├── filteredPokemons: Pokemon[]   (After applying filters)
├── types: string[]               (Available types)
├── filters: {                    (Current filter values)
│   ├── name: string
│   ├── type: string
│   └── legendary: string
├── loading: boolean              (API request status)
└── error: string | null          (Error message, if any)

State Updates Flow:
│
├── Initial Load (useEffect)
│   ├── setLoading(true)
│   ├── Fetch /api/pokemons → setPokemons()
│   ├── Fetch /api/types → setTypes()
│   ├── setLoading(false)
│   └── On error: setError()
│
├── Filter Change (useEffect)
│   ├── Filter pokemons based on current filters
│   └── setFilteredPokemons()
│
└── User Actions
    ├── handleFilterChange() → setFilters()
    └── clearFilters() → setFilters({...})
```

## Data Flow

### Initial Page Load
```
1. Browser loads HTML
2. React mounts App component
   ├── useEffect triggers
   ├── setLoading(true)
   └── fetch both endpoints in parallel
3. Backend returns data
   ├── setPokemons([...])
   ├── setTypes([...])
   └── setLoading(false)
4. Component re-renders
   ├── Display FilterBar with types
   └── Display PokemonCard grid
```

### User Filters Interaction
```
1. User types in search or changes dropdown
2. FilterBar calls onFilterChange()
3. App updates filters state with setFilters()
4. filters state change triggers second useEffect
5. applyFilters() runs:
   ├── Start with copy of pokemons array
   ├── filter() by name if provided
   ├── filter() by type if provided
   ├── filter() by legendary if provided
   └── setFilteredPokemons(filtered)
6. App re-renders with new filteredPokemons
7. PokemonCard components re-render instantly
```

### Error Handling Flow
```
1. API request fails (network/backend down)
2. catch block in try-catch
3. setError(message)
4. setLoading(false)
5. App renders error container instead of content
6. User can click "Retry" button
   └── window.location.reload()
```

## File Structure

```
pokemon-frontend/
│
├── src/                           # Application source code
│   ├── App.js                    # Root component
│   ├── App.css                   # App and global styles
│   ├── index.js                  # Entry point
│   ├── index.css                 # Base/reset styles
│   │
│   └── components/               # Reusable UI components
│       ├── PokemonCard.js        # Pokemon display component
│       ├── PokemonCard.css       # Card styles
│       ├── FilterBar.js          # Filter controls component
│       ├── FilterBar.css         # Filter UI styles
│       ├── LoadingSpinner.js     # Loading indicator
│       └── LoadingSpinner.css    # Spinner animation
│
├── public/                        # Static assets
│   ├── index.html                # HTML template
│   └── manifest.json             # PWA manifest
│
├── package.json                   # Dependencies and scripts
├── .env.example                   # Environment variables template
├── Dockerfile                     # Docker build config
├── docker-compose.yml             # Docker Compose config
├── nginx.conf                     # Nginx server config (production)
├── README.md                      # User documentation
└── ARCHITECTURE.md                # This file
```

## Component Details

### App Component

**State Variables**:
```javascript
[pokemons, setPokemons]           // Full dataset from API
[filteredPokemons, setFilteredPokemons] // Filtered results
[types, setTypes]                 // Available types
[filters, setFilters]             // Filter form state
[loading, setLoading]             // Loading indicator
[error, setError]                 // Error message
```

**Effects**:
1. **useEffect (mounting)**: Fetch initial data from API
   - Runs once on component mount
   - Sets loading states and error handling
   
2. **useEffect (filters)**: Apply client-side filtering
   - Runs when filters or pokemons change
   - Implements name/type/legendary filtering

**Methods**:
- `handleFilterChange(newFilters)`: Update filters and trigger re-render
- `clearFilters()`: Reset all filters to empty state

**Rendering Logic**:
- If loading: Show LoadingSpinner
- Else if error: Show error message with retry button
- Else: Show FilterBar + Pokemon grid

### FilterBar Component

**Props**:
- `filters`: Object with current filter values
- `types`: Array of available type strings
- `onFilterChange`: Callback function
- `onClearFilters`: Callback function

**Features**:
- Name input with text box
- Type selector with dropdown
- Legendary selector with dropdown (All/Legendary Only/Non-Legendary)
- Clear button (shown only if any filter is active)

**Event Handling**:
- `handleInputChange()`: Updates individual filter field
- Calls `onFilterChange()` with new filter state

### PokemonCard Component

**Props**:
- `pokemon`: Object with id, name, type[], legendary, image

**Features**:
- Conditional "legendary" CSS class
- Image with fallback error handler
- Legendary badge overlay
- Type badges with type-specific CSS classes
- Zero-padded ID display

**Error Handling**:
- Image onError: Falls back to `/placeholder-pokemon.png`

### LoadingSpinner Component

**Features**:
- Pokeball icon/animation
- Centered display
- Pure CSS animation (no external libraries)
- Loading message text

## Styling Architecture

### CSS Organization

1. **Global Styles** (`index.css`):
   - Browser reset/normalization
   - Root font and color settings
   - Body styling

2. **App Styles** (`App.css`):
   - App container layout
   - Header styling
   - Main content grid
   - Error container styling
   - Results info display
   - No results message
   - Global button styles

3. **Component Styles** (individual .css files):
   - FilterBar.css: Filter controls layout
   - PokemonCard.css: Card layout, image, badges
   - LoadingSpinner.css: Spinner animation

### Design Features

- **Glassmorphism**: Semi-transparent backgrounds with blur
- **Responsive Grid**: CSS Grid with auto-fit columns
- **Type Badges**: Color-coded by type (fire, water, grass, etc.)
- **Animations**: 
  - Pokeball spinner (CSS keyframes)
  - Card hover effects
  - Smooth transitions

## API Contract

### Assumptions About Backend Responses

**GET /api/pokemons (or with query params)**:
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "name": "Pikachu",
      "type": ["Electric"],
      "legendary": false,
      "image": "https://raw.githubusercontent.com/..."
    },
    // ... more Pokemon
  ]
}
```

**GET /api/types**:
```json
{
  "success": true,
  "data": ["Electric", "Fire", "Flying", "Grass", ...]
}
```

## Error Boundaries

The app handles:
- Network errors (backend offline)
- JSON parsing errors
- Missing data fields

Does NOT handle:
- Component rendering errors (would need Error Boundary)
- Invalid image URLs (fallback provides placeholder)

## Performance Optimizations

1. **Batch API Requests**: Uses `Promise.all()` to fetch data in parallel
2. **Client-Side Filtering**: No API calls after initial load
3. **Array Methods**: Uses native `.filter()` for efficient filtering
4. **Conditional Rendering**: Only renders relevant UI based on state
5. **Event Delegation**: Uses synthetic events (React's event system)

## Build and Deployment

### Development
- `npm start`: Runs Create React App dev server on port 3000
- Hot module reloading enabled
- Source maps for debugging

### Production
- `npm run build`: Creates optimized build in `build/` folder
- JavaScript minification
- CSS minification
- Asset fingerprinting

### Docker
- Multi-stage build:
  1. Build stage: Node.js environment compiles React
  2. Production stage: Nginx serves static files
- Gzip compression enabled
- Cache headers configured
- Security headers added

## Environment Configuration

**Development** (.env):
```
REACT_APP_API_URL=http://localhost:3001
```

**Production** (.env.production):
```
REACT_APP_API_URL=https://api.example.com
```

The environment variable must be set before build time due to Create React App limitations.

## Integration Points

1. **Backend**: Communicates via HTTP requests to `/api/*` endpoints
2. **Images**: Fetches from PokeAPI external service
3. **Nginx** (Docker): Serves static files and handles routing
