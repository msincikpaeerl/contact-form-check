# 0003 — Store messages in a JSON Lines file

- Status: accepted
- Date: 2026-11-03

## Context

Messages sent through the contact form must be saved on the computer running the site. There is no e-mail and no requirement for querying or editing messages.

## Decision

Each submission is appended as one JSON object per line to a text file (JSON Lines). The default file is `data/messages.jsonl`, changed with the `MESSAGES_FILE` environment variable. Folders are created if missing. The `data/` folder is ignored by Git. Each record has `name`, `email`, `message` and `receivedAt` (ISO 8601 date).

## Alternatives considered

- SQLite or another database: needs a driver and migrations, more than appending text lines requires.
- One file per message: many small files, harder to read as a whole.
- CSV: needs quoting of multi-line messages; JSON Lines handles them natively.

## Consequences

- The owner can open the file in any text editor, and other tools can read it line by line.
- Appends are fine for low volume; if search, editing or high volume is needed later, replace the storage module (`src/storage.ts`) with a database through a new ADR.
