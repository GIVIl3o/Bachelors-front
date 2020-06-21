import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ProjectContext } from "App";

import EditTaskHeader from "./EditTaskHeader";

import { dialogWrapper, gridWrapper } from "./styles.module.css";
import EditTaskRight from "./EditTaskRight/EditTaskRight";
import EditTaskLeft from "./EditTaskLeft/EditTaskLeft";

const EditTask = ({ taskId, setTaskId }) => {
  const { project } = useContext(ProjectContext);

  const task = project.tasks.find((t) => t.id === taskId);

  const [open, setOpen] = useState(true);

  const onClose = (afterClosed) => {
    setOpen(false);
    setTimeout(() => {
      setTaskId(undefined);
      afterClosed && afterClosed();
    }, 200);
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth={false}>
      <div className={dialogWrapper}>
        <EditTaskHeader onClose={onClose} task={task} />
        <div className={gridWrapper}>
          <EditTaskLeft task={task} />
          <EditTaskRight task={task} onClose={onClose} />
        </div>
      </div>
    </Dialog>
  );
};

export default EditTask;
