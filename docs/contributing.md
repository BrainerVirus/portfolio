# Contributing

This repository uses [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow).

## Branching

- `main` is the default branch and should stay deployable.
- Do all work on short-lived branches created from `main`.
- Use clear branch names:
  - `feature/*` for user-facing features.
  - `fix/*` for bug fixes.
  - `chore/*` for maintenance, CI, tooling, and dependency work.
  - `docs/*` for documentation-only changes.
- Open a pull request to merge into `main`; avoid long-lived integration branches such as `develop`.

## Typical Workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-change
# commit, push, open PR
```

## Before You Open A PR

Follow `AGENTS.md`, the shared rules in `docs/agent-rules/`, and the pull request template for conventions, validation, and PR details.

Run the local checks that match your change. For normal code changes, run the full gate:

```bash
pnpm lint
pnpm format:check
pnpm check
pnpm test
pnpm build
```

## Pull Requests And Merge

- Keep PRs small enough to review comfortably.
- Use `.github/PULL_REQUEST_TEMPLATE.md`.
- Add screenshots or recordings for UI changes.
- Treat required GitHub checks as blockers.
- Merge only after required checks pass and open conversations are resolved.

## Releases

Stable releases are created by tagging a commit on `main` with `vMAJOR.MINOR.PATCH`.
