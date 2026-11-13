# General

A web app of popular-science articles. Each story covers one research paper.
Available publicly at: https://main.d3vw1tdhpj4l7.amplifyapp.com/

## Requirements

- Node.js 26.13.0
- pnpm 12.16.1 (from the `packageManager` field in `package.json`)

## Setup

The home, category, and article pages are Incremental Static Regeneration: they `fetch` the API on the server (`GET /articles`, `GET /categories`, `GET /categories/:slug`, `GET /articles/:slug`) and revalidate every 3 hours. Default API URL: `http://localhost:4000` (`API_URL` in `.env.local`). The backend must be running for `pnpm build` and for regeneration. ISR is visible with `pnpm build` + `pnpm start`, not in `pnpm dev`.

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Local app: [http://localhost:3000](http://localhost:3000). The backend must be running separately.

Design system and components: [http://localhost:6006](http://localhost:6006) (`pnpm storybook`)

UI components follow Atomic Design in `src/components`: `atoms`, `molecules`, `organisms`, and `templates`. Pages stay in the App Router.

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `pnpm dev`             | Next.js dev server with Turbopack            |
| `pnpm build`           | Production build                             |
| `pnpm start`           | Run the production build                     |
| `pnpm lint`            | ESLint (zero warnings)                       |
| `pnpm typecheck`       | TypeScript check without emitting files      |
| `pnpm format`          | Format with Prettier                         |
| `pnpm format:check`    | Check formatting                             |
| `pnpm storybook`       | Storybook with the design system (port 6006) |
| `pnpm build-storybook` | Static Storybook build                       |

## Routing

- `/` — home (article list from the API)
- `/sources` — paper sources used for ingest
- `/category/[slug]` — articles in one field (404 if nothing matches the slug)
- `/article/[slug]` — article page (404 if the API does not know the slug)
