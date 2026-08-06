import mongoose from "mongoose";

const volunteerLocationSchema = new mongoose.Schema(
  {
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
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
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

volunteerLocationSchema.index({ location: "2dsphere" });

const volunteerLocationModel = mongoose.model("VolunteerLocation", volunteerLocationSchema);

export default volunteerLocationModel;