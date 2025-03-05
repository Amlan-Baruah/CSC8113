const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },  // ✅ Ensure this exists
    price: { type: Number, required: true },
    category: { type: String, required: true },  // ✅ Ensure this exists
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 5 }  // ✅ Ensure this exists
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
