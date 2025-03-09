import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import { AuthProvider } from "./context/AuthContext";  
import { CartProvider } from "./context/CartContext";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderHistory />} />  {/*New Route */}
            <Route path="/profile" element={<Profile />} />  {/*New Profile Route */}
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
