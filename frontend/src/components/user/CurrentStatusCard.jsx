import { ShieldCheck } from "lucide-react";

export default function CurrentStatusCard({ isSafe = true }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 tracking-wide">CURRENT STATUS</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
          {isSafe ? "Safe" : "Alert"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-white text-sm font-medium">You are safe</div>
          <div className="text-xs text-zinc-500">Location sharing is active</div>
        </div>
      </div>
    </div>
  );
}