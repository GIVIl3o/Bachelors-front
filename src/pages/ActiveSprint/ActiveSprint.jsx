import React, { useContext } from "react";
import { ProjectContext, UserContext } from "App";
import PageLoading from "components/utils/PageLoading";

import Board from "components/Board/Board";

import { noSprintWrapper, noSprintsClass } from "./styles.module.css";

const ActiveSprint = () => {
  const { project } = useContext(ProjectContext);

  const { text } = useContext(UserContext);

  if (!project) return <PageLoading />;

  const activeSprint = project.sprints.find((sprint) => sprint.active);

  if (activeSprint === undefined)
    return (
      <div className={noSprintWrapper}>
        <span className={noSprintsClass}>{text.sprints_no_active}</span>
      </div>
    );

  const tasks = project.tasks.filter(
    (task) => task.sprintId === activeSprint.id
  );

  return <Board tasks={tasks} sprintId={activeSprint.id} />;
};

export default ActiveSprint;
