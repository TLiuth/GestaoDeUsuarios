import Pagina from "@/src/components/template/Pagina";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Pagina>
      <div className="flex flex-1 items-center justify-center p-20">
        <div className="bg-squareBackground-gray rounded-2xl flex flex-col gap-4 boxedLogin inset-shadow-2xs">
          {children}
        </div>
      </div>
    </Pagina>
  );
}
