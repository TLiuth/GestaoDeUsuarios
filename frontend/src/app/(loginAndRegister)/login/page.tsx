"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const activateDeactivate = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-gray-900 text-4xl">Log in</h1>
      <hr className="text-gray-500"></hr>
      <input
        className="w-full bg-gray-100 rounded px-3 py-2"
        placeholder="email"
        name="emailInput"
      />
      <div className="flex justify-center gap-2">
        <input
          className="w-full bg-gray-100 rounded px-3 py-2"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          name="passwordInput"
        />
        <button
          type="button"
          onClick={activateDeactivate}
          className="text-gray-900 bg-gray-500 border-gray-200 hover:bg-gray-200 p-2 hover:border-gray-500 border-2 rounded-2xl"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
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
    </div>
  );
}
