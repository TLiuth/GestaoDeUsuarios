"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useReadLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function changeEmail(email: string) {
    setEmail(email);
  }

  function changePassword(password: string) {
    setPassword(password);
  }

  async function submitLogin() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        console.log(">>> Invalid credentials");
        console.log(`>>> Status: ${res.status}`);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(`>>> Login request failed: ${error}`);
    }
  }

  return { email, changeEmail, password, changePassword, submitLogin };
}
