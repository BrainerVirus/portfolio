# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-01-23

### Added

- **Testing Infrastructure**
  - Set up Vitest for unit testing with happy-dom environment
  - Added 18 comprehensive unit tests for i18n translations
  - Added 3 new E2E tests for bilingual skills section support
  - Added vitest.config.ts with path aliases and coverage configuration
  - Added npm scripts: `test:unit`, `test:e2e`, and updated `test` to run both

- **Skills Section Enhancements**
  - Updated SkillsSection to use Icon component from astro-icon
  - Added bilingual skill translations (English & Spanish)
  - Organized skills into three categories: core, secondary, and additional
  - Added 18 skill translations for both languages

- **Localization**
  - Extended i18n translations with complete skill names and descriptions
  - Added contact form validation error messages in both languages

### Changed

- **CI/CD Pipeline Changes**
  - Removed automatic semantic-release from GitHub Actions workflow
  - Changed to manual GitHub Flow for releases
  - Tests now run on all branches (main, feature/_, bugfix/_, hotfix/\*)
  - CI validates: lint → format → test (unit + e2e) → build

- **Testing**
  - Fixed 21 Playwright E2E tests to avoid strict mode violations
  - Improved test selectors to be more robust and maintainable
  - Added adaptive viewport handling for responsive tests
  - Increased tolerance for DOM changes due to scroll-into-view behavior

- **Package Configuration**
  - Updated package.json test scripts for better testing workflow
  - Added Vitest and related dependencies

### Fixed

- **E2E Tests**
  - Fixed strict mode violations with multiple element matches
  - Updated language switch selector to use filter().first()
  - Replaced text-based selectors with element-specific selectors
  - Fixed footer tests to use h2 selector instead of text matching
  - Made mobile responsiveness tests adaptive to viewport
  - Fixed unused variable warnings in test suite

### Removed

- **CI/CD**
  - Removed semantic-release from CI pipeline
  - Removed automatic changelog generation from CI (now manual)
  - Removed automatic version bumping from CI

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

[3.0.0]: https://github.com/BrainerVirus/portfolio/compare/v2.5.0...v3.0.0
[2.5.0]: https://github.com/BrainerVirus/portfolio/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/BrainerVirus/portfolio/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/BrainerVirus/portfolio/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/BrainerVirus/portfolio/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/BrainerVirus/portfolio/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/BrainerVirus/portfolio/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/BrainerVirus/portfolio/releases/tag/v1.0.0
