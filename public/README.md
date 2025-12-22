# public/ - Static Assets Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

## Overview

This directory contains static assets that are served directly without processing by Webpack. Files here are copied as-is to the build output.

## Directory Contents

```
public/
├── index.html        # Main HTML template
└── manifest.json     # PWA manifest file
```

## Key Files

### index.html

**Purpose**: The main HTML template that hosts the React application.

**Key Elements**:
- `<meta charset="utf-8" />` - UTF-8 character encoding
- `<meta name="viewport" />` - Mobile responsive viewport
- `<meta name="theme-color" />` - Browser theme color
- `<meta name="description" />` - SEO description
- `<title>` - Page title ("Pokemon Explorer")
- `<div id="root">` - React mount point
- `<noscript>` - Fallback for no JavaScript

**How It Works**:
1. Create React App injects built JavaScript/CSS bundles during build
2. React mounts to the `#root` div element
3. `%PUBLIC_URL%` placeholder is replaced with the public path

**Template Variables**:
- `%PUBLIC_URL%` - Replaced with the public URL path at build time

### manifest.json

**Purpose**: Web App Manifest for Progressive Web App (PWA) functionality.

**Provides**:
- App name and metadata for "Add to Home Screen"
- Icon definitions (if icons were added)
- Theme and background colors
- Display mode settings

## Adding Static Files

Files placed in this directory:
- Are NOT processed by Webpack
- Keep their original filenames
- Can be referenced using `%PUBLIC_URL%` in HTML
- Are copied directly to the build folder

**Example Uses**:
```html
<!-- In index.html -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

**In JavaScript/React**:
```javascript
// Using process.env.PUBLIC_URL
<img src={process.env.PUBLIC_URL + '/logo.png'} />
```

## When to Use public/ vs src/

| Use `public/` | Use `src/` |
|---------------|------------|
| favicon.ico | Component images |
| robots.txt | Icons used in React |
| manifest.json | CSS backgrounds |
| Static HTML files | Any processed assets |
| Files that need exact names | Import statements |

## Build Output

During `npm run build`, contents of `public/` are:
1. Copied to `build/` directory
2. `%PUBLIC_URL%` placeholders are replaced
3. No minification or processing applied
4. Combined with Webpack-built assets from `src/`

## Missing Files Notice

The following common files are not present but could be added:
- `favicon.ico` - Browser tab icon
- `logo192.png` - PWA icon (192x192)
- `logo512.png` - PWA icon (512x512)
- `robots.txt` - Search engine crawler rules

To add these, simply place the files in this directory.
