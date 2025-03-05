const Book = require("../models/bookModel");

// ✅ Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
};

// ✅ Get Book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};


// ✅ Add a new book
const addBook = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);  // ✅ Log request data

        const { title, author, description, price, category, image, stock } = req.body;

        if (!title || !author || !description || !price || !category || !image || stock === undefined) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const book = new Book({ title, author, description, price, category, image, stock });
        await book.save();
        res.status(201).json(book);

    } catch (error) {
        console.error("Error adding book:", error);  // ✅ Log the error
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

// ✅ Update an existing book
const updateBook = async (req, res) => {
    try {
        const { title, author, description, price, category, image, stock } = req.body;
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, description, price, category, image, stock },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};

// ✅ Decrease stock when order is placed
const decreaseStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        book.stock -= quantity;
        await book.save();

        res.json({ message: "Stock updated successfully", stock: book.stock });
    } catch (error) {
        console.error("❌ Error decreasing stock:", error);
        res.status(500).json({ message: "Error decreasing stock", error });
    }
};


// ✅ Delete a book
const mongoose = require("mongoose");

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate ObjectId format before deleting
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};


module.exports = { getBooks, getBookById, addBook, updateBook, decreaseStock, deleteBook };
