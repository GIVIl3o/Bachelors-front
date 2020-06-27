import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { wrapper } from "./styles.module.css";
import { PROGRESS } from "Constants";

const EditTaskProgress = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const changeProgress = (progress) => {
    const newTask = { ...task, progress };

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
        <InputLabel id="taskProgress">{text.task_progress}</InputLabel>
        <Select
          labelId="taskProgress"
          value={task.progress}
          onChange={(e) => changeProgress(e.target.value)}
          label={text.task_progress}
        >
          {Object.keys(PROGRESS).map((progress) => (
            <MenuItem value={PROGRESS[progress].value} key={progress}>
              {text[PROGRESS[progress].text]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default EditTaskProgress;
