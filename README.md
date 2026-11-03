# Badania

A web app of popular-science articles. Each story covers one research paper.

## Requirements

- Node.js 26.13.0
- pnpm 12.16.1 (from the `packageManager` field in `package.json`)

## Setup

The home and article pages load content from the API (`GET /articles`, `GET /articles/:slug`) with Axios and TanStack Query. Default API URL: `http://localhost:4000` (`NEXT_PUBLIC_API_URL` in `.env.local`).

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Local app: [http://localhost:3000](http://localhost:3000). The backend must be running separately.

Design system and components: [http://localhost:6006](http://localhost:6006) (`pnpm storybook`)

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Next.js dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint (zero warnings) |
| `pnpm typecheck` | TypeScript check without emitting files |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm storybook` | Storybook with the design system (port 6006) |
| `pnpm build-storybook` | Static Storybook build |

## Routing

- `/` — home (article list from the API)
- `/news/[slug]` — article page (404 if the API does not know the slug)
