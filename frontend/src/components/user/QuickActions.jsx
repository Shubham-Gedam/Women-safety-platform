import { Users, Phone, MapPinned, Share2 } from "lucide-react";

const actions = [
  { key: "alertContacts", label: "Alert Contacts", icon: Users },
  { key: "callHelpline", label: "Call Helpline", icon: Phone },
  { key: "safeZones", label: "Safe Zones", icon: MapPinned },
  { key: "shareLocation", label: "Share Location", icon: Share2 },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <span className="text-xs text-zinc-500 tracking-wide">QUICK ACTIONS</span>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {actions.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onAction?.(key)}
            className="flex items-center gap-2 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-2.5 text-sm text-zinc-200 transition-colors whitespace-nowrap"
          >
            <Icon className="w-4 h-4 text-red-400" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
