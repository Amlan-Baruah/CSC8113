import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

const BASE_URL = "http://csc-8113-bookstore.duckdns.org/catalog/api/books";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log(`Fetching book from: ${BASE_URL}/${id}`);
                const response = await axios.get(`${BASE_URL}/${id}`);
                console.log("Book data received:", response.data);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("Failed to fetch book details. Check API connection.");
            }
        };

        fetchBook();
    }, [id]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
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
            <p><strong>Stock:</strong> {book.stock > 0 ? `${book.stock} left` : "Out of stock"}</p>

            <button 
                onClick={() => addToCart(book)} 
                style={styles.addToCartButton} 
                disabled={book.stock === 0} 
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
