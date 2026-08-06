import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getHistory } from "../../services/alert.service";

const statusConfig = {
  pending: { label: "Pending", color: "text-amber-400 bg-amber-500/15", icon: Clock },
  accepted: { label: "In Progress", color: "text-blue-400 bg-blue-500/15", icon: AlertCircle },
  resolved: { label: "Resolved", color: "text-emerald-400 bg-emerald-500/15", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-zinc-500 bg-zinc-800", icon: XCircle },
};

export default function History() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then((res) => setAlerts(res.alerts))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-zinc-400">Loading history...</div>;

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Emergency Alert History</h1>
        <p className="text-xs text-zinc-500">All SOS alerts you've triggered.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-sm">
          No alerts triggered yet.
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">
          {alerts.map((a) => {
            const config = statusConfig[a.status] || statusConfig.pending;
            const Icon = config.icon;
            return (
              <div key={a._id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm text-white">Emergency SOS</div>
                  <div className="text-xs text-zinc-500">
                    {new Date(a.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {a.resolvedAt &&
                      ` · resolved in ${Math.round((new Date(a.resolvedAt) - new Date(a.createdAt)) / 60000)} min`}
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${config.color}`}>
                  <Icon className="w-3 h-3" />
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}