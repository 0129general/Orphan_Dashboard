const express = require('express');
const router = express.Router();
const orphanDonorController = require('../controllers/orphanDonorController');

router.post('/', orphanDonorController.createOrphanDonor);
router.get('/', orphanDonorController.getAllOrphanDonors);
router.get('/:id', orphanDonorController.getOrphanDonor);
router.patch('/:id', orphanDonorController.updateOrphanDonor);
router.delete('/:id', orphanDonorController.deleteOrphanDonor);

module.exports = router;