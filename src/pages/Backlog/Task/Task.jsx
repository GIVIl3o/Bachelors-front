import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import Swal from "sweetalert2";

import {
  wrapper,
  titleWrapper,
  titleClass,
  deleteButton,
} from "./styles.module.css";

const Task = ({ task, onOpen }) => {
  const { project, setProject } = useContext(ProjectContext);
  const { text } = useContext(UserContext);

  const deleteTask = (e) => {
    e.stopPropagation();

    Swal.fire({
      title: text.backlog_delete_task_title,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: text.sweet_alert_cancel,
      reverseButtons: true,
      confirmButtonText: text.swee_alert_confirm,
      focusCancel: true,
    }).then(({ value: willDelete }) => {
      willDelete &&
        axios.delete(`/tasks/${task.id}?projectId=${project.id}`).then(() => {
          Swal.fire({
            title: text.backlog_task_deleted,
            icon: "success",
            reverseButtons: true,
            confirmButtonText: text.swee_alert_confirm,
          });
          const tasks = project.tasks.filter((t) => t.id !== task.id);
          setProject({ ...project, tasks });
        });
    });
  };

  return (
    <div className={wrapper} onClick={() => onOpen(task.id)}>
      <div className={titleWrapper}>
        <span className={titleClass}>{task.title}</span>
      </div>
      <div className={deleteButton} onClick={deleteTask}>
        <DeleteForeverIcon fontSize="large" />
      </div>
    </div>
  );
};
export default Task;
