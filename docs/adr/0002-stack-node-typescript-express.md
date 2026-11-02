# 0002 — Stack: Node.js, TypeScript and Express

- Status: accepted
- Date: 2026-11-03

## Context

contact-form-check is a small website (home page, contact form) whose server saves submissions to a file on the computer running it. The project kind is a website and the request does not ask for a particular technology, so the default stack for a website applies unless a better fit is justified. The CI skeleton already uses Node.js 24 and npm, so the toolchain is already present.

## Decision

- Runtime: Node.js 24 (LTS line used by CI, pinned to 24.21.0), package manager npm.
- Language: TypeScript in strict mode, compiled with `tsc` to `dist/`.
- Server: Express 5, with pages rendered as HTML strings on the server. No front-end framework and no client-side JavaScript: the form is a plain HTML form posted to the server.
- All versions are pinned exactly in `package.json`.

## Alternatives considered

- A full-stack framework (Next.js, Nuxt): far more machinery than two pages and one form need.
- Python (Flask) or another language: would add a second toolchain next to the Node.js one CI already provides.
- Plain Node.js `http` without Express: no extra dependency, but routing and form parsing would be hand-written and harder for later tickets to extend.

## Consequences

- Pages are simple and work without JavaScript; richer pages later may need a template library or a front-end tool, which would need a new ADR.
- TypeScript is held at 6.0.x because `typescript-eslint` does not yet support newer majors; upgrade both together.
