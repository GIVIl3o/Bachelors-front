import React from "react";

import {} from "./styles.module.css";
import EditDescription from ".//EditTaskDescription";
import EditTaskAttachments from "./EditTaskAttachments/EditTaskAttachments";

const EditTaskLeft = ({ task }) => {
  return (
    <div>
      <EditDescription task={task} />
      <EditTaskAttachments task={task} />
    </div>
  );
};

export default EditTaskLeft;
