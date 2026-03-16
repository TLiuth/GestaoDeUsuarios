import React from "react";
import errorImage from "@/public/assets/images/pageNotFound.png";
import Pagina from "../components/template/Pagina";
import Image from "next/image";
import Link from "next/link";

export default function Error404() {
  return (
    <Pagina>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
        <Image src={errorImage} height={400} alt="Error 404"></Image>

        <Link
          className="bg-notFound-Wine border-2 border-gray-200 text-gray-200 p-3 rounded-2xl hover:bg-notFound-Wine-light hover:border-2 hover:border-notFound-Wine"
          href={"/dashboard"}
        >
          Return to homepage
        </Link>
      </div>
    </Pagina>
  );
}
