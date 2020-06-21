import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Card, Typography } from "@material-ui/core";
import { UserContext, ProjectContext } from "App";

import TaskCard from "./BoardColumn/TaskCard";
import axios from "axios";
import { PROGRESS } from "Constants";

import { wrapper, columnWrapper } from "./styles.module.css";
import BoardColumn from "./BoardColumn";
import EditTask from "components/EditTask";

const classes = {};

const Board = ({ tasks, progressTask = () => {} }) => {
  //const { userName } = useContext(UserContext);
  const userName = "levan";

  const { text, textLang } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);

  const [dragging, setDragging] = useState(null);
  const [dragProgress, setDragProgress] = useState("");
  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

  return (
    <div className={wrapper}>
      {Object.keys(PROGRESS).map((progressColumnName) => {
        const relatedTasks = project.tasks.filter(
          (task) => task.progress === PROGRESS[progressColumnName].value
        );

        return (
          <BoardColumn
            tasks={relatedTasks}
            progressColumnName={progressColumnName}
            setOpenDetailedTask={setOpenDetailedTask}
            key={progressColumnName}
            setDragging={setDragging}
            dragging={dragging}
          />
        );
      })}
      <EditTask taskId={openDetailedTask} setTaskId={setOpenDetailedTask} />
    </div>
  );
};

export default Board;
