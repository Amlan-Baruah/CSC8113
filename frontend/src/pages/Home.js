import { useState, useEffect } from "react";
import { fetchBooks } from "../api/api";
import BookCard from "../components/BookCard";

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks()
            .then(({ data }) => setBooks(data))
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📚 Available Books</h2>
            <div style={styles.bookGrid}>
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "30px",
        textAlign: "center",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    bookGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        justifyContent: "center",
    }
};

export default Home;
