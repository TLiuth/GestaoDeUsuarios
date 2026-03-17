const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type User = {
    id: number;
    name: string;
    email: string;
};

export default async function getUsersList() {
    const res = await fetch(`${API_URL}/user/getAllUsers`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
    }

    return res.json();
}
