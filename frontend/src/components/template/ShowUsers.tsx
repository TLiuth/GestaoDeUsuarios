"use client";

import useShowUsers, { SortKey } from "@/src/app/hooks/useShowUsers";
import getUsersList, { User } from "@/src/services/getUsersList";
import React, { useEffect, useState } from "react";

export default function ShowUsers() {
  const { usersList, setUsers, error, setError, sortKey, sortUsers, addUser } =
    useShowUsers();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const users = await getUsersList();
        if (active) setUsers(users);
      } catch (err) {
        if (active) setError("Could not load users.");
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-squareBackground-gray rounded-2xl flex flex-col justify-between inset-shadow-2xs">
      <div className="bg-blue-900 rounded-t-2xl grid grid-cols-2 justify-between gap-4 items-center">
        <div className="flex gap-4 align-center px-10 py-5">
          <h3 className="text-gray-900 text-2xl">Sort By: </h3>
          <select
            value={sortKey}
            onChange={(e) => sortUsers(e.target.value as SortKey)}
            className="text-white text-2xl"
          >
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="items-end">
          <button
            onClick={addUser}
            type="button"
            className="bg-yellow-600 rounded-2xl p-2 active:bg-yellow-300"
          >
            Add User
          </button>
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
