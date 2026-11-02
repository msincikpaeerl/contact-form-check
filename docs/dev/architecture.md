# Architecture

A small Express server that renders HTML pages and saves contact form messages to a file. Decisions are in [`docs/adr/`](../adr/0002-stack-node-typescript-express.md).

| File                | Role                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/main.ts`       | Entry point: reads `PORT` and `MESSAGES_FILE`, starts the server                                                |
| `src/app.ts`        | `createApp`: routes `GET /`, `GET /contact`, `POST /contact`                                                    |
| `src/pages.ts`      | HTML for each page, with escaping of user text                                                                  |
| `src/validation.ts` | Checks the submitted name, e-mail and message                                                                   |
| `src/storage.ts`    | Appends a message as one JSON line to the file ([ADR 0003](../adr/0003-store-messages-in-a-json-lines-file.md)) |

A valid `POST /contact` returns 201 with a thank-you page; an invalid one returns 400 with the form and error messages, and saves nothing.
