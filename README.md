# Pokemon Frontend

A modern React single-page application for browsing and filtering Pokemon data. The app features a responsive glassmorphism UI with real-time search, type-based filtering, and legendary status filtering, powered by the Pokemon Backend API.

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.2.0 | UI framework with hooks |
| ReactDOM | ^18.2.0 | DOM rendering |
| react-scripts | 5.0.1 | Build toolchain (Webpack, Babel, Jest, ESLint) |
| CSS3 | - | Styling with animations, grid, glassmorphism |
| Docker | - | Containerized deployment |
| Nginx | Alpine | Production static file server |

## Quick Start

### Prerequisites

- Node.js v18 or later
- npm
- Pokemon Backend API running on port 3001 (see [pokemon-backend](../pokemon-backend/README.md))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pokemon-frontend

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env
# Edit .env to set REACT_APP_API_URL if needed

# Start the development server
npm start
```

The application opens at `http://localhost:3000` and proxies API requests to `http://localhost:3001`.

### Docker

```bash
# Build and run with Docker
docker build -f .tr-codegen/Dockerfile -t pokemon-frontend .
docker run -p 3002:80 pokemon-frontend

# Or use Docker Compose (starts both frontend + backend)
docker-compose -f .tr-codegen/docker-compose.yml up -d
```

## High-Level Usage

### Search & Filter Pokemon

1. **Name Search** - Type any part of a Pokemon's name in the search box for instant results
2. **Type Filter** - Select from the dropdown to filter by elemental type (Fire, Water, Electric, etc.)
3. **Legendary Filter** - Toggle between All, Legendary Only, or Non-Legendary Only
4. **Clear Filters** - Reset all filters with the Clear Filters button

All filters work in combination and apply in real-time.

### Pokemon Cards

Each Pokemon is displayed as a card showing:
- Pokemon sprite image (from PokeAPI)
- Name and ID number (formatted as #001)
- Color-coded type badges
- Legendary badge for legendary Pokemon

### Responsive Layout

- **Desktop**: Multi-column grid
- **Tablet**: Adaptive 2-3 column layout
- **Mobile**: Single column with touch-friendly controls

## Project Structure

```
pokemon-frontend/
├── public/                    # Static assets and HTML entry point
│   ├── index.html             # HTML template with root div
│   └── manifest.json          # PWA manifest
├── src/                       # React source code
│   ├── components/            # Reusable UI components
│   │   ├── FilterBar.js       # Search and filter controls
│   │   ├── FilterBar.css
│   │   ├── PokemonCard.js     # Individual Pokemon display card
│   │   ├── PokemonCard.css
│   │   ├── LoadingSpinner.js  # Pokeball loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js                 # Main container component
│   ├── App.css                # App-level styles and grid
│   ├── index.js               # React DOM entry point
│   └── index.css              # Global styles
├── .tr-codegen/               # Deployment configuration
│   ├── Dockerfile             # Multi-stage Docker build
│   ├── docker-compose.yml     # Full-stack orchestration
│   └── nginx.conf             # SPA serving configuration
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `react-scripts start` | Start development server on port 3000 |
| `npm run build` | `react-scripts build` | Build optimized production bundle |
| `npm test` | `react-scripts test` | Run Jest test suite |
| `npm run eject` | `react-scripts eject` | Eject from Create React App |
| `npm run docker:build` | `docker build ...` | Build Docker image |
| `npm run docker:run` | `docker run ...` | Run Docker container |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API base URL |

In development, `package.json` includes a `proxy` setting to `http://localhost:3001` for seamless API proxying.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Architecture

For a detailed overview of the system architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).
