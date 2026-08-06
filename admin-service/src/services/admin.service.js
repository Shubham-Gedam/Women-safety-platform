import axios from "axios";
import SafetyZone from "../models/safetyZone.model.js";

export async function getAllUsers(token, role) {
  const url = role
    ? `${process.env.AUTH_SERVICE_URL}/api/auth/admin/users?role=${role}`
    : `${process.env.AUTH_SERVICE_URL}/api/auth/admin/users`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.users;
}

export async function verifyVolunteer(token, userId) {
  const response = await axios.patch(
    `${process.env.AUTH_SERVICE_URL}/api/auth/admin/users/${userId}/verify`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.user;
}

export async function getAllAlerts(token) {
  const response = await axios.get(
    `${process.env.ALERT_SERVICE_URL}/api/alerts/admin/all`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.alerts;
}

export async function createSafetyZone(data) {
  return SafetyZone.create(data);
}

export async function listSafetyZones() {
  return SafetyZone.find().sort({ createdAt: -1 });
}