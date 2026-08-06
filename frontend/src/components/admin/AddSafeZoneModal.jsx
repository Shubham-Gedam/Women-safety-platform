import { useState } from "react";
import { X, MapPinned, Plus } from "lucide-react";
import { createSafetyZone } from "../../services/admin.service";

export default function AddSafeZoneModal({ isOpen, onClose, onZoneAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "police_station",
    address: "",
    contactNumber: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Backend GeoJSON format payload
    const payload = {
      name: formData.name,
      type: formData.type,
      address: formData.address,
      contactNumber: formData.contactNumber,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(formData.longitude), // GeoJSON mein Longitude pehle aata hai
          parseFloat(formData.latitude),  // Latitude baad mein
        ],
      },
    };

    try {
      const res = await createSafetyZone(payload);
      onZoneAdded(res.zone);
      onClose();
      setFormData({
        name: "",
        type: "police_station",
        address: "",
        contactNumber: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create safe zone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-white font-semibold">
            <MapPinned className="w-5 h-5 text-red-500" />
            Add New Safe Zone
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Place / Center Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Central Police Station"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            >
              <option value="police_station">Police Station</option>
              <option value="hospital">Hospital</option>
              <option value="safe_house">Safe House</option>
              <option value="help_center">Help Center</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Address</label>
            <textarea
              required
              rows={2}
              placeholder="Full address of the location..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Coordinates (Latitude & Longitude) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                required
                placeholder="e.g. 18.5204"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                required
                placeholder="e.g. 73.8567"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Contact Number</label>
            <input
              type="text"
              placeholder="+91 9876543210"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {loading ? "Saving..." : "Add Safe Zone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}