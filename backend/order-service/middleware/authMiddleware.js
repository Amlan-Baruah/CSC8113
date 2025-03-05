const jwt = require("jsonwebtoken");
const User = require("../models/orderModels"); // Ensure correct path to user model

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // ✅ Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("🔹 Decoded token:", decoded);

            // ✅ Attach user to request
            req.user = {
                _id: decoded.id,
                name: decoded.name,
                email: decoded.email
            };
            console.log("✅ req.user:", req.user);

            next();
        } catch (error) {
            console.error("❌ Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        console.error("❌ No token provided");
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
