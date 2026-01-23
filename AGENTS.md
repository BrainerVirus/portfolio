# Agent Guidelines for Portfolio Repository

This document provides guidelines for agentic coding agents (AI models, automated tools) working on this Astro portfolio project.

## Build, Lint, and Test Commands

### Development

```bash
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview production build locally
```

### Code Quality

```bash
pnpm lint             # Run ESLint on all files
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without changes
pnpm check            # Run TypeScript type checking + Astro checks
```

### Testing

```bash
pnpm test             # Run all tests (unit + E2E)
pnpm test:unit        # Run Vitest unit tests only
pnpm test:unit src/i18n/utils.test.ts  # Run single test file
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e --grep "Header Navigation"  # Run single test by name
pnpm exec playwright test --project=chromium  # Run E2E on specific browser
```

### Utilities

```bash
pnpm commit           # Interactive commit with Commitizen
pnpm check            # Type check + Astro checks
pnpm astro [command]  # Run raw Astro CLI commands
```

## Code Style Guidelines

### Imports and Organization

- **Order**: Astro/framework imports → third-party → local imports → types
- **Import aliases**: Use `@/`, `@core/`, `@lib/`, `@styles/`, `@public/` (defined in `tsconfig.json`)
- **Prettier auto-organizes imports** via `prettier-plugin-astro-organize-imports`
- Example:
  ```typescript
  import { getLangFromUrl, getTranslations } from "@/i18n/utils"
  import LanguageSwitch from "./LanguageSwitch.astro"
  ```

### Formatting Rules (Prettier)

- **Print width**: 100 characters
- **Quotes**: Double quotes `"` (not single)
- **Semicolons**: Never (set to false)
- **Tabs**: Use tabs for indentation (spaces in `.json`, `.md`, `.yml`)
- **Trailing comma**: ES5 style (objects/arrays, not function params)
- **Arrow parens**: Always include `(x) => x` (not `x => x`)

### ESLint Rules (Key Enforcements)

- **Quotes**: Double quotes (warn)
- **Semicolons**: Never (warn)
- **No trailing spaces** (warn)
- **No debugger statements** (warn)
- **No unused variables** (warn)
- **Object spacing**: `{ key: "value" }` always (warn)
- **JSX quotes**: Double quotes (warn)
- **Astro-specific**: Class list directive, no conflict set directives

### Type Safety

- **TypeScript**: Strict mode enabled (`astro/tsconfigs/strict`)
- **No `any` types**: Use explicit types; use `// eslint-disable-next-line @typescript-eslint/no-explicit-any` if unavoidable
- **Path aliases**: Always use `@/` imports instead of relative paths when possible
- **Typing imports**: Use `import type { ... }` for type-only imports

### Naming Conventions

- **Components**: PascalCase (e.g., `Header.astro`, `LanguageSwitch.astro`)
- **Functions/utilities**: camelCase (e.g., `getTranslations()`, `getLangFromUrl()`)
- **Constants**: camelCase (e.g., `defaultLang`, `translations`)
- **Types/Interfaces**: PascalCase (e.g., `Language`, `TranslationNamespace`)
- **CSS classes**: kebab-case (e.g., `glass-card`, `logo-ring`)
- **HTML IDs**: kebab-case (e.g., `mobile-menu`, `mobile-menu-btn`)

### Error Handling

- **Fallback patterns**: Always provide sensible defaults (see i18n/utils.ts:93-96)
  ```typescript
  if (!value) {
    value = translations[defaultLang][namespace] // Fallback
  }
  ```
- **Type safety in navigation**: Validate language from URL/params before use
- **Translation function safety**: Return the path itself if translation not found (line 103)
- **No silent failures**: Log or warn if unexpected states occur in client-side code
- **Environment variables**: Use `Astro.env` to access env vars safely in components

### Project Structure

```
src/
  ├── components/        # .astro components
  ├── layouts/          # Layout components
  ├── pages/            # Route definitions
  ├── i18n/             # Translations (locales/, utils.ts)
  ├── lib/              # Utilities (utils.ts, etc.)
  ├── actions/          # Astro server actions
  ├── consts/           # Constants
  └── styles/           # Global CSS
```

### Astro Component Pattern

- Use **frontmatter** (---) to separate component logic
- Import within frontmatter, render in template below
- Use **Translation utilities** in frontmatter: `getTranslations(lang)`
- Keep `<script>` tags at end for client-side interactivity
- Use **Tailwind CSS** + `cn()` utility for conditional styles

### i18n (Internationalization)

- **Languages**: English (en) and Spanish (es)
- **Get translations in Astro**: `const t = getTranslations(lang)`
- **Access keys**: `t("nav.about")` with full autocomplete (TypeScript support)
- **Namespace structure**: `skills.core_skills.typescript`, `contact.title`, etc.
- **Fallback behavior**: Missing translations fall back to default language

### Testing Patterns

#### Vitest (Unit Tests)

- Location: `src/**/*.test.ts` or `src/**/*.spec.ts`
- Framework: `describe()`, `it()`, `expect()` (globals enabled)
- Example:

  ```typescript
  import { describe, it, expect } from "vitest"
  import { getTranslations } from "@/i18n/utils"

  describe("i18n Translations", () => {
    it("should return translations", () => {
      const t = getTranslations("en")
      expect(t("nav.about")).toBe("Pilot's Log")
    })
  })
  ```

#### Playwright (E2E Tests)

- Location: `e2e/*.spec.ts`
- Framework: `test.describe()`, `test()`, `expect()`
- Run on: Chromium, Firefox, WebKit
- Dev server: Auto-starts on port 3000
- Example:

  ```typescript
  import { expect, test } from "@playwright/test"

  test.describe("Header Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3000/en/")
    })

    test("should display header", async ({ page }) => {
      await expect(page.locator("header")).toBeVisible()
    })
  })
  ```

## Key Project Details

- **Framework**: Astro 5.16+ with TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS
- **Package manager**: pnpm
- **Node version**: 20.x
- **Deployment**: Vercel (via `@astrojs/vercel`)
- **i18n**: Custom utility-based approach (no external i18n library)
- **Icons**: astro-icon with Iconify integrations

## Before Committing

1. ✅ Run `pnpm format` to auto-format code
2. ✅ Run `pnpm lint:fix` to fix linting issues
3. ✅ Run `pnpm check` to verify types
4. ✅ Run `pnpm test` to ensure tests pass
5. ✅ Use `pnpm commit` for conventional commits
