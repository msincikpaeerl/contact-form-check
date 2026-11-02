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

  it('shows a welcome text and a link to the contact page on the home page', async () => {
    const html = await (await fetch(`${base}/`)).text();
    expect(html).toContain('<title>Home</title>');
    expect(html).toContain('Use the contact page to send us a message.');
    expect(html).toContain('<a class="button" href="/contact">Go to the contact page</a>');
  });

  it('makes the home page adapt to small screens', async () => {
    const html = await (await fetch(`${base}/`)).text();
    expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
    expect(html).toContain('@media (max-width: 480px)');
  });

  it('shows the contact form', async () => {
    const res = await fetch(`${base}/contact`);
    expect(await res.text()).toContain('<form method="post" action="/contact">');
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
});
