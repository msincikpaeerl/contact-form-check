import type { FieldErrors } from './validation.js';

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
body { font-family: system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 1rem; color: #222; }
nav, main { max-width: 40rem; margin: 0 auto; }
nav { padding-bottom: 0.5rem; }
h1 { font-size: 2rem; }
input, textarea { width: 100%; box-sizing: border-box; font: inherit; }
textarea { min-height: 8rem; }
.button { display: inline-block; padding: 0.75rem 1.25rem; background: #0b5cad; color: #fff; border-radius: 0.25rem; text-decoration: none; }
@media (max-width: 480px) { h1 { font-size: 1.5rem; } .button { display: block; text-align: center; } }
</style>
</head>
<body>
<nav><a href="/">Home</a> | <a href="/contact">Contact</a></nav>
<main>
${body}
</main>
</body>
</html>
`;
}

export function homePage(): string {
  return layout(
    'Home',
    '<h1>Welcome</h1>\n<p>This is a simple website. Use the contact page to send us a message.</p>\n<p><a class="button" href="/contact">Go to the contact page</a></p>',
  );
}

function fieldError(id: string, errors: FieldErrors, key: keyof FieldErrors): string {
  const text = errors[key];
  return text
    ? `<br><span class="error" id="${id}-error" role="alert">${escapeHtml(text)}</span>`
    : '';
}

export function contactPage(
  errors: FieldErrors = {},
  values: { name?: string; email?: string; message?: string } = {},
): string {
  const invalid = (key: keyof FieldErrors): string =>
    errors[key] ? ` aria-invalid="true" aria-describedby="${key}-error"` : '';
  return layout(
    'Contact',
    `<h1>Contact</h1>
<form method="post" action="/contact" novalidate>
<p><label>Name <input name="name" value="${escapeHtml(values.name ?? '')}"${invalid('name')}></label>${fieldError('name', errors, 'name')}</p>
<p><label>E-mail <input name="email" type="email" value="${escapeHtml(values.email ?? '')}"${invalid('email')}></label>${fieldError('email', errors, 'email')}</p>
<p><label>Message <textarea name="message"${invalid('message')}>${escapeHtml(values.message ?? '')}</textarea></label>${fieldError('message', errors, 'message')}</p>
<p><button type="submit">Send</button></p>
</form>`,
  );
}

export function thanksPage(): string {
  return layout('Thank you', '<h1>Thank you</h1>\n<p>Your message was saved.</p>');
}
