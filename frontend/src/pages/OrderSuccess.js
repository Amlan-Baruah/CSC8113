import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div style={styles.container}>
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for shopping with us. You will receive an order confirmation email shortly.</p>
      <Link to="/" style={styles.button}>Return to Home</Link>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "40px" },
  button: { padding: "10px 15px", backgroundColor: "#007BFF", color: "white", textDecoration: "none" }
};

export default OrderSuccess;
