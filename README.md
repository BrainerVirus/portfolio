# My Portfolio

[![GitHub CI](https://github.com/BrainerVirus/portfolio/actions/workflows/github-ci.yml/badge.svg)](https://github.com/BrainerVirus/portfolio/actions/workflows/github-ci.yml)
[![Astro](https://img.shields.io/badge/Astro-6-ff5d01?logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=111827)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss&logoColor=111827)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-SSR-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24-5fa04e?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11-f69220?logo=pnpm&logoColor=111827)](https://pnpm.io/)

Personal portfolio for Cristhofer Pincetti, built with Astro SSR, React islands, Tailwind CSS, GSAP motion, i18n routing, and an Astro Actions contact form.

## Features

- **Astro SSR on Vercel** with locale-prefixed routes under `/en/` and `/es/`.
- **Interactive portfolio sections** for About, Work, Skills, and Contact.
- **React + shadcn/ui** for the contact form and reusable UI primitives.
- **Tailwind CSS 4** with oxlint and oxfmt for code quality and formatting.
- **GSAP animations** for scroll-triggered reveals and section micro-interactions.
- **Vitest + Playwright** coverage for utilities and browser behavior.

## Prerequisites

- Node.js 24.x
- pnpm 11.x, pinned through `packageManager` in `package.json`

## Development

```bash
pnpm install
pnpm dev
pnpm lint
pnpm format:check
pnpm check
pnpm test
pnpm build
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Astro dev server on port 3000. |
| `pnpm build` | Build the SSR app for production. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm check` | Run `astro check` and `tsc --noEmit`. |
| `pnpm lint` | Run oxlint on source files. |
| `pnpm format:check` | Check oxfmt formatting for `src/`. |
| `pnpm test:unit` | Run Vitest unit tests. |
| `pnpm test:e2e` | Run Playwright E2E tests. |
| `pnpm test` | Run unit and E2E tests sequentially. |

## Project Structure

```text
src/
  actions/       Astro Actions for contact form submission
  components/    Astro sections, React islands, and shadcn/ui primitives
  i18n/          Locale dictionaries and typed translation helpers
  lib/           Browser behavior, animation, and utility modules
  pages/         Locale-prefixed Astro routes
  styles/        Global Tailwind and design tokens
e2e/             Playwright tests
docs/            Contributing and shared agent rules
```

## Contributing

This project uses GitHub Flow: create a short-lived `feature/*`, `fix/*`, `chore/*`, or `docs/*` branch from `main`, open a pull request into `main`, and keep `main` deployable. See [docs/contributing.md](docs/contributing.md) and [AGENTS.md](AGENTS.md) for the full workflow.

## Release Process

Stable releases are tags from `main` using `vMAJOR.MINOR.PATCH`. Build can be skipped in CI with `[skip ci]` in the commit message when appropriate.
