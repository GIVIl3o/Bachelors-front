import React, { useState } from "react";

import { PROGRESS } from "Constants";

import { wrapper } from "./styles.module.css";
import BoardColumn from "./BoardColumn";
import EditTask from "components/EditTask";
import { useLocation, useHistory } from "react-router";
import { useEffect } from "react";

const Board = ({ tasks, sprintId }) => {
  const location = useLocation();
  const history = useHistory();

  const taskId = parseInt(
    new URLSearchParams(location.search).get("taskId"),
    10
  );

  const searchedTask = tasks.find((t) => t.id === taskId);

  const currentlyOpenedTaskId =
    searchedTask && searchedTask.sprintId === sprintId ? taskId : undefined;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const taskId = parseInt(params.get("taskId"), 10);

    const searchedTask = tasks.find((t) => t.id === taskId);
  }, [location.params]);

  const setOpenTask = (taskId) => {
    const params = new URLSearchParams(location.search);

    if (taskId) params.set("taskId", taskId);
    else params.delete("taskId");

    history.push(location.pathname + "?" + params.toString());
  };

  return (
    <div className={wrapper}>
      {Object.keys(PROGRESS).map((progressColumnName) => {
        const relatedTasks = tasks.filter(
          (task) => task.progress === PROGRESS[progressColumnName].value
        );

        return (
          <BoardColumn
            tasks={relatedTasks}
            progressColumnName={progressColumnName}
            setOpenDetailedTask={setOpenTask}
            key={progressColumnName}
            sprintId={sprintId}
          />
        );
      })}
      <EditTask taskId={currentlyOpenedTaskId} setTaskId={setOpenTask} />
    </div>
  );
};

export default Board;
