import * as adminService from "../services/admin.service.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await adminService.getAllUsers(req.token, req.query.role);
    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

export const getVolunteersController = async (req, res) => {
  try {
    const volunteers = await adminService.getAllUsers(req.token, "volunteer");
    res.status(200).json({ status: "success", volunteers });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

export const verifyVolunteerController = async (req, res) => {
  try {
    const user = await adminService.verifyVolunteer(req.token, req.params.id);
    res.status(200).json({ status: "success", message: "Volunteer verified", user });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Could not verify volunteer" });
  }
};

export const getAlertsController = async (req, res) => {
  try {
    const alerts = await adminService.getAllAlerts(req.token);
    res.status(200).json({ status: "success", alerts });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

export const createSafetyZoneController = async (req, res) => {
  try {
    const { name, type, address, contactNumber, latitude, longitude, location } = req.body;

    // GeoJSON Location format build karein agar frontend se latitude/longitude alag aaye hain
    let zoneLocation = location;
    if (!zoneLocation && latitude !== undefined && longitude !== undefined) {
      zoneLocation = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)], 
      };
    }

    const zone = await adminService.createSafetyZone({
      name,
      type,
      address,
      contactNumber,
      location: zoneLocation,
    });

    res.status(201).json({ status: "success", zone });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

export const listSafetyZonesController = async (req, res) => {
  try {
    const zones = await adminService.listSafetyZones();
    res.status(200).json({ status: "success", zones });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};