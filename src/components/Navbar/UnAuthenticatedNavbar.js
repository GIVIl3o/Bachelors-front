import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button } from "@material-ui/core";
import {
  languageButton,
  navbarConteiner,
  logo,
} from "./UnAuthenticated.module.css";
import { UserContext } from "App";

const languageMap = { EN: "GE", GE: "EN" };

const Navbar = () => {
  const { language, setLanguage } = useContext(UserContext);

  const changeLanguage = () => {
    let newLanguage = languageMap[language];
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className={navbarConteiner}>
      <img
        src="https://s3.eu-central-1.amazonaws.com/scrumhub.co/images/logo.png"
        className={logo}
      />
      <Button className={languageButton} onClick={changeLanguage}>
        {language}
      </Button>
    </div>
  );
};

export default Navbar;
