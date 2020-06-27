import React, { useContext, useEffect, useState, Fragment } from "react";
import { Grid, Paper, Card, Typography } from "@material-ui/core";
import { UserContext, ProjectContext } from "App";
import { Droppable, Draggable } from "react-beautiful-dnd";

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
import { isThisMinute } from "date-fns";

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
    <Droppable droppableId={progressColumnName}>
      {(provided) => (
        <div
          className={wrapper}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {addTask && (
            <AddTaskBoard
              setAddTask={setAddTask}
              progressColumnName={progressColumnName}
            />
          )}
          {provided.placeholder}

          {tasks.map(
            (task) =>
              task.progress === PROGRESS[progressColumnName].value && (
                <Draggable key={task.id} draggableId={"0"} index={0}>
                  {(blah) => (
                    <span
                      ref={blah.innerRef}
                      {...blah.dragHandleProps}
                      {...blah.draggableProps}
                    >
                      <TaskCard
                        task={task}
                        key={task.id}
                        setDragging={setDragging}
                        setOpenDetailedTask={setOpenDetailedTask}
                        dragging={dragging}
                      />
                    </span>
                  )}
                </Draggable>
              )
          )}
        </div>
      )}
    </Droppable>
  );
};

export default BoardColumn;
