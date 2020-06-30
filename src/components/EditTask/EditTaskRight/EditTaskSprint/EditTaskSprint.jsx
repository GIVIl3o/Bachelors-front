import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { wrapper } from "./styles.module.css";
import { PROGRESS } from "Constants";

const EditTaskSprint = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  /**
   * Linked list functionality here. Be carefull
   */
  const changeSprint = (selectedSprint) => {
    const sprintId = selectedSprint === "T" ? null : selectedSprint;

    const newTask = { ...task, sprintId };

    const oldLeftId = newTask.leftId;
    const oldRightId = newTask.rightId;

    if (sprintId === null) {
      newTask.leftId = null;
      newTask.rightId = null;
    }
    newTask.progress = PROGRESS.planned.value;

    console.log(project.tasks);
    console.log(sprintId);
    const theMostLeftTaskInNewSprint = project.tasks.find(
      (task) =>
        task.sprintId === sprintId &&
        task.leftId === null &&
        task.progress === newTask.progress
    );
    newTask.leftId = null;
    newTask.rightId = null;

    console.log(theMostLeftTaskInNewSprint);
    if (theMostLeftTaskInNewSprint) {
      console.log("whuiadsxs");
      theMostLeftTaskInNewSprint.leftId = newTask.id;
      newTask.rightId = theMostLeftTaskInNewSprint.id;
    }

    const queryObject = {
      previousLeft: oldLeftId,
      previousRight: oldRightId,
      nextLeft: null,
      nextRight: theMostLeftTaskInNewSprint
        ? theMostLeftTaskInNewSprint.id
        : null,
      projectId: project.id,
      sprintId,
      newProgress: PROGRESS.planned.value,
    };

    let queryParams = "";
    for (const q in queryObject) {
      queryParams += queryObject[q] ? `${q}=${queryObject[q]}&` : "";
    }
    queryParams = queryParams.substring(0, queryParams.length - 1);
    console.log(queryParams);

    axios.post(`/tasks/${task.id}/move?${queryParams}`, null).then(() => {
      const tasks = project.tasks.filter((t) => t.id !== task.id);

      const prevLeftTask = tasks.find((t) => t.id === oldLeftId);
      if (prevLeftTask) prevLeftTask.rightId = oldRightId;

      const prevRightTask = tasks.find((t) => t.id === oldRightId);
      if (prevRightTask) prevRightTask.leftId = oldLeftId;

      setProject({ ...project, tasks: [newTask, ...tasks] });
    });
  };

  return (
    <div className={wrapper}>
      <FormControl variant="outlined">
        <InputLabel id="taskSprint">{text.task_sprint}</InputLabel>
        <Select
          labelId="taskSprint"
          value={task.sprintId || "T"}
          onChange={(e) => changeSprint(e.target.value)}
          label={text.task_sprint}
        >
          <MenuItem value={"T"}>
            <em>{text.task_no_sprint}</em>
          </MenuItem>
          {project.sprints.map((sprint) => (
            <MenuItem value={sprint.id} key={sprint.id}>
              {sprint.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default EditTaskSprint;
