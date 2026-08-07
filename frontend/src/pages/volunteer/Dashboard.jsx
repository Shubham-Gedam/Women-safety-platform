import { useState, useEffect } from "react";
import AlertList from "../../components/volunteer/AlertList";
import ActiveMission from "../../components/volunteer/ActiveMission";
import LiveSafetyMap from "../../components/user/LiveSafetyMap";
import { connectSocket } from "../../services/socket";

export default function VolunteerDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [volunteerLoc, setVolunteerLoc] = useState(null);

  // 1. Volunteer Live Location Tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setVolunteerLoc({
          lat: latitude,
          lng: longitude,
        });

        const socket = connectSocket();
        if (socket) {
          socket.emit("location:update", {
            latitude,
            longitude,
          });
        }
      },
      (err) => console.error("Location Error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Real-Time Socket Listener for User Emergency SOS
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;

    socket.on("sos:new", (data) => {
      console.log("🚨 REAL SOS RECEIVED:", data);

      // User Dashboard se aane wala Real Payload
      const newAlert = {
        id: data.alertId || data._id || Date.now(),
        userName: data.userName || data.user?.fullname?.firstname || "User in Emergency",
        locationName: data.locationName || "Emergency Live Location",
        distance: "0.5 km away",
        eta: "2 mins",
        timeAgo: "Just now",
        lat: data.location?.coordinates?.[1] || data.latitude || data.lat,
        lng: data.location?.coordinates?.[0] || data.longitude || data.lng,
        userPhone: data.userPhone || data.phone || "",
        status: "Pending Dispatch",
      };

      setAlerts((prev) => [newAlert, ...prev]);
      setSelectedAlert((prev) => prev || newAlert);
    });

    return () => {
      socket.off("sos:new");
    };
  }, []);

  const handleStatusUpdate = (newStatus) => {
    if (selectedAlert) {
      const updated = { ...selectedAlert, status: newStatus };
      setSelectedAlert(updated);
      setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    }
  };

  if (!volunteerLoc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-medium">
        Getting your live location...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <div className="space-y-4">
          <ActiveMission
            mission={selectedAlert}
            onUpdateStatus={handleStatusUpdate}
          />

          <AlertList
            alerts={alerts}
            onSelectAlert={setSelectedAlert}
            activeAlertId={selectedAlert?.id}
          />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Live Emergency Grid
              </h2>
              <p className="text-xs text-zinc-500">
                Showing active alerts and user markers near your location
              </p>
            </div>

            <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full font-medium">
              ● Station Active
            </span>
          </div>

          <div className="flex-1 rounded-lg overflow-hidden border border-zinc-800">
            <LiveSafetyMap
              userLocation={volunteerLoc}
              nearby={alerts.map((a) => ({
                id: a.id,
                name: a.userName,
                role: "User in Distress",
                status: a.status,
                lat: a.lat,
                lng: a.lng,
              }))}
              locationLabel="Responder Sector"
            />
          </div>
        </div>
      </main>
    </div>
  );
}