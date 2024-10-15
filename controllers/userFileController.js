const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersFile = path.join(__dirname, "../users.json");

// Get all users
exports.getAllUsers = (req, res) => {
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    const users = JSON.parse(data);
    res.json(users);
  });
};

// Add a new user
exports.addUser = (req, res) => {
  const { email, password, role } = req.body;
  // console.log("body:", email, password);
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    // console.log("JsonFile:", data);
    const users = JSON.parse(data);
    const user = users.find((user) => user.email === email);
    if (user)
      return res
        .status(404)
        .json({ message: "The user is already registered" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    let userId = 0;
    if (users) {
      userId = String(1 + Number(users[users?.length - 1].id));
    }
    const newUser = {
      id: userId,
      email,
      password: hashedPassword,
      role: role,
    };
    users.push(newUser);
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving user" });
      const token = jwt.sign(
        { id: newUser.id, role: role },
        process.env.JWT_SECRET,
        {
          expiresIn: "365 days",
        }
      );
      res.json({
        message: "User added successfully",
        user: newUser,
        token: token,
      });
    });
  });
};

// Update user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  // console.log("userId:", userId, updatedData);
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    let users = JSON.parse(data);
    // console.log("updateUsers:", users);
    const userIndex = users.findIndex((user) => user.id == userId);
    // console.log("userIndex:", userIndex);
    if (userIndex === -1)
      return res.status(404).json({ message: "User not found" });
    if (updatedData?.password) {
      const hashedPassword = bcrypt.hashSync(updatedData.password, 8);
      updatedData.password = hashedPassword;
      // console.log("hash:", updatedData.password);
    }
    users[userIndex] = { ...users[userIndex], ...updatedData };

    // users.push(newUser);
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving user" });
      const token = jwt.sign(
        { id: userIndex, role: users[userIndex].role },
        process.env.JWT_SECRET,
        {
          expiresIn: "365 days",
        }
      );
      res.json({
        message: "User updated successfully",
        user: users[userIndex],
        token: token,
      });
    });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    let users = JSON.parse(data);
    // console.log("users:", users);
    updatedusers = users.filter((user) => user.id != userId);
    // console.log("deleteUser:", userId, updatedusers);

    fs.writeFile(usersFile, JSON.stringify(updatedusers, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error deleting user" });
      res.json({ message: "User deleted successfully", id: userId });
    });
  });
};
