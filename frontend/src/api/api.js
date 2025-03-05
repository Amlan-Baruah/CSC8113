import axios from "axios";

// Backend microservices URLs
const USER_SERVICE_URL = "http://localhost:5002/api/users";
const CATALOG_SERVICE_URL = "http://localhost:5001/api/books";
const ORDER_SERVICE_URL = "http://localhost:5003/api/orders";

// User API
export const registerUser = (userData) => axios.post(`${USER_SERVICE_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${USER_SERVICE_URL}/login`, userData);
export const getUserProfile = (token) => axios.get(`${USER_SERVICE_URL}/profile`, {
  headers: { Authorization: `Bearer ${token}` }
});
export const updateUserProfile = (userData, token) => axios.put(
  `${USER_SERVICE_URL}/profile`, 
  userData, 
  { headers: { Authorization: `Bearer ${token}` } }
);


// Books API
export const fetchBooks = () => axios.get(`${CATALOG_SERVICE_URL}`);
export const fetchBookById = (bookId) => axios.get(`${CATALOG_SERVICE_URL}/${bookId}`);

// Orders API
export const placeOrder = (orderData, token) => axios.post(`${ORDER_SERVICE_URL}`, orderData, {
  headers: { Authorization: `Bearer ${token}` }
});
export const fetchUserOrders = (token) => axios.get(`${ORDER_SERVICE_URL}`, {
  headers: { Authorization: `Bearer ${token}` }
});
