import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default async function getCookiesStore(){
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/auth/ping`, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return [cookieStore, res]

}