import { ShieldAlert, Navigation, Phone, CheckCircle, Clock } from "lucide-react";
import { acceptAlert, resolveAlert } from "../../services/alert.service";

export default function ActiveMission({ mission, onUpdateStatus }) {
  
  // 1. Accept Alert Handler
  const handleAccept = async () => {
    try {
      const res = await acceptAlert(mission.id);
      console.log("Alert Accepted:", res);
      onUpdateStatus?.("Dispatched");
    } catch (err) {
      console.error("Accept Alert Error:", err);
      alert(err.response?.data?.message || "Unable to accept alert");
    }
  };

  // 2. Mark Arrived Handler
  const handleArrived = async () => {
    try {
      // Direct status update or backend API sync
      onUpdateStatus?.("Arrived On Site");
    } catch (err) {
      console.error("Arrived Status Error:", err);
      alert(err.response?.data?.message || "Unable to update status");
    }
  };

  // 3. Resolve Alert Handler (Backend Integrated)
  const handleResolve = async () => {
    try {
      const res = await resolveAlert(mission.id);
      console.log("Alert Resolved:", res);
      onUpdateStatus?.("Resolved");
    } catch (err) {
      console.error("Resolve Alert Error:", err);
      alert(err.response?.data?.message || "Unable to resolve alert");
    }
  };

  if (!mission) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center text-zinc-500">
        No active mission assigned.
      </div>
    );
  }

  const isDispatched = mission.status === "Dispatched";
  const isArrived = mission.status === "Arrived On Site";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          ACTIVE EMERGENCY MISSION
        </div>
        <span className="text-xs bg-red-500/15 text-red-400 px-2.5 py-0.5 rounded-full font-medium">
          {mission.status}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white">{mission.userName}</h3>
        <p className="text-sm text-zinc-400 flex items-center gap-1 mt-1">
          <Navigation className="w-4 h-4 text-zinc-500" />
          {mission.locationName}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 py-2 border-y border-zinc-800/60">
        <div>
          <span className="text-xs text-zinc-500">Distance</span>
          <p className="text-sm font-semibold text-zinc-200">
            {mission.distance} km away
          </p>
        </div>
        <div>
          <span className="text-xs text-zinc-500">Est. Arrival</span>
          <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {mission.eta} mins
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <a
          href={`tel:${mission.userPhone}`}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          Call User
        </a>

        {!isDispatched && !isArrived && (
          <button
            onClick={handleAccept}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            Accept & Respond
          </button>
        )}

        {isDispatched && (
          <button
            onClick={handleArrived}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            Mark Arrived
          </button>
        )}

        {isArrived && (
          <button
            onClick={handleResolve}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Resolve Emergency
          </button>
        )}
      </div>
    </div>
  );
}