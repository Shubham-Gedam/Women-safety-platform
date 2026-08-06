import * as contactService from "../services/emergencyContact.service.js";

export const createContactController = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.user._id, req.body);
    return res.status(201).json({ status: "success", contact });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

export const getContactsController = async (req, res) => {
  try {
    const contacts = await contactService.getContacts(req.user._id);
    return res.status(200).json({ status: "success", contacts });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};