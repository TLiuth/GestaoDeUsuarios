import React from "react";
import Rodape from "./Rodape";

export default function Pagina(props: any) {
  return (
    <div className="flex-col">
      <main>{props.children}</main>
      <Rodape />
    </div>
  );
}
