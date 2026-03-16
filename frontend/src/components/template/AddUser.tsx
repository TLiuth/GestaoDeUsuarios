"use client";

import useAddUser from "@/src/app/hooks/useAddUser";
import React from "react";

type AddUserProps = {
  onCreated?: () => Promise<void> | void;
};

export default function AddUser({ onCreated }: AddUserProps) {
  const {
    changeName,
    changeEmail,
    changePassword,
    createAccount,
    isSubmitting,
    formError,
    fieldErrors,
  } = useAddUser({ onSuccess: onCreated });

  return (
    <div className="items-center px-10 py-2 flex gap-8">
      <div className=" flex gap-2">
        <div className="relative flex flex-col gap-2 py-1 pb-3">
          <input
            placeholder="Name"
            className="px-3 rounded-sm bg-blue-300 text-gray-900"
            onChange={(e) => changeName(e.target.value)}
          ></input>
          {fieldErrors.name && (
            <p className="absolute left-0 top-full mt-1 text-sm text-red-700 whitespace-nowrap">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="relative flex flex-col gap-2 py-1 pb-3">
          <input
            placeholder="Email"
            className="px-3 rounded-sm bg-blue-300 text-gray-900"
            onChange={(e) => changeEmail(e.target.value)}
          ></input>
          {fieldErrors.email && (
            <p className="absolute left-0 top-full mt-1 text-sm text-red-700 whitespace-nowrap">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="relative flex flex-col gap-2 py-1 pb-3 w-80">
          <input
            placeholder="Password"
            className="px-3 rounded-sm bg-blue-300 text-gray-900"
            type="password"
            onChange={(e) => changePassword(e.target.value)}
          ></input>
          {fieldErrors.password && (
            <p className="absolute left-1 top-full mt-1 max-w-75 whitespace-normal wrap-break-word text-sm leading-tight text-red-700">
              {fieldErrors.password}
            </p>
          )}
        </div>
      </div>
      <div className="relative">
        <button
          type="button"
          className="bg-yellow-600 rounded-2xl p-2 active:bg-yellow-300"
          onClick={createAccount}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add User"}
        </button>
        {formError && (
          <p className="absolute left-1 top-full mt-1 max-w-75 whitespace-normal wrap-break-word text-sm leading-tight text-red-700">
            {formError}
          </p>
        )}
      </div>
      <hr className="text-gra"></hr>
    </div>
  );
}
