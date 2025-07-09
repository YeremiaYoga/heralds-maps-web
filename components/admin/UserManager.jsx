"use client";

import { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";
import dummyUsers from "@/data/users";

export default function UserManager() {
  const [users, setUsers] = useState(dummyUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

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
    </div>
  );
}
