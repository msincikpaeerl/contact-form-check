import express from 'express';
import { contactPage, homePage, thanksPage } from './pages.js';
import { saveMessage } from './storage.js';
import { validateContact } from './validation.js';

export interface AppOptions {
  /** File where contact form messages are saved. */
  messagesFile: string;
}

export function createApp(options: AppOptions): express.Express {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));

  app.get('/', (_req, res) => {
    res.type('html').send(homePage());
  });

  app.get('/contact', (_req, res) => {
    res.type('html').send(contactPage());
  });

  app.post('/contact', async (req, res, next) => {
    try {
      const result = validateContact(req.body);
      if (!result.ok) {
        res
          .status(400)
          .type('html')
          .send(contactPage(result.errors, req.body ?? {}));
        return;
      }
      await saveMessage(options.messagesFile, {
        ...result.value,
        receivedAt: new Date().toISOString(),
      });
      res.status(201).type('html').send(thanksPage());
    } catch (error) {
      next(error);
    }
  });

  return app;
}
