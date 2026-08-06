import userModel from "../models/user.model.js";
import tokenBlackListModel from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  try {
    const {
      fullname: { firstname, lastname },
      email,
      phone,
      password,
    } = req.body;

    const isExsts = await userModel.findOne({ email: email });

    if (isExsts) {
      return res.status(422).json({
        message: "Email already exists, please use a different email address",
        status: "failed",
      });
    }

    const user = await userModel.create({
      fullname: { firstname, lastname },
      email,
      phone,
      password,
      role: "user", 
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role,
      },
      token: token,
      message: "User registered successfully",
      status: "success",
    });
    //   await emailService.sendRegistrationEmail(user.email, user.name);
  } catch (error) {
    console.error("Register error:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        message: messages.join(", "),
        status: "failed",
      });
    }
    res.status(500).json({
      message: "Something went wrong during registration",
      status: "failed",
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found, please register first",
        status: "failed",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        status: "failed",
      });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
      token: token,
      message: "User logged in successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Something went wrong during login",
      status: "failed",
    });
  }
}

export async function userLogoutController(req, res) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(200).json({
        message: "User logged out successfully",
      });
    }

    await tokenBlackListModel.create({ token: token });

    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Something went wrong during logout",
      status: "failed",
    });
  }
}

export async function getMeController(req, res) {
  res.status(200).json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      fullname: req.user.fullname,
      phone: req.user.phone,
      role: req.user.role,
    },
    status: "success",
  });
}

export async function requestVolunteerController(req, res) {
  try {
    const user = await userModel
      .findByIdAndUpdate(
        req.user._id,
        { role: "volunteer", isVerified: false },
        { new: true }
      )
      .select("-password");

    return res.status(200).json({
      status: "success",
      message: "Volunteer request submitted, pending admin verification",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
}