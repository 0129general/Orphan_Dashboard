const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.post("/users", authMiddleware, addUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
