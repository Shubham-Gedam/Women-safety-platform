const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Safe: "bg-emerald-500/15 text-emerald-400",
  Offline: "bg-zinc-700/40 text-zinc-500",
};

export default function NearbyResponders({ responders = [] }) {
  const availableCount = responders.filter((r) => r.status !== "Offline").length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl mt-4">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-sm text-zinc-300 font-medium">Nearby Responders</span>
        <span className="text-xs text-red-400 font-medium">{availableCount} available</span>
      </div>

      <div className="divide-y divide-zinc-800">
        {responders.map((r) => (
          <div key={r.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white font-medium">
                {r.name[0]}
              </div>
              <div>
                <div className="text-sm text-white">{r.name}</div>
                <div className="text-xs text-zinc-500">
                  {r.role} · {r.distance} km
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-400">{r.eta} min ETA</div>
              <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${statusStyles[r.status]}`}>
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}