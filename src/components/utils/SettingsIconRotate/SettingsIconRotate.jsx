import React, { useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from "App";

import { rotate } from "./styles.module.css";

const SettingsIconRotate = ({ text, className, onClick }) => {
  return (
    <Tooltip
      title={text}
      placement="top"
      className={`${className} ${rotate}`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <SettingsIcon fontSize="large" />
    </Tooltip>
  );
};
export default SettingsIconRotate;
