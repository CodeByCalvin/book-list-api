const createError = require("http-errors");
const Book = require("./bookModel");

// Return book listings
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Add a book (Title, Author, Read/not read status, an ID)
exports.addBook = async (req, res, next) => {
  if (!req.body.title && !req.body.author && !req.body.readStatus) {
    return next(createError(400, "A title, author and readStatus is required"));
  }
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      readStatus: req.body.readStatus,
    });
    await book.save();
    res.send({ message: `${book.title} has been added` });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Remove all books from the list
exports.deleteAllBooks = async (req, res, next) => {
  try {
    await Book.deleteMany({});
    res.send({ message: "All the books have been deleted" });
  } catch (error) {
    return next(createError(400, "Error deleting the books", error));
  }
};

// Edit book listings
exports.updateBook = async (req, res, next) => {
  if (!req.body.title && !req.body.author && !req.body.readStatus) {
    return next(createError(400, "Book details are required"));
  }

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          readStatus: req.body.readStatus,
        },
      },
      { new: true }
    );

    if (!book) {
      return next(createError(404, "Book not found"));
    }

    res.send({ message: `${book.title} (ID: ${book.id}) has been updated` });
  } catch (error) {
    return next(createError(500, "Error updating the book", error));
  }
};

// Return book by ID
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.send(book);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Delete book by ID
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.send({ message: `${book.title} (ID: ${book.id}) has been deleted` });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
