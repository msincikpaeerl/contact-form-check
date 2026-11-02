import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const messagesFile = process.env.MESSAGES_FILE ?? 'data/messages.jsonl';

createApp({ messagesFile }).listen(port, () => {
  console.log(`Site running at http://localhost:${port}`);
  console.log(`Messages are saved in ${messagesFile}`);
});
