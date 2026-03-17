"use client";

import useEditUser from "@/src/app/hooks/useEditUser";
import React, { useEffect } from "react";

export default function UserInfo({
  onUserUpdated,
}: {
  onUserUpdated?: () => void;
}) {
  const {
    isEditing,
    setEditing,
    // setEditingPassword,
    fetchError,
    name,
    id,
    changeName,
    email,
    changeEmail,
    password,
    changePassword,
    setUserInfo,
    submitChanges,
    formError,
    fieldError,
    succesMessage,
  } = useEditUser(onUserUpdated);

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <div className="bg-squareBackground-gray rounded-2xl grid grid-cols-2 justify-between gap-4 inset-shadow-2xs">
      <div className="flex flex-col p-5 gap-x-10">
        <div>
          <h1 className="text-4xl font-bold px-3 text-gray-900">User Info</h1>
        </div>
        <div className="flex gap-3 py-2">
          <h3 className="text-md font-bold px-3 text-gray-900">Name: </h3>
          <input
            className="read-only:bg-gray-500 bg-gray-300 rounded-sm text-gray-900 px-2"
            value={name}
            readOnly={!isEditing}
            onChange={(e) => changeName(e.target.value)}
          ></input>
          <button
            onClick={() => setEditing(!isEditing)}
            className="bg-yellow-500 rounded-sm active:bg-yellow-800 p-1 text-sm"
          >
            Toggle Editing
          </button>
        </div>
        <div className="flex gap-3">
          <h3 className="text-md font-bold px-3 text-gray-900">Email: </h3>
          <input
            className="read-only:bg-gray-500 bg-gray-300 rounded-sm text-gray-900 px-2"
            readOnly={!isEditing}
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
          ></input>
          <button
            onClick={() => submitChanges()}
            className="bg-green-700 rounded-sm active:bg-green-900 p-1 text-sm"
          >
            Submit Changes
          </button>
        </div>
        <div className="flex gap-3 py-2">
          <h3 className="text-md font-bold px-3 text-gray-900"> Password:</h3>
          <input
            className="read-only:bg-gray-500 bg-gray-300 rounded-sm text-gray-900 px-2 w-44"
            value={password}
            placeholder="New password"
            readOnly={!isEditing}
            onChange={(e) => changePassword(e.target.value)}
          ></input>
        </div>
        <div className="flex">
          <h3 className="text-md font-bold px-3 text-gray-900">User ID: </h3>
          <h3 className="text-md font-bold px-1 text-gray-900">{id}</h3>
        </div>
      </div>

      <div>
        <div className="text-gray-900 flex flex-col p-5 gap-x-10 h-1/2">
          <h3 className="text-green-700 text-sm ">{succesMessage}</h3>
          <h3 className="text-red-700 text-sm ">{formError}</h3>
          <h3 className="text-red-700 text-sm ">{fieldError.name}</h3>
          <h3 className="text-red-700 text-sm ">{fieldError.email}</h3>
          <h3 className="text-red-700 text-sm ">{fieldError.password}</h3>
        </div>
        <div className="flex flex-col gap-2 text-gray-900">
          <div className="flex gap-1 items-baseline">
            <h2 className="text-gray-900 bold">Current project:</h2>
            <h3 className="text-gray-900 text-sm">Recruits training</h3>
          </div>
          <div className="flex gap-1 items-baseline">
            <h2 className="text-gray-900 bold">Department:</h2>
            <h3 className="text-gray-900 text-sm">Human Resources</h3>
          </div>
          <div className="flex gap-1 items-baseline">
            <h2 className="text-gray-900 bold">Status:</h2>
            <h3 className="text-green-900 text-sm">Active</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
