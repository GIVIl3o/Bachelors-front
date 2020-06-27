import React, { useContext } from "react";
import { ProjectContext } from "App";
import PageLoading from "components/utils/PageLoading";

import Board from "components/Board/Board";

const ActiveSprint = () => {
  const { project } = useContext(ProjectContext);

  if (!project) return <PageLoading />;

  const activeSprint = project.sprints.find((sprint) => sprint.active);

  if (activeSprint === undefined)
    return <h1>No active sprint found. Fuck. No idea what to present here</h1>;

  const tasks = project.tasks.filter(
    (task) => task.sprintId === activeSprint.id
  );

  return <Board tasks={tasks} />;
};

export default ActiveSprint;
