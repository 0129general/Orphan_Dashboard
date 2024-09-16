const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../users.json');

// Get all users
exports.getAllUsers = (req, res) => {
  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading users' });
    const users = JSON.parse(data);
    res.json(users);
  });
};

// Add a new user
exports.addUser = (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading users' });
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error saving user' });
      res.status(201).json({ message: 'User added successfully', user: newUser });
    });
  });
};

// Update user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading users' });
    let users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users[userIndex] = { ...users[userIndex], ...updatedData };
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error updating user' });
      res.json({ message: 'User updated successfully', user: users[userIndex] });
    });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading users' });
    let users = JSON.parse(data);
    users = users.filter((user) => user.id !== userId);

    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error deleting user' });
      res.json({ message: 'User deleted successfully' });
    });
  });
};
