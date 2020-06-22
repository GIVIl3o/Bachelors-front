import React, { Fragment } from "react";

import ActiveSprint from "./ActiveSprint";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;

  return <ActiveSprint match={match} {...props} />;
};

export default toExport;
