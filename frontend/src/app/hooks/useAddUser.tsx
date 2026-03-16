"use client";

import React, { useState } from "react";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

type UseAddUserOptions = {
  onSuccess?: () => Promise<void> | void;
};

export default function useAddUser({ onSuccess }: UseAddUserOptions = {}) {
  // Data handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function changeName(name: string) {
    setName(name);
  }

  function changeEmail(email: string) {
    setEmail(email);
  }

  function changePassword(password: string) {
    setPassword(password);
  }

  async function createAccount() {
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/user/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        },
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 400 && Array.isArray(data?.message)) {
          const nextErrors: FieldErrors = {};

          for (const msg of data.message as string[]) {
            const lower = msg.toLowerCase();

            if (lower.includes("name")) nextErrors.name = msg;
            else if (lower.includes("email"))
              nextErrors.email = "Not a valid email";
            else if (lower.includes("password")) nextErrors.password = msg;
            else setFormError(msg);
          }

          setFieldErrors(nextErrors);
        } else if (res.status === 409) {
          setFormError(data?.message ?? "Email already registered");
        } else {
          setFormError("Unable to create account right now. Try again later!");
        }

        return;
      }
    } catch (error) {
      console.log(`Creating user failed: ${error}`);
    } finally {
      setIsSubmitting(false);
    }

    await onSuccess?.();

    setName("");
    setEmail("");
    setPassword("");
    return;
  }

  return {
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
  };
}
