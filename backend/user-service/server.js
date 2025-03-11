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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("👤 User Service Connected to MongoDB"))
.catch(err => console.log("Database connection error:", err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

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

const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => console.log(`👤 User Service running on port ${PORT}`));
