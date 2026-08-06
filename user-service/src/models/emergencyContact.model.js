import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      enum: [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Friend",
        "Spouse",
        "Relative",
        "Other",
      ],
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    priority: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const EmergencyContact = mongoose.model(
  "EmergencyContact",
  emergencyContactSchema
);

export default EmergencyContact;