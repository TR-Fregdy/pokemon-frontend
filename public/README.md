# `public/` — Static Assets

## Purpose

This directory holds the static files that Create React App copies verbatim into the production build. The Webpack-compiled JavaScript bundle is later injected into `index.html` by the build process.

## Key Files

| File | Responsibility |
| ---- | -------------- |
| `index.html`    | HTML shell. Defines `<div id="root">` where React mounts (`src/index.js` calls `createRoot(document.getElementById('root'))`). Sets meta tags (viewport, theme color, description) and the page `<title>` — "Pokemon Explorer". |
| `manifest.json` | Progressive Web App metadata: `short_name`, `name`, `start_url`, `display`, `theme_color`, `background_color`. Allows the app to be installed on mobile devices. |

## Connections to Other Parts of the System

- `src/index.js` mounts the React tree into `#root` inside `index.html`.
- `%PUBLIC_URL%` placeholders inside `index.html` (e.g. `favicon.ico`) are rewritten by Create React App's build step to point at this directory.
- `PokemonCard` falls back to `/placeholder-pokemon.png` from this directory whenever a remote sprite fails to load. Add such fallback assets here.

## Conventions

- Do **not** import files from `public/` in React component code — use `src/assets/…` instead if you need bundling/hashing.
- Keep the directory minimal; everything that should be processed by Webpack belongs under `src/`.

## See Also

- Project architecture: [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
