# Testing

Test strategy and how to run each level. Tools are chosen in [ADR 0004](../adr/0004-quality-tooling.md).

| Level               | Tool                  | Where               | Runs with                  |
| ------------------- | --------------------- | ------------------- | -------------------------- |
| Unit                | Vitest                | `tests/unit`        | `npm run test:unit`        |
| Integration (HTTP)  | Vitest + `fetch`      | `tests/integration` | `npm run test:integration` |
| Documentation links | remark-validate-links | all Markdown files  | `npm run docs:links`       |

`npm test` runs both Vitest levels. CI runs everything in the `checks` job.

## Strategy

- Unit tests cover pure logic (for example form validation).
- Integration tests start the real Express app on a free port with a temporary messages file, send requests with `fetch`, and check both the response and the saved file. Use `createApp({ messagesFile })` and delete the temporary folder afterwards.
- Browser tests (Playwright, `tests/e2e`) run with `npm run test:e2e`. Playwright builds and starts the site itself on port 3100 with a temporary messages file. The first time, install the browser with `npx playwright install chromium`. CI runs them in the `e2e` job. They are not part of `npm test`.
- A bug fix starts with a test that fails before the fix.
