import { mkdtemp, readFile, rm } from 'node:fs/promises';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';

let dir: string;
let file: string;
let server: Server;
let base: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(os.tmpdir(), 'cfc-'));
  file = path.join(dir, 'nested', 'messages.jsonl');
  server = createApp({ messagesFile: file }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterEach(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(dir, { recursive: true, force: true });
});

function post(fields: Record<string, string>): Promise<Response> {
  return fetch(`${base}/contact`, { method: 'POST', body: new URLSearchParams(fields) });
}

describe('website', () => {
  it('shows the home page', async () => {
    const res = await fetch(`${base}/`);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('<h1>Welcome</h1>');
  });

  it('shows the contact form', async () => {
    const res = await fetch(`${base}/contact`);
    const html = await res.text();
    expect(html).toContain('<form method="post" action="/contact" novalidate>');
    for (const name of ['name', 'email', 'message']) expect(html).toContain(`name="${name}"`);
    expect(html).toContain('<button type="submit">Send</button>');
  });

  it('saves a valid submission to the file', async () => {
    const res = await post({ name: 'Ann', email: 'ann@example.com', message: 'Hello' });
    expect(res.status).toBe(201);
    const lines = (await readFile(file, 'utf8')).trim().split('\n');
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0] ?? '')).toMatchObject({
      name: 'Ann',
      email: 'ann@example.com',
      message: 'Hello',
    });
  });

  it('rejects an invalid submission and saves nothing', async () => {
    const res = await post({ name: '', email: 'bad', message: '' });
    expect(res.status).toBe(400);
    await expect(readFile(file, 'utf8')).rejects.toThrow();
  });

  it('shows the error next to the field and keeps what was typed', async () => {
    const res = await post({ name: 'Ann', email: 'bad', message: 'Hello' });
    const html = await res.text();
    expect(html).toContain('id="email-error"');
    expect(html).toContain('Please enter a valid e-mail address.');
    expect(html).not.toContain('id="name-error"');
    expect(html).toContain('value="Ann"');
    expect(html).toContain('value="bad"');
    expect(html).toContain('>Hello</textarea>');
  });

  it('keeps two messages sent one after the other', async () => {
    await post({ name: 'Ann', email: 'ann@example.com', message: 'One' });
    await post({ name: 'Bob', email: 'bob@example.com', message: 'Two' });
    const lines = (await readFile(file, 'utf8')).trim().split('\n');
    expect(lines.map((l) => JSON.parse(l).message)).toEqual(['One', 'Two']);
  });
});
