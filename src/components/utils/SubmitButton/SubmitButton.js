import React from "react";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { buttonProgress } from "./styles.module.css";

const SubmitButton = ({ loading, children, disabled, ...rest }) => {
  return (
    <Button disabled={loading} type="submit" {...rest}>
      {children}
      {loading && <CircularProgress size={24} className={buttonProgress} />}
    </Button>
  );
};

export default SubmitButton;
