"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import dummyUsers from "@/data/users";
import UserDetailModal from "./UserDetailModal";

export default function UserManager() {
  const [users, setUsers] = useState(dummyUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [viewingUser, setViewingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showTablePasswords, setShowTablePasswords] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortBy === field) {
      return sortOrder === "asc" ? (
        <ChevronUp className="inline w-4 h-4 ml-1" />
      ) : (
        <ChevronDown className="inline w-4 h-4 ml-1" />
      );
    } else {
      return <ChevronDown className="inline w-4 h-4 ml-1 text-gray-500" />;
    }
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const getValue = (u) => {
      switch (sortBy) {
        case "name":
        case "email":
          return u[sortBy].toLowerCase();
        case "password":
          return u.password.length;
        case "status":
          return u.subscribed ? 1 : 0;
        case "favorite":
          return u.favorite.length;
        default:
          return 0;
      }
    };
    const aVal = getValue(a);
    const bVal = getValue(b);
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#1b2838] p-6 rounded-xl shadow-xl text-white space-y-6">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold">User Manager</h2>
        <span className="text-sm text-gray-400">{users.length} users</span>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search name or email..."
          className="px-3 py-2 bg-[#2e3f4f] text-white rounded-md placeholder-gray-400 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded-lg border border-[#3a5a70]">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#22384e] sticky top-0 z-10">
            <tr className="text-left text-gray-300 uppercase text-xs tracking-wider">
              <th className="p-3 cursor-pointer" onClick={() => handleSort("name")}>Name {renderSortIcon("name")}</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("email")}>Email {renderSortIcon("email")}</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("password")}>Password {renderSortIcon("password")}</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("status")}>Status {renderSortIcon("status")}</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("favorite")}>Favorites {renderSortIcon("favorite")}</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, idx) => {
              const isEditing = editingUserId === user.id;
              const bgColor = idx % 2 === 0 ? "bg-[#1e2e3e]" : "bg-[#243447]";
              return (
                <tr key={user.id} className={`${bgColor} hover:bg-[#2f3f50] transition duration-200`}>
                  {isEditing ? (
                    <>
                      <td className="p-3">
                        <input
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          className="w-full px-3 py-1 rounded bg-[#2e3f4f] text-white outline-none"
                        />
                      </td>
                      <td className="p-3 text-gray-400 italic">Not editable</td>
                      <td className="p-3">
                        <select
                          value={editedUser.subscribed ? "yes" : "no"}
                          onChange={(e) => setEditedUser({ ...editedUser, subscribed: e.target.value === "yes" })}
                          className="w-full px-2 py-1 rounded bg-[#2e3f4f] text-white"
                        >
                          <option value="yes">Subscribed</option>
                          <option value="no">Not Subscribed</option>
                        </select>
                      </td>
                      <td className="p-3 text-gray-400 italic">-</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        <button onClick={() => setEditingUserId(null)} className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                          <X size={14} /> Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3 text-gray-300">{user.email}</td>
                      <td className="p-3 font-mono text-sm">
                        {showTablePasswords[user.id] ? user.password : "•".repeat(user.password.length)}
                        <button
                          onClick={() => setShowTablePasswords((prev) => ({ ...prev, [user.id]: !prev[user.id] }))}
                          className="ml-2 text-cyan-400 hover:text-cyan-300"
                          title="Toggle Password"
                        >
                          {showTablePasswords[user.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.subscribed ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"}`}>
                          {user.subscribed ? "Subscribed" : "Not Subscribed"}
                        </span>
                      </td>
                      <td className="p-3">{user.favorite.length}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => setViewingUser(user)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                          <Eye size={14} /> View
                        </button>
                        <button onClick={() => handleEdit(user)} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                          <Pencil size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded inline-flex items-center gap-1">
                          <Trash2 size={14} /> Delete
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

      {viewingUser && (
        <UserDetailModal
          user={viewingUser}
          onClose={() => {
            setViewingUser(null);
            setShowPassword(false);
          }}
          showPassword={showPassword}
          togglePassword={() => setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
}
