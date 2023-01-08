import React from "react";
import Logo from "../../assests/Logo.webp";


const HomePage = () => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <a className="mt-2 w-1/3 inline-block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center" href="/login">
          Product List
        </a>
      </div>
      <div className="w-full flex justify-center mt-4">
        <img className="w-2/3  rounded-md" src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default HomePage;
