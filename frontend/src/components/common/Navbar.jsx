import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { logout } from "../../services/auth.service";

export default function Navbar({ userName = "User", notificationCount = 0, role = "user" }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Role ke hisab se Dashboard ka Base Path
  const getDashboardPath = () => {
    if (role === "admin") return "/admin";
    if (role === "volunteer") return "/volunteer";
    return "/user";
  };

  const dashboardPath = getDashboardPath();

  // Role-based Dynamic Navigation Links
  const navLinks =
    role === "user"
      ? [
          { name: "Dashboard", path: "/user" },
          { name: "Safe Zones", path: "/user/safe-zones" },
          { name: "Contacts", path: "/user/contacts" },
          { name: "History", path: "/user/history" },
        ]
      : role === "volunteer"
      ? [
          { name: "Dashboard", path: "/volunteer" },
          { name: "Map View", path: "/volunteer/map" },
        ]
      : role === "admin"
      ? [
          { name: "Dashboard", path: "/admin" },
          { name: "Users", path: "/admin/users" },
          { name: "Volunteers", path: "/admin/volunteers" },
          { name: "Alerts", path: "/admin/alerts" },
          { name: "Safe Zones", path: "/admin/safe-zones" },
        ]
      : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800 relative">
      {/* Brand Section - Navigates to user's specific dashboard */}
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => navigate(dashboardPath)}
      >
        <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />
        </div>
        <div>
          <span className="text-white font-semibold text-lg">Kavach</span>
          <span className="ml-2 text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded capitalize">
            {role === "admin" ? "Admin Portal" : role === "volunteer" ? "Responder Console" : "Women Safety Platform"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      {navLinks.length > 0 && (
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === dashboardPath}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-white font-medium border-b-2 border-red-500 pb-1"
                    : "text-zinc-400 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* User Actions & Dropdown */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <Bell className="w-5 h-5 text-zinc-300" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-zinc-900 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white font-medium">
              {userName.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="text-sm text-white font-medium">{userName}</span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-1 z-50">
              <div className="px-4 py-2 border-b border-zinc-800">
                <p className="text-xs font-medium text-white">{userName}</p>
                <p className="text-[10px] text-zinc-400 capitalize">{role} Account</p>
              </div>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate(`${dashboardPath}/profile`);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-zinc-400" />
                Profile Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}