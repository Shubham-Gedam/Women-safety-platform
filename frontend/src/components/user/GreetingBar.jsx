import { Sun } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function GreetingBar({ firstName = "Priya", locationTracking = true }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/50 border-b border-zinc-800">
      <div className="flex items-center gap-2 text-sm">
        <Sun className="w-4 h-4 text-amber-400" />
        <span className="text-zinc-400">
          {getGreeting()}, {firstName}.
        </span>
        <span className="text-white font-medium">Stay safe tonight.</span>
      </div>
      {locationTracking && (
        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Location tracking active
        </div>
      )}
    </div>
  );
}