# public/

Static assets served as-is by the Create React App build. Files in this
directory are copied verbatim to the build output (`build/`) and are
NOT processed by webpack.

## Purpose

Provide the static HTML shell and web-app metadata required for the
React SPA to bootstrap in a browser. React mounts into the `<div
id="root"></div>` element declared here.

## Key Files

| File            | Responsibility                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`    | SPA shell. Declares `<title>Pokemon Explorer</title>`, viewport + theme meta tags, and the `#root` mount node. Uses `%PUBLIC_URL%` token replaced at build time by CRA. |
| `manifest.json` | Web-app manifest (name, short name, icons, theme color) referenced by browsers / PWA installers.                                |

## How It Connects

```
public/index.html
  ├─ <div id="root"></div>           ← React mounts here
  └─ <link rel="manifest">           ← points at manifest.json
           │
           ▼
src/index.js  ──▶ ReactDOM.createRoot(document.getElementById('root'))
```

In production (Docker image), Nginx serves these files along with the
webpack-generated JS/CSS bundles. The SPA fallback rule in
`.tr-codegen/nginx.conf` redirects unknown routes back to
`index.html` so client-side routing (if ever added) would work.

## Conventions

- Only put files here that must be referenced by absolute URL or served
  at a stable path. Everything else belongs in `src/`.
- Do not import files from `public/` inside JavaScript modules — use
  `%PUBLIC_URL%/filename` in HTML or reference them by absolute path
  at runtime.
- Keep this directory small; assets placed here are not hashed for
  cache busting.

## Related

- Project overview: [../README.md](../README.md)
- AI-agent guidance: [../CLAUDE.md](../CLAUDE.md)
- Architecture: [../ARCHITECTURE.md](../ARCHITECTURE.md)
