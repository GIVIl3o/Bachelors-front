import React from "react";

import { wrapper } from "./styles.module.css";
import EditTaskAssignee from "./EditTaskAssignee";
import EditTaskProgress from "./EditTaskProgress";
import EditTaskLabel from "./EditTaskLabel";
import EditTaskSprint from "./EditTaskSprint";
import DeleteTask from "./DeleteTask/DeleteTask";

const EditTaskRight = ({ task, onClose }) => {
  return (
    <div className={wrapper}>
      <EditTaskAssignee task={task} />
      <EditTaskProgress task={task} />
      <EditTaskLabel task={task} />
      <EditTaskSprint task={task} />
      <DeleteTask task={task} onClose={onClose} />
    </div>
  );
};

export default EditTaskRight;
