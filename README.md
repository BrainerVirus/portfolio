# My Portfolio

Welcome to my personal portfolio! This project showcases my work, skills, and experiences. It is built using [Astro](https://astro.build/), a modern front-end framework for building fast, optimized websites.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Fast and Optimized**: Built with Astro for optimal performance.
- **Responsive Design**: Works on all devices, from mobile to desktop.
- **Interactive Components**: Includes sliders, animations, and more.
- **Tailwind CSS**: Styled using Tailwind CSS for a modern look and feel.
- **TypeScript**: Written in TypeScript for type safety and better developer experience.
- **ESLint and Prettier**: Configured for code quality and consistency.
- **Automated Releases**: Uses semantic-release for automated versioning and changelog generation.

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
- `pnpm test`: Run the tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
