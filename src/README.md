# src Directory

This directory contains all the source code for the Pokemon Frontend React application.

## Directory Purpose

The `src` directory is the main source code directory containing:
- React components
- Application styles
- Entry point configuration

## Directory Structure

```
src/
├── components/           # Reusable React components
│   ├── FilterBar.js     # Search and filter controls
│   ├── FilterBar.css    # FilterBar styles
│   ├── PokemonCard.js   # Individual Pokemon card component
│   ├── PokemonCard.css  # PokemonCard styles
│   ├── LoadingSpinner.js # Animated loading indicator
│   └── LoadingSpinner.css # LoadingSpinner styles
├── App.js               # Main application container component
├── App.css              # Application-level styles
├── index.js             # React DOM entry point
├── index.css            # Global CSS styles
└── README.md            # This file
```

## Key Files

### Entry Point

| File | Description |
|------|-------------|
| `index.js` | Application entry point that renders the App component into the DOM |
| `index.css` | Global CSS reset and base styles |

### Main Application

| File | Description |
|------|-------------|
| `App.js` | Main container component managing state and data fetching |
| `App.css` | Styles for App component including header, grid, and responsive layouts |

### Components

See the [components/README.md](./components/README.md) for details on individual components.

## Connection to Other Parts

- **Entry**: `index.js` is referenced by the HTML template in `public/index.html`
- **API**: `App.js` fetches data from the Pokemon Backend API
- **Build**: All files are processed by react-scripts during build

## Architecture Reference

For high-level architecture information, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
