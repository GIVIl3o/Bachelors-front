import React, { useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { input, cursorPointer } from "./styles.module.css";

const TextFieldPassword = ({ setValue, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
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
        )
      }}
      {...rest}
    />
  );
};

export default TextFieldPassword;
