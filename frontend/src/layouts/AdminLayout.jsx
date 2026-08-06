import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL Path ke basis par activeTab set karein
  const getTabFromPath = (path) => {
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/alerts")) return "alerts";
    if (path.includes("/admin/safe-zones") || path.includes("/admin/zones")) return "zones";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));

  // Route change hone par activeTab update karein
  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  // Tab click hone par correct URL path par navigate karein
  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "dashboard":
        navigate("/admin");
        break;
      case "users":
        navigate("/admin/users");
        break;
      case "alerts":
        navigate("/admin/alerts");
        break;
      case "zones":
        navigate("/admin/safe-zones");
        break;
      default:
        navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* <Navbar userName="System Administrator" notificationCount={0} navLinks={[]} /> */}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          role="admin"
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Active Tab & Role Context children pages ko pass kar rahe hain */}
          <Outlet context={{ activeTab, setActiveTab, role: "admin" }} />
        </main>
      </div>
    </div>
  );
}