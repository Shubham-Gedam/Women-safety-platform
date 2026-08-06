import { createProfile, getProfile } from "../services/user.service.js";

export const createProfileController = async (req, res) => {
  try {
    const profile = await createProfile({
      ...req.body,
      authUserId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const profile = await getProfile(req.user._id);

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};