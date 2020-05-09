import React, { useContext } from "react";
import { UserContext } from "App";
import { footer } from "./styles.module.css";

const Footer = () => {
  const { text } = useContext(UserContext);

  return <div className={footer}>{text.footer_text}</div>;
};

export default Footer;
