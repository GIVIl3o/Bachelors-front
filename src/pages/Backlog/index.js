import React, { Fragment } from "react";

import Backlog from "./Backlog";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Backlog match={match} {...props} />;
};

export default toExport;
