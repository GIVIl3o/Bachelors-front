import React from "react";
import UnAuthenticatedNavbar from "./UnAuthenticatedNavbar";

export default ({ children, ...props }) => {
  // TODO authenticated think of
  return <UnAuthenticatedNavbar {...props}>{children}</UnAuthenticatedNavbar>;
};
