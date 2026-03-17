import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function useReadSignInForm() {
  // Data handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});
    try {
      const res = await fetch(`${API_URL}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status == 400 && Array.isArray(data?.message)) {
          const nextErrors: FieldErrors = {};

          for (const msg of data.message as string[]) {
            const lower = msg.toLowerCase();

            if (lower.includes("name"))
              nextErrors.name = msg.charAt(0).toUpperCase() + msg.slice(1);
            else if (lower.includes("email"))
              nextErrors.email = "Not a valid email";
            else if (lower.includes("password"))
              nextErrors.password = msg.charAt(0).toUpperCase() + msg.slice(1);
            else setFormError(msg.charAt(0).toUpperCase() + msg.slice(1));
          }

          setFieldErrors(nextErrors);
        } else if (res.status === 409) {
          setFormError(data?.message ?? "Email already registered");
        } else {
          setFormError("Unable to create account right now. Try again later");
        }

        return;
      }

      // after succesfull account creation, authenticates
      await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(`>>> Sign In account request failed: ${error}`);
    } finally {
      setIsSubmitting(false);
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
    isSubmitting,
    formError,
    fieldErrors,
  };
}
