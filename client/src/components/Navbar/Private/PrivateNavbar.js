import React from "react";
import Logo from "../../../assests/Logo.webp";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/userSlices";

const PrivateNavbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="flex px-2 py-3 bg-blue-500 justify-between">
        <div className="lg:w-1/2 md:w-1/2 sm:w-1/3 lg:pl-12 sm:pl-4">
          <a href="/">
            <img className="w-16 h-10 rounded-md" src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="lg:w-1/2 md:w-1/2 sm:w-2/3 h-9 flex justify-end  lg:pr-12 sm:pr-4">
          <a
            href="/create-product"
            className="inline-block text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            Create Product
          </a>
          <a
            type="button"
            href="/"
            onClick={() => dispatch(logoutAction())}
            className="inline-block text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-24"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;
