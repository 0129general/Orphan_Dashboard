const express = require("express");
const router = express.Router();
const orphanDonorController = require("../controllers/orphanDonorController");

// OrphanDonor routes
router.post("/", orphanDonorController.createOrphanDonor);
router.get("/", orphanDonorController.getAllOrphanDonors);
router.get("/:id", orphanDonorController.getOrphanDonor);
router.put("/:id", orphanDonorController.updateOrphanDonor);
router.delete("/:id", orphanDonorController.deleteOrphanDonor);

// Attachment route (previously in sponsorFamilyRoutes)
router.get("/:id/attachment", orphanDonorController.getAttachment);

module.exports = router;
