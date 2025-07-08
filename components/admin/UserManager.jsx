"use client";

import { useState } from "react";
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
    <div className="bg-[#1b2838] p-6 rounded-lg shadow-md text-white">
   
      <div className="overflow-x-auto rounded-lg border border-[#3a5a70]">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#3a5a70] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subscribed</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Tier</th>
              <th className="p-3 text-left">Ends At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isEditing = editingUserId === user.id;
              return (
                <tr
                  key={user.id}
                  className="border-b border-[#2a3b4c] hover:bg-[#2a3b4c] transition"
                >
                  {isEditing ? (
                    <>
                      <td className="p-3">
                        <input
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, name: e.target.value })
                          }
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, email: e.target.value })
                          }
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white"
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
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={editedUser.subscriptionType || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              subscriptionType: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-[#2e3f4f] text-white"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={editedUser.subscriptionTier || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              subscriptionTier: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-[#2e3f4f] text-white"
                        >
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="date"
                          value={
                            editedUser.subscriptionEnd
                              ? new Date(editedUser.subscriptionEnd).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              subscriptionEnd: e.target.value
                                ? new Date(e.target.value).toISOString()
                                : null,
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-[#2e3f4f] text-white"
                        />
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-500 text-sm px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="bg-gray-600 hover:bg-gray-500 text-sm px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded font-semibold ${
                            user.subscribed ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {user.subscribed ? "Subscribed" : "Not Subscribed"}
                        </span>
                      </td>
                      <td className="p-3 capitalize">{user.subscriptionType || "-"}</td>
                      <td className="p-3 capitalize">{user.subscriptionTier || "-"}</td>
                      <td className="p-3">
                        {user.subscriptionEnd
                          ? new Date(user.subscriptionEnd).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 hover:bg-red-500 text-sm px-3 py-1 rounded"
                        >
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
