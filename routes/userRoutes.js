const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const adminAuthMiddleware = require("../middleware/adminAuth");
const router = express.Router();

router.get("/users", adminAuthMiddleware, getAllUsers);
router.post("/users", adminAuthMiddleware, addUser);
router.put("/users/:id", adminAuthMiddleware, updateUser);
router.delete("/users/:id", adminAuthMiddleware, deleteUser);

module.exports = router;
