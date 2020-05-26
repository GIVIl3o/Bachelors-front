import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import {
  languageButton,
  navbarConteiner,
  logo,
} from "./UnAuthenticated.module.css";
import { UserContext } from "App";
import { Link } from "react-router-dom";

const languageMap = { EN: "GE", GE: "EN" };

const Navbar = () => {
  const { language, setLanguage } = useContext(UserContext);

  const changeLanguage = () => {
    let newLanguage = languageMap[language];
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div>
      <div className={navbarConteiner}>
        <Link to="/" style={{ width: "fit-content" }}>
          <img
            src="https://s3.eu-central-1.amazonaws.com/scrumhub.co/images/logo.png"
            alt=""
            className={logo}
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>
        <Button
          className={languageButton}
          onClick={changeLanguage}
          color="primary"
          variant="outlined"
        >
          {language}
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
