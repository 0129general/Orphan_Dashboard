// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../userController");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, role } = await loginUser(email, password);
    res.status(200).json({ token, role });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await registerUser(email, password, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
