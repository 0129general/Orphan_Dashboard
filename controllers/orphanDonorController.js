const OrphanDonor = require('../models/OrphanDonor');
const SponsorFamily = require('../models/SponsorFamily');

exports.createOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = new OrphanDonor(req.body);
    await orphanDonor.save();
    res.status(201).json(orphanDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrphanDonors = async (req, res) => {
  try {
    const orphanDonors = await OrphanDonor.find().populate('sponsorFamily');
    res.json(orphanDonors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id).populate('sponsorFamily');
    if (!orphanDonor) return res.status(404).json({ message: 'Orphan-Donor not found' });
    res.json(orphanDonor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orphanDonor) return res.status(404).json({ message: 'Orphan-Donor not found' });

    const updatedOrphanDonor = await OrphanDonor.findById(req.params.id).populate('sponsorFamily');
    res.json(updatedOrphanDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id);
    if (!orphanDonor) return res.status(404).json({ message: 'Orphan-Donor not found' });

    // Delete associated SponsorFamily if it exists
    if (orphanDonor.sponsorFamily) {
      await SponsorFamily.findByIdAndDelete(orphanDonor.sponsorFamily);
    }

    await OrphanDonor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Orphan-Donor and associated Sponsor Family (if any) deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};