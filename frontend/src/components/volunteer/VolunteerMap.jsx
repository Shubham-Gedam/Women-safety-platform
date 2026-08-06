import { useState } from "react";
import LiveSafetyMap from "../../components/user/LiveSafetyMap";
import { Shield, MapPin, Radio, Compass } from "lucide-react";

const mockSectorIncidents = [
  { id: 1, name: "Distress Alert — MG Road", role: "Emergency", status: "Active", lat: 19.9985, lng: 79.2975 },
  { id: 2, name: "Patrol Unit Sector 2", role: "Responder", status: "Active", lat: 19.996, lng: 79.298 },
  { id: 3, name: "Safe Zone Patrol", role: "Volunteer", status: "Active", lat: 19.9945, lng: 79.293 },
];

export default function VolunteerMap() {
  const [volunteerLoc] = useState({ lat: 19.9975, lng: 79.2961 });

  return (
    <div className="p-6 h-[calc(100vh-73px)] flex flex-col gap-4">
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5">
        <div>
          <h1 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-red-400" />
            Sector Coverage Map
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Live emergency tracking and volunteer distribution grid</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Signal: Active
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300">
            <Shield className="w-3.5 h-3.5 text-red-400" />
            3 Incidents Monitored
          </div>
        </div>
      </div>

      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative">
        <LiveSafetyMap
          userLocation={volunteerLoc}
          nearby={mockSectorIncidents}
          locationLabel="Sector 4 · Command View"
        />

        <div className="absolute top-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-3 w-60 space-y-2 text-xs">
          <span className="font-semibold text-zinc-300 tracking-wide block border-b border-zinc-800 pb-1.5">
            MAP LEGEND
          </span>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            Emergency SOS Marker
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Active Responder
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            Safe Zone Anchor
          </div>
        </div>
      </div>
    </div>
  );
}