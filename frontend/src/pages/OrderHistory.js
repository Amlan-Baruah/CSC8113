import React, { useEffect, useState, useContext } from "react";
import { fetchUserOrders } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        fetchUserOrders(localStorage.getItem("token"))
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Error fetching orders. Please try again.");
                setLoading(false);
            });
    }, [user, navigate]);

    if (loading) return <p>Loading your order history...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2>📜 Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div style={styles.ordersList}>
                    {orders.map(order => (
                        <div key={order._id} style={styles.orderCard}>
                            <h3>Order ID: {order._id}</h3>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                            <p><strong>Payment:</strong> {order.isPaid ? "Paid" : "Not Paid"}</p>
                            <div>
                                <h4>📚 Ordered Books:</h4>
                                {order.orderItems.map(item => (
                                    <p key={item.bookId}>📖 {item.quantity}x {item.title} - ${item.price}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: "40px", textAlign: "center" },
    ordersList: { marginTop: "20px" },
    orderCard: {
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "15px",
        backgroundColor: "#f9f9f9",
    },
    error: { color: "red", fontWeight: "bold" }
};

export default OrderHistory;
