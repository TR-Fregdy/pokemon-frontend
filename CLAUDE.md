# CLAUDE.md — AI Agent Guidance (pokemon-frontend)

This document provides guidance to AI coding agents reasoning about or
generating code for the `pokemon-frontend` repository. Read this file
before making any automated modifications so your output is compatible
with the existing conventions, runtime assumptions, and component
contracts.

---

## 1. Project Identity

- **Repository**: `TR-Fregdy/pokemon-frontend`
- **Type**: Single-page web application (client-side only)
- **Purpose**: Browse and filter Pokemon fetched from the companion
  `pokemon-backend` REST API.

## 2. Languages & Runtime

| Aspect          | Value                                  |
| --------------- | -------------------------------------- |
| Language        | JavaScript (JSX)                       |
| Node.js Version | **18.x** (required by react-scripts 5) |
| Package Manager | npm                                    |
| Module System   | ES Modules (`import` / `export`)       |

Do NOT introduce TypeScript unless the repository is migrated first
(adding `tsconfig.json`, updating build tooling).

## 3. Frameworks & Major Libraries

| Package        | Version  | Purpose                                       |
| -------------- | -------- | --------------------------------------------- |
| react          | ^18.2.0  | UI library (functional components + hooks)    |
| react-dom      | ^18.2.0  | DOM renderer (`createRoot` API)               |
| react-scripts  | 5.0.1    | Create-React-App toolchain (webpack, Babel, Jest) |

No router, state manager, HTTP client, UI kit, or CSS framework is
installed. The app uses the browser `fetch` API and plain CSS files
imported per component.

## 4. Architecture Pattern

- **Flat component hierarchy** — `App` is the single stateful container;
  children (`FilterBar`, `PokemonCard`, `LoadingSpinner`) are
  presentational and stateless.
- **Hooks-only** — state via `useState`, side effects via `useEffect`.
  Do NOT introduce class components.
- **Client-side filtering** — the app fetches the full dataset once and
  filters in memory. Do not convert filters to server round-trips
  unless explicitly asked; the current approach is intentional.
- **CSS per component** — every component has a sibling `.css` file
  imported at the top of the `.js` file.

## 5. Directory Conventions

```
pokemon-frontend/
├── public/                # Static HTML shell & manifest
│   ├── index.html         # SPA entry; <div id="root"></div>
│   └── manifest.json      # PWA manifest
└── src/
    ├── index.js           # ReactDOM.createRoot bootstrap
    ├── index.css          # Global styles
    ├── App.js             # Top-level container (data fetch + state)
    ├── App.css
    └── components/
        ├── FilterBar.(js|css)       # Search + type + legendary filters
        ├── PokemonCard.(js|css)     # Single Pokemon tile
        └── LoadingSpinner.(js|css)  # Pokeball loader
```

When adding a new component:
1. Place it under `src/components/`.
2. Co-locate a matching `.css` file imported from the top of the `.js`.
3. Export the component as the default export.

## 6. Backend Contract

The frontend reads these endpoints from `pokemon-backend`:

- `GET {API_BASE_URL}/api/pokemons` → `{ success, count, data: Pokemon[] }`
- `GET {API_BASE_URL}/api/types`    → `{ success, data: string[] }`

`API_BASE_URL` is resolved as:

```js
process.env.REACT_APP_API_URL || 'http://localhost:3001'
```

When adding new API calls, reuse that constant (defined in `App.js`)
and do not hard-code URLs.

**Pokemon object shape** (received from backend):

```js
{
  id: Number,
  name: String,
  type: String[],   // PascalCase ("Fire", "Flying")
  legendary: Boolean,
  image: String     // absolute URL
}
```

## 7. Environment Variables

- `REACT_APP_API_URL` — override backend URL. Must start with
  `REACT_APP_` to be exposed by Create React App.
- See `.env.example` for the template; copy to `.env` for local dev.

## 8. Conventions & Constraints

- **Default port**: `3000` (React dev server). Docker image maps to
  `80` internally via Nginx; `npm run docker:run` exposes host port
  `3002`.
- **`proxy`** in `package.json` is `http://localhost:3001` — used by
  CRA's dev server only. Production builds do NOT honor this; they
  rely on `REACT_APP_API_URL`.
- **Filter state** lives in `App.js` as a single object
  `{ name, type, legendary }`. The `legendary` value is a STRING
  (`''`, `'true'`, or `'false'`) so that `<select>` values work
  naturally. Preserve this convention.
- **Type filter comparison** is case-insensitive on both sides.
- **Error path**: on any failed fetch, the app renders a connection
  error screen with a "Retry" button that reloads the page. Keep this
  pattern for new fetch calls.
- **Strict Mode** is enabled (`<React.StrictMode>` in `index.js`). Be
  mindful of double-invocation of effects in development.

## 9. Styling Conventions

- Plain CSS (no CSS-in-JS, no Sass, no CSS modules).
- Class names are kebab-case (e.g. `pokemon-grid`, `filter-label`).
- Type-specific badges use `type-{lowercase-type-name}` (e.g.
  `type-fire`). When adding new Pokemon types, add a matching CSS
  rule in `PokemonCard.css`.

## 10. Deployment Notes

- Dockerfile and compose live in `.tr-codegen/` (hidden tooling folder;
  excluded from per-directory README policy).
- Production image uses a multi-stage build: `npm run build` produces
  `build/`, which Nginx serves with `.tr-codegen/nginx.conf`.

## 11. Safe-Change Checklist for Agents

Before proposing changes, verify:

1. Components remain functional (no classes introduced).
2. `API_BASE_URL` (or `process.env.REACT_APP_API_URL`) is reused for
   every backend call.
3. The Pokemon object shape is not broken.
4. Corresponding `.css` file is updated alongside any markup change.
5. README.md is **not** modified automatically (policy: skip-existing).

## 12. Related Documents

- [README.md](./README.md) — human-facing usage & setup.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system-level design overview.
- [src/README.md](./src/README.md) — source tree overview.
- [src/components/README.md](./src/components/README.md) — component
  responsibilities.
- [public/README.md](./public/README.md) — static-shell assets.
