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
3. A page confirms that your message was saved. If something is missing, the form shows what to fix.

## Find the saved messages

Messages are saved in the file `data/messages.jsonl` inside the project folder, one message per line, with the name, e-mail, message and the time it was received. Open it with any text editor.

## Options

Set `PORT` to use another port than 3000, and `MESSAGES_FILE` to save messages in another file. For example: `PORT=8080 npm start`.
