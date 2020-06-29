<<<<<<< HEAD
import React, { Fragment } from "react";

import Backlog from "./Backlog";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Backlog match={match} {...props} />;
};

export default toExport;
=======
export { default } from "./Backlog";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
