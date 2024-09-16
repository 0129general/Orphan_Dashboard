const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersFile = path.join(__dirname, "../users.json");

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("body:", req.body);

  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    const users = JSON.parse(data);
    const user = users.find((user) => user.email === email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({ auth: true, token });
  });
};

// Register
exports.register = (req, res) => {
  const { email, password, role } = req.body;
  console.log("body:", email, password);
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading users" });
    console.log("JsonFile:", data);
    const users = JSON.parse(data);
    const user = users.find((user) => user.email === email);
    if (user)
      return res
        .status(404)
        .json({ message: "The user is already registered" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    let userId = 0;
    if (users) {
      userId = users[users?.length - 1].id+1;
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
          expiresIn: '365 days',
        }
      );
      res.status(201).json({ auth: true, token });
    });
  });
};
