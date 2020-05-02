import React, { useContext } from "react";
import Navbar from "./Navbar";
import UnAuthenticatedNavbar from "./UnAuthenticatedNavbar";
import { UserContext } from "App";

export default ({ children, ...props }) => {
  const { username } = useContext(UserContext);
  const Home = username ? Navbar : UnAuthenticatedNavbar;

  return <Home {...props}>{children}</Home>;
};
