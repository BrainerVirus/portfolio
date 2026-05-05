# Changelog

All notable changes to this portfolio are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.1.1] - 2026-05-05

### Fixed

- **Vercel production deploys** — Added an explicit root package entry to `pnpm-workspace.yaml` so Vercel's pnpm install works even when the project is built with its older pnpm compatibility path.
- **GitHub Actions workflow** — Kept the Node 24-ready action versions while restoring the correct pnpm cache configuration.
- **Package metadata** — Updated the package version to match the latest published release line.

## [4.1.0] - 2026-05-05

### Added

- **Stable mobile Work dialog** — Work cards now open in a browser-chrome-safe modal that stays visible on mobile browsers with bottom URL bars.
- **Motion-reactive card tilt** — The Work dialog attempts phone-inclination tilt automatically when a card opens, with pointer/touch tilt as fallback.
- **Constellation tarot reward** — The Work card easter egg now flips into a solid tarot-style constellation reward card.
- **Navbar-matched favicon** — Browser, Apple touch, Android, and manifest icons now use the same observatory mark as the navbar logo.

### Changed

- **Work card flip** — Front and back faces now share the larger required height, preventing layout shifts during the flip.
- **Firefox flip rendering** — Split modal tilt and card flip onto separate 3D layers so Firefox hides the inactive face correctly.
- **Mobile dialog layout** — The dialog uses stable `svh` sizing, safe-area padding, and locked background scroll.
- **Contact links** — GitHub and LinkedIn now live in the footer only, keeping the Contact section focused on the form.
- **Release pipeline** — GitHub Actions were updated to the current action versions and Node 24 setup.

### Fixed

- **Firefox card bleed** — The original Work card content no longer shows behind the flipped tarot card.
- **Unwanted modal scrollbars** — The first Work card no longer shows an internal scrollbar when the content fits.
- **Mobile browser jumps** — The flip button and close control remain visible when mobile browser controls appear or hide.
- **Header overlap** — The mobile header can no longer intercept modal close taps.

## [4.0.0] - 2026-05-04

### Added

- **Live language switching** — Switching English/Spanish now mutates visible text in place and preserves scroll, form state, and animations.
- **Polished motion system** — GSAP powers section reveals, text decoding, icon motion, Work card entrances, and animated decorative SVG shapes.
- **Interactive Work cards** — Cards include hover/touch tilt, a glassy surface, modal details, and a constellation tarot easter egg.
- **Skills orbit** — Skills are grouped into semantic Core, Systems, and Design rings with monochrome icons.
- **Morphing contact form** — Contact fields animate typed text and the submit button moves through idle, sending, success, and error states.
- **Astro 6 optimized fonts** — Satoshi and JetBrains Mono are served through Astro font optimization.
- **React 19 + shadcn/ui** — Contact form and UI primitives use React/shadcn where interaction benefits from islands.

### Changed

- **Visual direction** — The site moved into a cohesive botanical-observatory look with shared ambient background, monoline shapes, sand text, and green accents.
- **Header identity** — The old coffee mark was replaced with the observatory/compass logo.
- **About section** — Bio copy, decode timing, and mobile name alignment were refined.
- **Contact section** — The form now uses the same width rhythm as the other sections.
- **Tooling** — ESLint/Prettier were replaced by oxlint/oxfmt, and the release flow moved to manual GitHub releases.

### Fixed

- **Work card flicker** — Card entrance animation no longer animates the glass surface itself, preventing colorful flicker while cards enter.
- **Animation cleanup** — GSAP setup avoids duplicate DrawSVG/timeline initialization after route/view transitions.
- **Section boundaries** — Skills, Work, and Contact backgrounds now blend into one page ambience.
- **Mobile Work cards** — Touch tilt and modal spacing were improved so the card remains visible.

## [3.0.0] - 2026-01-23

### Added

- **Testing foundation** — Added Vitest unit tests and Playwright end-to-end coverage across Chromium, Firefox, and WebKit.
- **Agent-ready docs** — Added `AGENTS.md` with architecture, command, and code-style guidance.
- **GitHub Flow** — Added issue templates, a PR template, and manual release guidance.
- **Bilingual skills content** — Expanded skills translations and categorized the skill set.

### Changed

- **Release process** — Removed automatic semantic-release so releases can be curated with clearer notes.
- **CI validation** — The pipeline now validates lint, format, tests, and build before release.

### Fixed

- **E2E reliability** — Tightened selectors and viewport handling for more stable browser tests.
- **Server actions** — Deferred environment variable reads to runtime so deployment builds are safer.

## [2.5.0] - 2024-10-22

### Added

- **Localized contact experience** — Contact form validation and user messages were localized.
- **Astro Actions contact flow** — Contact submissions moved to Astro Actions with Resend email delivery.

### Changed

- **Contact architecture** — Legacy API routes were replaced with a cleaner action-based flow.

## [2.4.0] - 2024-09-25

### Added

- **Bilingual UI** — Added English and Spanish text across the interface.
- **Locale routing** — Visitors are redirected into a localized route by default.

### Changed

- **Navbar language support** — Navigation labels now respond to the selected language.

## [2.3.0] - 2024-09-24

### Added

- **Automatic language support** — Added the first English/Spanish translation pass.

## [2.2.0] - 2024-09-22

### Added

- **GitHub profile link** — Added a direct link to the project owner’s GitHub profile.
- **Responsive section ordering** — Adjusted section order for different device sizes.

## [2.1.0] - 2024-08-31

### Added

- **Work-in-progress notice** — Added an alert to set expectations while the site was evolving.
- **Scroll persistence** — Section scroll position persists between reloads.
- **Wheel thresholding** — Wheel navigation became less accidental and easier to control.

## [2.0.0] - 2024-08-24

### Added

- **Full portfolio experience** — Added the Work/Experience section, navigation slider, hash-aware navigation, and analytics.
- **Performance setup** — Added Vercel Analytics, Vercel Insights, and asset optimization.

### Changed

- **Major redesign** — Reworked the home page structure, typography, palette, dependencies, and responsive behavior.

### Fixed

- **Mobile scrolling** — Improved scrolling behavior on mobile devices.
- **Layering** — Fixed z-index issues that could place UI in the wrong order.

### Breaking Changes

- Typography component usage, font family, color palette, and dependency versions changed substantially.

## [1.0.0] - 2023-09-23

### Added

- **Initial portfolio** — Launched the first portfolio with project setup and About section.

[Unreleased]: https://github.com/BrainerVirus/portfolio/compare/v4.1.1...HEAD
[4.1.1]: https://github.com/BrainerVirus/portfolio/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/BrainerVirus/portfolio/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/BrainerVirus/portfolio/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/BrainerVirus/portfolio/compare/v2.5.0...v3.0.0
[2.5.0]: https://github.com/BrainerVirus/portfolio/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/BrainerVirus/portfolio/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/BrainerVirus/portfolio/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/BrainerVirus/portfolio/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/BrainerVirus/portfolio/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/BrainerVirus/portfolio/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/BrainerVirus/portfolio/releases/tag/v1.0.0
