const  Orphan  = require('../models/Orphan');
const  Donor  = require('../models/Donor');


exports.createOrphanDonor = async (req, res) => {
  try {
    const { donorInfo, ...orphanInfo } = req.body;
    
    const orphan = new Orphan(orphanInfo);
    const donor = new Donor(donorInfo);

    orphan.donor = donor._id;
    donor.orphan = orphan._id;

    await orphan.save();
    await donor.save();

    res.status(201).json({ orphan, donor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrphans = async (req, res) => {
  try {
    const orphans = await Orphan.find().populate('donor');
    res.json(orphans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrphan = async (req, res) => {
  try {
    const orphan = await Orphan.findById(req.params.id).populate('donor');
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });
    res.json(orphan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrphanDonor = async (req, res) => {
  try {
    const { donorInfo, ...orphanInfo } = req.body;
    
    const orphan = await Orphan.findByIdAndUpdate(req.params.id, orphanInfo, { new: true });
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    if (donorInfo && orphan.donor) {
      await Donor.findByIdAndUpdate(orphan.donor, donorInfo);
    }

    const updatedOrphan = await Orphan.findById(req.params.id).populate('donor');
    res.json(updatedOrphan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrphanDonor = async (req, res) => {
  try {
    const orphan = await Orphan.findById(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    if (orphan.donor) {
      await Donor.findByIdAndDelete(orphan.donor);
    }

    await Orphan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Orphan and associated donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};