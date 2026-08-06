import { useEffect, useState } from "react";
import { Heart, Phone, UserPlus } from "lucide-react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { getEmergencyContacts, addEmergencyContact } from "../../services/user.service";

const relationships = ["Father", "Mother", "Brother", "Sister", "Friend", "Spouse", "Relative", "Other"];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", relationship: "Other" });

  async function loadContacts() {
    try {
      const res = await getEmergencyContacts();
      setContacts(res.contacts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await addEmergencyContact({
        fullname: form.name,
        relationship: form.relationship,
        phone: form.phone,
        email: form.email,
        priority: contacts.length + 1,
      });
      await loadContacts();
      setForm({ name: "", phone: "", email: "", relationship: "Other" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save contact");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-zinc-400">Loading contacts...</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Emergency Contacts</h1>
          <p className="text-xs text-zinc-500">These people are notified when you trigger an SOS.</p>
        </div>
        <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setIsModalOpen(true)}>
          Add Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-sm">
          No emergency contacts added yet.
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">
          {contacts.map((c) => (
            <div key={c._id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-sm text-white">{c.fullname}</div>
                  <div className="text-xs text-zinc-500">
                    {c.relationship} · {c.phone}
                    {c.email && ` · ${c.email}`}
                  </div>
                </div>
              </div>
              <a href={`tel:${c.phone}`} className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Phone className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Emergency Contact"
        subtitle="This contact will receive SOS alerts when triggered."
      >
        {isSaving ? (
          <Loader text="Saving contact..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Contact Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Papa / Rahul"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Relationship</label>
              <select
                value={form.relationship}
                onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {relationships.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
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