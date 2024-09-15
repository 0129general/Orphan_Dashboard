// server.js
const express = require("express");
const cors = require("cors");
// Load environment variables from .env file
const config = require("./utils/config");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();
const sheetRoutes = require("./routes/sheetRoutes");

app.use("/api/sheets", sheetRoutes);
// Use the separated route files
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes); // Or any other base path

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, role } = await loginUser(email, password);
    res.status(200).json({ token, role });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Register Route
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await registerUser(email, password, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to Verify JWT Token
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
app.get("/admin", authMiddleware, (req, res) => {
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
