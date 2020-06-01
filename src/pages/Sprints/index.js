<<<<<<< HEAD
export { default } from "./Sprints";
=======
import React, { Fragment } from "react";

import Sprints from "./Sprints";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Sprints match={match} {...props} />;
};

export default toExport;
>>>>>>> 52e8b0d... Added navigation + project setting page started
