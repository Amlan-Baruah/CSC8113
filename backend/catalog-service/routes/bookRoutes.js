const express = require("express");
const { getBooks, getBookById, addBook, updateBook, decreaseStock, deleteBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.put("/:id/decreaseStock", decreaseStock);
router.delete("/:id", deleteBook);


module.exports = router;
