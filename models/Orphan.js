const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Orphan Schema
const orphanSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    withoutFather: { type: Boolean, required: true },
    serialNumber: { type: String, unique: true, required: true },
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
    supervisedBy: {
      type: String,
      enum: ["Supervisor 1", "Supervisor 2", "Supervisor 3"],
      required: true,
    },
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
    class: {
      type: String,
      enum: ["1st Grade", "2nd Grade", "3rd Grade"], // Adjust as needed
    },
    educationYear: { type: Number },
    country: {
      type: String,
      enum: ["Country 1", "Country 2", "Country 3"], // Adjust as needed
      required: true,
    },
    nationality: {
      type: String,
      enum: ["Nationality 1", "Nationality 2", "Nationality 3"], // Adjust as needed
      required: true,
    },
    address: { type: String },
    notes: { type: String },
    donor: { type: Schema.Types.ObjectId, ref: "Donor" },
    sponsorFamily: { type: Schema.Types.ObjectId, ref: "SponsorFamily" },
  },
  { timestamps: true }
);

const Orphan = mongoose.model("Orphan", orphanSchema);

module.exports = Orphan;
