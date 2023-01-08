import React from "react";
import Logo from "../../../assests/Logo.webp";

const PublicNavbar = () => {
  return (
    <>
      <nav className="flex px-2 py-3 bg-blue-500 ">
        <div className="w-1/2 pl-12">
          <a href="/">
            <img className="w-16 h-10 rounded-md" src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="w-1/2 h-9 flex justify-end pr-12">
          <a
            className="inline-block text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            href="/login"
          >
            Login
          </a>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
