import { Lightbulb } from "lucide-react";

export default function SafetyTipCard({ tip }) {
  return (
    <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 flex gap-3">
      <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div>
        <div className="text-amber-400 text-sm font-medium mb-1">Safety Tip</div>
        <p className="text-zinc-400 text-sm">{tip}</p>
      </div>
    </div>
  );
}