// routes/sheetRoutes.js
const express = require("express");
const sheetController = require("../controllers/sheetController");
const supervisorAuthMiddleware = require("../middleware/supervisoruAuth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
// router.get("/events",authMiddleware, sheetController.sheetEvents);
router.get("/headers", authMiddleware, sheetController.getHeaders);
router.get("/rows", authMiddleware, sheetController.getRows);
router.post("/row", supervisorAuthMiddleware, sheetController.addRow);
router.put("/row/:id", supervisorAuthMiddleware, sheetController.updateRow);
router.delete("/row/:id", supervisorAuthMiddleware, sheetController.deleteRow);

module.exports = router;
