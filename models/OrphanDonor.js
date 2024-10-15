const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orphanDonorSchema = new Schema(
  {
    // Donor Information
    donorName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    duration: {
      type: String,
      enum: ["1 month", "3 months", "6 months", "1 year"],
      required: true,
    },
    startingFrom: { type: Date, required: true },
    endingBy: { type: Date, required: true },

    // Orphan Information
    active: { type: Boolean, default: true },
    withoutFather: { type: Boolean, required: true },
    arabicName: { type: String, required: true },
    englishName: { type: String, required: true },
    sponsorStatus: {
      type: String,
      enum: ["Sponsored", "Not Sponsored", "Pending"],
      required: true,
    },
    sponsorType: {
      type: String,
      enum: ["Individual", "Organization", "Anonymous"],
      required: true,
    },
    supervisedBy: { type: String, required: true },
    sponsorCost: { type: Number, required: true },
    birthDate: { type: Date, required: true },
    healthStatus: {
      type: String,
      enum: ["Healthy", "Chronic Illness", "Disability"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    commitment: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    verses: { type: Number },
    orphanBy: {
      type: String,
      enum: ["Father", "Mother", "Both"],
      required: true,
    },
    parentsDeathDate: { type: Date },
    schoolName: { type: String },
    class: { type: String },
    educationYear: { type: Number },
    country: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String },
    notes: { type: String },
    // Orphan Family Information
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
  },
  { timestamps: true }
);

const OrphanDonor = mongoose.model("OrphanDonor", orphanDonorSchema);

module.exports = OrphanDonor;
