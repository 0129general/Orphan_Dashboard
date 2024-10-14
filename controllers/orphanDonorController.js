const OrphanDonor = require("../models/OrphanDonor");
const SponsorFamily = require("../models/SponsorFamily");

exports.createOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = new OrphanDonor(req.body);
    console.log("orphanDonor:", orphanDonor);
    await orphanDonor.save();
    res.status(201).json(orphanDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrphanDonors = async (req, res) => {
  try {
    const orphanDonors = await OrphanDonor.find().populate("sponsorFamily");
    console.log("orphanDonors:", orphanDonors);
    res.json(orphanDonors);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id).populate(
      "sponsorFamily"
    );
    if (!orphanDonor)
      return res.status(404).json({ message: "Orphan-Donor not found" });
    res.json(orphanDonor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrphanDonor = async (req, res) => {
  try {
    console.log("id:", req.params.id);
    console.log("body:", req.body);
    const orphanDonor = await OrphanDonor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!orphanDonor)
      return res.status(404).json({ message: "Orphan-Donor not found" });

    const updatedOrphanDonor = await OrphanDonor.findById(
      req.params.id
    ).populate("sponsorFamily");
    console.log("updatedOrphanDonor:", updatedOrphanDonor);
    res.json(updatedOrphanDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id);
    if (!orphanDonor)
      return res.status(404).json({ message: "Orphan-Donor not found" });

    // Delete associated SponsorFamily if it exists
    if (orphanDonor.sponsorFamily) {
      await SponsorFamily.findByIdAndDelete(orphanDonor.sponsorFamily);
    }

    await OrphanDonor.findByIdAndDelete(req.params.id);
    res.json({
      data: req.params.id,
      message:
        "Orphan-Donor and associated Sponsor Family (if any) deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
