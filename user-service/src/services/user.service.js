import Profile from "../models/profile.model.js";

export const createProfile = async (profileData) => {
  const existingProfile = await Profile.findOne({
    authUserId: profileData.authUserId,
  });

  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  const profile = await Profile.create(profileData);

  return profile;
};

export const getProfile = async (authUserId) => {
  const profile = await Profile.findOne({ authUserId });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};