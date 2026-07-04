# Pokemon Frontend

A modern React single-page application for browsing and filtering Pokemon. Features a beautiful glassmorphism UI with real-time filtering capabilities.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Application runs at: `http://localhost:3000`

**Note**: Requires Pokemon Backend running at `http://localhost:3001`

## Features

| Feature | Description |
|---------|-------------|
| Name Search | Case-insensitive partial matching |
| Type Filter | Filter by elemental type (dropdown) |
| Legendary Filter | Show all, legendary only, or non-legendary |
| Real-time Filtering | Instant results without API calls |
| Responsive Design | Desktop, tablet, and mobile layouts |
| Error Handling | Graceful network failure recovery |
| Pokeball Spinner | Animated loading indicator |

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Scripts | 5.0.1 | Build tooling (CRA) |
| CSS3 | - | Styling with animations |
| Docker | - | Containerization |
| Nginx | Alpine | Production server |

## Project Structure

```
pokemon-frontend/
├── public/
│   ├── index.html             # HTML template
│   └── manifest.json          # PWA configuration
├── src/
│   ├── index.js               # React entry point
│   ├── index.css              # Global styles
│   ├── App.js                 # Root component (state, logic)
│   ├── App.css                # App layout styles
│   └── components/
│       ├── PokemonCard.js     # Pokemon display card
│       ├── PokemonCard.css    # Card styles & type colors
│       ├── FilterBar.js       # Filter controls
│       ├── FilterBar.css      # Filter form styles
│       ├── LoadingSpinner.js  # Pokeball animation
│       └── LoadingSpinner.css # Spinner keyframes
├── .tr-codegen/
│   ├── Dockerfile             # Multi-stage build
│   ├── docker-compose.yml     # Full-stack orchestration
│   └── nginx.conf             # SPA routing config
├── package.json
├── .env.example               # Environment template
├── README.md                  # This file
├── CLAUDE.md                  # AI agent guidance
└── ARCHITECTURE.md            # System architecture
```

## Development

### Prerequisites

- Node.js v18 or later
- npm or yarn
- Pokemon Backend API running

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your backend URL
REACT_APP_API_URL=http://localhost:3001
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server with HMR |
| `npm run build` | Production build to `build/` |
| `npm test` | Run Jest tests |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run container (port 3002) |

### Development Proxy

During development, API calls are proxied to the backend:
```json
"proxy": "http://localhost:3001"
```

## Docker Deployment

### Standalone Frontend

```bash
# Build
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .

# Run
docker run -p 3002:80 pokemon-frontend
```

### Full Stack (Frontend + Backend)

```bash
# Start both services
docker-compose -f .tr-codegen/docker-compose.yml up -d

# Stop services
docker-compose -f .tr-codegen/docker-compose.yml down
```

**Access Points**:
- Frontend: http://localhost:3002
- Backend: http://localhost:3001

## Component Overview

### App.js (Root)

Main component managing:
- State for pokemons, filters, loading, errors
- API calls on mount
- Client-side filtering logic
- Render tree coordination

### FilterBar

Filter control inputs:
- Text input for name search
- Dropdown for type selection
- Dropdown for legendary status
- Clear filters button

### PokemonCard

Pokemon display card showing:
- Sprite image with fallback
- Pokemon name and ID
- Type badges with gradient colors
- Legendary badge (conditional)

### LoadingSpinner

Animated Pokeball with CSS keyframes.

## API Integration

### Endpoints Consumed

| Endpoint | Purpose |
|----------|---------|
| `GET /api/pokemons` | Fetch all Pokemon |
| `GET /api/types` | Fetch available types |

### Configuration

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## Styling

### Design Tokens

- **Background**: Purple gradient (`#667eea` to `#764ba2`)
- **Header**: Coral-teal gradient (`#ff6b6b` to `#4ecdc4`)
- **Cards**: White glassmorphism with blur
- **Legendary**: Gold accent (`#ffd700`)

### Type Colors

Each Pokemon type has a unique gradient:
- Fire: Red-orange
- Water: Teal-green
- Electric: Yellow
- Psychic: Purple-pink
- And more...

### Breakpoints

- Mobile: < 768px (single column)
- Desktop: >= 768px (multi-column grid)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Documentation

- [CLAUDE.md](./CLAUDE.md) - AI agent guidance and patterns
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture diagrams
- [components/README.md](./src/components/README.md) - Component documentation

## Related Projects

- **Pokemon Backend**: REST API providing Pokemon data
