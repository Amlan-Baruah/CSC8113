const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(express.json());
app.use(cors());

console.log("🔍 MONGO_URI Loaded:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🛒 Order Service Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.get("/ready", (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).send("Ready");
    } else {
        res.status(503).send("Not Ready");
    }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, "0.0.0.0", () => console.log(`🛒 Order Service running on port ${PORT}`));
