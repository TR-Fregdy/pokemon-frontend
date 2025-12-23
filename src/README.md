# Source Directory (src/)

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains all the React application source code for the Pokemon Explorer frontend.

## Directory Structure

```
src/
├── index.js           # React DOM entry point
├── index.css          # Base/global styles
├── App.js             # Main application component
├── App.css            # Application layout styles
└── components/        # Reusable UI components
    └── (see components/README.md)
```

## File Descriptions

### index.js

**Purpose**: React DOM entry point that bootstraps the application.

**Key Functions**:
- Creates React root using `createRoot` API (React 18)
- Renders `<App />` wrapped in `<React.StrictMode>`
- Mounts application to `#root` element in `public/index.html`

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### index.css

**Purpose**: Base styles and CSS reset for the application.

**Key Styles**:
- Body margin reset
- System font stack
- Font smoothing for better rendering
- Monospace font for code elements

### App.js

**Purpose**: Main container component that manages all application state and orchestrates child components.

**Key Responsibilities**:

| Responsibility | Implementation |
|----------------|----------------|
| State Management | `useState` for pokemons, filters, loading, error |
| Data Fetching | `useEffect` to fetch from backend API on mount |
| Filtering Logic | `useEffect` to apply filters when they change |
| Event Handling | `handleFilterChange`, `clearFilters` functions |
| Conditional Rendering | Loading, error, and success states |

**State Variables**:

```javascript
const [pokemons, setPokemons] = useState([]);           // All Pokemon
const [filteredPokemons, setFilteredPokemons] = useState([]); // Filtered results
const [types, setTypes] = useState([]);                 // Filter options
const [filters, setFilters] = useState({                // Current filters
  name: '',
  type: '',
  legendary: ''
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**API Integration**:
- Fetches from `REACT_APP_API_URL` environment variable
- Defaults to `http://localhost:3001`
- Parallel fetches `/api/pokemons` and `/api/types` on mount

### App.css

**Purpose**: Layout and styling for the main application component.

**Key Styles**:

| Class | Purpose |
|-------|---------|
| `.app` | Root container, min-height viewport |
| `.app-header` | Gradient header with title |
| `.main-content` | Content wrapper with max-width |
| `.pokemon-grid` | CSS Grid for Pokemon cards |
| `.results-info` | Filter results count display |
| `.no-results` | Empty state messaging |
| `.error-container` | Error state layout |
| `.clear-button` | Filter clear button style |
| `.retry-button` | Error retry button style |

**Responsive Design**:
- Breakpoint at 768px for mobile/tablet
- Adjusts grid columns and header size

## Data Flow

```
API Response
     │
     ▼
┌─────────────────┐
│    App.js       │
│  (Container)    │
│                 │
│  pokemons ──────┼──────────────────┐
│  filters ───────┼───────┐          │
│  types ─────────┼─────┐ │          │
│                 │     │ │          │
└─────────────────┘     │ │          │
         │              │ │          │
         ▼              ▼ ▼          ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ FilterBar   │  │ PokemonCard │  │ Loading     │
│ (input)     │  │ (display)   │  │ Spinner     │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API base URL |

## Related Documentation

- [components/README.md](./components/README.md) - Component documentation
- [../ARCHITECTURE.md](../ARCHITECTURE.md) - Full architecture overview
- [../CLAUDE.md](../CLAUDE.md) - AI agent context
