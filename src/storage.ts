import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export interface Message {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

/** Appends one message as a JSON line to the given file, creating folders as needed. */
export async function saveMessage(file: string, message: Message): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, JSON.stringify(message) + '\n', 'utf8');
}
