import React from "react";
import errorImage from "@/public/assets/images/NotFoundImage.png";
import Pagina from "../components/template/Pagina";
import Image from "next/image";
import Link from "next/link";

export default function Error404() {
  const text = "The page you are trying to access could not be found :(";
  return (
    <Pagina>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
        {/* <Image src={errorImage} alt="Error 404"></Image> */}
        <h1 className="italic text-blue-900 text-5xl py-5">Error 404</h1>

        <h3 className="text-blue-800 py-5">{text}</h3>
        <Link
          className="bg-blue-500 border-2 border-gray-200 text-gray-200 p-3 rounded-2xl hover:bg-blue-300 hover:border-2 hover:border-blue-500"
          href={"/"}
        >
          Return to homepage
        </Link>
      </div>
    </Pagina>
  );
}
