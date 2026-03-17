"use client";

import getUserInfo from "@/src/services/getUserInfo";
import { Form } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function useEditUser(onUserUpdated?: () => void) {
  // to activate or deactivate editing user info
  const [isEditing, setEditing] = useState(false);

  // Deal with fetch failue
  const [fetchError, setFetchError] = useState("");

  // to handle error on info update
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [succesMessage, setSuccessMessage] = useState("");

  // to change the info itself
  const [originalName, setOriginalName] = useState<string>("");
  const [originalEmail, setOriginalEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [id, setId] = useState(0);

  async function setUserInfo() {
    try {
      const user: User = await getUserInfo();

      user;

      setOriginalName(user.name);
      setOriginalEmail(user.email);

      changeName(user.name);
      changeEmail(user.email);

      setId(user.id);
    } catch (error) {
      setFetchError(error as string);
      throw new Error(`Failure to load user information`);
    }
  }

  function changeName(name: string) {
    setName(name);
  }

  function changeEmail(email: string) {
    setEmail(email);
  }

  function changePassword(password: string) {
    setPassword(password);
  }

  async function submitChanges() {
    setIsSubmitting(true);
    setFormError("");
    setFieldError({});
    setSuccessMessage("");

    const trimmedName = (name ?? "").trim();
    const trimmedEmail = (email ?? "").trim();
    const trimmedPassword = (password ?? "").trim();

    const payload: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (trimmedName != originalName) {
      payload.name = trimmedName;
    }

    if (trimmedEmail != originalEmail) {
      payload.email = trimmedEmail;
    }

    if (trimmedPassword != "") {
      payload.password = trimmedPassword;
    }

    if (Object.keys(payload).length === 0) {
      setFormError("No changes to save.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/user/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 400 && Array.isArray(data?.message)) {
          const nextErrors: FieldErrors = {};

          for (const msg of data.message as string[]) {
            const lowerMsg = msg.toLowerCase();

            if (lowerMsg.includes("name"))
              nextErrors.name = msg.charAt(0).toUpperCase() + msg.slice(1);
            else if (lowerMsg.includes("email"))
              nextErrors.email = "Not a valid email";
            else if (lowerMsg.includes("password"))
              nextErrors.password = msg.charAt(0).toUpperCase() + msg.slice(1);
            else setFormError(msg);
          }

          setFieldError(nextErrors);
        } else if (res.status === 409) {
          setFormError(data?.message ?? "Email already registered");
        } else {
          console.log(data?.message);
          setFormError(
            "Unable to update information right now. Try again later.",
          );
        }
        return;
      }

      const updatedUser = data as User | null;

      if (updatedUser) {
        if (payload.name) {
          setName(updatedUser.name);
          setOriginalName(updatedUser.name);
        }
        if (payload.email) {
          setEmail(updatedUser.email);
          setOriginalEmail(updatedUser.email);
        }

        setSuccessMessage("User info updated Succesfully!");
        onUserUpdated?.();
      }
      setEditing(false);
      setPassword("");

      return;
    } catch (error) {
      console.log(`>>> Update user info request failed: ${error}`);
      setFormError(error as string);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isEditing,
    setEditing,
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
  };
}
