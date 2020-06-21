import React from "react";

import {} from "./styles.module.css";
import EditDescription from ".//EditTaskDescription";

const EditTaskLeft = ({ task }) => {
  return (
    <div>
      <EditDescription task={task} />
    </div>
  );
};

export default EditTaskLeft;
