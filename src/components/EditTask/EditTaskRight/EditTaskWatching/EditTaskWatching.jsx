import React from "react";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import { useContext } from "react";
import { UserContext } from "App";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

import { watchingWrapper } from "./styles.module.css";
import { ProjectContext } from "App";

import axios from "axios";

const EditTaskWatching = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const changeWatching = (watching) => {
    const newTask = { ...task, watching };

    const tasks = [...project.tasks];

    const searchedTask = tasks.find((t) => t.id === task.id);
    searchedTask.watching = watching;

    setProject({ ...project, tasks });

    axios.post(`/tasks/${task.id}?projectId=${project.id}`, newTask);
  };

  return (
    <div className={watchingWrapper}>
      {task.watching ? (
        <SubmitButton
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => changeWatching(false)}
        >
          {text.task_watching_true}
          <NotificationsOffIcon style={{ marginLeft: "5px" }} />
        </SubmitButton>
      ) : (
        <SubmitButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => changeWatching(true)}
        >
          {text.task_watching_false}
          <NotificationsIcon style={{ marginLeft: "5px" }} />
        </SubmitButton>
      )}
    </div>
  );
};

export default EditTaskWatching;
