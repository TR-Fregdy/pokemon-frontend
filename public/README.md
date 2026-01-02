# public Directory

> Static assets and HTML template for the Pokemon Explorer application

## Purpose

This directory contains static files that are served directly without processing by webpack. The `index.html` file serves as the template for the React application.

## Files

### index.html

**HTML template** - The single HTML file for the SPA.

**Structure**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Pokemon Explorer - Browse and filter your favorite Pokemon!" />
    <title>Pokemon Explorer</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

**Key Elements**:
| Element | Purpose |
|---------|---------|
| `<div id="root">` | React mount point |
| `<meta name="viewport">` | Responsive design support |
| `<meta name="description">` | SEO description |
| `%PUBLIC_URL%` | Replaced with public path during build |
| `<noscript>` | Fallback for JavaScript-disabled browsers |

---

### manifest.json

**PWA manifest** - Web App Manifest for Progressive Web App support.

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

| Property | Value | Description |
|----------|-------|-------------|
| `short_name` | "Pokemon Explorer" | Name shown on home screen |
| `name` | Full name | Name shown in app install prompt |
| `start_url` | "." | Starting page when launched |
| `display` | "standalone" | App-like display mode |
| `theme_color` | "#000000" | Browser toolbar color |
| `background_color` | "#ffffff" | Splash screen background |

## Optional Static Assets

These files can be added to this directory:

| File | Purpose |
|------|---------|
| `favicon.ico` | Browser tab icon |
| `logo192.png` | PWA icon (192x192) |
| `logo512.png` | PWA icon (512x512) |
| `robots.txt` | Search engine directives |
| `placeholder-pokemon.png` | Fallback image for missing sprites |

## Build Process

During `npm run build`:

1. Files in `public/` are copied to `build/`
2. `%PUBLIC_URL%` placeholders are replaced
3. `index.html` is processed to inject JS/CSS bundle references
4. Static assets remain unchanged

## Usage Notes

### Adding Static Files
Place any file here to make it accessible at the root URL:
- `public/image.png` → `http://localhost:3000/image.png`

### Referencing in Code
Use `process.env.PUBLIC_URL` for dynamic paths:
```javascript
<img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
```

Or in HTML:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

## Related Documentation

- [src/](../src/) - React source code
- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture
- [CLAUDE.md](../CLAUDE.md) - AI agent reference
