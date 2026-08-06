import axios from "axios";
import * as alertService from "../services/alert.service.js";
import { onlineUsers } from "../socket/socket.js";


export const createSOSController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
        status: "failed",
      });
    }

    const coordinates = [longitude, latitude]; // GeoJSON order: [lng, lat]

    const { alert, nearbyVolunteers } = await alertService.createAlert(
      req.user._id,
      coordinates
    );
    console.log("==================================");
console.log("SOS Created:", alert._id);
console.log("Nearby Volunteers:", nearbyVolunteers.length);
console.log(nearbyVolunteers);
console.log("Online Users:", [...onlineUsers.entries()]);
console.log("==================================");

    const io = req.app.get("io");

    nearbyVolunteers.forEach((volunteer) => {
  const socketId = onlineUsers.get(volunteer.authUserId.toString());

  console.log(
    "Volunteer ID:",
    volunteer.authUserId.toString()
  );

  console.log("Socket ID:", socketId);

  if (socketId) {
    console.log("Sending SOS to volunteer...");

    io.to(socketId).emit("sos:new", {
      alertId: alert._id,
      location: alert.location,
      createdAt: alert.createdAt,
    });
  }
});
    const userToken = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    axios
      .post(
        `${process.env.NOTIFICATION_SERVICE_URL}/api/notifications/sos-alert`,
        { alertId: alert._id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .catch((err) => console.error("Notification service call failed:", err.message));

    return res.status(201).json({
      status: "success",
      message: "SOS alert triggered",
      alert,
      notifiedVolunteers: nearbyVolunteers.length,
    });
  } catch (error) {
    console.error("SOS creation error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong while triggering SOS",
    });
  }
};
export const acceptAlertController = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await alertService.acceptAlert(id, req.user._id);

    const io = req.app.get("io");
    const userSocketId = onlineUsers.get(alert.userId.toString());

    if (userSocketId) {
      io.to(userSocketId).emit("sos:accepted", {
        alertId: alert._id,
        volunteerId: req.user._id,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Alert accepted",
      alert,
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

export const resolveAlertController = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await alertService.resolveAlert(id);

    // Socket.IO
    const io = req.app.get("io");
    const userSocketId = onlineUsers.get(alert.userId.toString());

    if (userSocketId) {
      io.to(userSocketId).emit("sos:resolved", {
        alertId: alert._id,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Alert resolved",
      alert,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getHistoryController = async (req, res) => {
  try {
    const alerts = await alertService.getAlertHistory(req.user._id);
    return res.status(200).json({ status: "success", alerts });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong while fetching history",
    });
  }
};

export const getAllAlertsController = async (req, res) => {
  try {
    const alerts = await alertService.getAllAlerts();
    return res.status(200).json({ status: "success", alerts });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

export const declineAlertController = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await alertService.declineAlert(id, req.user._id);

    return res.status(200).json({
      status: "success",
      message: "Alert declined",
      alert,
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

export const getAlertByIdController = async (req, res) => {
  try {
    const alert = await alertService.getAlertById(req.params.id);

    return res.status(200).json({
      status: "success",
      alert,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};