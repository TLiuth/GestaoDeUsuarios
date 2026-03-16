"use client";

import useShowUsers, { SortKey } from "@/src/app/hooks/useShowUsers";
import getUsersList from "@/src/services/getUsersList";
import React, { useEffect } from "react";
import AddUser from "./AddUser";

export default function ShowUsers() {
  const { usersList, setUsers, error, setError, sortKey, sortUsers } =
    useShowUsers();

  async function fetchUsers() {
    try {
      const users = await getUsersList();
      setUsers(users);
      setError("");
    } catch {
      setError("Could not load users.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-squareBackground-gray rounded-2xl flex flex-col justify-between inset-shadow-2xs">
      <div className="bg-blue-900 rounded-t-2xl flex flex-col py-5 justify-between gap-2">
        <AddUser onCreated={fetchUsers}></AddUser>
        <div className="flex gap-4 align-center px-10 py-2">
          <h3 className="text-gray-900 text-2xl">Sort By: </h3>
          <select
            value={sortKey}
            onChange={(e) => sortUsers(e.target.value as SortKey)}
            className="text-white text-lg"
          >
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5">
        <div>
          {error && <p className="text-red-700">{error}</p>}

          {!error && usersList.length === 0 && (
            <p className="text-gray-900">No users found</p>
          )}

          {usersList.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-3 gap-4 border-b border-gray-400 py-3 text-gray-900"
            >
              <div>{user.id}</div>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-squareBackground-gray rounded-2xl flex flex-col justify-between inset-shadow-2xs"></div>
    </div>
  );
}
