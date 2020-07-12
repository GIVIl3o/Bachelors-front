import React from "react";

import { wrapper } from "./styles.module.css";
import EditTaskAssignee from "./EditTaskAssignee";
import EditTaskWatchinging from "./EditTaskWatching";
import EditTaskLabel from "./EditTaskLabel";
import EditTaskSprint from "./EditTaskSprint";
import DeleteTask from "./DeleteTask/DeleteTask";
import EditTaskType from "./EditTaskType";

const EditTaskRight = ({ task, onClose }) => {
  return (
    <div className={wrapper}>
      <EditTaskAssignee task={task} />
      <EditTaskWatchinging task={task} />
      <EditTaskLabel task={task} />
      <EditTaskType task={task} />
      <EditTaskSprint task={task} />
      <DeleteTask task={task} onClose={onClose} />
    </div>
  );
};

export default EditTaskRight;
