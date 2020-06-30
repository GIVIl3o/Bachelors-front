import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { wrapper } from "./styles.module.css";
import { LABELS } from "Constants";

const EditTaskLabel = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const changeLabel = (selectedLabel) => {
    const label = selectedLabel === " " ? null : selectedLabel;
    const newTask = { ...task, label };

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
        <InputLabel id="taskLabel">{text.edit_task_label}</InputLabel>
        <Select
          labelId="taskLabel"
          value={task.label || " "}
          onChange={(e) => changeLabel(e.target.value)}
          label={text.edit_task_label}
        >
          <MenuItem value={" "}>
            <em>{text.task_no_label}</em>
          </MenuItem>
          {Object.keys(LABELS).map((label) => (
            <MenuItem value={LABELS[label].value} key={label}>
              {text[LABELS[label].text]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default EditTaskLabel;
