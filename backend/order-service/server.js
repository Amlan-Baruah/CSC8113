const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🛒 Order Service Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🛒 Order Service running on port ${PORT}`));
