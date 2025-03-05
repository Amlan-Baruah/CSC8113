import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CartContext from "../context/CartContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.logo}>📖 Bookstore</Link>
            
            <div style={styles.navLinks}>
                <Link to="/cart" style={styles.cartButton}>
                    🛒 Cart ({cart.length})
                </Link>

                {user ? (
                    <>
                        <span style={styles.user}>👤 {user.name}</span>
                        <Link to="/profile" style={styles.profileButton}>⚙ Profile</Link> {/* ✅ New Profile Link */}
                        <Link to="/orders" style={styles.orderButton}>📜 Orders</Link>
                        <button style={styles.button} onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.registerButton}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#007BFF",
        color: "white",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "white",
        textDecoration: "none",
    },
    navLinks: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    cartButton: {
        backgroundColor: "#ffcc00",
        color: "black",
        padding: "8px 15px",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
    },
    user: {
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "10px",
    },
    profileButton: {  // ✅ New Style for Profile Button
        backgroundColor: "white",
        color: "#007BFF",
        padding: "8px 12px",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
    },
    orderButton: {  // ✅ Style for Orders Button
        backgroundColor: "white",
        color: "#007BFF",
        padding: "8px 12px",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
    },
    registerButton: {
        backgroundColor: "white",
        color: "#007BFF",
        padding: "8px 12px",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "white",
        color: "#007BFF",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
    }
};

export default Navbar;
