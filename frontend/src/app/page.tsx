"use client";

import Image from "next/image";
import Pagina from "../components/template/Pagina";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("login");
  });

  return <Pagina></Pagina>;
}
