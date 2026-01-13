# public Directory

This directory contains static assets and the HTML template for the Pokemon Frontend application.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Main HTML template with React mount point |
| `manifest.json` | Web app manifest for PWA configuration |

## index.html

The main HTML template that serves as the entry point:
- Defines `<div id="root">` where React app mounts
- Sets meta tags for viewport and description
- Includes noscript fallback message
- Title: "Pokemon Explorer"

## manifest.json

Web app manifest configuration for progressive web app features.

## Static Asset Handling

Files in this directory are:
- Served directly without processing by webpack
- Available at the root URL path
- Not included in the JavaScript bundle

## Usage

To reference files from this directory in code:
```javascript
// In React components
<img src="/my-image.png" />

// Or using PUBLIC_URL
<img src={`${process.env.PUBLIC_URL}/my-image.png`} />
```

## Related Documentation

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for system architecture
