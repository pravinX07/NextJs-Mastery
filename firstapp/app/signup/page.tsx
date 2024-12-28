import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-full p-4 bg-gray-400 justify-center items-center rounded-lg">
        <h1 className="text-center text-3xl mt-4 text-white font-extrabold">Sign Up</h1>
        <br />

        <input
          className="p-2 m-2 rounded-lg focus:ring-2"
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          className="p-2 m-2 rounded-lg focus:ring-2"
          type="password"
          placeholder="Password"
        />
        <br />
       <div className="flex justify-center items-center ">
       <button className="bg-blue-600 text-white  m-3 px-2 py-1 rounded-md items-center hover:bg-blue-900">
          Sign Up
        </button>
       </div>
      </div>
    </div>
  );
};

export default page;
