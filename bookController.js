const createError = require("http-errors");

let books = [];

// Add a book (Title, Author, Read/not read status, an ID)
exports.addBook = (req, res) => {
  books.push({
    title: req.body.title,
    author: req.body.author,
    readStatus: req.body.readStatus,
    id: new Date().getTime(),
  });
  res.send({ message: `${req.body.title} has been added` });
};

// Remove all books from the list
exports.deleteAllBooks = (req, res, next) => {
  books = [];
  res.send({ message: `All books have been deleted` });
};

// Edit book listings
// BUG
exports.updateBook = (req, res, next) => {
  if (!req.body.title && !req.body.author && !req.body.readStatus) {
    return next(createError(404, "Book details are required"));
  }

  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return next(createError(404, "No books found"));
  }

  if (req.body.title) book.title = req.body.title;
  if (req.body.author) book.author = req.body.author;
  if (req.body.readStatus) book.readStatus = req.body.readStatus;

  res.send({ message: `${book.title} (ID: ${book.id}) has been updated` });
};

// Return book listings
exports.getBooks = (req, res, next) => {
  if (books.length === 0) {
    return next(createError(404, "No books found"));
  }
  res.send(books);
};

// Return books by ID
exports.getBook = (req, res, next) => {
  const book = books.find((book) => book.id === req.params.id);
  if (!book) {
    return next(createError(404, "Book not found"));
  }
  res.send(book);
};

// Delete books by ID
exports.deleteBook = (req, res, next) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return next(createError(404, "Book not found"));
  }
  res.send({ message: `${book.title} (ID: ${book.id}) has been deleted` });
};
