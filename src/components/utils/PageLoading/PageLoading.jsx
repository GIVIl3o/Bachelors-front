import React from "react";
import { loading } from "./styles.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const PageLoading = () => {
  return (
    <span>
      <CircularProgress className={loading} />
    </span>
  );
};

export default PageLoading;
