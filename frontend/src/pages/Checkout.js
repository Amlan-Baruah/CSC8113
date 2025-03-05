import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CartContext from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Form Data for Shipping & Payment
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [error, setError] = useState(null);

  const handleOrderPlacement = async () => {
    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          bookId: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress,
        paymentMethod,
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      await placeOrder(orderData, localStorage.getItem("token"));
      clearCart(); // ✅ Empty the cart after order
      navigate("/order-success"); // ✅ Redirect to confirmation page
    } catch (err) {
      setError("Error placing order. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>
      {error && <p style={styles.error}>{error}</p>}

      {/* Shipping Address Input */}
      <input
        type="text"
        placeholder="Enter Shipping Address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        style={styles.input}
      />

      {/* Payment Method Dropdown */}
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={styles.input}>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
      </select>

      <h3>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>

      <button onClick={handleOrderPlacement} style={styles.button}>Place Order</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "40px" },
  input: { padding: "10px", margin: "10px", width: "250px" },
  button: { padding: "10px 15px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" },
  error: { color: "red", fontWeight: "bold" }
};

export default Checkout;
