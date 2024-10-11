const express = require('express');
const router = express.Router();
const sponsorFamilyController = require('../controllers/sponsorFamilyController');

router.post('/', sponsorFamilyController.createSponsorFamily);
router.get('/', sponsorFamilyController.getAllSponsorFamilies);
router.get('/:id', sponsorFamilyController.getSponsorFamily);
router.patch('/:id', sponsorFamilyController.updateSponsorFamily);
router.delete('/:id', sponsorFamilyController.deleteSponsorFamily);
router.get('/:id/attachment', sponsorFamilyController.getAttachment);

module.exports = router;