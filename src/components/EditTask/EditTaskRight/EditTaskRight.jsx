import React from "react";

import { wrapper } from "./styles.module.css";
import EditTaskAssignee from "./EditTaskAssignee";
<<<<<<< HEAD
import EditTaskProgress from "./EditTaskProgress";
import EditTaskLabel from "./EditTaskLabel";
import EditTaskSprint from "./EditTaskSprint";
import DeleteTask from "./DeleteTask/DeleteTask";
=======
import EditTaskLabel from "./EditTaskLabel";
import EditTaskSprint from "./EditTaskSprint";
import DeleteTask from "./DeleteTask/DeleteTask";
import EditTaskType from "./EditTaskType";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

const EditTaskRight = ({ task, onClose }) => {
  return (
    <div className={wrapper}>
      <EditTaskAssignee task={task} />
<<<<<<< HEAD
      <EditTaskProgress task={task} />
      <EditTaskLabel task={task} />
=======
      <EditTaskLabel task={task} />
      <EditTaskType task={task} />
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
      <EditTaskSprint task={task} />
      <DeleteTask task={task} onClose={onClose} />
    </div>
  );
};

export default EditTaskRight;
