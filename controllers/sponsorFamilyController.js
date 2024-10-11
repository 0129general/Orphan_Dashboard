const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const SponsorFamily = require('../models/SponsorFamily');
const  Orphan  = require('../models/Orphan');



exports.createSponsorFamily = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const sponsorFamily = new SponsorFamily({
        ...fields,
        attachment: files.attachment ? files.attachment.path : undefined
      });

      await sponsorFamily.save();

      if (fields.orphanId) {
        const orphan = await Orphan.findById(fields.orphanId);
        if (orphan) {
          orphan.sponsorFamily = sponsorFamily._id;
          await orphan.save();
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
    const sponsorFamilies = await SponsorFamily.find().populate('orphan');
    res.json(sponsorFamilies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSponsorFamily = async (req, res) => {
  try {
    const sponsorFamily = await SponsorFamily.findById(req.params.id).populate('orphan');
    if (!sponsorFamily) return res.status(404).json({ message: 'Sponsor family not found' });
    res.json(sponsorFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSponsorFamily = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const sponsorFamily = await SponsorFamily.findById(req.params.id);
      if (!sponsorFamily) return res.status(404).json({ message: 'Sponsor family not found' });

      if (files.attachment) {
        if (sponsorFamily.attachment) {
          fs.unlinkSync(sponsorFamily.attachment);
        }
        sponsorFamily.attachment = files.attachment.path;
      }

      Object.assign(sponsorFamily, fields);

      await sponsorFamily.save();
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
    if (!sponsorFamily) return res.status(404).json({ message: 'Sponsor family not found' });

    if (sponsorFamily.attachment) {
      fs.unlinkSync(sponsorFamily.attachment);
    }

    if (sponsorFamily.orphan) {
      await Orphan.findByIdAndUpdate(sponsorFamily.orphan, { $unset: { sponsorFamily: 1 } });
    }

    await SponsorFamily.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sponsor family deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const sponsorFamily = await SponsorFamily.findById(req.params.id);
    if (!sponsorFamily || !sponsorFamily.attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.sendFile(path.resolve(sponsorFamily.attachment));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};