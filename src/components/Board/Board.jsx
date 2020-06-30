import React, { useState } from "react";

import { PROGRESS } from "Constants";

import { wrapper } from "./styles.module.css";
import BoardColumn from "./BoardColumn";
import EditTask from "components/EditTask";

const Board = ({ tasks, sprintId }) => {
  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

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
            setOpenDetailedTask={setOpenDetailedTask}
            key={progressColumnName}
            sprintId={sprintId}
          />
        );
      })}
      <EditTask taskId={openDetailedTask} setTaskId={setOpenDetailedTask} />
    </div>
  );
};

export default Board;
