import React from "react";
import Navbar from "./Navbar";

export default ({ children, ...props }) => {
  return <Navbar {...props}>{children}</Navbar>;
};
