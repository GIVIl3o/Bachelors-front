import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Card, Typography } from "@material-ui/core";
import { UserContext, ProjectContext } from "App";

import TaskCard from "./BoardColumn/TaskCard";
import axios from "axios";
import { PROGRESS } from "Constants";

import { wrapper, columnWrapper } from "./styles.module.css";
import BoardColumn from "./BoardColumn";
import EditTask from "components/EditTask";
import { DragDropContext } from "react-beautiful-dnd";

const classes = {};

const Board = ({ tasks }) => {
  //const { userName } = useContext(UserContext);

  console.log(tasks);

  const { text, textLang } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);

  const [dragging, setDragging] = useState(null);
  const [dragProgress, setDragProgress] = useState("");
  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

  return (
    <DragDropContext onDragEnd={() => console.log("ay ay ay :D ")}>
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
              setDragging={setDragging}
              dragging={dragging}
            />
          );
        })}
        <EditTask taskId={openDetailedTask} setTaskId={setOpenDetailedTask} />
      </div>
    </DragDropContext>
  );
};

export default Board;
