# Setup

How to run contact-form-check on a development machine.

## Requirements

- Node.js 24.21.0 or newer in the 24 line, with npm.

## Install and run

```
npm ci
npm run dev
```

The site is then at <http://localhost:3000>. `npm run dev` restarts the server when a file changes. To run the compiled version, use `npm run build` then `npm start`.

## Environment variables

Listed in [`.env.example`](../../.env.example). They are read from the environment (the project does not load `.env` files by itself).

| Variable        | Default               | Meaning                                        |
| --------------- | --------------------- | ---------------------------------------------- |
| `PORT`          | `3000`                | Port the site listens on                       |
| `MESSAGES_FILE` | `data/messages.jsonl` | File where messages are appended, one per line |

## Checks

| Task                | Command                                   |
| ------------------- | ----------------------------------------- |
| Lint                | `npm run lint`                            |
| Format check / fix  | `npm run format:check` / `npm run format` |
| Type check          | `npm run typecheck`                       |
| Tests               | `npm test`                                |
| Build               | `npm run build`                           |
| Documentation links | `npm run docs:links`                      |
| Everything          | `npm run check`                           |

## Documentation link check

CI checks that every relative link in the Markdown files points to an existing file and heading, with `remark-validate-links` installed as a pinned dev dependency (see [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) and [ADR 0004](../adr/0004-quality-tooling.md)).
