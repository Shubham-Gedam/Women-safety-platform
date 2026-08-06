import { useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

const HOLD_DURATION = 2000;
const RADIUS = 74;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function SOSCard({ onTrigger }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startHold = () => {
    setHolding(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(intervalRef.current);
        setHolding(false);
        setProgress(0);
        onTrigger?.();
      }
    }, 30);
  };

  const cancelHold = () => {
    clearInterval(intervalRef.current);
    setHolding(false);
    setProgress(0);
  };

  return (
    <div className="bg-gradient-to from-red-950/30 to-zinc-900 border border-red-900/40 rounded-xl p-6 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 text-red-400 text-xs font-medium tracking-wide mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        EMERGENCY TRIGGER
      </div>

      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className="relative w-40 h-40 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full"
        aria-label="Hold for 2 seconds to send an emergency SOS alert"
      >
        <svg className="absolute inset-0 -rotate-90 w-full h-full">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="4"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: holding ? "none" : "stroke-dashoffset 0.2s" }}
          />
        </svg>

        <div
          className="absolute inset-2 rounded-full bg-red-500 flex flex-col items-center justify-center"
          style={{
            boxShadow: holding
              ? "0 0 45px 10px rgba(239,68,68,0.55)"
              : "0 0 25px 3px rgba(239,68,68,0.3)",
            transition: "box-shadow 0.2s",
          }}
        >
          <AlertTriangle className="w-8 h-8 text-white mb-1" />
          <span className="text-white font-bold text-xl">SOS</span>
          <span className="text-white/80 text-[10px] font-medium tracking-wide">
            HOLD FOR HELP
          </span>
        </div>
      </button>

      <p className="text-zinc-500 text-xs mt-4">
        Tap &amp; hold for 2 seconds to send emergency alert
      </p>
    </div>
  );
}