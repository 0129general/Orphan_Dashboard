const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const SponsorFamily = require("../models/SponsorFamily");
const OrphanDonor = require("../models/OrphanDonor");

exports.createSponsorFamily = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    try {
      const sponsorFamily = new SponsorFamily({
        ...fields,
        attachment: files.attachment ? files.attachment.path : undefined,
      });

      await sponsorFamily.save();

      if (fields.orphanDonorId) {
        const orphanDonor = await OrphanDonor.findById(fields.orphanDonorId);
        if (orphanDonor) {
          orphanDonor.sponsorFamily = sponsorFamily._id;
          await orphanDonor.save();
        }
      }

      res.status(201).json(sponsorFamily);
    } catch (error) {
      if (files.attachment) {
        fs.unlinkSync(files.attachment.path);
      }
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllSponsorFamilies = async (req, res) => {
  try {
    const sponsorFamilies = await SponsorFamily.find().populate("orphanDonor");
    res.json(sponsorFamilies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSponsorFamily = async (req, res) => {
  try {
    const sponsorFamily = await SponsorFamily.findById(req.params.id).populate(
      "orphanDonor"
    );
    if (!sponsorFamily)
      return res.status(404).json({ message: "Sponsor family not found" });
    res.json(sponsorFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSponsorFamily = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    try {
      const sponsorFamily = await SponsorFamily.findById(req.params.id);
      if (!sponsorFamily)
        return res.status(404).json({ message: "Sponsor family not found" });

      if (files.attachment) {
        if (sponsorFamily.attachment) {
          fs.unlinkSync(sponsorFamily.attachment);
        }
        sponsorFamily.attachment = files.attachment.path;
      }

      Object.assign(sponsorFamily, fields);

      await sponsorFamily.save();

      // Update orphanDonor reference if changed
      if (
        fields.orphanDonorId &&
        fields.orphanDonorId !== sponsorFamily.orphanDonor.toString()
      ) {
        // Remove reference from old orphanDonor
        if (sponsorFamily.orphanDonor) {
          await OrphanDonor.findByIdAndUpdate(sponsorFamily.orphanDonor, {
            $unset: { sponsorFamily: 1 },
          });
        }
        // Add reference to new orphanDonor
        await OrphanDonor.findByIdAndUpdate(fields.orphanDonorId, {
          sponsorFamily: sponsorFamily._id,
        });
        sponsorFamily.orphanDonor = fields.orphanDonorId;
        await sponsorFamily.save();
      }

      res.json(sponsorFamily);
    } catch (error) {
      if (files.attachment) {
        fs.unlinkSync(files.attachment.path);
      }
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteSponsorFamily = async (req, res) => {
  try {
    const sponsorFamily = await SponsorFamily.findById(req.params.id);
    if (!sponsorFamily)
      return res.status(404).json({ message: "Sponsor family not found" });

    if (sponsorFamily.attachment) {
      fs.unlinkSync(sponsorFamily.attachment);
    }

    if (sponsorFamily.orphanDonor) {
      await OrphanDonor.findByIdAndUpdate(sponsorFamily.orphanDonor, {
        $unset: { sponsorFamily: 1 },
      });
    }

    await SponsorFamily.findByIdAndDelete(req.params.id);
    res.json({ message: "Sponsor family deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const sponsorFamily = await SponsorFamily.findById(req.params.id);
    if (!sponsorFamily || !sponsorFamily.attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }
    res.sendFile(path.resolve(sponsorFamily.attachment));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
