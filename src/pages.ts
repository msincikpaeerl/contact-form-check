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
    '<h1>Welcome</h1>\n<p>This is a simple website. Use the contact page to send us a message.</p>',
  );
}

export function contactPage(
  errors: string[] = [],
  values: { name?: string; email?: string; message?: string } = {},
): string {
  const errorList =
    errors.length > 0
      ? `<ul class="errors">${errors.map((e) => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`
      : '';
  return layout(
    'Contact',
    `<h1>Contact</h1>
${errorList}
<form method="post" action="/contact">
<p><label>Name <input name="name" value="${escapeHtml(values.name ?? '')}" required></label></p>
<p><label>E-mail <input name="email" type="email" value="${escapeHtml(values.email ?? '')}" required></label></p>
<p><label>Message <textarea name="message" required>${escapeHtml(values.message ?? '')}</textarea></label></p>
<p><button type="submit">Send</button></p>
</form>`,
  );
}

export function thanksPage(): string {
  return layout('Thank you', '<h1>Thank you</h1>\n<p>Your message was saved.</p>');
}
