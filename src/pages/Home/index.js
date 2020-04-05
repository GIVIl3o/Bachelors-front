import React, { useContext } from "react";
import UnAuthenticatedHome from "./Home";
import AuthenticatedHome from "./AuthenticatedHome";
import { UserContext } from "App";

export default ({ children, ...props }) => {
  const { username } = useContext(UserContext);
  const Home = username ? AuthenticatedHome : UnAuthenticatedHome;

  return <Home {...props}>{children}</Home>;
};
