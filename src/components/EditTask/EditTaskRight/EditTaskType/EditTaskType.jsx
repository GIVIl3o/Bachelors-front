import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { wrapper } from "./styles.module.css";
import { TASK_TYPE } from "Constants";

const EditTaskType = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const changeType = (type) => {
    const newTask = { ...task, type };

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
        <InputLabel id="taskType">{text.task_details_type_label}</InputLabel>
        <Select
          labelId="taskType"
          value={task.type}
          onChange={(e) => changeType(e.target.value)}
          label={text.task_details_type_label}
        >
          {Object.keys(TASK_TYPE).map((type) => (
            <MenuItem value={TASK_TYPE[type].value} key={type}>
              {text[TASK_TYPE[type].text]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default EditTaskType;
