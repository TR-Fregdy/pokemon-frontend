# Pokemon Frontend

A React-based web application for browsing and filtering Pokemon data. This frontend connects to the Pokemon Backend API to display and filter Pokemon in an interactive interface.

## Technology Stack

- **Framework**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS3 with custom styling
- **HTTP Client**: Fetch API

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Backend API running on port 3001

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application runs on `http://localhost:3000` by default.

## Features

- **Search by Name** - Find Pokemon by typing their name
- **Filter by Type** - Filter Pokemon by their elemental type
- **Legendary Filter** - Show only legendary or non-legendary Pokemon
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Glassmorphism design with animations
- **Real-time Filtering** - Instant results as you type
- **Error Handling** - Graceful handling of network issues

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

## Project Structure

```
pokemon-frontend/
├── public/                  # Static assets
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── FilterBar.js    # Search and filter controls
│   │   ├── PokemonCard.js  # Individual Pokemon card
│   │   └── LoadingSpinner.js # Loading animation
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Architecture

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
