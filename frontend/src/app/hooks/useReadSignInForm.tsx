import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useReadSignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

      if (!res.ok) {
        console.log(">>> Invalid credentials");
        console.log(`>>> Status: ${res.status}`);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(`>>> Sign In account request failed: ${error}`);
    }
  }

  return {
    name,
    changeName,
    email,
    changeEmail,
    password,
    changePassword,
    createAccount,
  };
}
