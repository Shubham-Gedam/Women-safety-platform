import userModel from "../models/user.model.js";

export async function listUsersController(req, res) {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await userModel.find(filter).select("-password");
    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
}

export async function verifyUserController(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel
      .findByIdAndUpdate(id, { isVerified: true }, { new: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    res.status(200).json({ status: "success", message: "User verified", user });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
}