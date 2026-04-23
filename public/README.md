# `public/` – Static Assets

This directory contains the static files that are served as-is by the
Create-React-App toolchain (or by Nginx in production). They are not processed
by webpack beyond simple token substitution (`%PUBLIC_URL%`).

## Purpose

Provides the HTML shell that hosts the mounted React application and the PWA
manifest that describes the app to mobile browsers and installers.

## Key Files

| File            | Responsibility                                                             |
|-----------------|----------------------------------------------------------------------------|
| `index.html`    | HTML template served on every page load. Contains `<div id="root"></div>` where React mounts. Also sets `<title>`, viewport, theme color, and description meta tags. |
| `manifest.json` | Progressive Web App manifest (icons, start URL, display mode, colors).     |

## How It Connects

- `src/index.js` renders `<App />` into the `#root` element declared in
  `index.html`.
- `%PUBLIC_URL%` placeholders in `index.html` are replaced at build time with
  the correct absolute path (so static assets such as `favicon.ico` resolve
  correctly under any subpath deployment).
- During `npm start` the dev server serves this directory directly; during
  `npm run build`, files here are copied verbatim into `build/` and then into
  the Nginx-served image at deploy time.

## Editing Notes

- **Do** add icons, robots.txt, or other static assets here.
- **Do not** import files in this folder from JavaScript code – they are not
  processed by webpack. Use `src/` for anything that needs hashing/bundling.

## Related Docs

- Project overview → [`../README.md`](../README.md)
- System architecture → [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
