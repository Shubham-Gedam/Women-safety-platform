import api from "./api";

export async function triggerSOS(latitude, longitude) {
  const res = await api.post("/api/alerts/sos", { latitude, longitude });
  return res.data;
}

export async function acceptAlert(alertId) {
  const res = await api.patch(`/api/alerts/${alertId}/accept`);
  return res.data;
}

export async function declineAlert(alertId) {
  const res = await api.patch(`/api/alerts/${alertId}/decline`);
  return res.data;
}

export async function resolveAlert(alertId) {
  const res = await api.patch(`/api/alerts/${alertId}/resolve`);
  return res.data;
}

export async function getHistory() {
  const res = await api.get("/api/alerts/history");
  return res.data;
}

export async function getAlert(alertId) {
  const res = await api.get(`/api/alerts/${alertId}`);
  return res.data;
}