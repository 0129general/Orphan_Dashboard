const express = require('express');
const router = express.Router();
const orphanDonorController = require('../controllers/orphanDonorController');

router.post('/', orphanDonorController.createOrphanDonor);
router.get('/', orphanDonorController.getAllOrphans);
router.get('/:id', orphanDonorController.getOrphan);
router.patch('/:id', orphanDonorController.updateOrphanDonor);
router.delete('/:id', orphanDonorController.deleteOrphanDonor);

module.exports = router;