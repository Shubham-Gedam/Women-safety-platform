import mongoose from "mongoose";

const safetyZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["police_station", "hospital", "safe_house", "help_center", "other"],
      default: "other",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

safetyZoneSchema.index({ location: "2dsphere" });

export default mongoose.model("SafetyZone", safetyZoneSchema);