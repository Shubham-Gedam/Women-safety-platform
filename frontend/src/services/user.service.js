import api from "./api";

export async function getProfile() {
  const res = await api.get("/api/users/profile");
  return res.data;
}

export async function createProfile(data) {
  const res = await api.post("/api/users/profile", data);
  return res.data;
}

export async function getEmergencyContacts() {
  const res = await api.get("/api/users/emergency-contacts");
  return res.data;
}

export async function addEmergencyContact(data) {
  const res = await api.post("/api/users/emergency-contacts", data);
  return res.data;
}