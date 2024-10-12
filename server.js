// server.js
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const googleSheetsconfig = require("./config/googlesheets");
// Load environment variables from .env file
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// file upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// require('dotenv').config();
const sheetRoutes = require("./routes/sheetRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// orphan system
const orphanDonorRoutes = require('./routes/orphanDonorRoutes');
const sponsorFamilyRoutes = require('./routes/sponsorFamilyRoutes');

app.use("/api/sheets", sheetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
// orphan system
app.use("/api/orphanDonors", orphanDonorRoutes);
app.use("/api/sponsorFamilies", sponsorFamilyRoutes);
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
