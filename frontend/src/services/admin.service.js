import api from "./api";

export async function getUsers(role) {
  const res = await api.get("/api/admin/users", { params: role ? { role } : {} });
  return res.data;
}

export async function getVolunteers() {
  const res = await api.get("/api/admin/volunteers");
  return res.data;
}

export async function verifyVolunteer(userId) {
  const res = await api.patch(`/api/admin/volunteers/${userId}/verify`);
  return res.data;
}

export async function getAllAlerts() {
  const res = await api.get("/api/admin/alerts");
  return res.data;
}

export async function createSafetyZone(data) {
  const res = await api.post("/api/admin/safety-zones", data);
  return res.data;
}

export async function getSafetyZones() {
  const res = await api.get("/api/admin/safety-zones");
  return res.data;
}