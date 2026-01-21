# public/ - Static Assets

This directory contains static files that are served directly without processing by webpack.

## Purpose

The `public/` directory holds the HTML template, manifest file, and other static assets that don't require bundling or transformation.

## Directory Contents

| File | Purpose |
|------|---------|
| `index.html` | Main HTML template with root div for React mounting |
| `manifest.json` | PWA manifest defining app name and display settings |

## Key Files

### index.html

The main HTML document that serves as the template for the React application.

**Key Elements:**
- `<div id="root">` - Mount point for React application
- Meta tags for viewport, theme color, and description
- Title: "Pokemon Explorer"
- Noscript fallback message

```html
<div id="root"></div>
```

React's `createRoot` in `src/index.js` renders the App component into this div.

### manifest.json

PWA (Progressive Web App) manifest configuration:

```json
{
  "short_name": "Pokemon Explorer",
  "name": "Pokemon Explorer - Filter and Browse Pokemon",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## How It Connects

```
public/
├── index.html  ─────────────────────────────────────────┐
│   └── <div id="root">                                  │
│                                                        ▼
└── manifest.json                              src/index.js
                                               └── ReactDOM.createRoot(
                                                     document.getElementById('root')
                                                   )
```

## Adding Static Assets

Files placed in this directory:
- Are copied to the build output as-is
- Can be referenced using `%PUBLIC_URL%` prefix in HTML
- Do not go through webpack processing

Example:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

## Architecture Reference

For the complete architecture overview, see [ARCHITECTURE.md](../ARCHITECTURE.md).
