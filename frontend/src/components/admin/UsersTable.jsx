export default function UsersTable({ users = [] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Registered Users</h3>
        <span className="text-xs text-zinc-500">{users.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/60 text-xs text-zinc-500 uppercase border-b border-zinc-800">
            <tr>
              <th className="px-5 py-3">User ID</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-zinc-800/30">
                <td className="px-5 py-3 font-mono text-xs text-zinc-300">
                  {u._id ? u._id.slice(-6).toUpperCase() : "N/A"}
                </td>
                <td className="px-5 py-3 font-medium text-white">
                  {u.fullname?.firstname || "—"} {u.fullname?.lastname || ""}
                </td>
                <td className="px-5 py-3 text-zinc-300">{u.email || "—"}</td>
                <td className="px-5 py-3 text-zinc-400">{u.phone || "—"}</td>
                <td className="px-5 py-3 text-zinc-400 capitalize">{u.role || "user"}</td>
                <td className="px-5 py-3 text-xs text-zinc-500">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}