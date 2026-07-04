# public Directory

This directory contains static assets that are served directly without processing by the React build system.

## Purpose

The `public` directory holds files that:
- Are copied directly to the build output
- Are not processed by Webpack
- Are accessible via the root URL path

## Key Files

| File | Description |
|------|-------------|
| `index.html` | Main HTML template that hosts the React application |
| `manifest.json` | Web App Manifest for PWA support |

## index.html

The HTML template that:
- Defines the document structure and metadata
- Contains the `<div id="root">` element where React mounts
- Sets viewport configuration for responsive design
- Includes meta description for SEO

## manifest.json

PWA manifest configuration containing:
- Application name and short name
- Theme and background colors
- Display mode settings

## Usage Notes

- Files in this directory can be referenced using `%PUBLIC_URL%` in `index.html`
- Only files inside `public` can be accessed from the browser
- Large files that don't need processing should go here
- Favicon and other static assets belong in this directory

## Connection to Project

This directory provides the HTML shell that hosts the React application. The React build process injects the compiled JavaScript bundles into `index.html`. See [ARCHITECTURE.md](../ARCHITECTURE.md) for the overall system architecture.
