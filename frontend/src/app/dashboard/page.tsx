import Pagina from "@/src/components/template/Pagina";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default async function page() {
  const cookieStore = await cookies();

  let ok = false;
  try {
    const res = await fetch(`${API_URL}/auth/ping`, {
      method: "GET",
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    ok = res.ok;
    console.log(`>>> ${res}`);
    console.log(
      `### Differences: ${ok} | ${res.ok} >> ${Boolean(ok)} | ${Boolean(res.ok)}`,
    );
  } catch (error) {
    console.log(`>>> Error on trying to ping for authentication: ${error}`);
    throw error;
  }

  if (!ok) {
    console.log(">>> Unathourized. Redirecting");
    redirect("/login");
  }

  return (
    <Pagina>
      <div className="text-5xl text-gray-900">Protected Dashboard</div>
    </Pagina>
  );
}
