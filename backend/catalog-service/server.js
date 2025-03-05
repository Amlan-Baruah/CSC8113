const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("📚 Catalog Service Connected to MongoDB"))
.catch(err => console.log("Database connection error:", err));

// Import and use book routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`📚 Catalog Service running on port ${PORT}`));
