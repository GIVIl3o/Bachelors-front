import React, { Fragment } from "react";

import Sprints from "./Sprints";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Sprints match={match} {...props} />;
};

export default toExport;
