import React, { useContext } from "react";
import { UserContext } from "App";
import { footer, CWrapper } from "./styles.module.css";

const Footer = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={footer}>
      {text.footer_text_left}
      <span className={CWrapper}>©</span>
      {text.footer_text_right}
    </div>
  );
};

export default Footer;
