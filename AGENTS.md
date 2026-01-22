# Agent Guide

This repository is an Astro + React + TypeScript portfolio with Playwright E2E tests.
Use pnpm for all package scripts and dependencies.

## Quick Commands

- Install dependencies: `pnpm install`
- Dev server: `pnpm dev` (Astro, default port 3000)
- Build: `pnpm build`
- Preview build: `pnpm preview`
- Type check: `pnpm check` (Astro check + `tsc --noEmit`)
- Lint: `pnpm lint`
- Lint fix: `pnpm lint:fix`
- Format: `pnpm format`
- Format check: `pnpm format:check`
- Test all: `pnpm exec playwright test`

## Single Test Execution (Playwright)

- Single file: `pnpm exec playwright test e2e/example.spec.ts`
- Single test by title: `pnpm exec playwright test -g "contact form"`
- Single project: `pnpm exec playwright test --project=chromium`
- Combine file + title: `pnpm exec playwright test e2e/example.spec.ts -g "contact form"`
- UI mode (if needed): `pnpm exec playwright test --ui`
- Debug mode: `pnpm exec playwright test --debug`

Notes:

- Tests live in `e2e/` and auto-start the dev server via Playwright `webServer`.
- In CI, tests install browsers with `pnpm exec playwright install --with-deps`.

## CI Pipeline (Reference)

GitHub Actions runs: lint -> format:check -> Playwright tests -> build -> semantic-release.
This is useful when checking that local commands match CI behavior.

## Code Style and Conventions

### Formatting (Prettier)

- Tabs are used for indentation (`useTabs: true`, `tabWidth: 2`).
- Max line length: 100 (`printWidth: 100`).
- Double quotes for strings (`singleQuote: false`).
- No semicolons (`semi: false`).
- Trailing commas: ES5 (`trailingComma: "es5"`).
- Always include parentheses for arrow params (`arrowParens: "always"`).
- End of line: LF.
- JSON/MD/YAML/TOML use spaces instead of tabs.
- Astro files use the Astro parser; imports are organized by Prettier plugins.

### ESLint Rules (Highlights)

- Preferred quotes: double quotes.
- Semicolons are discouraged (warnings).
- No debugger statements (warnings).
- No trailing spaces (warnings).
- Unused vars warnings for JS; TS uses TypeScript rules where applicable.
- Astro-specific lint rules are enabled (conflicting set directives, unused vars in styles).
- Accessibility linting via `eslint-plugin-jsx-a11y`.

### Imports and Module Resolution

- Use path aliases from `tsconfig.json`:
  - `@/` -> `src/`
  - `@core/` -> `src/core/`
  - `@lib/` -> `src/lib/`
  - `@styles/` -> `src/styles/`
  - `@public/` -> `public/`
- Prefer absolute imports using these aliases when practical.
- Import organization is handled by Prettier + organize-imports plugin.
- Keep side-effect imports minimal and intentional.

### TypeScript

- Project extends `astro/tsconfigs/strict`.
- Use explicit types when inference is unclear or when exposing public APIs.
- Prefer type aliases for object shapes and interfaces for extendable contracts.
- Avoid `any`; use `unknown` with runtime validation where needed.

### Naming Conventions

- Components: `PascalCase`.
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants, otherwise `camelCase`.
- Files: match framework conventions (`.astro`, `.tsx`, `.ts`); prefer `kebab-case` for non-component assets.

### Error Handling

- Fail fast for invalid inputs; prefer early returns.
- Use `try/catch` around external API calls or I/O boundaries.
- Log actionable errors with enough context for debugging.
- When returning errors to the UI, keep messages user-friendly and non-leaky.

### Astro + React Patterns

- Keep Astro components focused on layout and page composition.
- Prefer small React components for interactivity or client-side state.
- Use `client:*` directives explicitly when adding hydration.
- Avoid unnecessary client-side JS in static sections.

### Tailwind and CSS

- Tailwind is available; class ordering is handled by Prettier plugin.
- Keep utility class lists readable; extract with `clsx`/`cva` when they grow.

## Repository Details

- Tests live in `e2e/` and use Playwright.
- Lint ignores: `dist`, `build`, `public`, `.vercel`, `coverage`, `docs`.
- Commit messages are managed via Commitizen (`pnpm commit`).

## Cursor / Copilot Rules

- No Cursor rules found in `.cursor/rules/` or `.cursorrules`.
- No Copilot instructions found in `.github/copilot-instructions.md`.

## Editing Tips for Agents

- Prefer existing patterns; do not introduce new formatting conventions.
- Run `pnpm format` after changes that touch TS/JS/Astro/CSS.
- Run `pnpm check` for type issues and `pnpm lint` for lint issues.
- Run targeted Playwright tests instead of the full suite when possible.
