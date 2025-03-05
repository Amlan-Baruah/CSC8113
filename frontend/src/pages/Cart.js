import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const Cart = () => {
    const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(CartContext);

    return (
        <div style={styles.container}>
            <h2>🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((book) => (
                        <div key={book._id} style={styles.cartItem}>
                            <img src={book.image || "https://via.placeholder.com/100"} alt={book.title} style={styles.image} />
                            <div style={styles.details}>
                                <h3>{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Price:</strong> ${book.price}</p>
                                <p><strong>Stock Available:</strong> {book.stock}</p> {/* ✅ Show stock available */}

                                {/* Quantity Controls */}
                                <div style={styles.quantityControl}>
                                    <button onClick={() => removeFromCart(book._id)} style={styles.button}>➖</button>
                                    <span style={styles.quantity}>{book.quantity}</span>
                                    <button 
                                        onClick={() => book.quantity < book.stock && addToCart(book)}
                                        style={styles.button}
                                        disabled={book.quantity >= book.stock} // ✅ Disable if stock limit reached
                                    >
                                        ➕
                                    </button>
                                </div>

                                <button onClick={() => deleteFromCart(book._id)} style={styles.deleteButton}>🗑 Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Checkout Button */}
                    <div style={styles.checkoutContainer}>
                        <h3>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
                        <Link to="/checkout">
                            <button style={styles.checkoutButton}>Proceed to Checkout</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: { padding: "20px", textAlign: "center" },
    cartItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px",
        borderBottom: "1px solid #ddd",
    },
    image: { width: "100px", height: "150px", objectFit: "cover", borderRadius: "5px" },
    details: { flex: 1, marginLeft: "15px", textAlign: "left" },
    quantityControl: { display: "flex", alignItems: "center", gap: "10px" },
    quantity: { fontSize: "18px", fontWeight: "bold" },
    button: { padding: "5px 10px", fontSize: "16px", cursor: "pointer" },
    deleteButton: { marginTop: "10px", padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" },
    
    // ✅ New Checkout Button Styling
    checkoutContainer: { marginTop: "20px", textAlign: "center" },
    checkoutButton: { 
        padding: "10px 15px", 
        backgroundColor: "#28a745", 
        color: "white", 
        border: "none", 
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "5px", 
        cursor: "pointer"
    },
};

export default Cart;
