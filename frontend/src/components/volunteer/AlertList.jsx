import { AlertTriangle, MapPin, Clock } from "lucide-react";

export default function AlertList({ alerts = [], onSelectAlert, activeAlertId }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 tracking-wide font-medium">NEARBY EMERGENCY ALERTS</span>
        <span className="text-xs text-zinc-400">{alerts.length} incoming</span>
      </div>

      <div className="space-y-2 max-h-380px overflow-y-auto pr-1">
        {alerts.map((alert) => {
          const isActive = alert.id === activeAlertId;

          return (
            <div
              key={alert.id}
              onClick={() => onSelectAlert?.(alert)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                isActive
                  ? "bg-red-500/10 border-red-500/40 text-white"
                  : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm font-semibold text-white">{alert.userName}</span>
                </div>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {alert.timeAgo}
                </span>
              </div>

              <div className="mt-2 text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{alert.locationName}</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                <span>{alert.distance} km away</span>
                <span className="text-emerald-400 font-medium">ETA ~{alert.eta} mins</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}