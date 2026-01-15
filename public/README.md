# public Directory

This directory contains static assets that are served directly without processing by webpack.

## Directory Purpose

The `public` directory holds:
- HTML template for the React application
- Web app manifest for PWA support
- Static assets accessible via URL

## Files

| File | Purpose |
|------|-------------|
| `index.html` | Main HTML template with root div for React mounting |
| `manifest.json` | Web app manifest for PWA configuration |

## File Details

### index.html

The main HTML template that serves as the entry point for the application.

**Key Elements**:
- `<div id="root">` - Mount point for React application
- Meta tags for viewport and theme color
- Title: "Pokemon Explorer"
- Noscript fallback message

**Template Variables**:
- `%PUBLIC_URL%` - Replaced with public URL during build

### manifest.json

Web App Manifest for Progressive Web App (PWA) support.

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

## Directory Structure

```
public/
├── index.html       # HTML template
├── manifest.json    # PWA manifest
└── README.md        # This file
```

## Connection to Other Parts

- **React App**: `index.html` contains the `#root` element where React mounts via `src/index.js`
- **Build Process**: Files are copied to build output with `%PUBLIC_URL%` replaced
- **Assets**: Any files placed here are accessible at the root URL path

## Usage Notes

- Files in `public/` are not processed by webpack
- Use for static assets that need fixed URLs
- Reference using `%PUBLIC_URL%` in HTML or `process.env.PUBLIC_URL` in JavaScript

## Architecture Reference

For high-level architecture information, see [../ARCHITECTURE.md](../ARCHITECTURE.md).
