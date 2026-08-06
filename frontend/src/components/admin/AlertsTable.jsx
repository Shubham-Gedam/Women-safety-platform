import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function AlertsTable({ alerts = [] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Incident & Emergency Log</h3>
        <span className="text-xs text-zinc-500">{alerts.length} total events recorded</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/60 text-xs text-zinc-500 uppercase border-b border-zinc-800">
            <tr>
              <th className="px-5 py-3">Alert ID</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Assigned Responder</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-zinc-300">{alert.id}</td>
                <td className="px-5 py-3 font-medium text-white">{alert.user}</td>
                <td className="px-5 py-3 text-zinc-300">{alert.responder}</td>
                <td className="px-5 py-3 text-xs text-zinc-500">{alert.time}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      alert.status === "Active"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {alert.status === "Active" ? (
                      <AlertCircle className="w-3 h-3 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                    {alert.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}