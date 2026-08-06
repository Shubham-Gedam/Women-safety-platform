import { ShieldAlert, Users, HeartHandshake, Clock } from "lucide-react";

export default function DashboardStats({ stats }) {
  const cards = [
    { label: "Total Registered Users", value: stats?.totalUsers || 0, icon: Users, color: "text-zinc-200" },
    { label: "Active Emergency Alerts", value: stats?.activeAlerts || 0, icon: ShieldAlert, color: "text-red-400" },
    { label: "Verified Volunteers", value: stats?.volunteers || 0, icon: HeartHandshake, color: "text-emerald-400" },
    { label: "Avg Resolution Time", value: `${stats?.avgResolution || 0}m`, icon: Clock, color: "text-amber-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 font-medium">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}