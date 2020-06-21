import React, { useContext, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { wrapper } from "./styles.module.css";

const EditTaskSprint = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const changeSprint = (selectedSprint) => {
    const sprint = selectedSprint === " " ? null : selectedSprint;

    const newTask = { ...task, sprint };

    axios
      .post(`/tasks/${task.id}?projectId=${project.id}`, newTask)
      .then(() => {
        const tasks = project.tasks.filter((t) => t.id !== task.id);
        setProject({ ...project, tasks: [...tasks, newTask] });
      });
  };

  return (
    <div className={wrapper}>
      <FormControl variant="outlined">
        <InputLabel id="taskSprint">{text.task_sprint}</InputLabel>
        <Select
          labelId="taskSprint"
          value={" "}
          onChange={(e) => changeSprint(e.target.value)}
          label={text.task_sprint}
        >
          <MenuItem value={" "}>
            <em>{text.task_no_sprint}</em>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EditTaskSprint;
