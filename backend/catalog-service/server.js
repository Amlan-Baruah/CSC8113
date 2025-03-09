const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const app = express();
app.use(express.json());
app.use(cors());

console.log("🔍 MONGO_URI Loaded:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("📚 Catalog Service Connected to MongoDB"))
  .catch(err => {
    console.error("Database connection error:", err);
  });

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Catalog Service running on port ${PORT}`));
