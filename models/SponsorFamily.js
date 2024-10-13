const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SponsorFamily Schema
const sponsorFamilySchema = new Schema(
  {
    parentsName: { type: String, required: true },
    relationType: {
      type: String,
      enum: ["Father", "Mother", "Guardian"],
      required: true,
    },
    residencyType: {
      type: String,
      enum: ["Own", "Rent", "Other"],
      required: true,
    },
    brothersCount: { type: Number, required: true },
    sistersCount: { type: Number, required: true },
    rankBetweenBrothers: { type: Number, required: true },
    attachment: { type: String }, // Store file path
    report: { type: String },
    orphan: { type: Schema.Types.ObjectId, ref: "OrphanDonor" },
  },
  { timestamps: true }
);

const SponsorFamily = mongoose.model("SponsorFamily", sponsorFamilySchema);

module.exports = SponsorFamily;
