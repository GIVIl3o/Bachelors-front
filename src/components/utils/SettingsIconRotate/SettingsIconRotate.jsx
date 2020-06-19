import React, { useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from "App";

import { rotate } from "./styles.module.css";

const SettingsIconRotate = ({ textLang, className, onClick }) => {
  const { language } = useContext(UserContext);

  return (
    <Tooltip
      title={textLang[language]}
      placement="top"
      className={`${className} ${rotate}`}
      onClick={onClick}
    >
      <SettingsIcon fontSize="large" />
    </Tooltip>
  );
};
export default SettingsIconRotate;
