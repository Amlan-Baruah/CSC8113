import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item._id === book._id
          ? item.quantity < book.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
          : item
      ).concat(!prevCart.some(item => item._id === book._id) ? { ...book, quantity: 1 } : []);
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.map(item =>
      item._id === bookId
        ? item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : null
        : item
    ).filter(Boolean));
  };

  const deleteFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
