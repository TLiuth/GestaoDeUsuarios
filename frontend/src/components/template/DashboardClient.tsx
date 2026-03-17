"use client";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import ShowUsers from "./ShowUsers";

export default function DashboardClient() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleUserUpdate = () => setRefreshKey((v) => v + 1);

  return (
    <div className="flex flex-col gap-6">
      <UserInfo onUserUpdated={handleUserUpdate} />
      <ShowUsers refreshKey={refreshKey} />
    </div>
  );
}
