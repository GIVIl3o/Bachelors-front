<<<<<<< HEAD
import React, { Fragment } from "react";

import Epics from "./Epics";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Epics match={match} {...props} />;
=======
import React from "react";

import Epics from "./Epics";

const toExport = (props) => {
  return <Epics {...props} />;
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
};

export default toExport;
