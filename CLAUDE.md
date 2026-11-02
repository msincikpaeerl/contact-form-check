# CLAUDE.md — contact-form-check

Instructions for Claude Code working on this repository. Keep this file under 150 lines.
Details belong in `docs/`; this file only points to them.

## What this project is

A simple website with a home page and a contact form. Messages sent through the form are saved on the computer running the site; no e-mail.

## Stack

Node.js 24, TypeScript (strict), Express 5, Vitest, ESLint, Prettier. See the ADRs in `docs/adr/` (0002 stack, 0003 message storage, 0004 quality tooling).

## Read before working

1. The ticket you were given.
2. The documentation of the area you touch in `docs/dev/` ([setup](docs/dev/setup.md), [testing](docs/dev/testing.md), [architecture](docs/dev/architecture.md)).
3. The decisions in `docs/adr/` related to that area.

## Commands

| Task                                              | Command                          |
| ------------------------------------------------- | -------------------------------- |
| Install (once, exact versions from the lock file) | `npm ci`                         |
| Start in development (auto-reload, port 3000)     | `npm run dev`                    |
| Start the built site                              | `npm run build` then `npm start` |
| Lint                                              | `npm run lint`                   |
| Format check (fix with `npm run format`)          | `npm run format:check`           |
| Type check                                        | `npm run typecheck`              |
| Tests (also `test:unit` and `test:integration`)   | `npm test`                       |
| Build                                             | `npm run build`                  |
| Documentation link check (the same command as CI) | `npm run docs:links`             |
| All checks, in CI order                           | `npm run check`                  |

## Repository map

```
src/                 Server code: main.ts (entry), app.ts (routes), pages.ts (HTML), validation.ts, storage.ts
tests/unit/          Unit tests
tests/integration/   Tests that start the server and call it over HTTP
data/                Saved messages at run time (ignored by Git)
docs/user/           User documentation, organised by tasks
docs/dev/            Developer documentation (architecture, setup, testing)
docs/adr/            Architecture Decision Records
.github/             CI and the pull request template
```

## Conventions

- Commits follow Conventional Commits with the ticket number: `feat(WEB-12): add contact form`.
- Every significant technical choice gets an ADR: copy `docs/adr/0000-template.md`, next number.
- A user-visible change updates `docs/user/` and `CHANGELOG.md` in the same pull request.
- CI: every job in `.github/workflows/ci.yml` is listed in the `needs` of the final `ci` job. Never rename or remove `ci`: branch protection requires it, and no pull request can be merged without it.
- Code: ES modules, so relative imports end in `.js` (`import { x } from './x.js'`). Escape any user text put in HTML with `escapeHtml`. Dependencies are pinned exactly; commit `package-lock.json`.
- Configuration comes from environment variables, listed in `.env.example`.
- All text in English.

## Tests

- New behaviour needs tests: unit tests for logic, integration tests for routes.
- A bug fix starts with a regression test that fails before the fix.
- Never weaken or delete a test to make CI pass: fix the code, or explain in the pull request why the test was wrong.

## Before finishing

Every command in the Commands table must pass (`npm run check` runs them all).

## Never

- Never commit secrets. Environment variables are listed in `.env.example`.
- Never commit to the default branch: work on the ticket branch.
