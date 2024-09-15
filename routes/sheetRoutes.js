// routes/sheetRoutes.js
const express = require("express");
const sheetController = require("../controllers/sheetController");

const router = express.Router();

router.get("/events", sheetController.sheetEvents);
router.get("/headers", sheetController.getHeaders);
router.get("/rows", sheetController.getRows);
router.post("/row", sheetController.addRow);
router.put("/row/:id", sheetController.updateRow);
router.delete("/row/:id", sheetController.deleteRow);

module.exports = router;
