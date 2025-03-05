const express = require("express");
const { getBooks, getBookById, addBook, updateBook, decreaseStock, deleteBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);  // ✅ Get all books
router.get("/:id", getBookById);  // ✅ Get book by ID
router.post("/", addBook);  // ✅ Add a new book
router.put("/:id", updateBook);  // ✅ Update book by ID
router.put("/:id/decreaseStock", decreaseStock);  // ✅ Decrease stock by ID
router.delete("/:id", deleteBook);  // ✅ Delete book by ID


module.exports = router;
