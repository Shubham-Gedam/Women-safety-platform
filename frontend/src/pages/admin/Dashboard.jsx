import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardStats from "../../components/admin/DashboardStats";
import AlertsTable from "../../components/admin/AlertsTable";
import UsersTable from "../../components/admin/UsersTable";
import VolunteersTable from "../../components/admin/VolunteersTable";
import SafeZones from "../../components/admin/SafeZones";
import { getUsers, getVolunteers, getAllAlerts, verifyVolunteer } from "../../services/admin.service";

function timeAgo(dateString) {
  if (!dateString) return "—";
  const mins = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
  if (isNaN(mins) || mins < 1) return "just now";
  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const statusLabels = {
  pending: "Active",
  accepted: "Active",
  resolved: "Resolved",
  cancelled: "Cancelled",
};

export default function AdminDashboard() {
  const context = useOutletContext();
  const activeTab = context?.activeTab || "dashboard";

  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [usersRes, volunteersRes, alertsRes] = await Promise.all([
        getUsers(),
        getVolunteers(),
        getAllAlerts(),
      ]);
      setUsers(usersRes?.users || []);
      setVolunteers(volunteersRes?.volunteers || []);
      setAlerts(alertsRes?.alerts || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleVerify(userId) {
    try {
      await verifyVolunteer(userId);
      const { volunteers: updated } = await getVolunteers();
      setVolunteers(updated || []);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  }

  const userMap = Object.fromEntries(
    users.map((u) => [
      u._id,
      `${u.fullname?.firstname || "User"} ${u.fullname?.lastname || ""}`.trim(),
    ])
  );

  const resolvedAlerts = alerts.filter((a) => a.status === "resolved" && a.resolvedAt);
  const avgResolutionMins = resolvedAlerts.length
    ? (
        resolvedAlerts.reduce((sum, a) => {
          const diff = (new Date(a.resolvedAt) - new Date(a.createdAt)) / 60000;
          return sum + (isNaN(diff) ? 0 : diff);
        }, 0) / resolvedAlerts.length
      ).toFixed(1)
    : 0;

  const stats = {
    totalUsers: users.length,
    activeAlerts: alerts.filter((a) => a.status === "pending" || a.status === "accepted").length,
    volunteers: volunteers.length,
    avgResolution: avgResolutionMins,
  };

  const alertLogs = alerts.map((a) => ({
    id: a._id ? a._id.slice(-6).toUpperCase() : "N/A",
    user: userMap[a.userId] || "Unknown",
    time: timeAgo(a.createdAt),
    status: statusLabels[a.status] || a.status,
    responder: a.assignedVolunteerId ? userMap[a.assignedVolunteerId] || "Assigned" : "—",
  }));

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-zinc-400">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Stats Cards (Persistent on all tabs) */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">System Command Center</h1>
          <p className="text-xs text-zinc-500">Real-time oversight and responder management</p>
        </div>
        <span className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-lg font-medium">
          Live Monitoring
        </span>
      </div>

      <DashboardStats stats={stats} />

      {/* Tab Specific Content */}
      {(activeTab === "dashboard" || activeTab === "alerts" || activeTab === "incidents" || activeTab === "incident-history") && (
        <AlertsTable alerts={alertLogs} />
      )}

      {activeTab === "users" && <UsersTable users={users} />}

      {activeTab === "volunteers" && (
        <VolunteersTable volunteers={volunteers} onVerify={handleVerify} />
      )}

      {(activeTab === "zones" || activeTab === "safe-zones") && (
        <SafeZones role="admin" />
      )}
    </div>
  );
}