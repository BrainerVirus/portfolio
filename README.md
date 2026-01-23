# My Portfolio

Welcome to my personal portfolio! This project showcases my work, skills, and experiences. It is built using [Astro](https://astro.build/), a modern front-end framework for building fast, optimized websites.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Versioning](#versioning)
- [Release Process](#release-process)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Fast and Optimized**: Built with Astro for optimal performance.
- **Responsive Design**: Works on all devices, from mobile to desktop.
- **Interactive Components**: Includes sliders, animations, and more.
- **Tailwind CSS**: Styled using Tailwind CSS for a modern look and feel.
- **TypeScript**: Written in TypeScript for type safety and better developer experience.
- **ESLint and Prettier**: Configured for code quality and consistency.
- **Comprehensive Testing**: Unit tests with Vitest and end-to-end tests with Playwright.

## Installation

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/BrainerVirus/portfolio.git
cd portfolio
pnpm install
```

## Usage

To start the development server, run:

```sh
pnpm dev
```

To build the project for production, run:

```sh
pnpm build
```

**\*Note:** The built files will be in the dist/ directory.\*

To preview the production build locally, run:

```sh
pnpm preview
```

## Testing

This project uses a comprehensive testing strategy with unit and end-to-end tests.

### Unit Tests (Vitest)

Unit tests are located in `src/**/*.test.ts` files and cover individual functions and utilities.

```sh
pnpm test:unit
```

### End-to-End Tests (Playwright)

E2E tests are located in `e2e/` and test the entire application flow in real browsers.

```sh
pnpm test:e2e
```

### Run All Tests

To run both unit and E2E tests:

```sh
pnpm test
```

All tests must pass before deploying to production.

## Project Structure

Here's an overview of the project's structure:

```
.astro/
.editorconfig
.eslintignore
.eslintrc.cjs
.github/
.husky/
.lintstagedrc
.prettierignore
.prettierrc.mjs
.releaserc.json
.vercel/
.vscode/
astro.config.mjs
CHANGELOG.md
e2e/
package.json
playwright-report/
playwright.config.ts
pnpm-lock.yaml
public/
README.md
src/
tailwind.config.js
test-results/
tests-examples/
tsconfig.json
```

- `.astro/`: Astro-specific configuration files.
- `.github/`: GitHub workflows for CI/CD.
- `.husky/`: Husky hooks for pre-commit checks.
- `.vscode/`: VSCode settings for the project.
- `astro.config.mjs`: Astro configuration file.
- `CHANGELOG.md`: Automatically generated changelog.
- `e2e/`: End-to-end tests using Playwright.
- `public/`: Static assets.
- `src/`: Source code for the project.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

Here are some useful scripts defined in the package.json:

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm preview`: Preview the production build locally.
- `pnpm commit`: Start an interactive prompt to create a commit using Commitizen.
- `pnpm lint`: Run ESLint to check for code quality issues.
- `pnpm lint:fix`: Run ESLint with automatic fixes.
- `pnpm format`: Format code with Prettier.
- `pnpm format:check`: Check code formatting without making changes.
- `pnpm check`: Run TypeScript type checking and Astro checks.
- `pnpm test:unit`: Run unit tests with Vitest.
- `pnpm test:e2e`: Run end-to-end tests with Playwright.
- `pnpm test`: Run all tests (unit + E2E).

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes or significant feature releases (e.g., v2.0.0 → v3.0.0)
- **MINOR**: New features that are backward-compatible (e.g., v3.0.0 → v3.1.0)
- **PATCH**: Bug fixes and maintenance (e.g., v3.0.0 → v3.0.1)

The version number is defined in `package.json` and should be updated manually as part of the release process.

## Release Process

This project uses **GitHub Flow** for releasing new versions. The process is as follows:

### 1. Feature Development

- Create a feature branch from `develop` or directly from `main` using the naming convention:
  - `feature/feature-name` for new features
  - `bugfix/bug-name` for bug fixes
  - `hotfix/issue-name` for critical production fixes

### 2. Pull Request & Code Review

- Push your branch to remote
- Create a pull request with a descriptive title and detailed description
- Ensure all tests pass (CI pipeline runs automatically)
- Request code review if working in a team
- Address feedback and make updates

### 3. Merge to Main

- Once approved, merge the PR into `main`
- Delete the feature branch

### 4. Create Release Tag

- After merging, create an annotated git tag locally:
  ```sh
  git tag -a v3.0.0 -m "Release version 3.0.0: Description of changes"
  ```
- Push the tag to remote:
  ```sh
  git push origin v3.0.0
  ```

### 5. Create GitHub Release

- Go to the [Releases page](https://github.com/BrainerVirus/portfolio/releases)
- Create a new release from the tag
- Add release notes with highlights from the CHANGELOG.md

### Versioning Workflow Example

```bash
# Create and switch to feature branch
git checkout -b feature/new-section

# Make changes and commit
git add .
git commit -m "feat: add new portfolio section"

# Push to remote
git push origin feature/new-section

# Create PR on GitHub, get review, and merge

# After merge, create release
git tag -a v3.1.0 -m "Release version 3.1.0: Add new portfolio section"
git push origin v3.1.0

# Create GitHub Release from tag with CHANGELOG notes
```

**Important**: The CI/CD pipeline (`lint` → `format` → `test` → `build`) runs on all branches. The `build` job must pass before merging to `main`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
