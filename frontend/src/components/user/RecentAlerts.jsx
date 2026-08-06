const badgeStyles = {
  Safe: "bg-emerald-500/15 text-emerald-400",
  Emergency: "bg-red-500/15 text-red-400",
  Caution: "bg-amber-500/15 text-amber-400",
};

export default function RecentAlerts({ alerts = [] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 tracking-wide">RECENT ALERTS</span>
        <button className="text-xs text-red-400 hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="flex items-start justify-between">
            <div>
              <div className="text-sm text-zinc-200">{a.title}</div>
              <div className="text-xs text-zinc-500">{a.time}</div>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeStyles[a.type]}`}>
              {a.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}