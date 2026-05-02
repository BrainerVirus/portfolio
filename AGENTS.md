# Agent Guidelines for Portfolio Repository

This document provides guidelines for agentic coding agents working on this Astro portfolio project.

## Commands

```bash
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview production build locally
pnpm check            # astro check + tsc --noEmit (typecheck)
pnpm lint             # oxlint on all files
pnpm lint:fix         # oxlint auto-fix
pnpm format           # oxfmt on src/
pnpm format:check     # oxfmt check on src/
pnpm test:unit        # Vitest unit tests
pnpm test:unit src/i18n/utils.test.ts  # Run single test file
pnpm test:e2e         # Playwright E2E tests (auto-starts dev server)
pnpm test:e2e --grep "Header Navigation"  # Run single E2E by name
pnpm test             # unit + e2e (sequential)
pnpm astro [command]  # Raw Astro CLI
pnpm commit           # Commitizen interactive commit
```

## Architecture (what an agent would miss by reading filenames)

- **SSR mode**, not static. `output: "server"` in astro.config.mjs. The main page uses `prerender = false`.
- **i18n routing**: `defaultLocale: "en"`, locales `["es", "en"]`, `prefixDefaultLocale: true`. All routes live under `/en/` or `/es/`.
- **Middleware** (`src/middleware.ts`) auto-redirects bare paths (e.g. `/`) to `/en/` or `/es/` based on a `lang` cookie or `Accept-Language` header. Must bypass redirects for non-GET requests, `/api/*`, `/_astro/*`, `/_image/*`, and file-like paths.
- **Root `/` redirect**: `src/pages/index.astro` hard-redirects to `/en/`.
- **Actual page**: `src/pages/[locale]/index.astro` renders all sections (About, Experience, Skills, Contact) on a single page.
- **Contact form** uses Astro Actions (`src/actions/index.ts`) with Resend. Requires 3 env vars: `RESEND_API_KEY`, `RESEND_EMAIL`, `EMAIL_TO`. Validation via `astro/zod`.
- **Three i18n helpers** in `src/i18n/utils.ts`:
  - `getTranslations(lang)` → returns `(path) => string` — use in Astro frontmatter with `t("nav.about")`
  - `useTranslation(lang, namespace)` → returns the namespace object — use for destructured access
  - `getTranslation(lang, path)` → single direct lookup with full type safety
- **Astro 6 Fonts**: uses Astro's built-in font optimization (`astro:assets` Font component). Satoshi (display/body) via fontshare provider, JetBrains Mono (code) via fontsource. Fonts served from `_astro/fonts/` — zero external requests.
- **View Transitions**: ClientRouter (`astro:transitions`) enabled. Language switching uses `transition:animate="slide"` on `<html>`. All same-origin navigations trigger view transitions automatically.
- **React + shadcn/ui**: React 19 with `@astrojs/react` integration. shadcn/ui components in `src/components/ui/` (nova preset, neutral base, CSS variables). Wrap React components with `client:load` or `client:visible` directives in `.astro` files.
- **GSAP animations**: scroll-triggered section enter animations via GSAP + ScrollTrigger (`src/lib/animations.ts`). Hover micro-interactions on orbit icons, terminal, nav links. Re-initialize on `astro:after-swap` after view transitions.
- **Easter eggs**: Konami code, coffee cup click counter, hidden terminal (see `src/lib/easter-eggs.ts`). All re-initialize after view transitions.
- **Import aliases** (defined in tsconfig.json and vitest.config.ts): `@/` → `src/`, `@lib/` → `src/lib/`, `@styles/` → `src/styles/`, `@public/` → `public/`. `@core/` exists in tsconfig but no `src/core/` directory exists — do not use it.
- **`cn()` utility** (`src/lib/utils.ts`): combines `clsx` + `tailwind-merge`. Always use this for conditional Tailwind classes.

## Code Style (repo differs from defaults)

- **No semicolons**. Use double quotes.
- **Tabs** for indentation (spaces in `.json`, `.md`, `.toml`, `.yml`).
- **Trailing commas**: ES5 style (objects/arrays only, not function params).
- **Arrow parens**: always include them `(x) => x`.
- **Print width**: 100 chars.
- **Imports order**: Astro/framework → third-party → local → types. Import sorting is not enforced by oxfmt — sort manually.
- **Naming**: Components PascalCase, functions camelCase, CSS classes/HTML IDs kebab-case.

## Testing

- **Unit tests**: `src/**/*.test.ts` or `src/**/*.spec.ts`. Vitest with `globals: true`, `happy-dom` environment.
- **E2E tests**: `e2e/*.spec.ts`. Playwright runs on chromium, firefox, webkit. Dev server auto-starts on port 3000. Install browsers once: `pnpm exec playwright install --with-deps`.
- **CI pipeline** (`.github/workflows/github-ci.yml`): sequential `lint → format:check → test → build`. Build can be skipped with `[skip ci]` in commit message.
- **Pre-commit hook**: None (removed husky + lint-staged). Run `pnpm lint && pnpm format:check` before committing.

## Key Dependencies

- **Astro 6.2** with `@astrojs/vercel` adapter (SSR on Vercel)
- **Tailwind CSS v4** (loaded via `@tailwindcss/vite` plugin, not PostCSS config)
- **React 19 + shadcn/ui** (nova preset, neutral base, CSS variables)
- **Linting/formatting**: oxlint + oxfmt (replaced ESLint + Prettier). See `.oxlintrc.json` and `.oxfmtrc.json`.
- **Icons**: `astro-icon` with `@iconify-json/*` icon sets (devicon, mdi, etc.)
- **Fonts**: Satoshi + JetBrains Mono via Astro 6 Font optimization
- **Node**: 22.x, **Package manager**: pnpm
