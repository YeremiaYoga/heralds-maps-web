"use client";

import { useState } from "react";
import { Pencil, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import dummyUsers from "@/data/users";
import { maps } from "@/data/maps";

export default function UserManager() {
  const [users, setUsers] = useState(dummyUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [viewingUser, setViewingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // for modal
  const [showTablePasswords, setShowTablePasswords] = useState({}); // for table

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUserId ? editedUser : u))
    );
    setEditingUserId(null);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="bg-[#1b2838] p-6 rounded-xl shadow-xl text-white space-y-6">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold">User Manager</h2>
        <span className="text-sm text-gray-400">{users.length} users</span>
      </div>

      <div className="overflow-auto rounded-lg border border-[#3a5a70]">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#22384e] sticky top-0 z-10">
            <tr className="text-left text-gray-300 uppercase text-xs tracking-wider">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Password</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const isEditing = editingUserId === user.id;
              const bgColor = idx % 2 === 0 ? "bg-[#1e2e3e]" : "bg-[#243447]";
              return (
                <tr
                  key={user.id}
                  className={`${bgColor} hover:bg-[#2f3f50] transition duration-200`}
                >
                  {isEditing ? (
                    <>
                      <td className="p-3">
                        <input
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white outline-none"
                        />
                      </td>
                      <td className="p-3 text-gray-400 italic">Not editable</td>
                      <td className="p-3">
                        <select
                          value={editedUser.subscribed ? "yes" : "no"}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              subscribed: e.target.value === "yes",
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-[#2e3f4f] text-white"
                        >
                          <option value="yes">Subscribed</option>
                          <option value="no">Not Subscribed</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3 text-gray-300">{user.email}</td>
                      <td className="p-3 font-mono text-sm">
                        {showTablePasswords[user.id]
                          ? user.password
                          : "•".repeat(user.password.length)}
                        <button
                          onClick={() =>
                            setShowTablePasswords((prev) => ({
                              ...prev,
                              [user.id]: !prev[user.id],
                            }))
                          }
                          className="ml-2 text-cyan-400 hover:text-cyan-300"
                          title="Toggle Password"
                        >
                          {showTablePasswords[user.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            user.subscribed
                              ? "bg-green-700 text-green-100"
                              : "bg-red-700 text-red-100"
                          }`}
                        >
                          {user.subscribed ? "Subscribed" : "Not Subscribed"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setViewingUser(user)}
                          className="bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal View User */}
      {viewingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2b] text-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <h3 className="text-xl font-bold">User Detail</h3>
              <button
                onClick={() => {
                  setViewingUser(null);
                  setShowPassword(false);
                }}
                className="text-gray-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Name:</strong> {viewingUser.name}</p>
              <p><strong>Email:</strong> {viewingUser.email}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    viewingUser.subscribed ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {viewingUser.subscribed ? "Subscribed" : "Not Subscribed"}
                </span>
              </p>
              <p>
                <strong>Password:</strong>{" "}
                <span className="bg-[#2e3f4f] px-2 py-1 rounded font-mono">
                  {showPassword
                    ? viewingUser.password
                    : "•".repeat(viewingUser.password.length)}
                </span>
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 text-sm text-cyan-400 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </p>

              <div>
                <strong>Favorite Maps:</strong>
                {viewingUser.favorite.length === 0 ? (
                  <p className="text-gray-400 mt-1">No favorites</p>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {maps
                      .filter((map) => viewingUser.favorite.includes(map.id))
                      .map((map) => (
                        <li
                          key={map.id}
                          className="flex items-center gap-3 bg-[#263343] p-2 rounded"
                        >
                          <img
                            src={map.image}
                            alt={map.title}
                            className="w-16 h-16 object-cover rounded border border-gray-700"
                          />
                          <div>
                            <p className="font-semibold">{map.title}</p>
                            <p className="text-xs text-gray-400">
                              {map.categories?.join(", ")}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
