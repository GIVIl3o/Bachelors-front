import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { UserContext, ProjectContext } from "App";

import EditTaskHeader from "./EditTaskHeader";

import { dialogWrapper } from "./styles.module.css";

const EditTask = ({ taskId, setTaskId }) => {
  const { text, textLang } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const task = project.tasks.find((t) => t.id === taskId);

  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setTaskId(undefined), 200);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <div className={dialogWrapper}>
        <EditTaskHeader onClose={onClose} taskId={taskId} />
      </div>
    </Dialog>
  );
};

export default EditTask;
