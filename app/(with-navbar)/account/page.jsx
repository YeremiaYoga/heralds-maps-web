"use client";

import { useState } from "react";
import Subscription from "./Subscription";
import ManageAccount from "./ManageAccount";
import ManageBilling from "./ManageBilling";
import ConnectPatreon from "./ConnectPatreon";
import SelectMenu from "./SelectMenu";

const tabComponents = {
  subscription: {
    label: "Subscription",
    component: Subscription,
  },
  manageAccount: {
    label: "Manage Account",
    component: ManageAccount,
  },
  manageBilling: {
    label: "Billing",
    component: ManageBilling,
  },
  connectPatreon: {
    label: "Connect Patreon",
    component: ConnectPatreon,
  },
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("subscription");

  const ActiveComponent = tabComponents[activeTab]?.component;

  return (
    <div className="min-h-screen flex justify-center  px-4 text-white">
      <div className="w-full  bg-[#1a1f2b] rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden p-10">
        {/* Sidebar */}
        <SelectMenu
          tabs={tabComponents}
          selected={activeTab}
          onSelect={setActiveTab}
        />

        {/* Content */}
        <div className="flex-1 p-6">
          {ActiveComponent ? <ActiveComponent /> : <div>Not Found</div>}
        </div>
      </div>
    </div>
  );
}
