The Student Finance Tracker is a no-cost, one-time purchase.The Student Finance Tracker is a single purchase, no cost.

## What I'm building
I'm working on a simple web application to assist students in monitoring their expenditures. It is possible to add what you have spent, search through it and get a quick overview of where your money has gone. There's no account or server, everything is saved in your browser! Working with plain HTML, CSS and JavaScript (no frameworks).

## What a record looks like
These will be included in each transaction that I save:

| Field | What it is |
|---|---|
| id | A unique code for the record, like `rec_0001` |
description | What the money was spent on, for example "Lunch at cafeteria" |
amount – how much it cost (up to 2 decimals) |
category | Food, Books, Transport and etc. |
The date when it occurred, written as `YYYY-MM-DD` |
createdAt: the time of the initial saving of the document |
The last time that I edited it |

These categories are: Food, Books, Transport, Entertainment, Fees and Other. The changes can be made in the Settings.

Settings will also be saved that allow me to spend a certain amount and use which currencies, and exchange rates I type in myself.

## The five sections
1. About: what the app does, and how to contact me (GitHub and email).
2. Dashboard: Total records, How much do you have spent, Top category, Small chart of "Last 7 days" and a message on the spending cap.
3. Records: everything in a table, becomes cards on a phone. Sort them, search them regular expression and edit or delete any of them.
Add / Edit: the form to enter a new transaction or edit an old one.
5. Settings: the cap, currencies, categories, and the JSON import and export.

How people move around: A navigation bar at the top of the page provides links to each section on the page; a skip link lets a keyboard user go directly to the main content.

## How it will look
I'm working to create designs for mobile devices and then refining with larger screen devices.

Phone (approx 360px): everything in 1 column, records displayed as cards. (see wireframe-mobile.jpg)![Mobile wireframe](wireframe-mobile.jpg.HEIC)
- Desktop (approx 1024px): more space, and the full records table is provided.(see wireframe-desktop.jpg) ![Desktop wireframe](wireframe-desktop.jpg.HEIC)
- **Breakpoints:** 360px, 768px and 1024px.

I will verify the input by:
The form will reject invalid data and display a clear error message, based on the regexp rules:
Description: cannot begin or end with a space.
Amount: A whole number or a number with a max of 2 decimal places.
The Date field should be formatted as YYYY-MM-DD.
- **Category:** letters, spaces and hyphens only.
Extra rule: a back-reference pattern that identifies duplicate words, such as "the the".

I will help to make it available to students by ensuring it is easily accessible.
I want the app to be usable by all – including those who use just a keyboard or screen reader.
- Appropriate page structure: header, navigation, main, sections and footer; with headings in logical sequence.
A Skip to content link at the top of the page.
- Labels of all inputs.
- An outline that is visible and indicates the location of the keyboard focus.
- Messages from error and status messages that screen readers announce.
- A friendly "over" and "under" message on the cap.
- Text colours that contrast well with their background.
The entire app can be operated without a mouse.