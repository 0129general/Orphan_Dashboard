const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const OrphanDonor = require("../models/OrphanDonor");

exports.createOrphanDonor = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    try {
      const processedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        return acc;
      }, {});

      const orphanDonor = new OrphanDonor({
        ...processedFields,
        attachment: files.attachment ? files.attachment[0].filepath : undefined,
      });

      await orphanDonor.save();
      res.status(201).json(orphanDonor);
    } catch (error) {
      if (files.attachment && files.attachment[0].filepath) {
        fs.unlink(files.attachment[0].filepath, (unlinkError) => {
          if (unlinkError) console.error("Error deleting file:", unlinkError);
        });
      }
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllOrphanDonors = async (req, res) => {
  try {
    const orphanDonors = await OrphanDonor.find();
    res.json(orphanDonors);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id);
    if (!orphanDonor)
      return res.status(404).json({ message: "Orphan-Donor not found" });
    res.json(orphanDonor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrphanDonor = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../uploads");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    try {
      const orphanDonor = await OrphanDonor.findById(req.params.id);
      if (!orphanDonor)
        return res.status(404).json({ message: "Orphan-Donor not found" });

      if (files.attachment && files.attachment[0].filepath) {
        if (orphanDonor.attachment) {
          fs.unlink(orphanDonor.attachment, (unlinkError) => {
            if (unlinkError)
              console.error("Error deleting old file:", unlinkError);
          });
        }
        orphanDonor.attachment = files.attachment[0].filepath;
      }

      const processedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        return acc;
      }, {});

      Object.assign(orphanDonor, processedFields);

      await orphanDonor.save();
      res.json(orphanDonor);
    } catch (error) {
      if (files.attachment && files.attachment[0].filepath) {
        fs.unlink(files.attachment[0].filepath, (unlinkError) => {
          if (unlinkError) console.error("Error deleting file:", unlinkError);
        });
      }
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteOrphanDonor = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id);
    if (!orphanDonor)
      return res.status(404).json({ message: "Orphan-Donor not found" });

    if (orphanDonor.attachment) {
      fs.unlink(orphanDonor.attachment, (unlinkError) => {
        if (unlinkError)
          console.error("Error deleting attachment:", unlinkError);
      });
    }

    await OrphanDonor.findByIdAndDelete(req.params.id);
    res.json({
      data: req.params.id,
      message: "Orphan-Donor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const orphanDonor = await OrphanDonor.findById(req.params.id);
    if (!orphanDonor || !orphanDonor.attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }
    res.sendFile(path.resolve(orphanDonor.attachment));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
