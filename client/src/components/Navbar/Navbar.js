import React from "react";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.users);
  const { userAuth } = state;

  return (
    <>{userAuth ? <PrivateNavbar isLogin={userAuth} /> : <PublicNavbar />}</>
  );
};

export default Navbar;
