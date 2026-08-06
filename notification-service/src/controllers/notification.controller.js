import { notifyEmergencyContacts } from "../services/notification.service.js";

export const sendSOSNotificationController = async (req, res) => {
  try {
    const { alertId } = req.body;
    const userToken = req.headers.authorization?.split(" ")[1];

    if (!alertId || !userToken) {
      return res.status(400).json({
        status: "failed",
        message: "alertId and authorization token are required",
      });
    }

    const result = await notifyEmergencyContacts({ userToken, alertId });

    return res.status(200).json({
      status: "success",
      message: "Notifications processed",
      ...result,
    });
  } catch (error) {
    console.error("Notification error:", error.response?.data || error.message);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong while sending notifications",
    });
  }
};