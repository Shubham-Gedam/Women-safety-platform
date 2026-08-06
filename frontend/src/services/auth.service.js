import api from "./api";

export async function register(data) {
  const res = await api.post("/api/auth/register", data);
  return res.data;
}

export async function login(data) {
  const res = await api.post("/api/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await api.post("/api/auth/logout");
  return res.data;
}

export async function getMe() {
  const res = await api.get("/api/auth/me");
  return res.data;
}

export async function requestVolunteer() {
  const res = await api.patch("/api/auth/volunteer/request");
  return res.data;
}