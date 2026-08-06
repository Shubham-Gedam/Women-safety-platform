import EmergencyContact from "../models/emergencyContact.model.js";

export async function createContact(authUserId, data) {
  return EmergencyContact.create({ ...data, authUserId });
}

export async function getContacts(authUserId) {
  return EmergencyContact.find({ authUserId }).sort({ priority: 1 });
}