import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { input, cursorPointer } from "./styles.module.css";
import MarginTextField from "components/utils/MarginTextField";

const TextFieldPassword = ({ setValue, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <MarginTextField
      className={input}
      type={showPassword ? "text" : "password"}
      color="secondary"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={() => setShowPassword(!showPassword)}
            className={cursorPointer}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default TextFieldPassword;
