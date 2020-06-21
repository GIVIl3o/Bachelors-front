import React, { useContext, useEffect, useState, Fragment } from "react";
import { Grid, Paper, Card, Typography } from "@material-ui/core";
import { UserContext, ProjectContext } from "App";

import TaskCard from "./TaskCard";
import axios from "axios";
import { PROGRESS } from "Constants";

import {
  wrapper,
  columnText,
  headerWrapper,
  collapseIcon,
} from "./styles.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Tooltip from "@material-ui/core/Tooltip";
import AddTaskBoard from "./AddTaskBoard";

const classes = {};

const BoardColumn = ({
  tasks,
  progressColumnName,
  addTask,
  setAddTask,
  setOpenDetailedTask,
  setDragging,
  dragging,
}) => {
  const { text, textLang } = useContext(UserContext);

  const [dragProgress, setDragProgress] = useState("");

  return (
    <div className={wrapper}>
      {addTask && (
        <AddTaskBoard
          setAddTask={setAddTask}
          progressColumnName={progressColumnName}
        />
      )}

      {tasks.map((task) =>
        task.progress === PROGRESS[progressColumnName].value ? (
          <TaskCard
            task={task}
            key={task.id}
            setDragging={setDragging}
            setOpenDetailedTask={setOpenDetailedTask}
            dragging={dragging}
          />
        ) : (
          <Card
            key={task.id}
            className={`${classes.invisibleCard} ${
              dragging &&
              task.id === dragging.id &&
              (PROGRESS[progressColumnName].value === dragProgress
                ? classes.onDragOver
                : classes.onDrag)
            }`}
            onDragOver={(ev) => {
              ev.preventDefault();
              if (dragging && task.id === dragging.id)
                setDragProgress(PROGRESS[progressColumnName].value);
            }}
            onDragLeave={() =>
              dragging && task.id === dragging.id && setDragProgress("")
            }
            onDrop={() => {
              if (dragging && task.id === dragging.id) {
                task.progress = PROGRESS[progressColumnName].value;
                axios
                  .post(`/task/${task.id}`, {
                    newProgress: PROGRESS[progressColumnName].value,
                  })
                  .then(() => {
                    console.log("wtf did just happened :D ");
                  });
              }
            }}
          ></Card>
        )
      )}
    </div>
  );
};

export default BoardColumn;
