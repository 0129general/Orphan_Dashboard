// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
// Load environment variables from .env file
const config = require("./utils/config");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();
const sheetRoutes = require("./routes/sheetRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/sheets", sheetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
