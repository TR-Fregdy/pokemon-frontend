# Public Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains static assets that are served directly without processing by the build system.

## Directory Structure

```
public/
├── index.html      # HTML template for React app
├── manifest.json   # PWA manifest configuration
└── favicon.ico     # Site favicon (if present)
```

## File Descriptions

### index.html

**Purpose**: HTML template that serves as the entry point for the React application.

**Key Elements**:

| Element | Purpose |
|---------|---------|
| `<meta charset="utf-8">` | Character encoding |
| `<meta name="viewport">` | Responsive viewport settings |
| `<meta name="theme-color">` | Browser theme color |
| `<meta name="description">` | SEO description |
| `<title>` | Page title: "Pokemon Explorer" |
| `<div id="root">` | React mount point |
| `<noscript>` | Fallback for JS-disabled browsers |

**Template Variables**:
- `%PUBLIC_URL%` - Replaced with public URL at build time

**React Integration**:
```html
<div id="root"></div>
```
React's `index.js` targets this element:
```javascript
ReactDOM.createRoot(document.getElementById('root'))
```

### manifest.json

**Purpose**: Web App Manifest for Progressive Web App (PWA) capabilities.

**Configuration**:

| Property | Value | Purpose |
|----------|-------|---------|
| `short_name` | "Pokemon Explorer" | App name for home screen |
| `name` | "Pokemon Explorer - Filter and Browse Pokemon" | Full app name |
| `start_url` | "." | Launch URL |
| `display` | "standalone" | App display mode |
| `theme_color` | "#000000" | Browser UI color |
| `background_color` | "#ffffff" | Splash screen background |

**PWA Features Enabled**:
- Can be installed to home screen
- Standalone app-like experience
- Custom theme colors

## Build Process

During `npm run build`:

1. Files in `public/` are copied to `build/` as-is
2. `%PUBLIC_URL%` variables are replaced
3. Static assets are served from root path
4. `index.html` becomes the SPA entry point

## Deployment Notes

### Nginx Configuration

The Nginx config in `.tr-codegen/nginx.conf` handles SPA routing:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This ensures all routes return `index.html` for client-side routing.

### Static Assets

Add any static files that should not be processed:
- Images (favicons, logos)
- Fonts
- robots.txt
- sitemap.xml

## Related Documentation

- [../src/README.md](../src/README.md) - Source code overview
- [../ARCHITECTURE.md](../ARCHITECTURE.md) - Full architecture
- [../CLAUDE.md](../CLAUDE.md) - AI agent context
