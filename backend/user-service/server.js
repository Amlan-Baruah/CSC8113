const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");

dotenv.config();

// Force Node.js to prefer IPv4 when resolving DNS
dns.setDefaultResultOrder("ipv4first");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("👤 User Service Connected to MongoDB"))
.catch(err => console.log("Database connection error:", err));

// Import and use user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => console.log(`👤 User Service running on port ${PORT}`));
