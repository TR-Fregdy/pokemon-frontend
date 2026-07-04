# Pokemon Frontend

A modern React-based web application for browsing and filtering Pokemon data. This application provides an intuitive interface with real-time filtering capabilities.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.2.0 | UI library |
| React DOM | ^18.2.0 | DOM rendering |
| React Scripts | 5.0.1 | Build tooling (Create React App) |
| CSS3 | - | Styling with animations |

## Features

- 🔍 **Search by Name** - Find Pokemon by typing their name
- 🏷️ **Filter by Type** - Filter Pokemon by their elemental type
- ⭐ **Legendary Filter** - Show only legendary or non-legendary Pokemon
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- ⚡ **Real-time Filtering** - Instant results as you type
- 🐙 **Error Handling** - Graceful handling of network issues

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Backend API running on port 3001 (see [pokemon-backend](../pokemon-backend))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pokemon-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Environment Configuration

The app uses a proxy configuration in `package.json` to forward API requests to `http://localhost:3001`. For custom API URLs, set:

```bash
REACT_APP_API_URL=http://localhost:3001
```

## Project Structure

```
pokemon-frontend/
├── public/
│   ├── index.html        # HTML template
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── FilterBar.js      # Search and filter controls
│   │   ├── FilterBar.css
│   │   ├── PokemonCard.js    # Individual Pokemon display
│   │   ├── PokemonCard.css
│   │   ├── LoadingSpinner.js # Pokeball loading animation
│   │   └── LoadingSpinner.css
│   ├── App.js            # Main application component
│   ├── App.css           # Main application styles
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `react-scripts start` | Start development server on port 3000 |
| `build` | `react-scripts build` | Build for production |
| `test` | `react-scripts test` | Run test suite |
| `eject` | `react-scripts eject` | Eject from Create React App |
| `docker:build` | `docker build -t pokemon-frontend .` | Build Docker image |
| `docker:run` | `docker run -p 3002:80 pokemon-frontend` | Run Docker container |

## Features in Detail

### Search and Filtering

The application provides three ways to filter Pokemon:

1. **Name Search**: Type any part of a Pokemon's name (case-insensitive)
2. **Type Filter**: Select from available Pokemon types dropdown
3. **Legendary Filter**: Choose All / Legendary Only / Non-Legendary Only

Filters can be combined for more specific results.

### Pokemon Cards

Each Pokemon is displayed in a styled card showing:

- Pokemon image/sprite
- Name and ID number (formatted as #001)
- Type badges with color coding
- Special legendary badge with golden styling

### Responsive Design

| Viewport | Layout |
|----------|--------|
| Desktop | Multi-column grid layout |
| Tablet | Responsive grid with fewer columns |
| Mobile | Single column layout |

## Docker Setup

```bash
# Build the image
npm run docker:build

# Run the container (serves on port 80, mapped to 3002)
npm run docker:run
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Architecture

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md).
