# /public Directory

> Part of [Pokemon Frontend Architecture](../ARCHITECTURE.md)

This directory contains static assets that are served directly without processing by Webpack.

## Directory Structure

```
public/
├── index.html      # Main HTML template
└── manifest.json   # Progressive Web App manifest
```

## Key Files

### index.html

**Purpose**: The main HTML template that React mounts into.

**Key Features**:
- Root `<div id="root">` element for React mounting
- Meta tags for viewport and theme color
- SEO description meta tag
- Noscript fallback message

**Template Variables**:
| Variable | Purpose |
|----------|---------|
| `%PUBLIC_URL%` | Resolves to public folder path |

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

### manifest.json

**Purpose**: Web App Manifest for Progressive Web App (PWA) capabilities.

**Configuration**:
| Property | Value | Purpose |
|----------|-------|---------|
| `short_name` | "Pokemon Explorer" | App icon label |
| `name` | "Pokemon Explorer - Filter and Browse Pokemon" | Full app name |
| `start_url` | "." | Launch URL |
| `display` | "standalone" | Display mode |
| `theme_color` | "#000000" | Browser theme |
| `background_color` | "#ffffff" | Splash background |

## How Public Files Work

### Build Process

During `npm run build`, files in `/public`:
1. Are copied to the build output directory
2. Are not processed by Webpack
3. Maintain their original filenames
4. Can be referenced via `%PUBLIC_URL%`

### Development

During `npm start`:
- Files are served from the public directory
- Changes require manual refresh
- `index.html` is the entry point for the dev server

## Adding Static Assets

To add static assets (images, fonts, etc.):

1. Place files in the `/public` directory
2. Reference in HTML: `<img src="%PUBLIC_URL%/image.png" />`
3. Reference in JS: `process.env.PUBLIC_URL + '/image.png'`

**Note**: For assets that should be processed by Webpack (optimization, hashing), place them in `/src` instead and import them.

## Missing Assets

The following common public assets are not present:
- `favicon.ico` - Browser tab icon
- `logo192.png` - PWA icon (192x192)
- `logo512.png` - PWA icon (512x512)
- `robots.txt` - Search engine directives

Consider adding these for a complete PWA setup.

## Related Documentation

- [Main Architecture](../ARCHITECTURE.md)
- [Source Directory](../src/README.md)
- [CLAUDE.md](../CLAUDE.md)
