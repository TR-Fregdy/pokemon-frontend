# Public Directory

> Part of [Pokemon Frontend](../ARCHITECTURE.md)

## Purpose

This directory contains static assets that are served directly without processing by webpack. Files here are copied as-is to the build output.

## Directory Structure

```
public/
├── index.html            # HTML template for React app
├── manifest.json         # Progressive Web App manifest
└── README.md             # This file
```

## File Descriptions

### index.html

The HTML template that hosts the React application.

**Key Elements:**
- `<div id="root">` - React mount point
- Meta tags for viewport and description
- `%PUBLIC_URL%` placeholder for asset paths

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Pokemon Explorer..." />
    <title>Pokemon Explorer</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript...</noscript>
    <div id="root"></div>
  </body>
</html>
```

### manifest.json

Progressive Web App (PWA) configuration:

| Property | Value | Description |
|----------|-------|-------------|
| `short_name` | Pokemon Explorer | App name on home screen |
| `name` | Pokemon Explorer - Filter and Browse Pokemon | Full app name |
| `start_url` | `.` | Starting page |
| `display` | standalone | Display mode |
| `theme_color` | #000000 | Browser UI color |
| `background_color` | #ffffff | Splash screen color |

## Adding Static Assets

Place files in this directory to serve them at the root URL:

| File | Accessible At |
|------|---------------|
| `public/favicon.ico` | `/favicon.ico` |
| `public/logo.png` | `/logo.png` |
| `public/robots.txt` | `/robots.txt` |

**Reference in HTML:**
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

**Reference in JavaScript:**
```javascript
<img src={process.env.PUBLIC_URL + '/logo.png'} />
```

## Build Output

During `npm run build`, contents of this directory are copied to `/build/`:

```
public/              →    build/
├── index.html       →    ├── index.html (processed)
├── manifest.json    →    ├── manifest.json
└── [other files]    →    └── [other files]
```

## Notes

- Files here are NOT processed by webpack
- Use `src/` for files that need import/bundling
- Large static assets should go here to avoid bundling
- `index.html` is the only required file

## Related Documentation

- [Frontend Architecture](../ARCHITECTURE.md) - System architecture
- [src README](../src/README.md) - Source code documentation
