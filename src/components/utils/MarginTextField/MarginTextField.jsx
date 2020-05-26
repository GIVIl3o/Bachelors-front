import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import { marginText, shrink, root } from "./styles.module.css";

const MarginTextField = ({
  InputProps,
  onFocus,
  onBlur,
  InputLabelProps,
  value = "",
  ...props
}) => {
  const [inputFocused, setFocused] = useState(false);

  const labelProps = {
    shrink: value !== "" || inputFocused,
    classes: { shrink, root },
  };

  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, ...labelProps }}
      InputProps={{ ...InputProps, className: marginText }}
      {...props}
      value={value}
      onFocus={() => {
        setFocused(true);
        onFocus && onFocus();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur && onBlur();
      }}
      autoComplete={"off"}
    />
  );
};

export default MarginTextField;
