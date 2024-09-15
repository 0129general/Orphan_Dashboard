// userController.js
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const USERS_FILE_PATH = path.join(__dirname, "users.json");
const SECRET_KEY = "your_jwt_secret_key";

// Helper function to read users from the JSON file
const getUsers = () => {
  const data = fs.readFileSync(USERS_FILE_PATH);
  return JSON.parse(data);
};

// Helper function to write users to the JSON file
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
};

// Register a new user
const registerUser = async (email, password, role) => {
  const users = getUsers();
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword, role };
  users.push(newUser);

  saveUsers(users);
  return { message: "User registered successfully" };
};

// Login user and return JWT token
const loginUser = async (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return { token, role: user.role };
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
