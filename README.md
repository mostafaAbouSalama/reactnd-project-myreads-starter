# MyReads Project

## Introduction

This project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

### App Functionality

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
1. Currently Reading
2. Want to Read
3. Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The default value for the control should always be the current shelf the book is in.
The main page also has a link to a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

When a book is on a bookshelf, it has the same state on both the main application page and the search page.

The search page also has a link which leads back to the main page.

When you navigate back to the main page from the search page, you instantly see all of the selections you made on the search page in your library.

## Installation

1. Clone the repository to your local machine.
2. Open your Git Bash interface in the cloned project directory.
3. run `node -v` and `npm -v` to ensure you have node.js and npm installed.
4. run `npm install` to install all project dependencies.
5. run `npm start` to start the server. This will automatically open a new tab in your default browser and load the main application page to it. 
