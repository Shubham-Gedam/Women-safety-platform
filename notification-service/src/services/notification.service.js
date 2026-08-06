import axios from "axios";
import sendEmail from "../email.js";
import { sendWhatsAppTemplate } from "../configs/whatsapp.js";

async function fetchEmergencyContacts(userToken) {
  const response = await axios.get(
    `${process.env.USER_SERVICE_URL}/api/users/emergency-contacts`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  return response.data.contacts;
}

async function fetchUserProfile(userToken) {
  const response = await axios.get(
    `${process.env.AUTH_SERVICE_URL}/api/auth/me`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  return response.data.user;
}

function buildTrackingLink(alertId) {
  return `${process.env.FRONTEND_TRACKING_URL}/${alertId}`;
}

async function notifyByEmail(contact, womanName, trackingLink) {
  if (!contact.email) return;

  await sendEmail(
    contact.email,
    `🚨 Emergency Alert — ${womanName} needs immediate help`,
    `${womanName} has triggered an emergency SOS alert. Track live location: ${trackingLink}`,
    `<p>Hi ${contact.fullname},</p>
     <p><strong>${womanName}</strong> has triggered an emergency SOS alert. Please track live location here:</p>
     <p><a href="${trackingLink}">${trackingLink}</a></p>`
  );
}

async function notifyByWhatsApp(contact, womanName, trackingLink) {
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "hello_world";
  const params = templateName === "hello_world" ? [] : [womanName, trackingLink];
  await sendWhatsAppTemplate(contact.phone, templateName, params);
}

export async function notifyEmergencyContacts({ userToken, alertId }) {
  const [contacts, userProfile] = await Promise.all([
    fetchEmergencyContacts(userToken),
    fetchUserProfile(userToken),
  ]);

  const womanName = `${userProfile.fullname.firstname} ${userProfile.fullname.lastname || ""}`.trim();
  const trackingLink = buildTrackingLink(alertId);

  const results = await Promise.allSettled(
    contacts.flatMap((contact) => [
      notifyByEmail(contact, womanName, trackingLink),
      notifyByWhatsApp(contact, womanName, trackingLink),
    ])
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length) {
    console.error("Some notifications failed:", failed.map((f) => f.reason?.message));
  }

  return {
    totalContacts: contacts.length,
    failedNotifications: failed.length,
  };
}