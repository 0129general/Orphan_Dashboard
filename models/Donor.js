const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Donor Schema
const donorSchema = new Schema(
  {
    donorName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    duration: {
      type: String,
      enum: ["1 month", "3 months", "6 months", "1 year"],
      required: true,
    },
    startingFrom: { type: Date, required: true },
    endingBy: { type: Date, required: true },
    orphan: { type: Schema.Types.ObjectId, ref: "Orphan" },
  },
  { timestamps: true }
);
const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
