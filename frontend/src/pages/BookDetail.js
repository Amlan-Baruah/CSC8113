import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";  // ✅ Import CartContext

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { addToCart } = useContext(CartContext);  // ✅ Get addToCart function

    useEffect(() => {
        axios.get(`http://localhost:5001/api/books/${id}`)
            .then(response => setBook(response.data))
            .catch(error => console.error("Error fetching book details:", error));
    }, [id]);

    if (!book) return <p>Loading book details...</p>;

    return (
        <div style={styles.container}>
            <h2>{book.title}</h2>
            <img 
                src={book.image || "https://via.placeholder.com/300"} 
                alt={book.title} 
                style={styles.image}
            />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Stock:</strong> {book.stock > 0 ? `${book.stock} left` : "Out of stock ❌"}</p>  {/* ✅ Show stock quantity */}
            
            {/* Disable Add to Cart if stock is 0 */}
            <button 
                onClick={() => addToCart(book)} 
                style={styles.addToCartButton} 
                disabled={book.stock === 0}  // ✅ Disable if out of stock
            >
                {book.stock > 0 ? "🛒 Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
};

const styles = {
    container: { padding: "40px", textAlign: "center" },
    image: { width: "300px", height: "400px", objectFit: "cover", borderRadius: "10px", marginBottom: "20px" },
    addToCartButton: { 
        backgroundColor: "#28a745", 
        color: "white", 
        padding: "10px 20px", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer", 
        fontSize: "16px" 
    }
};

export default BookDetail;
