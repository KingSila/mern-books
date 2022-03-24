const express = require("express");
const router = express.Router();

const {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBooks).post(protect, setBook);
router.route("/:id").put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;
