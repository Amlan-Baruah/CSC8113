import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>

            {/*Link to Book Details Page */}
            <Link to={`/book/${book._id}`}>
                <button className="details-btn">View Details</button>
            </Link>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px",
        boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "220px",
        transition: "transform 0.2s",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
    },
    button: {
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
    }
};

export default BookCard;
