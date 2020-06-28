import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import Swal from "sweetalert2";
import axios from "axios";

import SubmitButton from "components/utils/SubmitButton/SubmitButton";

import { wrapper } from "./styles.module.css";

const DeleteTask = ({ task, onClose }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const deleteTask = () => {
    Swal.fire({
      title: text.settings_delete_swal_title,
      text: text.swal_task_deleted,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: text.sweet_alert_cancel,
      reverseButtons: true,
      confirmButtonText: text.swee_alert_confirm,
      focusCancel: true,
    }).then(({ value: willDelete }) => {
      const queryObject = {
        previousLeft: task.leftId,
        previousRight: task.rightId,
        projectId: task.projectId,
      };

      let queryParams = "";
      for (const q in queryObject) {
        queryParams += queryObject[q] ? `${q}=${queryObject[q]}&` : "";
      }
      queryParams = queryParams.substring(0, queryParams.length - 1);

      willDelete &&
        axios.delete(`/tasks/${task.id}?${queryParams}`).then(() => {
          onClose(() => {
            const tasks = project.tasks.filter((t) => t.id !== task.id);

            if (task.leftId)
              tasks.find((t) => t.id === task.leftId).rightId = task.rightId;
            if (task.rightId)
              tasks.find((t) => t.id === task.rightId).leftId = task.leftId;
            console.log(tasks);

            setProject({ ...project, tasks: [...tasks] });
          });
        });
    });
  };

  return (
    <div className={wrapper}>
      <SubmitButton variant="contained" color="secondary" onClick={deleteTask}>
        {text.task_eidt_delete}
      </SubmitButton>
    </div>
  );
};

export default DeleteTask;
