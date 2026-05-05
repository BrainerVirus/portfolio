# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Tooling Overhaul** — Replaced ESLint + Prettier with oxc (oxlint + oxfmt). Removed husky, lint-staged, and all ESLint/Prettier plugins (18 packages removed). Lint now runs in <1s, format in <50ms.
- **Astro 6 Fonts** — Migrated from Google Fonts to Astro 6 built-in font optimization. Satoshi (display/body) + JetBrains Mono (code) via fontshare + fontsource providers. Zero third-party font requests.
- **View Transitions** — Added ClientRouter (`astro:transitions`) for smooth language switching.
- **React 19 + shadcn/ui** — Integrated React with shadcn/ui (Nova preset, Neutral base color, CSS variables). Base components: button, card, input, textarea, label, sonner.
- **GSAP Animations** — Scroll-triggered animations for all sections. About: staggered terminal reveal, typewriter decode. Experience: 3D card tilt with `gsap.quickTo`, modal overlay with flip easter egg, SVG draw scrub. Skills: orbit rings elastic scale-in. Hover micro-interactions on icons, terminal, nav links.
- **Nav scroll-spy** — IntersectionObserver-based active link detection with elastic morphing underline.
- **Language switching** — Live DOM mutation with text scramble animation (no page reload). System/English/Español dropdown with checkmark indicator.
- **Contact form** — Animated input fields with focus-tracked cursor, blink animation, and character entry effects. Glass-card styling with shadcn components.
- **Easter eggs** — Konami code, coffee cup click counter, hidden terminal secret.
- **Unit tests** — Vitest setup with 18 i18n tests + 18 animation utility tests.
- **E2E tests** — Playwright across chromium/firefox/webkit: header nav, hero section, experience section, skills section, contact section, language switching, mobile responsiveness, 3D tilt, modal overlay, flip easter egg, SVG draw.
- **`.env.example`** — Added template for Resend API configuration.

### Changed

- **i18n translations** — Renamed skills category "Craft" → "Design" (EN) / "Diseño" (ES). Added missing "Core" → "Núcleo" (ES). Updated about quote "UI craft" → "UI design" / "el diseño de UI". Updated footer tagline "Built with craft." → "Built with passion." / "Hecho con pasión."
- **Shadcn Contact Form** — Replaced vanilla JS form with React component. Removed old `initializeContactForm` logic.
- **Animation code** — DRY refactor of animation utilities. Each component self-cleans via `gsap.context().revert()`.
- **Dependency Updates** — Upgraded Astro 5→6.2, Tailwind 4.1→4.2, TypeScript 5→6, Vitest 4→4.1, Playwright 1.57→1.59, Zod 3→4, ESLint 9→10, resend 6→6.12, and all other deps to latest.
- **Zod 4 Migration** — Migrated `z.string().email()` to `z.email()`, `z.string().min()` error syntax to `{ error }` objects.
- **CI/CD Pipeline** — Removed automatic semantic-release, switched to manual GitHub Flow. Tests run on all branches. CI validates: lint → format → test → build.
- **Documentation** — Rewrote AGENTS.md with critical architecture notes. Added GitHub Flow release process to README.

### Added

- **Tooling Overhaul** — Replaced ESLint + Prettier with oxc (oxlint + oxfmt). Removed husky, lint-staged, and all ESLint/Prettier plugins (18 packages removed).
- **Astro 6 Fonts** — Migrated from Google Fonts to Astro 6 built-in font optimization. Satoshi + JetBrains Mono via fontshare + fontsource providers.
- **View Transitions** — Added ClientRouter (`astro:transitions`) for smooth language switching.
- **React 19 + shadcn/ui** — Integrated React with shadcn/ui (Nova preset, Neutral base). Components: button, card, input, textarea, label, sonner.
- **GSAP Animations** — Scroll-triggered animations for all sections. About: staggered terminal reveal, typewriter decode. Experience: 3D card tilt with `gsap.quickTo`, modal overlay with flip easter egg, SVG draw scrub. Skills: orbit rings elastic scale-in. Hover micro-interactions on icons, terminal, nav links.
- **Nav scroll-spy** — IntersectionObserver-based active link detection with elastic morphing underline.
- **Language switching** — Live DOM mutation with text scramble animation. System/English/Español dropdown with checkmark indicator.
- **Contact form** — Animated input fields with focus-tracked cursor, blink animation, and character entry effects.
- **Easter eggs** — Konami code, coffee cup click counter, hidden terminal secret.
- **Testing Infrastructure** — Vitest for unit testing (18 i18n tests + 18 animation tests). Playwright E2E across chromium/firefox/webkit (header nav, hero, experience, skills, contact, language switching, mobile responsiveness, 3D tilt, modal, flip, SVG draw).
- **Skills Section** — Icon component from astro-icon, bilingual skill translations (18 skills × 2 languages), three categories: core, secondary, additional.
- **Localization** — Extended i18n translations with complete skill names, descriptions, and contact form validation messages in both languages.
- **GitHub Flow** — Issue templates (bug, feature, docs), PR template with checklist. Removed automatic semantic-release.
- **`.env.example`** — Added template for Resend API configuration.

### Fixed

- **Contact form cursor** — Custom caret only appears on focus, blinks with terminal-style animation, positions at start when empty / end when text is present. Placeholder uses 25% opacity.
- **About section name** — "Cristhofer Pincetti" breaks at word boundaries via flex-wrap instead of mid-word on mobile.
- **About section pin** — Fixed ScrollTrigger pin conflict with `scroll-behavior: smooth` on `*` selector.
- **About section typewriter** — Replaced broken `scrub: 1` + ScrambleTextPlugin with `toggleActions` approach.
- **Work section flicker** — Eliminated bg flicker by creating drawSVG once, using `fromTo` without stagger.
- **Work section tilt** — Independent per-card tilt, modal card fits content, uniform padding.
- **Mobile menu** — Corrected reversed toggle logic in `initMobileMenu`.
- **Memory leaks** — Added cleanup for ScrollTriggers, intervals, and event listeners.
- **Icons** — Used CSS variable for Material Symbols font-family.
- **E2E tests** — Fixed strict mode violations, header selectors, language switch selectors, footer selectors, mobile viewport handling.
- **Actions** — Fixed environment variable access deferred to runtime in server actions.

### Removed

- ESLint, Prettier, husky, lint-staged and all related plugins (18 packages)
- `transition:animate="slide"` from `<html>` (was causing slow language transitions)
- `cleanupScrollTriggers()` from Layout.astro (each component self-cleans)
- Semantic-release, .releaserc.json, components.json, automatic changelog/versioning from CI
- Dead dependencies: @midudev/tailwind-animations, Space Grotesk/Noto Sans/Fira Code font files, Google Fonts external requests

## [3.0.0] - 2025-01-23

### Added

- **Testing Infrastructure** — Vitest unit testing with happy-dom, 18 i18n unit tests, 3 bilingual E2E tests, vitest.config.ts with path aliases.
- **Skills Section** — Icon component from astro-icon, bilingual skill translations (18 skills × 2 languages), three categories: core, secondary, additional.
- **Localization** — Extended i18n translations with complete skill names, descriptions, and contact form validation messages in both languages.
- **Documentation** — AGENTS.md for agentic coding, GitHub Flow release process in README, GitHub issue/PR templates.
- **GitHub Flow** — Removed automatic semantic-release, created issue templates, PR template with checklist.

### Changed

- **CI/CD Pipeline** — Removed automatic semantic-release from GitHub Actions. Manual GitHub Flow. Tests run on all branches. CI: lint → format → test → build.
- **Testing** — Fixed 21 Playwright E2E tests (strict mode violations, selectors, viewport handling).
- **Package Configuration** — Updated test scripts, added Vitest deps, removed semantic-release deps.
- **README** — Added Testing, Versioning, and Release Process sections.

### Fixed

- **E2E Tests** — Strict mode violations, header selectors, language switch selectors, footer selectors, mobile viewport handling.
- **Actions** — Environment variable access deferred to runtime in server actions.
- **Dependencies** — Added vitest, @vitest/ui, and happy-dom.

### Removed

- Semantic-release from CI pipeline, .releaserc.json, components.json, automatic changelog/versioning from CI.
- Removed unused semantic-release packages from dependencies.

## [2.5.0] - 2024-11-XX

### Added

- **Internationalization**
  - Added complete English and Spanish translation system
  - Added localized form submission and UI messages
  - Added contact form with field-level validation

- **Contact Section**
  - Implemented contact API using Astro Actions
  - Added email templates for contact submissions
  - Integrated Resend for email delivery
  - Added field-level form validation

- **Features**
  - Added language switching capability
  - Added form validation error display
  - Added localized error messages for form validation

### Changed

- **Refactoring**
  - Removed legacy API routes in favor of Astro Actions
  - Cleaned up contact action implementation

## [2.4.0] - 2024-09-25

### Added

- **Internationalization**
  - Added Spanish and English text translations
  - Implemented language switching in UI
  - Added default language redirect

### Features

- i18n translations for UI elements
- Navbar translation support
- Language redirect on homepage

## [2.3.0] - 2024-09-24

### Added

- Automatic English and Spanish translation support

## [2.2.0] - 2024-09-22

### Added

- GitHub link integration
- Responsive section ordering based on device screen size

## [2.1.0] - 2024-08-31

### Added

- Alert component for work-in-progress notification
- Section scroll persistence between page reloads
- Threshold logic for wheel navigation

## [2.0.0] - 2024-08-24

### Added

- Experience section with timeline layout
- Vercel Analytics integration
- Vercel Insights integration
- Navigation slider component with wheel scrolling
- URL hash detection and management
- Tailwind animations
- DOM selector utilities
- Asset optimization

### Changed

- Major home page redesign and refactor
- Updated typography component usage
- Changed font from Source Sans Pro to Source Sans 3
- Updated color palette
- Refactored dependencies

### Fixed

- Mobile device scrolling issues
- Z-index ordering problems

### Breaking Changes

- Typography component API changes
- Astro dependencies updates
- Font family changes
- Skill list updates

## [1.0.0] - 2023-09-23

### Added

- Initial portfolio release
- About section
- Project setup and configuration

[Unreleased]: https://github.com/BrainerVirus/portfolio/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/BrainerVirus/portfolio/compare/v2.5.0...v3.0.0
[2.5.0]: https://github.com/BrainerVirus/portfolio/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/BrainerVirus/portfolio/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/BrainerVirus/portfolio/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/BrainerVirus/portfolio/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/BrainerVirus/portfolio/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/BrainerVirus/portfolio/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/BrainerVirus/portfolio/releases/tag/v1.0.0
