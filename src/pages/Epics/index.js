import React, { Fragment } from "react";

import Epics from "./Epics";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Epics match={match} {...props} />;
};

export default toExport;
