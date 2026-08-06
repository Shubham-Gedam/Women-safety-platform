import { useState, useEffect } from "react";
import GreetingBar from "../../components/user/GreetingBar";
import StatsRow from "../../components/user/StatsRow";
import SOSCard from "../../components/user/SOSCard";
import SafetyTipCard from "../../components/user/SafetyTipCard";
import LiveSafetyMap from "../../components/user/LiveSafetyMap";
import NearbyResponders from "../../components/user/NearbyResponders";
import CurrentStatusCard from "../../components/user/CurrentStatusCard";
import QuickActions from "../../components/user/QuickActions";
import RecentAlerts from "../../components/user/RecentAlerts";
import EmergencyContactsCard from "../../components/user/EmergencyContactsCard";

// Common Components Import
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { UserPlus } from "lucide-react";

import {
  getEmergencyContacts,
  addEmergencyContact,
} from "../../services/user.service";

import { triggerSOS, getHistory } from "../../services/alert.service";

import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  // Modal & Loading States
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const { user } = useAuth();

  const [userLocation, setUserLocation] = useState(null);

  const [stats] = useState({
    alertsToday: 0,
    respondersNearby: 0,
    safeZonesNearby: 0,
    avgResponseTime: 3,
  });

  const [responders] = useState([]);

  const [recentAlerts, setRecentAlerts] = useState([]);

  async function loadContacts() {
    try {
      const res = await getEmergencyContacts();

      const formatted = res.contacts.map((c) => ({
        id: c._id,
        name: c.fullname,
        phone: c.phone,
        email: c.email,
      }));

      setContacts(formatted);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadHistory() {
    try {
      const res = await getHistory();

      const formatted = res.alerts.map((a) => ({
        id: a._id,
        title: "Emergency SOS",
        time: new Date(a.createdAt).toLocaleString(),
        type: a.status === "resolved" ? "Safe" : "Emergency",
      }));

      setRecentAlerts(formatted);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddContact = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      await addEmergencyContact({
        fullname: newContact.name,
        relationship: "Other",
        phone: newContact.phone,
        email: newContact.email,
        priority: contacts.length + 1,
      });

      await loadContacts();

      setNewContact({
        name: "",
        phone: "",
        email: "",
      });

      setIsContactModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save contact");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSOS = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await triggerSOS(position.coords.latitude, position.coords.longitude);

          alert("SOS Triggered Successfully");

          loadHistory();
        } catch (err) {
          console.error(err);
          alert("Failed to Trigger SOS");
        }
      },
      (err) => {
        console.error(err);
        alert("Location Permission Required");
      },
    );
  };

  useEffect(() => {
    loadContacts();
    loadHistory();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
    );
  }, []);

  return (
    <div className="bg-zinc-950 pb-6">
      <GreetingBar
        firstName={user?.fullname?.firstname || user?.firstname || "User"}
        locationTracking
      />
      <StatsRow stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-4 px-6">
        <div className="space-y-4">
          <SOSCard onTrigger={handleSOS} />
          <SafetyTipCard tip="Share your live trip with a trusted contact before traveling alone at night." />
        </div>

        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-300 font-medium">
                Live Safety Map
              </span>
              <span className="text-xs text-zinc-500">Updated just now</span>
            </div>
            <LiveSafetyMap userLocation={userLocation} nearby={responders} />
          </div>
          <NearbyResponders responders={responders} />
        </div>

        <div className="space-y-4">
          <CurrentStatusCard isSafe />
          <RecentAlerts alerts={recentAlerts} />
          <QuickActions onAction={(key) => console.log(key)} />

          {/* Emergency Contacts with Modal Trigger */}
          <div className="relative">
            <EmergencyContactsCard contacts={contacts} />
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={UserPlus}
                onClick={() => setIsContactModalOpen(true)}
              >
                Add New Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Modal Component */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Add Emergency Contact"
        subtitle="This contact will receive SOS alerts when triggered."
      >
        {isSaving ? (
          <Loader text="Saving contact to secure database..." />
        ) : (
          <form onSubmit={handleAddContact} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Papa / Rahul"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Email <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. papa@example.com"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsContactModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Contact
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
