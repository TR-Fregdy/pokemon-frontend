# public Directory

## Purpose

This directory contains static assets and the HTML template for the Pokemon Frontend application. Files in this directory are served as-is and are not processed by the React build system (except for `index.html` which receives injected script tags).

## Key Files

| File | Description |
|------|-------------|
| `index.html` | HTML template that serves as the entry point for the React application |
| `manifest.json` | Web App Manifest for Progressive Web App (PWA) configuration |

## File Responsibilities

### index.html

- **Root DOM Element**: Provides `<div id="root">` where React mounts the application
- **Meta Tags**: Sets viewport, charset, theme color, and description
- **Noscript Fallback**: Displays message if JavaScript is disabled
- **Favicon Reference**: Links to favicon.ico (if present)

### manifest.json

- **App Name**: "Pokemon Explorer - Filter and Browse Pokemon"
- **Short Name**: "Pokemon Explorer"
- **Display Mode**: Standalone (app-like experience)
- **Theme/Background Colors**: Configured for PWA presentation

## Static Asset Placement

Files placed in this directory:
- Are accessible at the root URL path
- Are copied directly to the build output
- Can be referenced using `%PUBLIC_URL%` in HTML

Example:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

## Connection to Other Parts

- **src/index.js**: React entry point that renders into `#root` div
- **Build Process**: webpack injects script bundles into `index.html`
- **Nginx**: Production server serves these files from `/usr/share/nginx/html/`

For overall project architecture, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
