# public/ - Static Assets

## Purpose

This directory contains static files that are served directly by the web server without being processed by the Webpack build pipeline. Files placed here are copied as-is to the build output directory.

## Key Files

| File | Responsibility |
|------|---------------|
| `index.html` | HTML entry point for the React application. Contains the `<div id="root"></div>` element where React mounts the App component. Includes meta tags for viewport, theme color, and description. |
| `manifest.json` | Progressive Web App (PWA) manifest defining the app name ("Pokemon Explorer - Filter and Browse Pokemon"), display mode (standalone), and icon references. |

## How It Connects to the System

- **`index.html`** is the single HTML document served for all routes. In production, Nginx's `try_files` directive redirects all paths to this file, enabling client-side routing.
- **React mounting point**: `src/index.js` calls `ReactDOM.createRoot(document.getElementById('root'))` to render the App component into the `<div id="root">` element defined in `index.html`.
- **Build process**: During `npm run build`, the contents of `public/` are copied to the `build/` directory, and Webpack injects bundled JS/CSS references into `index.html`.

## Architecture Reference

For a high-level overview of the project architecture, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
