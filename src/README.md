# src/ - Application Source Code

## Purpose

This directory contains all React source code for the Pokemon Frontend application. It houses the main application component, global styles, and the entry point that bootstraps React into the DOM.

## Key Files and Their Responsibilities

| File        | Responsibility                                                                                      |
|-------------|------------------------------------------------------------------------------------------------------|
| `index.js`  | Application entry point. Creates the React root using `ReactDOM.createRoot` and renders `<App />` inside `<React.StrictMode>`. |
| `App.js`    | Root container component. Manages all application state (Pokemon data, filters, loading, errors), performs API data fetching on mount, implements client-side filtering logic, and orchestrates child component rendering. |
| `index.css` | Global CSS styles applied to the entire application (body resets, background gradients, base typography). |
| `App.css`   | Styles specific to the `App` component including header layout, Pokemon grid (CSS Grid with `auto-fill`), results info bar, error container, and no-results messaging. |

## Subdirectories

| Directory      | Description                                                          |
|----------------|----------------------------------------------------------------------|
| `components/`  | Contains all presentational React components (`FilterBar`, `PokemonCard`, `LoadingSpinner`) with their co-located CSS files. |

## How This Directory Connects to Other Parts of the System

- **Entry point**: `index.js` is the webpack entry point configured by Create React App; it mounts the React app into `public/index.html`'s `<div id="root">`
- **API integration**: `App.js` fetches data from the Pokemon Backend API (`GET /api/pokemons`, `GET /api/types`) using the native `fetch` API. The backend URL is configured via the `REACT_APP_API_URL` environment variable
- **Components**: `App.js` imports and renders all components from the `components/` subdirectory, passing data and callbacks as props
- **Build output**: CRA compiles all files in this directory into optimized static assets in the `/build` directory for production deployment

## Architecture Reference

For a high-level overview of the system architecture, data flow, and design decisions, see [ARCHITECTURE.md](../ARCHITECTURE.md).
