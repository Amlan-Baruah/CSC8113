import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://csc-8113-bookstore.duckdns.org";

const USER_SERVICE_URL = `${BASE_URL}/user/api/users`;
const CATALOG_SERVICE_URL = `${BASE_URL}/catalog/api/books`;
const ORDER_SERVICE_URL = `${BASE_URL}/order/api/orders`;

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

export const fetchBooks = () => axios.get(`${CATALOG_SERVICE_URL}`);
export const fetchBookById = (bookId) => axios.get(`${CATALOG_SERVICE_URL}/${bookId}`);

export const placeOrder = (orderData, token) => axios.post(`${ORDER_SERVICE_URL}`, orderData, {
  headers: { Authorization: `Bearer ${token}` }
});
export const fetchUserOrders = (token) => axios.get(`${ORDER_SERVICE_URL}`, {
  headers: { Authorization: `Bearer ${token}` }
});
