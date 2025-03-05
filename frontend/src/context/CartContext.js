import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save cart to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (Prevent exceeding stock)
  const addToCart = (book) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item._id === book._id
          ? item.quantity < book.stock
            ? { ...item, quantity: item.quantity + 1 } // ✅ Increase if stock is available
            : item
          : item
      ).concat(!prevCart.some(item => item._id === book._id) ? { ...book, quantity: 1 } : []);
    });
  };

  // ✅ Remove one unit instead of deleting the whole book
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.map(item =>
      item._id === bookId
        ? item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } // ✅ Decrease quantity instead of removing
          : null
        : item
    ).filter(Boolean)); // ✅ Remove null values (if quantity reaches 0)
  };

  // ✅ Completely remove book from cart
  const deleteFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ✅ Ensure localStorage is also cleared
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
