# Student Finance Tracker

# Overview

Student Finance Tracker is a responsible web application designed to help student record and manage their spending. It allows users to add, adit, delete, search, and sort transactions, while viewing spending summaries on a dashboard.

# Live Demo

https://kayitarelibery.github.io/student-finance-tracker/

# Features

- Add, edit, and delete transactions.
- Validate transaction input using regular expressions and other validation rules.
- Search descriptions and categories using regular expressions.
- Sort transactions by date, description, and amount.
- View total spending, transaction count, top spending category, and spending over the last seven days.
- Set a spending cap and view the remaining budget.
- Save transactions and settings in browser local storage.
- Export transactions to JSON and import valid JSON backups
- Choose a currency display setting.
- Use a responsible layout designed for desktop and mobile screens
- Navigate the application with keyboard controls and accessible labels.

# Technologies

- HTML5
- CSS3
- Vanilla Javascript (ES modules)
- Browser localStorage
- JSON

# Project Structure

- index.html = application structure
- styles/main.css = layout and responsible styling
- scripts/validators.js = input validation
- scripts/form.js = transaction form and editing
- scripts/records.js = displaying, searching, sorting and managing records
- scripts/dashboard.js = dashboard calculations and spending cap
- scripts/dashboard.js = dashboard calculations and spending cap
- scripts/storage.js = saving and loading transactions
- scripts/backups.js = JSON import and export
- scripts/settings.js = currency settings
- tests.html = validation tests
- seed.json = sample transactions
- docs/ = project specifications and wireframes

# How to Use

1. Open the live demo or run the project locally.
2. Add a transction by entering its description, amount, category, and date.
3. Use the transaction table to edit or delete records.
4. Search using a regular expression and select a sorting option.
5. Review spending summaries on the dashboard.
6. Set a spending cap and select a display currency.
7. Export a JSON backup or import a valid JSON file.

# Running Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Run the project with a local development server, such as Live Server.
4. Open index.html through that server

# Testing

The application was tested manually for:

- Adding, editing, and deleting transactions.
- Input validation and regular-expression search.
- Sorting and dashboard calculations.
- Persistence after refreshing the page.
- JSON export and import.
- Currency display settings.
- Keyboard navigation and responsible layout.

# Data and Privacy

Transaction data is stored in the browser's local storage.xport important data regularly as a backup. Imported JSON files should contain valid transaction records.

## Status

Work in progress, built milestons by milestone (M1 TO M7)

## Demo Video

https://youtu.be/DLzEHGdOe-E

# Author

Kayitarelibery