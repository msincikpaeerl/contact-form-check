# Getting started

How to run contact-form-check on your computer.

## What you need

[Node.js](https://nodejs.org) version 24 installed on the computer.

## Start the site

1. Open a terminal in the project folder.
2. Run `npm ci` once to install what the site needs.
3. Run `npm run build`, then `npm start`.
4. Open <http://localhost:3000> in your browser. You see the home page.

Stop the site with Ctrl+C in the terminal.

## The home page

The home page is what you see when you open the site's address. It shows:

- a title, **Welcome**, and a short text presenting the site;
- a blue button, **Go to the contact page**, that leads to the contact form (the **Contact** link at the top of every page does the same);
- the **Home** and **Contact** links at the top, to move between pages.

The page adapts to the screen: on a phone the text and the button fit the narrow screen, and on a desktop computer the content is centred and easy to read.

## Send a message

1. Click **Contact**.
2. Fill in your name, e-mail and message, then click **Send**.
3. A page confirms that your message was saved ("Your message was saved."). If a field is empty or the e-mail address is not valid, the form shows a message next to that field, keeps what you typed, and saves nothing.

## Find the saved messages

Messages are saved in the file `data/messages.jsonl` inside the project folder, on the computer running the site. The folder is created when the first message arrives, so it does not exist before that.

Each message is one line, and new messages are added at the end, so earlier ones are never lost. A line looks like this:

```
{"name":"Ann","email":"ann@example.com","message":"Hello","receivedAt":"2026-11-03T10:15:00.000Z"}
```

- `name`, `email` and `message` are what the visitor typed.
- `receivedAt` is the date and time the message was received (UTC).

To read the messages, open the file with any text editor (Notepad, TextEdit…). The folder is ignored by Git, so messages are never published with the code. If you set `MESSAGES_FILE` (see below), look in that file instead.

## Options

Set `PORT` to use another port than 3000, and `MESSAGES_FILE` to save messages in another file. For example: `PORT=8080 npm start`.
