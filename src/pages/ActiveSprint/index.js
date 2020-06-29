<<<<<<< HEAD
import React, { Fragment } from "react";

import ActiveSprint from "./ActiveSprint";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;

  return <ActiveSprint match={match} {...props} />;
};

export default toExport;
=======
export { default } from "./ActiveSprint";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
