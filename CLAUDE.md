# CLAUDE.md – AI Agent Guidance for `pokemon-frontend`

This file orients AI agents (such as Claude) to safely generate or modify code
in the `pokemon-frontend` repository.

---

## 1. Language & Runtime

- **Language:** JavaScript (ES2019+, JSX).
- **Module system:** ES Modules (`import` / `export`).
- **Runtime (dev):** Node.js **v18+**.
- **Browser target:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge).
  Config lives in the `browserslist` field of `package.json`.

## 2. Frameworks & Libraries

| Dependency      | Version | Role                                              |
|-----------------|---------|---------------------------------------------------|
| `react`         | ^18.2.0 | UI library – functional components only           |
| `react-dom`     | ^18.2.0 | DOM renderer (`createRoot`)                       |
| `react-scripts` | 5.0.1   | Create React App toolchain (build/test/start)     |

There is **no state manager** (Redux, Zustand, MobX), **no router**, **no
UI library**. State is held locally via `useState` / `useEffect`.

## 3. Architecture Pattern

- **Single-page React application** scaffolded with Create React App.
- **Functional components + hooks** everywhere (`useState`, `useEffect`).
- **Co-located styles** – each component has a sibling `.css` file.
- **Prop drilling** (no Context / stores) – flow is simple and one level deep.

Top-level component tree:

```text
<App>
 ├─ <FilterBar />
 ├─ <LoadingSpinner />   (while loading)
 └─ <PokemonCard />[]   (grid of results)
```

## 4. Data Flow

1. `App` mounts → `useEffect` fires `fetch` against the backend:
   - `GET ${API_BASE_URL}/api/pokemons`
   - `GET ${API_BASE_URL}/api/types`
2. Results are stored in `pokemons` + `types` state.
3. `FilterBar` emits `{ name, type, legendary }` via `onFilterChange`.
4. A second `useEffect` watches `filters` / `pokemons` and recomputes
   `filteredPokemons` *client-side* (the backend already filters, but we
   mirror it locally for instant UI feedback).
5. `PokemonCard` receives a single `pokemon` prop and renders it.

## 5. API Contract Assumptions

The frontend assumes the backend returns:

```json
{ "success": true, "count": N, "data": [ { "id", "name", "type", "legendary", "image" } ] }
```

and that `types` returns `{ "success": true, "data": ["Fire", "Water", ...] }`.

Keep these field names stable or update the backend in lockstep.

## 6. Environment Variables

| Variable             | Default                  | Purpose                     |
|----------------------|--------------------------|-----------------------------|
| `REACT_APP_API_URL`  | `http://localhost:3001`  | Backend base URL            |

Only variables prefixed with `REACT_APP_` are exposed to the bundle by CRA.

There is also a `proxy` field in `package.json` pointing at
`http://localhost:3001`, which lets the dev server forward unknown requests
to the backend.

## 7. Conventions & Constraints

- **Use functional components only.** Do not introduce class components.
- **Do not add a router** unless the feature request clearly needs multiple
  pages.
- **Keep styling in plain CSS files** next to the component. No CSS-in-JS,
  no SCSS, no Tailwind.
- **Filter state shape** is `{ name: string, type: string, legendary: '' | 'true' | 'false' }`.
  The `legendary` empty string means "no filter applied".
- **Error states** use an inline error banner with a Retry button. Preserve
  this pattern.
- **Accessibility:** inputs have associated `<label htmlFor>`; keep this when
  editing `FilterBar`.

## 8. Testing

`react-scripts test` (Jest + React Testing Library) is available but no tests
are committed. When adding tests:

- Place them next to the component as `ComponentName.test.js`.
- Prefer React Testing Library over Enzyme.

## 9. Build & Run

| Command             | Purpose                           |
|---------------------|-----------------------------------|
| `npm start`         | Dev server on port 3000           |
| `npm run build`     | Production bundle in `build/`     |
| `npm test`          | Interactive Jest runner           |
| `npm run docker:build` / `docker:run` | Build / run container |

## 10. Safe-Generation Checklist

When producing code:

1. Preserve the two-effect pattern in `App.js` (fetch on mount; filter on
   `filters` change).
2. Keep new hooks / components in `src/components/`.
3. Do not pull in heavy dependencies (Redux, MUI, Tailwind) without an
   explicit request.
4. Keep the response-envelope contract with the backend.
5. Don't edit top-level `README.md` unless asked – prefer scoped
   `README.md` files next to the code.

## 11. Related Documents

- Human overview → [`README.md`](./README.md)
- System design → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
