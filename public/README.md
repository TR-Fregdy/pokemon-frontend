# public/ - Static Assets and HTML Template

## Purpose

This directory contains the static HTML template and public assets that are served directly by the web server without processing by webpack. The `index.html` file serves as the shell into which the React application is mounted at runtime.

## Key Files and Their Responsibilities

| File            | Responsibility                                                                                     |
|-----------------|----------------------------------------------------------------------------------------------------|
| `index.html`   | The root HTML document for the application. Contains the `<div id="root">` element where React mounts the app via `ReactDOM.createRoot`. Includes meta tags for viewport, description, and theme color. The page title is set to "Pokemon Explorer". |
| `manifest.json` | Progressive Web App (PWA) manifest configuration. Defines the application name ("Pokemon Explorer - Filter and Browse Pokemon"), short name ("Pokemon Explorer"), display mode (`standalone`), and theme and background colors. |

## How This Directory Connects to Other Parts of the System

- **React mounting point**: `index.html` provides the `<div id="root">` element that `src/index.js` targets with `ReactDOM.createRoot(document.getElementById('root'))`
- **Build process**: During `npm run build`, Create React App injects the compiled JavaScript and CSS bundles into `index.html` and copies all public assets to the `/build` output directory
- **Production serving**: In Docker deployment, Nginx serves the contents of this directory (post-build) from `/usr/share/nginx/html`, with SPA fallback routing configured to redirect all paths to `index.html`
- **Image fallback**: `PokemonCard` component references `/placeholder-pokemon.png` as an image error fallback, which would be served from this directory if present

## Architecture Reference

For a high-level overview of the system architecture, deployment pipeline, and component relationships, see [ARCHITECTURE.md](../ARCHITECTURE.md).
