import React from "react";
import Rodape from "./Rodape";

export default function Pagina(props: any) {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-100">
      <main className="flex flex-col flex-1">{props.children}</main>
      <Rodape />
    </div>
  );
}
