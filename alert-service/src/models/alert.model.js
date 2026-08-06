import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    status: {
      type: String,
      enum: ["pending", "accepted", "resolved", "cancelled"],
      default: "pending",
    },
    assignedVolunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    declinedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    resolvedAt: Date,
  },
  { timestamps: true }
);

alertSchema.index({ location: "2dsphere" });

const alertModel = mongoose.model ("Alert", alertSchema);

export default alertModel;