# public Directory

> Part of [Pokemon Frontend](../ARCHITECTURE.md)

This directory contains static assets that are served directly without processing by the build system.

## Purpose

The `public` directory holds files that:
- Are copied as-is to the build output
- Can be referenced with `%PUBLIC_URL%` in HTML
- Are not processed by Webpack/CRA

## Files

### index.html

**Purpose**: HTML template that hosts the React application.

**Key Elements**:
- `<div id="root">` - React mount point
- Meta tags for viewport and theme
- SEO description meta tag
- Favicon link placeholder
- Noscript fallback message

**Template Variables**:
- `%PUBLIC_URL%` - Resolves to public folder path

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

### manifest.json

**Purpose**: Web App Manifest for PWA capabilities.

**Configuration**:
| Property | Value | Description |
|----------|-------|-------------|
| `short_name` | "Pokemon Explorer" | Short display name |
| `name` | "Pokemon Explorer - Filter and Browse Pokemon" | Full application name |
| `start_url` | "." | Entry point URL |
| `display` | "standalone" | Display mode (app-like) |
| `theme_color` | "#000000" | Browser UI theme color |
| `background_color` | "#ffffff" | Splash screen background |

## How CRA Uses This Directory

```
public/
    │
    ├── index.html ──────> Processed by html-webpack-plugin
    │                      (injects bundled JS/CSS)
    │
    └── [other files] ───> Copied to build/ as-is
```

## Adding Static Assets

Files placed in `public/` are:
1. **Accessible at root URL**: `/filename.ext`
2. **Not fingerprinted**: No cache-busting hash
3. **Not minified**: Served exactly as provided

**Use Cases**:
- Favicon and app icons
- robots.txt
- sitemap.xml
- Static JSON files
- Files that need stable URLs

## Not Currently Present (Optional)

| File | Purpose |
|------|---------|
| `favicon.ico` | Browser tab icon |
| `logo192.png` | PWA icon (192x192) |
| `logo512.png` | PWA icon (512x512) |
| `robots.txt` | Search engine crawling rules |

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Full system architecture overview
- [src/README.md](src/README.md) - Source code documentation
- [CLAUDE.md](../CLAUDE.md) - AI agent context and quick reference
