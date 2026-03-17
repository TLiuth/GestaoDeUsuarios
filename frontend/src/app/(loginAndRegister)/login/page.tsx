"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useReadLoginForm from "../../hooks/useReadLoginForm";

export async function loginButton() {
  console.log(">>> Fazendo login");
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const activateDeactivate = () => {
    setShowPassword((prev) => !prev);
  };

  // info for login
  const { changeEmail, changePassword, submitLogin, isSubmitting, formError } =
    useReadLoginForm();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitLogin();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [submitLogin]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-gray-900 text-4xl">Log in</h1>
      <hr className="text-gray-500"></hr>
      <input
        className="w-full bg-gray-100 rounded px-3 py-2 text-gray-900"
        placeholder="email"
        name="emailInput"
        onChange={(e) => changeEmail(e.target.value)}
      />
      <div className="flex justify-center gap-2">
        <input
          className="w-full bg-gray-100 rounded px-3 py-2 text-gray-900"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          name="passwordInput"
          onChange={(e) => changePassword(e.target.value)}
        />
        <button
          type="button"
          onClick={activateDeactivate}
          className="text-gray-900 bg-gray-500 border-gray-200 hover:bg-gray-200 p-2 hover:border-gray-500 border-2 rounded-2xl"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button
        type="button"
        onClick={submitLogin}
        disabled={isSubmitting}
        className="rounded-md bg-blue-900 text-2xl text-gray-900 hover:bg-blue-500"
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
      <hr className="text-gray-500"></hr>
      <div className="flex items-end gap-1">
        <h5 className="text-sm text-gray-900">Doesn't have an account?</h5>
        <Link
          href="/createAccount"
          className="text-sm text-gray-900 italic underline"
        >
          Sign In
        </Link>
      </div>
      <div className="text-gray-900 h-8 text-sm">{formError}</div>
    </div>
  );
}
