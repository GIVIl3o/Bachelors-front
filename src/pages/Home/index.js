import React, { useContext } from "react";
import UnAuthenticatedHome from "./UnAuthenticatedHome";
import Home from "./Home";
import { UserContext } from "App";

export default ({ children, ...props }) => {
  const { username } = useContext(UserContext);
  const HomeComponent = username ? Home : UnAuthenticatedHome;

  return <HomeComponent {...props}>{children}</HomeComponent>;
};
