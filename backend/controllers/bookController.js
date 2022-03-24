const asyncHandler = require("express-async-handler");

const Book = require("../models/BookModel");
const User = require("../models/userModel");
//desc Get Books
// @route  GET /api/books
// @access private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user.id });
  res.status(200).json(books);
});

//desc Set Book
// @route  POST /api/books
// @access private
const setBook = asyncHandler(async (req, res) => {
  if (!req.body.book_id) {
    res.status(400);
    throw new Error("Please add a bookID field");
  }

  const book = await Book.create({
    book_id: req.body.book_id,
    title: req.body.title,
    author: req.body.author,
    user: req.user.id,
  });
  res.status(200).json(book);
});

//desc Update Book
// @route  PUT /api/books/:id
// @access private
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBook);
});

//desc delete Goal
// @route  DELETE /api/goals/:id
// @access private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await book.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
};
