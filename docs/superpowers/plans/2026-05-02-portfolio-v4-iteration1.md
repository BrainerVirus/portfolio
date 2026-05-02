# Portfolio v4 Iteration 1 — Implementation Plan

> **For agentic workers:** Use subagent-driven-development or inline execution.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ESLint/Prettier with oxc tooling, migrate to Astro 6 Fonts (Satoshi + JetBrains Mono), add ClientRouter view transitions, and establish React + shadcn/ui foundation.

**Architecture:** Four independent subsystems executed in dependency order: (1) oxc tooling, (2) Astro Font migration, (3) ClientRouter view transitions, (4) React + shadcn foundation. Each produces a working build.

**Tech Stack:** oxlint, oxfmt, Astro 6 Fonts, Satoshi + JetBrains Mono, ClientRouter, React 19, shadcn/ui, @astrojs/react

---

## File Structure Map

| Action | Path | Purpose |
|--------|------|---------|
| DELETE | `eslint.config.js` | ESLint config — no longer needed |
| DELETE | `.prettierrc.mjs` | Prettier config — replaced by oxfmt |
| DELETE | `.prettierignore` | Prettier ignore — oxfmt uses .gitignore |
| DELETE | `.lintstagedrc` | lint-staged config — removed |
| DELETE | `.husky/` | Git hooks — removed |
| DELETE | `public/fonts/space-grotesk-*.woff2` | Old display font files |
| DELETE | `public/fonts/noto-sans-*.woff2` | Old body font files |
| DELETE | `public/fonts/fira-code-*.woff2` | Old mono font files |
| CREATE | `.oxlintrc.json` | oxlint configuration |
| CREATE | `.oxfmtrc.json` | oxfmt configuration |
| MODIFY | `package.json` | Update scripts, add/remove deps |
| MODIFY | `.github/workflows/github-ci.yml` | Node 22 oxc commands |
| MODIFY | `astro.config.mjs` | Fonts config, @astrojs/react integration |
| MODIFY | `src/layouts/Layout.astro` | Font component, ClientRouter |
| MODIFY | `src/styles/global.css` | Remove @font-face, update theme vars |
| MODIFY | `CHANGELOG.md` | Version 4.0.0 entry |
| MODIFY | `AGENTS.md` | Update tooling commands |
| CREATE | `components.json` | shadcn configuration |

---

### Task 1: Remove ESLint, Prettier, and Pre-commit Infrastructure

**Files:**
- Delete: `eslint.config.js`, `.prettierrc.mjs`, `.prettierignore`, `.lintstagedrc`
- Delete: `.husky/` (entire directory)
- Modify: `package.json`

- [ ] **Step 1: Delete old config files**

```bash
rm -f eslint.config.js .prettierrc.mjs .prettierignore .lintstagedrc
rm -rf .husky
```

- [ ] **Step 2: Remove old packages from package.json**

Remove these from `devDependencies` in `package.json`:
```
eslint, @eslint/js, eslint-config-prettier, eslint-plugin-astro,
eslint-plugin-jsx-a11y, eslint-plugin-prettier, @typescript-eslint/parser,
typescript-eslint, astro-eslint-parser, prettier, prettier-plugin-astro,
prettier-plugin-astro-organize-imports, prettier-plugin-tailwindcss,
globals, lint-staged, husky
```

Also remove dead packages: `@midudev/tailwind-animations`, `tw-animate-css`

- [ ] **Step 3: Update scripts in package.json**

Replace scripts section with:
```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "commit": "git-cz",
  "check": "astro check && tsc --noEmit",
  "lint": "oxlint",
  "lint:fix": "oxlint --fix",
  "format": "oxfmt --write src/",
  "format:check": "oxfmt --check src/",
  "test:unit": "vitest",
  "test:e2e": "pnpm exec playwright test",
  "test": "pnpm test:unit && pnpm test:e2e"
}
```

Remove `"prepare": "husky"`.

- [ ] **Step 4: Add oxc packages**

```bash
pnpm add -D oxlint oxfmt oxlint-tailwindcss
```

- [ ] **Step 5: Install and verify**

```bash
pnpm install
```

Expected: packages install cleanly. No peer dep warnings for oxlint/oxfmt.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: replace ESLint + Prettier with oxc (oxlint + oxfmt)

- Remove eslint, prettier, and all related plugins/configs
- Remove husky and lint-staged (no pre-commit hooks)
- Remove dead deps: @midudev/tailwind-animations, tw-animate-css
- Add oxlint v1.62, oxfmt v0.47, oxlint-tailwindcss v0.6
- Update scripts: lint -> oxlint, format -> oxfmt"
```

---

### Task 2: Configure oxlint

**Files:**
- Create: `.oxlintrc.json`

- [ ] **Step 1: Create oxlint configuration**

```bash
cat > .oxlintrc.json << 'CONFIG'
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
  "plugins": ["import", "typescript", "unicorn", "tailwindcss"],
  "env": {
    "node": true,
    "browser": true
  },
  "globals": {
    "Astro": "readonly",
    "Fragment": "readonly"
  },
  "rules": {
    "no-debugger": "warn",
    "no-unused-vars": "warn",
    "no-trailing-spaces": "warn",
    "typescript/no-explicit-any": "warn",
    "unicorn/filename-case": "off",
    "import/no-default-export": "off"
  },
  "ignorePatterns": [
    "dist/",
    ".vercel/",
    ".astro/",
    ".agents/",
    "node_modules/",
    "coverage/",
    "public/",
    "src/env.d.ts"
  ]
}
CONFIG
```

- [ ] **Step 2: Run oxlint to verify**

```bash
pnpm lint
```

Expected: No errors or warnings on project source files (`.agents/` ignored).

- [ ] **Step 3: Run oxlint with fix mode**

```bash
pnpm lint:fix
```

Expected: No changes needed on clean code. If fixes are applied, review them.

- [ ] **Step 4: Commit**

```bash
git add .oxlintrc.json
git commit -m "chore: add oxlint configuration with tailwindcss plugin"
```

---

### Task 3: Configure oxfmt

**Files:**
- Create: `.oxfmtrc.json`

- [ ] **Step 1: Create oxfmt configuration matching project style**

```bash
cat > .oxfmtrc.json << 'CONFIG'
{
  "printWidth": 100,
  "semicolons": false,
  "quotes": "double",
  "indent": "tabs",
  "tabWidth": 2,
  "trailingCommas": "es5",
  "arrowParens": "always",
  "endOfLine": "lf"
}
CONFIG
```

- [ ] **Step 2: Run oxfmt check to see current state**

```bash
pnpm format:check
```

Expected: May report formatting differences from Prettier. This is normal — oxfmt may format slightly differently.

- [ ] **Step 3: Apply oxfmt formatting**

```bash
pnpm format
```

Expected: All source files formatted by oxfmt. Review the diff to ensure no unexpected changes.

- [ ] **Step 4: Run lint again**

```bash
pnpm lint
```

Expected: Passes.

- [ ] **Step 5: Commit**

```bash
git add .oxfmtrc.json src/
git commit -m "style: apply oxfmt formatting to all source files"
```

---

### Task 4: Update CI Workflow

**Files:**
- Modify: `.github/workflows/github-ci.yml`

- [ ] **Step 1: Update CI to use oxc commands**

The lint and format jobs already use `pnpm lint` and `pnpm format:check` which now call oxlint and oxfmt. No CI changes needed. Verify:

```bash
cat .github/workflows/github-ci.yml | grep -E "lint|format"
```

Expected: `run: pnpm lint` and `run: pnpm format:check` — no changes needed.

- [ ] **Step 2: Commit if any changes were needed**

```bash
# No changes expected — scripts are transparent
```

---

### Task 5: Migrate to Astro 6 Fonts

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`
- Delete: `public/fonts/space-grotesk-*`, `public/fonts/noto-sans-*`, `public/fonts/fira-code-*`

- [ ] **Step 1: Add font configuration to astro.config.mjs**

```js
import { defineConfig, fontProviders } from "astro/config"

// Add inside defineConfig:
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
}],
```

- [ ] **Step 2: Install fontsource packages**

```bash
pnpm add @fontsource/satoshi @fontsource/jetbrains-mono
```

- [ ] **Step 3: Update Layout.astro — replace Google Fonts with Astro Fonts**

In `src/layouts/Layout.astro`:

**Add Font imports** in frontmatter:
```astro
---
import { Font } from "astro:assets"
import Header from "@/components/Header.astro"
import Footer from "@/components/Footer.astro"
import "@/styles/global.css"

interface Props {
  title: string
}
const { title } = Astro.props
---
```

**Replace all Google Fonts `<link>` tags** (lines ~13-26 in current file) with:
```astro
<Font cssVariable="--font-satoshi" preload />
<Font cssVariable="--font-mono" preload />
```

**Remove** these lines:
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:..." rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:..." rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:..." rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:..." rel="stylesheet">
```

- [ ] **Step 4: Update Layout.astro — add ClientRouter**

Add in frontmatter:
```astro
import { ClientRouter } from "astro:transitions"
```

Add to `<head>` after other head elements:
```astro
<ClientRouter />
```

Update `<html>` tag with transition:animate:
```astro
<html transition:animate="slide" lang={currentLocale || "en"} dir="ltr">
```

- [ ] **Step 5: Remove old @font-face declarations from global.css**

In `src/styles/global.css`, remove all `@font-face` blocks for Space Grotesk, Noto Sans, and Fira Code (approximately lines 60-260). These are blocks like:
```css
@font-face {
  font-family: "Space Grotesk";
  src: url("/fonts/space-grotesk-300.woff2") format("woff2");
  font-weight: 300;
  ...
}
```

Keep the `@font-face` for Material Symbols Outlined if still using local .woff2.

- [ ] **Step 6: Update CSS theme variables**

In `src/styles/global.css`, replace the font theme block:
```css
@theme inline {
  --font-display: var(--font-satoshi);
  --font-body: var(--font-satoshi);
  --font-mono: var(--font-mono);
}
```

Remove old variables referencing Space Grotesk, Noto Sans, and Fira Code font families.

- [ ] **Step 7: Delete old font files**

```bash
rm -f public/fonts/space-grotesk-*.woff2
rm -f public/fonts/noto-sans-*.woff2
rm -f public/fonts/fira-code-*.woff2
```

- [ ] **Step 8: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds. Font files served from `_astro/fonts/`.

```bash
ls -la dist/_astro/fonts/ 2>/dev/null || ls -la .vercel/output/static/_astro/fonts/ 2>/dev/null
```

Expected: Satoshi and JetBrains Mono .woff2 files present.

- [ ] **Step 9: Commit**

```bash
git add astro.config.mjs src/layouts/Layout.astro src/styles/global.css package.json public/fonts/
git commit -m "feat(fonts): migrate to Astro 6 Fonts with Satoshi + JetBrains Mono

- Replace Space Grotesk, Noto Sans, Fira Code with Satoshi + JetBrains Mono
- Use Astro 6 built-in font optimization (fontsource provider)
- Remove Google Fonts external requests (privacy-first, zero 3rd-party)
- Remove ~200 lines of @font-face declarations
- Add ClientRouter for view transition animations
- Language switch uses slide transition"
```

---

### Task 6: Add React + Shadcn/ui Foundation

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `components.json`
- Create: `src/components/ui/*` (auto-generated by shadcn)

- [ ] **Step 1: Add React to the project**

```bash
pnpm astro add react --yes
```

Expected: Installs `@astrojs/react`, `react`, `react-dom`, `@types/react`, `@types/react-dom`.

- [ ] **Step 2: Verify React integration in astro.config.mjs**

```bash
grep -n "react" astro.config.mjs
```

Expected: `import react from "@astrojs/react"` and `react()` in integrations array.

- [ ] **Step 3: Initialize shadcn/ui**

```bash
pnpm dlx shadcn@latest init
```

Select these options when prompted:
- TypeScript: yes
- Style: New York
- Base color: Neutral
- CSS variables: yes (for Tailwind CSS v4)
- Path alias: @/ → src/
- Components directory: src/components/ui
- Utils directory: src/lib
- RSC: no
- Tailwind config: existing

- [ ] **Step 4: Install base shadcn components**

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add sonner
```

- [ ] **Step 5: Create a test page to verify React + shadcn works**

Create `src/pages/test-react.astro`:
```astro
---
import ShadcnTest from "@/components/react/ShadcnTest"
---
<html>
  <body>
    <ShadcnTest client:load />
  </body>
</html>
```

Create `src/components/react/ShadcnTest.tsx`:
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShadcnTest() {
  return (
    <div className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Shadcn Test</CardTitle>
          <CardDescription>React + shadcn/ui is working in Astro 6</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => alert("shadcn works!")}>
            Click me
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. React + shadcn components compile correctly.

- [ ] **Step 7: Delete test page**

```bash
rm src/pages/test-react.astro src/components/react/ShadcnTest.tsx
rmdir src/components/react 2>/dev/null || true
```

- [ ] **Step 8: Commit**

```bash
git add astro.config.mjs package.json components.json src/components/ui/ src/lib/utils.ts
git commit -m "feat(ui): add React + shadcn/ui foundation

- Add @astrojs/react integration with React 19
- Initialize shadcn/ui (New York style, Neutral base)
- Install base components: button, card, input, textarea, label, sonner
- Foundation ready for UI component development in Iteration 2"
```

---

### Task 7: Final Verification and Documentation

- [ ] **Step 1: Run full verification**

```bash
pnpm check
pnpm lint
pnpm format:check
pnpm test:unit
pnpm test:e2e
pnpm build
```

All must pass.

- [ ] **Step 2: Update CHANGELOG.md**

Add v4.0.0 entry at top:
```markdown
## [4.0.0] - 2026-05-02

### Changed

- **Tooling Overhaul**
  - Replaced ESLint + Prettier with oxc (oxlint v1.62 + oxfmt v0.47)
  - Removed husky, lint-staged, and all ESLint/Prettier plugins (18 packages removed)
  - Lint now runs in <1s. Format in <50ms.

- **Astro 6 Fonts**
  - Migrated from Google Fonts to Astro 6 built-in font optimization
  - Satoshi (display/body) + JetBrains Mono (code) via fontsource provider
  - Zero third-party font requests. Auto-optimized fallback metrics for CLS-free loading
  - Removed ~200 lines of @font-face declarations and all .woff2 font files

- **View Transitions**
  - Added ClientRouter (`astro:transitions`) for smooth language switching
  - Slide animation between /en/ and /es/ via `transition:animate="slide"`
  - Replaced full page reload language switch

- **UI Foundation**
  - Added React 19 + @astrojs/react integration
  - Initialized shadcn/ui (New York style, Neutral base color)
  - Installed base components for future UI development

### Removed

- Removed dead dependencies: @midudev/tailwind-animations, tw-animate-css
- Removed Space Grotesk, Noto Sans, Fira Code font files
- Removed Google Fonts external requests
```

- [ ] **Step 3: Update AGENTS.md**

Update tooling section to reflect oxc commands and new conventions.

- [ ] **Step 4: Commit**

```bash
git add CHANGELOG.md AGENTS.md
git commit -m "docs: update CHANGELOG and AGENTS.md for v4.0.0 iteration 1"
```

---

## Acceptance Verification

- [ ] `pnpm check` — 0 errors, 0 warnings
- [ ] `pnpm lint` — 0 errors, 0 warnings
- [ ] `pnpm format:check` — no unformatted files
- [ ] `pnpm test:unit` — 18/18 pass
- [ ] `pnpm test:e2e` — 72/72 pass (all 3 browsers)
- [ ] `pnpm build` — succeeds
- [ ] Font files served from `_astro/fonts/` (not Google Fonts CDN)
- [ ] Language switch triggers slide animation (not full reload flash)
- [ ] React + shadcn Button and Card render correctly
