# Public Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains static assets and the HTML template for the Pokemon Explorer application.

## Directory Structure

```
public/
├── index.html        # Main HTML template
├── manifest.json     # PWA manifest file
└── README.md         # This file
```

## Files Overview

### index.html

The main HTML template that serves as the entry point for the React application.

**Key Elements:**
- `<div id="root">` - React mount point
- Meta tags for viewport and description
- Title: "Pokemon Explorer"

**Template Variables:**
- `%PUBLIC_URL%` - Replaced with public URL during build

---

### manifest.json

Web App Manifest for Progressive Web App (PWA) capabilities.

**Contents:**
- App name and description
- Display mode settings
- Theme colors

## Usage Notes

### Adding Static Assets

Place static files here that need to be served as-is:
- Favicon (`favicon.ico`)
- Robots.txt
- Static images referenced by absolute path
- Third-party verification files

### Referencing in Code

Access public files using the `PUBLIC_URL` environment variable:

```jsx
// In JSX
<img src={`${process.env.PUBLIC_URL}/logo.png`} />

// In CSS (inside public/index.html)
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

### Build Behavior

During `npm run build`:
- Files are copied to `build/` directory
- No processing or optimization applied
- `%PUBLIC_URL%` replaced with actual path

## Best Practices

1. **Prefer `src/` for assets** - Use imports in `src/` for better optimization
2. **Keep minimal** - Only truly static files should go here
3. **No JavaScript** - JS files here won't be processed by Webpack
