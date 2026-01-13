# public Directory

## Purpose

This directory contains static assets and the HTML template that serves as the entry point for the React application. Files here are served directly without processing by Webpack.

## Key Files

| File | Description |
|------|-------------|
| `index.html` | HTML template with root element for React mounting |
| `manifest.json` | Progressive Web App (PWA) manifest configuration |

## File Responsibilities

### index.html

- **DOCTYPE and HTML Structure**: Provides the base HTML5 document structure
- **Meta Tags**: Charset (UTF-8), viewport configuration for responsive design, theme color
- **SEO**: Description meta tag for search engines
- **Title**: "Pokemon Explorer" displayed in browser tab
- **Root Element**: `<div id="root">` where React application mounts
- **Noscript Fallback**: Message for users with JavaScript disabled
- **Placeholder for Assets**: Favicon link (using `%PUBLIC_URL%` for correct path resolution)

### manifest.json

Configures Progressive Web App behavior:

- **short_name**: "Pokemon Explorer" (displayed on home screen)
- **name**: "Pokemon Explorer - Filter and Browse Pokemon" (full name)
- **start_url**: "." (relative to manifest location)
- **display**: "standalone" (app-like appearance when installed)
- **theme_color**: "#000000"
- **background_color**: "#ffffff"

## Special Variables

The `%PUBLIC_URL%` variable in `index.html` is replaced during build:
- Development: Empty string (files served from root)
- Production: Configured public path (supports subdirectory deployment)

## Connection to Other Parts

- **Build Process**: Contents copied to `/build` during `npm run build`
- **React Mounting**: `src/index.js` targets the `#root` element defined here
- **Asset References**: Other static assets (images, fonts) can be placed here and referenced directly

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for high-level system design
