import React, { Fragment } from "react";

import Settings from "./Settings";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Settings match={match} {...props} />;
};

export default toExport;
