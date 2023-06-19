const express = require("express");
const router = express.Router();
const books = require("./bookController.js");

// Add a book (Title, Author, Read/not read status, an ID)
router.post("/books/new", books.addBook);

// Remove books from the list
router.delete("/books/deleteall", books.deleteAllBooks);

// Edit book listings
router.put("/books/edit/:id", books.updateBook);

// Return book listings
router.get("/books", books.getBooks);

// Return books by ID
router.get("/books/:id", books.getBook);

// Delete books by ID
router.delete("/books/delete/:id", books.deleteBook);

module.exports = router;
