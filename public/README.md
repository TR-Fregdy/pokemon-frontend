# Public Directory (`public/`)

This directory contains static assets that are served directly without processing by the build system.

> **Parent Documentation**: See [ARCHITECTURE.md](../ARCHITECTURE.md) for the full architecture overview.

## Directory Structure

```
public/
├── index.html        # HTML template for the React app
└── manifest.json     # PWA manifest configuration
```

## File Descriptions

### index.html

The main HTML template that serves as the entry point for the React application.

**Key Elements:**
| Element | Purpose |
|---------|---------|
| `<meta charset="utf-8">` | UTF-8 character encoding |
| `<meta name="viewport">` | Responsive viewport settings |
| `<meta name="theme-color">` | Browser theme color |
| `<meta name="description">` | SEO description |
| `<title>` | Page title: "Pokemon Explorer" |
| `<div id="root">` | React mount point |

**How it works:**
1. Browser loads `index.html`
2. React scripts are injected by the build process
3. React mounts the App component to `<div id="root">`

### manifest.json

PWA (Progressive Web App) configuration file.

**Configuration:**
| Property | Value | Purpose |
|----------|-------|---------|
| `short_name` | "Pokemon Explorer" | Short name for home screen |
| `name` | "Pokemon Explorer - Filter and Browse Pokemon" | Full application name |
| `start_url` | "." | App launch URL |
| `display` | "standalone" | Standalone app display mode |
| `theme_color` | "#000000" | Theme color for browser UI |
| `background_color` | "#ffffff" | Splash screen background |

## Usage Notes

### Adding Static Assets

Files placed in `public/` are:
- Copied to the build output as-is
- Accessible via the root URL path
- Not processed by Webpack

**Example:**
- File: `public/favicon.ico`
- URL: `http://localhost:3000/favicon.ico`

### Referencing Public Files in Code

Use `%PUBLIC_URL%` in HTML:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

Use `process.env.PUBLIC_URL` in JavaScript:
```javascript
<img src={process.env.PUBLIC_URL + '/image.png'} />
```

### Files to Add Here

- Favicon (`favicon.ico`)
- Robots.txt (`robots.txt`)
- Static images that don't need processing
- Third-party library files

### Files NOT to Add Here

- JavaScript source files (use `src/`)
- CSS files that need processing (use `src/`)
- Images that should be optimized (import in `src/`)

## Build Output

When running `npm run build`:
1. Contents of `public/` are copied to `build/`
2. `index.html` is processed to inject scripts
3. `%PUBLIC_URL%` placeholders are replaced with actual path

## Related Documentation

- [../src/README.md](../src/README.md) - Source code documentation
- [../ARCHITECTURE.md](../ARCHITECTURE.md) - Full architecture
- [../CLAUDE.md](../CLAUDE.md) - AI agent guidance
