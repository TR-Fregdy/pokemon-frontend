# src/ - Source Directory

This directory contains all the source code for the Pokemon Frontend application.

## Purpose

The `src/` directory is the main source folder containing all React components, styles, and application logic.

## Directory Structure

```
src/
├── components/       # Reusable UI components
│   ├── FilterBar.js
│   ├── FilterBar.css
│   ├── PokemonCard.js
│   ├── PokemonCard.css
│   ├── LoadingSpinner.js
│   └── LoadingSpinner.css
├── App.js            # Main application component
├── App.css           # Main application styles
├── index.js          # React entry point
└── index.css         # Global styles
```

## Key Files

| File | Purpose |
|------|---------|
| `index.js` | Application entry point; renders App to DOM using React 18's createRoot |
| `index.css` | Global base styles (fonts, body resets) |
| `App.js` | Main container component managing state, data fetching, and routing logic |
| `App.css` | Layout styles, header, grid, error states, responsive breakpoints |

## How It Connects

- **Entry Point**: `index.js` imports and renders `App.js`
- **App Component**: Imports and orchestrates all components from `components/`
- **Styles**: Each component has a paired CSS file for scoped styling

## Data Flow

```
index.js
    │
    └──> App.js (state management, API calls)
              │
              ├──> FilterBar (user input)
              ├──> PokemonCard (data display)
              └──> LoadingSpinner (loading state)
```

## Architecture Reference

For the complete architecture overview, see [ARCHITECTURE.md](../ARCHITECTURE.md).
