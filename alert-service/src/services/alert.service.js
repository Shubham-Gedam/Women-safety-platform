import Alert from "../models/alert.model.js";
import VolunteerLocation from "../models/volunteerLocation.model.js";

const SEARCH_RADIUS_METERS = 5000; // 5 km — zaroorat ke hisaab se adjust kar lena

export async function createAlert(userId, coordinates) {
  const alert = await Alert.create({
    userId,
    location: { type: "Point", coordinates },
    status: "pending",
  });

  const nearbyVolunteers = await VolunteerLocation.find({
    isOnline: true,
    location: {
      $near: {
        $geometry: { type: "Point", coordinates },
        $maxDistance: SEARCH_RADIUS_METERS,
      },
    },
  });

  return { alert, nearbyVolunteers };
}

export async function acceptAlert(alertId, volunteerId) {
  const alert = await Alert.findById(alertId);

  if (!alert) throw new Error("Alert not found");
  if (alert.status !== "pending") throw new Error("Alert already accepted or resolved");

  alert.status = "accepted";
  alert.assignedVolunteerId = volunteerId;
  await alert.save();

  return alert;
}

export async function resolveAlert(alertId) {
  const alert = await Alert.findById(alertId);

  if (!alert) throw new Error("Alert not found");

  alert.status = "resolved";
  alert.resolvedAt = new Date();
  await alert.save();

  return alert;
}

export async function getAlertHistory(userId) {
  return Alert.find({ userId }).sort({ createdAt: -1 });
}

export async function getAllAlerts() {
  return Alert.find().sort({ createdAt: -1 });
}

export async function declineAlert(alertId, volunteerId) {
  const alert = await Alert.findById(alertId);

  if (!alert) throw new Error("Alert not found");
  if (alert.status !== "pending") throw new Error("Alert is no longer pending");

  if (!alert.declinedBy.some((id) => id.toString() === volunteerId.toString())) {
    alert.declinedBy.push(volunteerId);
    await alert.save();
  }

  return alert;
}
export async function getAlertById(alertId) {
  const alert = await Alert.findById(alertId);

  if (!alert) {
    throw new Error("Alert not found");
  }

  return alert;
}