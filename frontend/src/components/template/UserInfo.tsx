import React from "react";

export default function UserInfo() {
  return (
    <div className="bg-squareBackground-gray rounded-2xl grid grid-cols-2 justify-between gap-4 inset-shadow-2xs">
      <div className="flex flex-col p-5 gap-x-10">
        <h1 className="text-4xl font-bold px-3 text-gray-900">User Info</h1>
        <h3 className="text-md font-bold px-3 text-gray-900">Name: </h3>
        <h3 className="text-md font-bold px-3 text-gray-900">Email: </h3>
        <h3 className="text-md font-bold px-3 text-gray-900">User ID: </h3>
      </div>

      <div className="text-gray-900 flex flex-col p-5 gap-x-10">Texto</div>
    </div>
  );
}
