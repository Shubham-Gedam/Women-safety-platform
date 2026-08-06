import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlert } from "../../services/alert.service";
import LiveSafetyMap from "../user/LiveSafetyMap";

export default function TrackingPage() {
  const { alertId } = useParams();
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    async function loadAlert() {
      try {
        const res = await getAlert(alertId);
        console.log("Alert Response:", res);
        setAlert(res.alert);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    loadAlert();
  }, [alertId]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">
        Live Emergency Tracking
      </h1>

      <p className="mt-4 text-zinc-400">Alert ID</p>

      <div className="mt-2 p-4 rounded-lg bg-zinc-900">
        {alertId}
      </div>

     {alert?.location?.coordinates?.length === 2 && (
  <div className="w-full max-w-3xl mt-6">
    <LiveSafetyMap
      userLocation={{
        lat: alert.location.coordinates[1],
        lng: alert.location.coordinates[0],
      }}
      nearby={[]}
      locationLabel="Emergency Location"
    />
  </div>
)}  
    </div>
  );
}