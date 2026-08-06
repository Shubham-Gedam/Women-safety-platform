import { useEffect, useState } from "react";
import { MapPinned, Phone, Plus } from "lucide-react";
import { getSafetyZones } from "../../services/admin.service";
import AddSafeZoneModal from "./AddSafeZoneModal"; 

const typeLabels = {
  police_station: "Police Station",
  hospital: "Hospital",
  safe_house: "Safe House",
  help_center: "Help Center",
  other: "Other",
};

export default function SafeZones({ role = "user" }) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getSafetyZones()
      .then((res) => setZones(res.zones || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleZoneAdded = (newZone) => {
    setZones((prev) => [newZone, ...prev]);
  };

  if (loading) return <div className="p-6 text-zinc-400">Loading safe zones...</div>;

  return (
    <div className="p-6 space-y-4">
      {/* Header section with Add button for Admin */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Safe Zones</h1>
          <p className="text-xs text-zinc-500">Police stations, hospitals, and help centers.</p>
        </div>

        {/* Button tabhi dikhega agar Logged-in user ADMIN hai */}
        {role === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Safe Zone
          </button>
        )}
      </div>

      {zones.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-sm">
          No safe zones added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div key={zone._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                  <MapPinned className="w-5 h-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{zone.name}</div>
                  <div className="text-xs text-zinc-500">{typeLabels[zone.type] || zone.type}</div>
                </div>
              </div>
              {zone.address && <p className="text-xs text-zinc-400 mt-3">{zone.address}</p>}
              {zone.contactNumber && (
                <a href={`tel:${zone.contactNumber}`} className="inline-flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <Phone className="w-3.5 h-3.5" />
                  {zone.contactNumber}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Admin Modal */}
      <AddSafeZoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onZoneAdded={handleZoneAdded}
      />
    </div>
  );
}