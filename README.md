# Jobmatcher

The dashboard is the first screen migrated from the supplied HTML prototype. The other app sections have route placeholders so you can migrate them one at a time.

## Start the app

```sh
npm ci
npm run dev
```

Use Node.js 24.22.0 with npm. The project uses Vite, React, TypeScript, Tailwind CSS 4, and shadcn-style local components.

## Run with Docker

Development mode (Vite with hot reload):

```sh
docker compose up --build
```

Open <http://localhost:5173>. The source folder is mounted into the container; `node_modules` stays in a named Docker volume.

Production preview (Nginx serving the built SPA):

```sh
docker compose -f docker-compose.prod.yml up --build
```

Open <http://localhost:8080>. The production image serves the Vite build and supports client-side routes.

## Learn the dashboard

1. Start in `src/data/jobs.ts`. Each row is typed as a `Job`, and `rankJobs` calculates the same match score as the original prototype: skills 60%, experience 25%, and demand 15%.
2. Read `src/pages/DashboardPage.tsx`. It maps the three highest-ranked jobs into `MatchRow` components and composes the dashboard sections.
3. Open `src/store/useAppStore.ts`. The Zustand store owns saved job IDs and persists them in browser storage. The Save button updates this shared state; the sidebar count and dashboard count read it.
4. Follow `src/components/AppShell.tsx` and `src/router.tsx` to see how the shared navigation surrounds each route.

## Your next migration

Try **Explore jobs** next:

1. Replace the placeholder for `/jobs` in `src/router.tsx` with an `ExploreJobsPage` component.
2. Reuse `jobs` from `src/data/jobs.ts` and add a search input with local React state (`useState`).
3. Render filtered roles with the existing card and button components.
4. Later, move the list behind `src/lib/api.ts` and use TanStack Query when a real API exists.

The remaining routes are intentionally placeholders. The screen copy and listings are prototype mock data, not live job postings. The fonts in `public/fonts` were carried over from the provided HTML.

## Tooling map

| Need | Package |
| --- | --- |
| Shared client state | Zustand |
| Remote data/cache | TanStack Query + Axios |
| Routes | React Router |
| Forms and schemas | React Hook Form + Zod + resolvers |
| UI primitives | shadcn/ui pattern, kept in `src/components/ui` |
| Icons, motion, notifications | Lucide React, Motion, Sonner |
| Tables, charts, dates | TanStack Table, Recharts, date-fns |
| Class names | clsx + tailwind-merge |
| Quality tools | Vitest, Testing Library, MSW, Playwright, ESLint, Prettier |

RTK is used as the terminal-output tool in the development workflow. It is separate from Redux Toolkit; this app follows your requested Zustand state choice.
