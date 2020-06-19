import React, { Fragment } from "react";
import EditTask from "./EditTask";

const EditTaskWrapper = ({ taskId, ...props }) => {
  if (!taskId) return <Fragment />;
  return <EditTask taskId={taskId} {...props} />;
};

export default EditTaskWrapper;
