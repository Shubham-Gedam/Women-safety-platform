import dotenv from "dotenv";
dotenv.config();

import { sendWhatsAppTemplate } from "./src/configs/whatsapp.js";

sendWhatsAppTemplate(
  "918793138908",
  "emergency_alert_v2",
  ["Shalini", "https://maps.google.com/?q=19.9975,79.2961"]
)
  .then((res) => console.log("Sent:", res.data))
  .catch((err) => console.error("WhatsApp error:", err.response?.data || err.message));