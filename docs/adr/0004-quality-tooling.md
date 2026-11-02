# 0004 — Quality tooling: Vitest, ESLint, Prettier, remark

- Status: accepted
- Date: 2026-11-03

## Context

Every agent needs the same one-command checks for tests, lint, formatting, types and documentation links, run locally and in CI.

## Decision

- Tests: Vitest, at two levels: unit tests (`tests/unit`) and integration tests (`tests/integration`) that start the real server on a free port and call it over HTTP. There are no browser tests: the site has no client-side JavaScript, so HTTP-level tests cover its behaviour.
- Lint: ESLint with `typescript-eslint` recommended rules.
- Format: Prettier (single quotes, 100 columns), checked with `format:check`.
- Type check: `tsc --noEmit`.
- Documentation links: `remark-cli` and `remark-validate-links` as pinned dev dependencies, run with `npm run docs:links`. CLAUDE.md and CI both run this same script after `npm ci`.
- CI runs install, lint, format check, type check, tests, build and the documentation link check on every pull request.

## Alternatives considered

- Jest: slower and needs extra configuration for TypeScript and ES modules.
- Playwright browser tests: heavy for a site without client-side logic; to be added by a ticket that introduces browser behaviour.
- Biome instead of ESLint and Prettier: fewer tools, but a smaller rule ecosystem.

## Consequences

- `npm run check` runs every check locally in the same order as CI.
- A change that adds client-side JavaScript must add browser tests and a new ADR.
