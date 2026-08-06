import UserLayout from "../layouts/UserLayout";
import VolunteerLayout from "../layouts/VolunteerLayout";
import AdminLayout from "../layouts/AdminLayout";

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../pages/user/Dashboard";
import VolunteerMap from "../components/volunteer/VolunteerMap";
import VolunteerDashboard from "../pages/volunteer/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import TrackingPage from "../components/user/TrackingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import EmergencyContactsCard from "../components/user/EmergencyContactsCard";
import History from "../components/user/History";
import SafeZones from "../components/user/SafeZones";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes (Nested under UserLayout) */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="contacts" element={<EmergencyContactsCard />} />
        <Route path="history" element={<History />} />
        <Route path="safe-zones" element={<SafeZones />} />
      </Route>

      {/* Volunteer Routes */}
      <Route
        path="/volunteer"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <VolunteerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<VolunteerDashboard />} />
        <Route path="map" element={<VolunteerMap />} />
      </Route>

      {/* Admin Routes */}
      <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<AdminDashboard />} />
  <Route path="volunteers" element={<AdminDashboard />} />
  <Route path="alerts" element={<AdminDashboard />} />
  <Route path="safe-zones" element={<AdminDashboard />} />
</Route>

      {/* Tracking Route */}
      <Route path="/:alertId" element={<TrackingPage />} />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
}