"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import users from "@/data/users";

export default function SubscriptionManager() {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const getRemainingDays = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const subscribedUsers = users
    .filter((u) => u.subscribed && u.subscriptionEnd)
    .map((u) => {
      const endDate = new Date(u.subscriptionEnd);
      const startDate = new Date(
        u.subscriptionType === "yearly"
          ? new Date(endDate).setFullYear(endDate.getFullYear() - 1)
          : new Date(endDate).setMonth(endDate.getMonth() - 1)
      );
      return {
        ...u,
        startDate: new Date(startDate),
        remainingDays: getRemainingDays(u.subscriptionEnd),
      };
    })
    .filter((u) =>
      [u.name, u.email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

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

  const sortedUsers = [...subscribedUsers].sort((a, b) => {
    const getValue = (u) => {
      switch (sortBy) {
        case "name":
        case "email":
        case "subscriptionTier":
        case "subscriptionType":
          return u[sortBy]?.toLowerCase();
        case "start":
          return u.startDate.getTime();
        case "end":
          return new Date(u.subscriptionEnd).getTime();
        case "remaining":
          return u.remainingDays;
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
    <div className="bg-[#1b2838] p-6 rounded-lg text-white shadow-lg space-y-6">
      <h2 className="text-2xl font-bold border-b border-gray-600 pb-2">
        Active Subscriptions
      </h2>

      {/* Search Input */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 w-full bg-[#2a3b4c] rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-[#2a475e] text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                Name {renderSortIcon("name")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("email")}>
                Email {renderSortIcon("email")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("start")}>
                Start {renderSortIcon("start")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("end")}>
                End {renderSortIcon("end")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("remaining")}>
                Remaining {renderSortIcon("remaining")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("subscriptionTier")}>
                Tier {renderSortIcon("subscriptionTier")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("subscriptionType")}>
                Type {renderSortIcon("subscriptionType")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a3b4c]">
            {sortedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#2e3f50] transition duration-200"
              >
                <td className="px-4 py-3 font-semibold text-white">{user.name}</td>
                <td className="px-4 py-3 text-gray-300">{user.email}</td>
                <td className="px-4 py-3">{formatDate(user.startDate)}</td>
                <td className="px-4 py-3">{formatDate(user.subscriptionEnd)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      user.remainingDays > 7
                        ? "bg-green-700 text-green-200"
                        : user.remainingDays > 0
                        ? "bg-yellow-700 text-yellow-200"
                        : "bg-red-700 text-red-200"
                    }`}
                  >
                    {user.remainingDays > 0
                      ? `${user.remainingDays} day${user.remainingDays > 1 ? "s" : ""}`
                      : "Expired"}
                  </span>
                </td>
                <td className="px-4 py-3 capitalize text-blue-300">{user.subscriptionTier}</td>
                <td className="px-4 py-3 capitalize text-purple-300">{user.subscriptionType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
