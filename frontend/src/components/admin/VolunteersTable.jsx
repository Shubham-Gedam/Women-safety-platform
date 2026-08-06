import { CheckCircle2, Clock } from "lucide-react";

export default function VolunteersTable({ volunteers = [], onVerify }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Volunteer Roster</h3>
        <span className="text-xs text-zinc-500">{volunteers.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/60 text-xs text-zinc-500 uppercase border-b border-zinc-800">
            <tr>
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {volunteers.map((v) => (
              <tr key={v._id} className="hover:bg-zinc-800/30">
                <td className="px-5 py-3 font-mono text-xs text-zinc-300">
                  {v._id ? v._id.slice(-6).toUpperCase() : "N/A"}
                </td>
                <td className="px-5 py-3 font-medium text-white">
                  {v.fullname?.firstname || "—"} {v.fullname?.lastname || ""}
                </td>
                <td className="px-5 py-3 text-zinc-300">{v.email || "—"}</td>
                <td className="px-5 py-3 text-zinc-400">{v.phone || "—"}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                      v.isVerified
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {v.isVerified ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {v.isVerified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {!v.isVerified && (
                    <button
                      onClick={() => onVerify?.(v._id)}
                      className="text-xs bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-3 py-1 rounded-lg font-medium transition-colors"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}