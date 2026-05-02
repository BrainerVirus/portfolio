# Portfolio v4 Iteration 1 — Tooling + Astro 6 Foundation

> **Spec:** Design document for Iteration 1 of the portfolio v4 redesign.
> **Date:** 2026-05-02
> **Status:** Approved

## Goal

Upgrade the portfolio's tooling and foundation: replace ESLint + Prettier with oxc, migrate to Astro 6 Fonts with premium typography (Satoshi + JetBrains Mono), add ClientRouter view transitions for language switching, and establish React + shadcn/ui as the interactive component framework.

---

## Section 1: oxc Tooling Migration

### Architecture
- **oxlint** replaces ESLint (linting)
- **oxfmt** replaces Prettier (formatting)
- Remove husky + lint-staged (pre-commit hook)
- CI runs oxlint + oxfmt:check

### Files to Remove
- `eslint.config.js`
- `.prettierrc.mjs`
- `.prettierignore`
- `.lintstagedrc`
- `.husky/` (entire directory)

### Packages to Remove (devDependencies)
- `eslint`, `@eslint/js`, `eslint-config-prettier`
- `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`, `eslint-plugin-prettier`
- `@typescript-eslint/parser`, `typescript-eslint`
- `astro-eslint-parser`
- `prettier`, `prettier-plugin-astro`, `prettier-plugin-astro-organize-imports`, `prettier-plugin-tailwindcss`
- `globals`, `lint-staged`, `husky`

### Packages to Add
- `oxlint` (latest)
- `oxfmt` (latest, may be bundled with oxlint or separate)

### Scripts Changes (package.json)
| Old | New |
|-----|-----|
| `"lint": "eslint"` | `"lint": "oxlint"` |
| `"lint:fix": "eslint . --fix"` | `"lint:fix": "oxlint --fix"` |
| `"format": "prettier --write 'src/**/*.{astro,ts,js,tsx,jsx,css}'"` | `"format": "oxfmt --write src/"` |
| `"format:check": "prettier --check 'src/**/*.{astro,ts,js,tsx,jsx,css}'"` | `"format:check": "oxfmt --check src/"` |
| `"prepare": "husky"` | REMOVE |

### lint-staged Replacement
- No pre-commit hooks. oxc is fast enough to run in CI (< 1s for the entire project).
- Alternative: simple `.git/hooks/pre-commit` script running `oxlint` + `oxfmt --check`.

### oxc Configuration
- oxlint detects `.oxlintrc.json` or uses CLI flags
- Preserve project conventions: double quotes, no semicolons, no debugger, no unused vars
- Ignore `.agents/`, `dist/`, `.vercel/`, `.astro/`, `node_modules/`

### CI Workflow Update
- `pnpm lint` now runs oxlint (faster by ~30s-1min)
- `pnpm format:check` now runs oxfmt --check
- Pipeline order unchanged: lint → format:check → test → build

---

## Section 2: Astro 6 Fonts — Satoshi + JetBrains Mono

### Architecture
- Use Astro 6's built-in font optimization (`astro:assets` Font component + font providers)
- Astro downloads, caches, and serves fonts from `_astro/fonts/` — zero third-party requests
- Auto-generates optimized fallback metrics (size-adjust, ascent-override, descent-override) for CLS-free loading

### Font Stack

| Role | Font | Weights | Source |
|------|------|---------|--------|
| Display / Body | Satoshi | 300, 400, 500, 700 | fontsource |
| Monospace | JetBrains Mono | 400, 500 | fontsource |
| Icons | Material Symbols Outlined | variable | fontsource |

### astro.config.mjs Changes
Add to `defineConfig()`:
```js
import { fontProviders } from "astro/config"

fonts: [{
  provider: fontProviders.fontsource(),
  name: "Satoshi",
  cssVariable: "--font-satoshi",
  weights: [300, 400, 500, 700],
  styles: ["normal"],
  subsets: ["latin"],
  fallbacks: ["system-ui", "sans-serif"],
}, {
  provider: fontProviders.fontsource(),
  name: "JetBrains Mono",
  cssVariable: "--font-mono",
  weights: [400, 500],
  styles: ["normal", "italic"],
  subsets: ["latin"],
  fallbacks: ["ui-monospace", "monospace"],
}]
```

### Layout.astro Changes
Replace all Google Fonts `<link>` tags (preconnect, stylesheet) with:
```astro
---
import { Font } from "astro:assets"
---
<Font cssVariable="--font-satoshi" preload />
<Font cssVariable="--font-mono" preload />
```

### global.css Changes

**CSS variables** — update theme:
```css
@theme inline {
  --font-display: var(--font-satoshi);
  --font-body: var(--font-satoshi);
  --font-mono: var(--font-mono);
}
```

**Remove** all `@font-face` blocks for old fonts (~200 lines in global.css):
- Space Grotesk (300, 400, 500, 600, 700)
- Noto Sans (400, 500, 600, 700)
- Fira Code (300, 400, 500)
- Material Symbols Outlined (can keep local woff2 or switch to fontsource)

**Remove** the `material-symbols-outlined` CSS class if loading via Astro Fonts instead.

### Public Fonts Cleanup
Remove old `.woff2` files from `/public/fonts/`:
- `space-grotesk-*.woff2` (all variants)
- `noto-sans-*.woff2` (all variants)
- `fira-code-*.woff2` (all variants)
- Keep Material Symbols if not moving to Astro Fonts

### Dead Dependencies to Remove
- `@midudev/tailwind-animations` (never imported, was in package.json but unused)
- `tw-animate-css` (never imported, was in package.json but unused)

---

## Section 3: ClientRouter + View Transitions

### Architecture
- Add `<ClientRouter />` from `astro:transitions` to Layout.astro head
- Language switching triggers a slide animation between `/en/` and `/es/`
- No config changes needed in astro.config.mjs — ClientRouter is a component, not an integration

### Layout.astro Changes
```astro
---
import { ClientRouter } from "astro:transitions"
---
<html transition:animate="slide" lang={currentLocale || "en"}>
  <head>
    <ClientRouter />
    ...
```

The `transition:animate="slide"` directive applies to all child elements. When navigating between languages, content slides in horizontally.

### LanguageSwitch.astro Changes
- No changes needed. ClientRouter intercepts `window.location.href` navigations.
- Cookie set remains the same.
- Middleware still reads the cookie for return visits.

### Fallback Behavior
- `fallback="swap"` (default) — if browser doesn't support view transitions, falls back to full page reload
- Works across all browsers used in E2E tests (chromium, firefox, webkit)

---

## Section 4: React + Shadcn/ui Foundation

### Architecture
- Add React + React DOM as dependencies
- Initialize shadcn/ui with New York style, Neutral base color
- Install base components: button, card, input, textarea, label, toast (sonner)
- React components live in `src/components/react/`
- shadcn primitives in `src/components/ui/` (auto-generated by shadcn CLI)
- No existing Astro components are rewritten — React is additive

### Dependencies to Add
- `react`, `react-dom` (dependencies)
- `@types/react`, `@types/react-dom` (devDependencies)
- `@astrojs/react` (integration)
- shadcn/ui: `tailwind-variants`, `clsx`, `tailwind-merge` (already have clsx + tailwind-merge)
- `sonner` (toast library)
- `@radix-ui/*` (auto-installed by shadcn CLI)

### astro.config.mjs Changes
```js
import react from "@astrojs/react"
integrations: [react(), mdx(), icon({...})]
```

### shadcn Components to Install
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label
npx shadcn@latest add sonner  # toast notifications
```

### Component Locations
```
src/components/
  ui/           # shadcn primitives (button.tsx, card.tsx, input.tsx, ...)
  react/        # our custom React components
  sections/     # existing Astro sections (unchanged)
  Header.astro  # existing (unchanged)
  Footer.astro  # existing (unchanged)
  ...
```

### shadcn Configuration
- `components.json` at project root (generated by `shadcn init`)
- Tailwind CSS v4 compat: shadcn supports v4 via `tailwindcss-animate` + CSS variables
- Base color: Neutral (gray-based, works with dark theme)
- Style: New York (cards have more prominent borders)

---

## Acceptance Criteria

- [x] **oxc**: ESLint and Prettier fully removed. `pnpm lint` uses oxlint, `pnpm format` uses oxfmt. CI passes.
- [x] **Fonts**: Google Fonts links removed. All fonts served from `_astro/fonts/`. Satoshi + JetBrains Mono render correctly. No FOUT.
- [x] **View Transitions**: Language switch between `/en/` and `/es/` shows slide animation. No full page reload flash.
- [x] **Shadcn**: React + `@astrojs/react` integration installed. `npx shadcn add` works. Example button and card render in a test page.
- [x] **Dead deps removed**: `@midudev/tailwind-animations`, `tw-animate-css`, and old ESLint/Prettier packages purged.
- [x] **Build**: `pnpm build` succeeds. `pnpm check` passes. `pnpm test:unit` passes (18 tests). `pnpm test:e2e` passes (72 tests).
- [x] **CI**: GitHub Actions pipeline passes (lint → format:check → test → build).

---

## Iteration 2 Preview

- GSAP animations (typing effect in About, scroll animations, micro-interactions)
- Replace contact form with shadcn form components + sonner toast
- View transitions for section scrolling (not just language switch)
- Easter egg foundation (konami code, hidden interactions)

## Iteration 3 Preview

- Three.js background or interactive element
- Full shadcn component integration across all sections
- Custom SVG animations
- Easter eggs implementation

## Iteration 4 Preview

- DESIGN.md (comprehensive design system document)
- AGENTS.md update with new conventions
- Performance audit and optimization
- Final polish
