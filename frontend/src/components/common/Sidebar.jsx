import { useState } from "react";
import { Shield, Home, Users, Bell, MapPin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

export default function Sidebar({ activeTab, onSelectTab, role = "user", userName = "User" }) {
  const navigate = useNavigate();

  const links =
    role === "admin"
      ? [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "users", label: "Users & Volunteers", icon: Users },
          { id: "alerts", label: "Incident History", icon: Bell },
          { id: "zones", label: "Safe Zones", icon: MapPin },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "missions", label: "Active Alerts", icon: Bell },
          { id: "map", label: "Coverage Map", icon: MapPin },
        ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // Extract initials from userName (e.g. "Priya Sharma" -> "PS")
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-4 flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Header / Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-white font-semibold text-base capitalize">{role} Portal</span>
        </div>

        {/* Dynamic Nav Links */}
        <nav className="space-y-1">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSelectTab?.(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section: User Info & Logout Button */}
      <div className="pt-4 border-t border-zinc-800 space-y-3">
        {/* User Card */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-white font-semibold">
              {userInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white truncate max-w-[120px]">
                {userName}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}