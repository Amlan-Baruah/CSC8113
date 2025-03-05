const express = require("express");
const { 
    placeOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderToPaid, 
    deleteOrder  // ✅ Ensure this is imported correctly
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Define Routes
router.post("/", protect, placeOrder);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
console.log("deleteOrder Function:", deleteOrder);  // ✅ Debugging step
router.delete("/:id", protect, deleteOrder); // ✅ Ensure deleteOrder is used

module.exports = router;
