<<<<<<< HEAD
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
=======
import React, { useContext, useState } from "react";
import axios from "axios";
import { ProjectContext } from "App";

import TaskCard from "./TaskCard";
import { PROGRESS } from "Constants";

import { wrapper, dropPlaceholder } from "./styles.module.css";
import AddTaskBoard from "./AddTaskBoard";
import { Container, Draggable } from "react-smooth-dnd";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

const BoardColumn = ({
  tasks,
  progressColumnName,
  addTask,
  setAddTask,
  setOpenDetailedTask,
<<<<<<< HEAD
  setDragging,
  dragging,
}) => {
  const { text, textLang } = useContext(UserContext);

  const [dragProgress, setDragProgress] = useState("");

=======
  sprintId,
}) => {
  const { project, setProject } = useContext(ProjectContext);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const findTaskByIndex = (index) => {
    for (const task of tasks) {
      if (index === 0) return task;
      if (task.progress === PROGRESS[progressColumnName].value) index--;
    }
    return null;
  };

  const firstTask = findTaskByIndex(0);

  /**
   * shit ton of magic here. Note to future self: unless you are drunk don't touch this
   */
  const moveTask = ({ addedIndex: index, removedIndex, payload: task }) => {
    if (index === null || loading) return;

    setDragging(false);
    setLoading(true);

    if (removedIndex !== null && index > removedIndex) {
      console.log("reduce");
      index++;
    }

    const leftTask = findTaskByIndex(index - 1);
    const rightTask = findTaskByIndex(index);

    const queryObject = {
      previousLeft: task.leftId,
      previousRight: task.rightId,
      nextLeft: leftTask ? leftTask.id : null,
      nextRight: rightTask ? rightTask.id : null,
      projectId: task.projectId,
      sprintId,
      newProgress: PROGRESS[progressColumnName].value,
    };
    console.log(queryObject);
    let queryParams = "";
    for (const q in queryObject) {
      queryParams += queryObject[q] ? `${q}=${queryObject[q]}&` : "";
    }
    queryParams = queryParams.substring(0, queryParams.length - 1);

    const tasks = project.tasks.filter((t) => t.id !== task.id);

    const prevLeftTask = tasks.find((t) => t.id === task.leftId);
    if (prevLeftTask) prevLeftTask.rightId = task.rightId;

    const prevRightTask = tasks.find((t) => t.id === task.rightId);
    if (prevRightTask) prevRightTask.leftId = task.leftId;

    const nextLeft = tasks.find((t) => t.id === queryObject.nextLeft);
    if (nextLeft) nextLeft.rightId = task.id;

    const nextRight = tasks.find((t) => t.id === queryObject.nextRight);
    if (nextRight) nextRight.leftId = task.id;

    task.leftId = queryObject.nextLeft;
    task.rightId = queryObject.nextRight;
    task.progress = PROGRESS[progressColumnName].value;

    if (task.rightId === null) {
      console.log([...tasks, task]);
      setProject({ ...project, tasks: [...tasks, task] });
    } else {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === task.rightId) {
          tasks.splice(i, 0, task);
          console.log(tasks);
          setProject({ ...project, tasks });
          break;
        }
      }
    }

    axios
      .post(`/tasks/${task.id}/move?${queryParams}`)
      .then(() => setLoading(false));
  };
  console.log(addTask);
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
  return (
    <div className={wrapper}>
      {addTask && (
        <AddTaskBoard
          setAddTask={setAddTask}
          progressColumnName={progressColumnName}
<<<<<<< HEAD
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
=======
          firstTask={firstTask}
          sprintId={sprintId}
        />
      )}
      <Container
        onDrop={moveTask}
        getChildPayload={(index) => findTaskByIndex(index)}
        shouldAcceptDrop={() => true}
        dropPlaceholder={{
          className: dropPlaceholder,
          animationDuration: 350,
        }}
        style={{
          height: "100%",
          ...(dragging ? { paddingBottom: "5rem" } : {}),
        }}
        onDragStart={() => setDragging(true)}
      >
        {tasks.map(
          (task) =>
            task.progress === PROGRESS[progressColumnName].value && (
              <Draggable key={task.id}>
                <TaskCard
                  task={task}
                  key={task.id}
                  setDragging={setDragging}
                  setOpenDetailedTask={setOpenDetailedTask}
                  dragging={dragging}
                />
              </Draggable>
            )
        )}
      </Container>
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
    </div>
  );
};

export default BoardColumn;
