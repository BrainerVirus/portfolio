# Agent Guidelines for Portfolio Repository

This document provides guidelines for agentic coding agents working on this Astro portfolio project.

## Commands

```bash
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview production build locally
pnpm check            # astro check + tsc --noEmit (typecheck)
pnpm lint             # ESLint on all files
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier on src/**/*.{astro,ts,js,tsx,jsx,css} only
pnpm format:check     # Prettier check (same glob)
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
- **Import aliases** (defined in tsconfig.json and vitest.config.ts): `@/` → `src/`, `@lib/` → `src/lib/`, `@styles/` → `src/styles/`, `@public/` → `public/`. `@core/` exists in tsconfig but no `src/core/` directory exists — do not use it.
- **`cn()` utility** (`src/lib/utils.ts`): combines `clsx` + `tailwind-merge`. Always use this for conditional Tailwind classes.

## Code Style (repo differs from defaults)

- **No semicolons**. Use double quotes.
- **Tabs** for indentation (spaces in `.json`, `.md`, `.toml`, `.yml`).
- **Trailing commas**: ES5 style (objects/arrays only, not function params).
- **Arrow parens**: always include them `(x) => x`.
- **Print width**: 100 chars.
- **Imports order**: Astro/framework → third-party → local → types. Prettier plugin handles this automatically.
- **Naming**: Components PascalCase, functions camelCase, CSS classes/HTML IDs kebab-case.

## Testing

- **Unit tests**: `src/**/*.test.ts` or `src/**/*.spec.ts`. Vitest with `globals: true`, `happy-dom` environment.
- **E2E tests**: `e2e/*.spec.ts`. Playwright runs on chromium, firefox, webkit. Dev server auto-starts on port 3000. Install browsers once: `pnpm exec playwright install --with-deps`.
- **CI pipeline** (`.github/workflows/github-ci.yml`): sequential `lint → format:check → test → build`. Build can be skipped with `[skip ci]` in commit message.
- **Pre-commit hook**: Husky runs `lint-staged`, which auto-fixes staged `src/**/*.{astro,ts,js,tsx,jsx,css}` via ESLint + Prettier.

## Key Dependencies

- **Astro 5.16** with `@astrojs/vercel` adapter (SSR on Vercel)
- **Tailwind CSS v4** (loaded via `@tailwindcss/vite` plugin, not PostCSS config)
- **Icons**: `astro-icon` with `@iconify-json/*` icon sets (devicon, mdi, etc.)
- **Node**: 22.x, **Package manager**: pnpm
