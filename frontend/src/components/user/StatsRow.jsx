import { Bell, Users, MapPinned, Clock } from "lucide-react";

const statConfig = [
  { key: "alertsToday", label: "Alerts Today", icon: Bell, color: "text-zinc-300" },
  { key: "respondersNearby", label: "Responders Nearby", icon: Users, color: "text-emerald-400" },
  { key: "safeZonesNearby", label: "Safe Zones Nearby", icon: MapPinned, color: "text-amber-400" },
  { key: "avgResponseTime", label: "Avg Response Time", icon: Clock, color: "text-red-400", suffix: " min" },
];

export default function StatsRow({ stats = {} }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
      {statConfig.map(({ key, label, icon: Icon, color, suffix = "" }) => (
        <div
          key={key}
          className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
        >
          <Icon className={`w-5 h-5 ${color}`} />
          <div>
            <div className={`text-lg font-semibold ${color}`}>
              {stats?.[key] ?? 0}
              {suffix}
            </div>
            <div className="text-xs text-zinc-500">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}