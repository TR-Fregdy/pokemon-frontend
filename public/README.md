# Public Directory

This directory contains static assets that are served directly without processing by webpack.

> For detailed architecture information, see [ARCHITECTURE.md](../ARCHITECTURE.md)

## Directory Structure

```
public/
├── index.html      # HTML template
├── manifest.json   # PWA manifest
└── README.md       # This file
```

## Files Overview

### `index.html`

The main HTML template for the React application.

**Key Elements**:
- `<meta charset="utf-8">` - Character encoding
- `<meta name="viewport">` - Responsive viewport settings
- `<meta name="description">` - SEO description
- `<title>Pokemon Explorer</title>` - Page title
- `<div id="root">` - React mount point

**Notes**:
- `%PUBLIC_URL%` is replaced with the public URL during build
- No direct script imports needed (React Scripts handles injection)

### `manifest.json`

Web App Manifest for Progressive Web App (PWA) features.

**Configuration**:
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

## Adding Static Assets

To add static files that need to be served directly:

1. Place the file in this `public/` directory
2. Reference using `%PUBLIC_URL%` in HTML or absolute path in code

**Example**:
```html
<!-- In index.html -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

<!-- In React component -->
<img src="/logo.png" alt="Logo" />
```

## Build Output

During `npm run build`:
- Contents of `public/` are copied to `build/`
- `index.html` is processed and has React scripts injected
- `%PUBLIC_URL%` placeholders are replaced with actual URLs

## Notes

- Files here bypass webpack processing
- No hashing is applied to filenames
- Use `src/` for files that need import/bundling
- Use `public/` for files that need exact URLs (favicon, manifest, robots.txt)
