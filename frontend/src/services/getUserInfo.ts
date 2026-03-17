
import { redirect } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type User = {
    id: number;
    name: string;
    email: string;
}

export default async function getUserInfo(): Promise<User>{
    

    const res = await fetch(`${API_URL}/user/getCurrentUser`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    });

    if(!res.ok){
        throw new Error(`Failed to fetch user info: ${res.status}`)
    }

    const user = (await res.json()) as User;


    return user
}