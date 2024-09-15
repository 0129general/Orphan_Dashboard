// routes/adminRoutes.js
const express = require("express");
const { verifyToken } = require("../userController");
const getUsers = require("../utils/getUsers"); // Assuming you create a separate function to get users

const router = express.Router();

// Middleware to verify the JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

// Protected Admin Route
router.get("/admin", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access forbidden" });
  }

  const users = getUsers();
  const userList = users.map((user) => ({
    email: user.email,
    role: user.role,
  }));
  res.status(200).json(userList);
});

module.exports = router;
