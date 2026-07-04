# public/

## Purpose

The `public/` directory contains static assets that are served directly by the web server without being processed by the Webpack build pipeline. Files in this directory are copied as-is to the build output root.

## Key Files

| File             | Responsibility                                                                                          |
|------------------|---------------------------------------------------------------------------------------------------------|
| `index.html`     | The HTML shell template for the React application. Contains the `<div id="root"></div>` mount point where React renders the component tree. Includes meta tags for SEO, viewport configuration, and the page title ("Pokemon Explorer"). |
| `manifest.json`  | Progressive Web App (PWA) manifest defining the application name ("Pokemon Explorer"), display mode (`standalone`), theme color, and background color. Used by browsers to support add-to-home-screen functionality. |

## How It Connects to the Rest of the System

- **`index.html`** is the entry point loaded by the browser. The React build system injects bundled JavaScript and CSS `<script>` and `<link>` tags into this file during the build process (`npm run build`).
- **`src/index.js`** targets the `#root` div element defined in `index.html` to bootstrap the React application using `ReactDOM.createRoot()`.
- In production, **Nginx** serves these static files from `/usr/share/nginx/html` as configured in `.tr-codegen/nginx.conf`.
- The `%PUBLIC_URL%` placeholder in `index.html` is replaced at build time with the correct public path.

## Notes

- Files placed here are **not** minified or processed by Webpack.
- Only files referenced from `index.html` or via `%PUBLIC_URL%` are included in the production build.
- Favicon and other static assets (if added) should be placed in this directory.

For a high-level overview of the project architecture, see [ARCHITECTURE.md](../ARCHITECTURE.md).
