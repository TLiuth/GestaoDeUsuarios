"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
).replace(/\/$/, "");

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function useReadLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function changeEmail(email: string) {
    setEmail(email);
  }

  function changePassword(password: string) {
    setPassword(password);
  }

  async function submitLogin() {
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 400 && Array.isArray(data?.message)) {
          const nextErrors: FieldErrors = {};

          for (const msg of data.message as string[]) {
            const lower = msg.toLowerCase();
            if (lower.includes("email"))
              nextErrors.email = msg.charAt(0).toUpperCase() + msg.slice(1);
            else if (lower.includes("password"))
              nextErrors.password = msg.charAt(0).toUpperCase() + msg.slice(1);
            else setFormError(msg.charAt(0).toUpperCase() + msg.slice(1));
          }

          setFieldErrors(nextErrors);

          return;
        } else {
          setFormError("Email or password incorrect.");

          return;
        }
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setFormError(
        `Unable to reach the server. Check if backend is running and NEXT_PUBLIC_API_URL is correct. (${message})`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    changeEmail,
    password,
    changePassword,
    submitLogin,
    isSubmitting,
    formError,
    fieldErrors,
  };
}
