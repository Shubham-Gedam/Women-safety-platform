import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function createDivIcon(color, label) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${color};width:32px;height:32px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      border:2px solid white;box-shadow:0 0 8px rgba(0,0,0,0.4);
      font-size:11px;color:white;font-weight:600;
    ">${label}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

export default function LiveSafetyMap({ userLocation, nearby = [], locationLabel }) {
  if (!userLocation) {
    return (
      <div className="h-80 flex items-center justify-center text-zinc-500 text-sm bg-zinc-900 rounded-xl">
        Getting your location...
      </div>
    );
  }

  const center = [userLocation.lat, userLocation.lng];

  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-800">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "320px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />

        <Circle
          center={center}
          radius={400}
          pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.08 }}
        />

        <Marker position={center} icon={createDivIcon("#ef4444", "You")}>
          <Popup>You are here</Popup>
        </Marker>

        {nearby.map((person) => (
          <Marker
            key={person.id}
            position={[person.lat, person.lng]}
            icon={createDivIcon(
              person.status === "Active" ? "#10b981" : "#6b7280",
              person.name[0]
            )}
          >
            <Popup>
              {person.name} — {person.role}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {locationLabel && (
        <div className="absolute bottom-3 left-3 bg-zinc-950/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-zinc-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {locationLabel}
        </div>
      )}
    </div>
  );
}