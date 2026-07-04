# public - Static Assets Directory

## Purpose

The `public/` directory contains static files that are served directly by the web server without processing or bundling.

## Directory Structure

```
public/
├── index.html          # HTML entry point for the React application
└── manifest.json       # PWA manifest for app metadata
```

## Key Files

### index.html

**Purpose**: Root HTML template for the React application.

**Content**:
- Basic HTML structure with `<!DOCTYPE html>`
- Meta tags for viewport, charset, and description
- Link to favicon (if present)
- Link to manifest.json for PWA support
- `<div id="root"></div>` - mount point for React application
- Script references (injected by build process)

**Important Notes**:
- This file is NOT processed by Webpack
- Changes to this file require server restart
- The `<div id="root"></div>` is where React renders the App component
- Build process injects CSS and JS references

**Customization**:
To modify the page title or meta tags, edit this file. Changes will be reflected immediately in development and after rebuild in production.

### manifest.json

**Purpose**: Progressive Web App (PWA) manifest providing metadata about the application.

**Content**:
- Application name and short name
- Description
- Icons (for app install to home screen)
- Display mode (standalone, fullscreen, minimal-ui)
- Orientation
- Start URL
- Theme and background colors

**PWA Support**:
The manifest enables:
- Installing the app to home screen on mobile
- Custom app icon and splash screen
- Standalone display mode
- Offline support (when service workers are implemented)

**Note**: Currently, the frontend doesn't implement service workers, so offline support is not enabled.

## File Serving

### Development
- Files in `public/` are served as-is by Create React App dev server
- Available at root path (e.g., `http://localhost:3000/index.html`)

### Production
- Files are copied to the `build/` directory during `npm run build`
- Served by Nginx (in Docker) or configured web server
- Static assets are cached with appropriate headers

## Assets

### Images
- Store any static images here (logos, icons, etc.)
- Alternatively, import images in JavaScript for bundling

### Fallback Assets
- `placeholder-pokemon.png` (expected but not present in repo)
  - Used as fallback when Pokemon images fail to load
  - Should be placed here if image fallback is needed

## References in Code

### From JavaScript/React
Import assets or reference from public directory:

```javascript
// Using require (if supported)
const image = require('./public/placeholder-pokemon.png');

// Or directly reference in src attribute
<img src="/placeholder-pokemon.png" alt="Placeholder" />
```

### From HTML
Reference assets with root-relative paths:
```html
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/favicon.ico">
```

## Build Process

### What Happens
1. Files in `public/` are copied to `build/public/` directory
2. `index.html` remains as entry point
3. `manifest.json` is copied as-is
4. Assets are NOT minified or processed
5. Build process injects script and link tags into `index.html`

### Before Build
```html
<div id="root"></div>
```

### After Build
```html
<div id="root"></div>
<script defer src="/static/js/main.xxx.js"></script>
<link href="/static/css/main.xxx.css" rel="stylesheet">
```

## Docker Deployment

In Docker (Nginx):
- `public/` assets are served from `/usr/share/nginx/html/`
- Direct file requests bypass the React application
- Good for static assets and public files

## Performance Considerations

### Caching
- Static files can be cached by browsers with appropriate headers
- Nginx configuration sets cache headers for best practices
- Bundle files use content hashing for cache busting

### Size
- Keep `public/` directory small
- Use images optimally
- Consider lazy loading for large assets

## Security Considerations

### What NOT to Store Here
- API keys or secrets
- Private tokens
- Configuration files with sensitive data
- Source maps in production

### Public Accessibility
- Everything in `public/` is accessible to end users
- Never store sensitive information here
- Use environment variables for secrets (with REACT_APP_ prefix)

## Customization

### Adding Assets
1. Place files in `public/` directory
2. Reference with root-relative paths: `/filename`
3. Changes take effect immediately in development
4. Rebuild required for production deployment

### Updating manifest.json
Edit to customize:
- Application name (shown when installing app)
- Icons (for home screen)
- Display mode
- Theme colors
- Start URL

## Common Tasks

### Add a Favicon
1. Create favicon.ico file
2. Place in `public/` directory
3. Add link in `index.html`: `<link rel="icon" href="/favicon.ico">`

### Add Logo or Branding
1. Optimize image (PNG or SVG preferred)
2. Place in `public/` directory
3. Reference in `index.html` or React components

### Update PWA Icons
1. Create icons (192x192 and 512x512 PNG recommended)
2. Place in `public/` directory
3. Update `manifest.json` with icon URLs

## Related Documentation

- See [../ARCHITECTURE.md](../ARCHITECTURE.md) for deployment architecture
- See [../README.md](../README.md) for overall project information
- [PWA Documentation](https://web.dev/progressive-web-apps/)
