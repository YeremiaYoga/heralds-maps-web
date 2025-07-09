"use client";

import users from "@/data/users";

export default function SubscriptionManager() {
  const subscribedUsers = users.filter((u) => u.subscribed && u.subscriptionEnd);

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

  return (
    <div className="bg-[#1b2838] p-6 rounded-lg text-white shadow-lg space-y-6">
      <h2 className="text-2xl font-bold border-b border-gray-600 pb-2">
        Active Subscriptions
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-[#2a475e] text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">Remaining</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a3b4c]">
            {subscribedUsers.map((user) => {
              const endDate = new Date(user.subscriptionEnd);
              const startDate = new Date(
                user.subscriptionType === "yearly"
                  ? endDate.setFullYear(endDate.getFullYear() - 1)
                  : endDate.setMonth(endDate.getMonth() - 1)
              );
              const remaining = getRemainingDays(user.subscriptionEnd);

              return (
                <tr
                  key={user.id}
                  className="hover:bg-[#2e3f50] transition duration-200"
                >
                  <td className="px-4 py-3 font-semibold text-white">{user.name}</td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3">{formatDate(startDate)}</td>
                  <td className="px-4 py-3">{formatDate(user.subscriptionEnd)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        remaining > 7
                          ? "bg-green-700 text-green-200"
                          : remaining > 0
                          ? "bg-yellow-700 text-yellow-200"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {remaining > 0 ? `${remaining} day${remaining > 1 ? "s" : ""}` : "Expired"}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize text-blue-300">{user.subscriptionTier}</td>
                  <td className="px-4 py-3 capitalize text-purple-300">{user.subscriptionType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
