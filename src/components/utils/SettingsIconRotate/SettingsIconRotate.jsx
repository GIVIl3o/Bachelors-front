import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";

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
