"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useReadSignInForm from "../../hooks/useReadSignInForm";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    name,
    changeName,
    email,
    changeEmail,
    password,
    changePassword,
    createAccount,
    isSubmitting,
    formError,
    fieldErrors,
  } = useReadSignInForm();

  const activateDeactivate = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        createAccount();
      }
    });
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-gray-900 text-4xl">Sign In</h1>
      <hr className="text-gray-500"></hr>
      <input
        className="w-full bg-gray-100 rounded px-3 py-2 text-gray-900"
        placeholder="name"
        name="nameInput"
        value={name}
        onChange={(e) => changeName(e.target.value)}
      ></input>
      {fieldErrors.name && (
        <p className="text-red-700 text-sm fixed bottom-40 right-20">
          - {fieldErrors.name}.
        </p>
      )}
      <input
        className="w-full bg-gray-100 rounded px-3 py-2 text-gray-900"
        placeholder="email"
        name="emailInput"
        value={email}
        onChange={(e) => changeEmail(e.target.value)}
      />
      {fieldErrors.email && (
        <p className="text-red-700 text-sm fixed bottom-35 right-20">
          - {fieldErrors.email}.
        </p>
      )}
      <div className="flex justify-center gap-2">
        <input
          className="w-full bg-gray-100 rounded px-3 py-2 text-gray-900"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          name="passwordInput"
          value={password}
          onChange={(e) => changePassword(e.target.value)}
        />
        <button
          type="button"
          onClick={activateDeactivate}
          className="text-gray-900 bg-gray-500 border-gray-200 hover:bg-gray-200 p-2 hover:border-gray-500 border-2 rounded-2xl"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {fieldErrors.password && (
          <p className="text-red-700 text-sm fixed bottom-30 right-20">
            - {fieldErrors.password}.
          </p>
        )}
      </div>
      <button
        type="button"
        disabled={isSubmitting}
        onClick={createAccount}
        className="rounded-md bg-blue-900 text-2xl text-gray-900 hover:bg-blue-500"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>

      <hr className="text-gray-500"></hr>
      <div className="flex items-end gap-1">
        <h5 className="text-sm text-gray-900">Already have an account?</h5>
        <Link href="/login" className="text-sm text-gray-900 italic underline">
          Log In
        </Link>
      </div>
    </div>
  );
}
