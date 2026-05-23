# Design System

Before creating or modifying UI, frontend, CSS, Tailwind, components, or accessibility behavior, review the existing portfolio visual system in `src/styles/global.css`, `src/components/sections/`, and any root `DESIGN.md` file if one exists.

Preserve the portfolio's dark editorial style, Satoshi and JetBrains Mono typography, muted parchment text, botanical green accents, restrained borders, scroll-driven GSAP motion, and precise section spacing.

Use existing component patterns before adding new ones. Keep Astro sections server-rendered unless a React island is already warranted, and keep React UI additions aligned with the shadcn/ui neutral/nova setup under `src/components/ui/`.

When changing design tokens or large styling surfaces, run `pnpm format:check` and the relevant Playwright coverage. If a `DESIGN.md` file is introduced later, treat its YAML front matter and rationale as authoritative.
