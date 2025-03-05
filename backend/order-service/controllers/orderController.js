const axios = require("axios"); // ✅ Import axios
const Order = require("../models/orderModels");


const placeOrder = async (req, res) => {
    try {
        console.log("🔹 req.user:", req.user);  // ✅ Debugging log

        // 🔹 Ensure we're using the correct user ID field
        const userId = req.user._id || req.user.id;  

        if (!userId) {
            console.error("❌ User is missing in request");
            return res.status(401).json({ message: "Not authorized, no user attached." });
        }

        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }
        
        // ✅ Step 1: Validate stock before placing an order
        for (const item of orderItems) {
            if (!item.bookId) {  
                console.error("❌ Missing bookId in order item:", item);
                return res.status(400).json({ message: "Each order item must include a valid bookId." });
            }
        
            try {
                const bookResponse = await axios.get(`http://localhost:5001/api/books/${item.bookId}`);
                const book = bookResponse.data;

                if (!book) {
                    return res.status(404).json({ message: `Book with ID ${item.bookId} not found.` });
                }

                // ❌ Check stock availability
                if (book.stock < item.quantity) {
                    console.error(`❌ Not enough stock for book ${book.title}. Available: ${book.stock}, Requested: ${item.quantity}`);
                    return res.status(400).json({ 
                        message: `Not enough stock for ${book.title}. Available: ${book.stock}, Requested: ${item.quantity}`
                    });
                }
            } catch (error) {
                console.error(`❌ Error fetching book ${item.bookId}:`, error);
                return res.status(500).json({ message: `Error verifying book ${item.bookId}` });
            }
        }        
        
        // ✅ Step 2: Reduce stock in BookService
        for (const item of orderItems) {
            await axios.put(`http://localhost:5001/api/books/${item.bookId}/decreaseStock`, {
                quantity: item.quantity
            });
        }

        // ✅ Step 3: Save Order in Database
        const order = new Order({
            user: userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();
        console.log("✅ Order Created:", createdOrder);  // ✅ Debugging log

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("❌ Order placement failed:", error);
        res.status(500).json({ message: "Error placing order", error });
    }
};



// ✅ Get All Orders for a User (GET /api/orders)
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;  

        if (!userId) {
            return res.status(401).json({ message: "Not authorized, no user attached." });
        }

        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// ✅ Get Single Order (GET /api/orders/:id)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to view this order" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};

// ✅ Update Order to Paid (PUT /api/orders/:id/pay)
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};

const deleteOrder = async (req, res) => {
    try {
        console.log("🛑 Deleting Order: ", req.params.id);

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.deleteOne();  // ✅ Use deleteOne() instead of remove()
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ message: "Error deleting order", error });
    }
};

module.exports = { 
    placeOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderToPaid, 
    deleteOrder  // ✅ Ensure this is correctly exported
};
