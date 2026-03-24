# public/ — Static Public Assets

This directory contains the static files that are served directly by the web server without processing by Webpack. These files form the HTML shell and metadata for the single-page application.

## Directory Structure

```
public/
├── index.html       # HTML entry point and application shell
└── manifest.json    # Progressive Web App (PWA) manifest metadata
```

## Key Files and Their Responsibilities

### index.html
- **Role:** The single HTML page that serves as the application shell.
- Contains the `<div id="root"></div>` element where React mounts the entire application.
- Includes standard HTML5 `<meta>` tags for charset, viewport, and theme color.
- Links to the PWA manifest (`manifest.json`).
- Sets the page title to "Pokemon Explorer".
- The `react-scripts` build process injects bundled JavaScript and CSS into this file during the build step.

### manifest.json
- **Role:** PWA manifest providing metadata for browser and mobile device integration.
- Defines the application short name ("Pokemon Explorer") and display mode.
- Configures theme and background colors.
- References app icons (standard Create React App defaults).
- Enables the app to be installable as a PWA on supported devices.

## How This Directory Connects to Other Parts

- **Downstream:** `src/index.js` mounts the React application into the `#root` div defined in `index.html`.
- **Build process:** During `npm run build`, Create React App (Webpack) copies the contents of `public/` to the `build/` output directory and injects script/style tags into `index.html`.
- **Production:** In production, Nginx serves the built files from `/usr/share/nginx/html/`, with `index.html` as the fallback for all routes (SPA routing via `try_files` in the Nginx config at `.tr-codegen/nginx.conf`).

## Architecture Reference

For the full system architecture and deployment pipeline, see [ARCHITECTURE.md](../ARCHITECTURE.md).
