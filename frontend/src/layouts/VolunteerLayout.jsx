import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import { getMe } from "../services/auth.service";
import { connectSocket, disconnectSocket } from "../services/socket";

export default function VolunteerLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = connectSocket();

    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Volunteer Socket Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket Error:", err.message);
    });

    return () => {
      disconnectSocket();
    };
  }, []);
  useEffect(() => {
    console.log("VolunteerLayout Mounted");

    async function fetchUser() {
      console.log("fetchUser started");

      try {
        const data = await getMe();
        console.log("getMe response:", data);

        setUser(data.user || data);
      } catch (err) {
        console.error("fetchUser error:", err);
      } finally {
        console.log("loading false");
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  if (loading) {
    return <Loader fullScreen text="Loading responder portal..." />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar
        userName={
          user?.fullname
            ? `${user.fullname.firstname} ${user.fullname.lastname || ""}`.trim()
            : "Volunteer"
        }
        notificationCount={0}
        navLinks={[]}
      />
      <main className="flex-1">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
