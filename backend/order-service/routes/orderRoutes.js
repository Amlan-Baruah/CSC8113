const express = require("express");
const { 
    placeOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderToPaid, 
    deleteOrder
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
console.log("deleteOrder Function:", deleteOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
