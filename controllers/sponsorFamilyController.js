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
      // Process fields to extract single values from arrays
      // console.log("files:", files);
      const processedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        return acc;
      }, {});

      const sponsorFamily = new SponsorFamily({
        ...processedFields,
        attachment: files.attachment ? files.attachment[0].filepath : undefined,
      });

      await sponsorFamily.save();

      if (processedFields.orphanDonorId) {
        const orphanDonor = await OrphanDonor.findById(
          processedFields.orphanDonorId
        );
        if (orphanDonor) {
          orphanDonor.sponsorFamily = sponsorFamily._id;
          await orphanDonor.save();
        }
      }

      res.status(201).json(sponsorFamily);
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

      if (files.attachment && files.attachment[0].filepath) {
        if (sponsorFamily.attachment) {
          fs.unlink(sponsorFamily.attachment, (unlinkError) => {
            if (unlinkError)
              console.error("Error deleting old file:", unlinkError);
          });
        }
        sponsorFamily.attachment = files.attachment[0].filepath;
      }

      // Process fields to extract single values from arrays
      const processedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        return acc;
      }, {});

      Object.assign(sponsorFamily, processedFields);

      await sponsorFamily.save();

      // Update orphanDonor reference if changed
      if (
        processedFields.orphanDonorId &&
        processedFields.orphanDonorId !== sponsorFamily.orphanDonor?.toString()
      ) {
        // Remove reference from old orphanDonor
        if (sponsorFamily.orphanDonor) {
          await OrphanDonor.findByIdAndUpdate(sponsorFamily.orphanDonor, {
            $unset: { sponsorFamily: 1 },
          });
        }
        // Add reference to new orphanDonor
        await OrphanDonor.findByIdAndUpdate(processedFields.orphanDonorId, {
          sponsorFamily: sponsorFamily._id,
        });
        sponsorFamily.orphanDonor = processedFields.orphanDonorId;
        await sponsorFamily.save();
      }

      res.json(sponsorFamily);
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

// exports.updateSponsorFamily = async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(__dirname, "../uploads");
//   form.keepExtensions = true;

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ message: "Error parsing form data" });
//     }

//     try {
//       const sponsorFamily = await SponsorFamily.findById(req.params.id);
//       if (!sponsorFamily)
//         return res.status(404).json({ message: "Sponsor family not found" });

//       if (files.attachment) {
//         if (sponsorFamily.attachment) {
//           fs.unlinkSync(sponsorFamily.attachment);
//         }
//         sponsorFamily.attachment = files.attachment[0].filepath;
//       }

//       Object.assign(sponsorFamily, fields);

//       await sponsorFamily.save();

//       // Update orphanDonor reference if changed
//       if (
//         fields.orphanDonorId &&
//         fields.orphanDonorId !== sponsorFamily.orphanDonor.toString()
//       ) {
//         // Remove reference from old orphanDonor
//         if (sponsorFamily.orphanDonor) {
//           await OrphanDonor.findByIdAndUpdate(sponsorFamily.orphanDonor, {
//             $unset: { sponsorFamily: 1 },
//           });
//         }
//         // Add reference to new orphanDonor
//         await OrphanDonor.findByIdAndUpdate(fields.orphanDonorId, {
//           sponsorFamily: sponsorFamily._id,
//         });
//         sponsorFamily.orphanDonor = fields.orphanDonorId;
//         await sponsorFamily.save();
//       }

//       res.json(sponsorFamily);
//     } catch (error) {
//       if (files.attachment) {
//         fs.unlinkSync(files.attachment[0].filepath);
//       }
//       res.status(400).json({ message: error.message });
//     }
//   });
// };

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
