const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("body:", req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "365 days",
      }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      auth: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log("body:", email, password);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The user is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "365 days",
      }
    );

    res.status(201).json({
      auth: true,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Error during registration", error: error.message });
  }
};
