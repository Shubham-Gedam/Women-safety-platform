import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import { getMe } from "../services/auth.service";
import { connectSocket, disconnectSocket } from "../services/socket";

export default function UserLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setUser(data.user || data);
      } catch (err) {
        console.error("Failed to load user:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);
  useEffect(() => {
  const socket = connectSocket();

  if (!socket) return;

  socket.on("connect", () => {
    console.log("✅ User Socket Connected:", socket.id);
  });

  socket.on("sos:accepted", (data) => {
    console.log("🎉 Volunteer Accepted SOS:", data);

    alert("A volunteer has accepted your SOS request.");
  });
  socket.on("sos:resolved", (data) => {
  console.log("✅ SOS Resolved:", data);

  alert("Your emergency has been marked as resolved.");
});

  socket.on("connect_error", (err) => {
    console.error("Socket Error:", err.message);
  });

  return () => {
    disconnectSocket();
  };
}, []);

  if (loading) {
    return <Loader fullScreen text="Authenticating session..." />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar 
        role={user?.role || "user"} 
        userName={user?.fullName || user?.name || "User"} 
        notificationCount={0} 
      />
      <main className="flex-1">
        {/* Important: Sirf Outlet render hoga yahan */}
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}