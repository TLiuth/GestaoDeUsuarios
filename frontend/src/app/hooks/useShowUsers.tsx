import getUsersList, { User } from "@/src/services/getUsersList";
import React, { useState } from "react";

export type SortKey = "id" | "name" | "email";

export default function useShowUsers() {
  const [usersList, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const [sortKey, setSort] = useState("id");

  function sortUsers(key: SortKey) {
    setSort(key);

    setUsers((prev) => {
      const next = [...prev];

      if (key === "id") {
        next.sort((a, b) => a.id - b.id);
      } else if (key === "email") {
        next.sort((a, b) => a.email.localeCompare(b.email));
      } else if (key === "name") {
        next.sort((a, b) => a.name.localeCompare(b.name));
      }

      return next;
    });
  }

  async function fetchUsers() {
    try {
      const users = await getUsersList();
      setUsers(users);
      setError("");
    } catch {
      setError("Could not load users.");
    }
  }

  function addUser() {
    console.log("adding user");
  }
  return {
    usersList,
    setUsers,
    error,
    setError,
    sortKey,
    sortUsers,
    addUser,
    fetchUsers,
  };
}
