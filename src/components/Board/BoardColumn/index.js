<<<<<<< HEAD
import React, { useState, Fragment } from "react";
=======
import React, { useState } from "react";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
import BoardUpperPart from "./BoardUpperPart";
import BoardColumn from "./BoardColumn";

const storageAppend = "5";

const getCollapsed = (progressColumnName) => {
  // it's saved as a string...
  return (
    localStorage.getItem(progressColumnName + storageAppend) === "true" || false
  );
};

const BoardColumnWrapper = ({ progressColumnName, ...props }) => {
  const [collapsedUpperPart, setCollapsedUpperPart] = useState(
    getCollapsed(progressColumnName)
  );
<<<<<<< HEAD
  const [draggedOver, setDraggedOver] = useState(false);
=======
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

  const [addTask, setAddTask] = useState(false);

  const setCollapsed = (collapse) => {
    console.log("wtf");
    localStorage.setItem(progressColumnName + storageAppend, collapse);
    setCollapsedUpperPart(collapse);
  };

<<<<<<< HEAD
  const collapsed = draggedOver ? false : collapsedUpperPart;

  const divWrapperStyle = collapsed
    ? {}
    : { display: "grid", gridTemplateRows: "min-content 1fr" };

  return (
    <div
      style={divWrapperStyle}
      onDragOver={() => {
        setDraggedOver(true);
      }}
      onDragLeave={() => setDraggedOver(false)}
    >
=======
  const divWrapperStyle = collapsedUpperPart
    ? { height: "100%" }
    : { display: "grid", gridTemplateRows: "min-content 1fr", height: "100%" };

  return (
    <div style={divWrapperStyle}>
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
      <span>
        <BoardUpperPart
          progressColumnName={progressColumnName}
          {...props}
<<<<<<< HEAD
          collapsedUpperPart={collapsed}
=======
          collapsedUpperPart={collapsedUpperPart}
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
          setCollapsedUpperPart={setCollapsed}
          setAddTask={setAddTask}
        />
      </span>
<<<<<<< HEAD
      {collapsed || (
=======
      {collapsedUpperPart || (
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
        <BoardColumn
          progressColumnName={progressColumnName}
          {...props}
          addTask={addTask}
          setAddTask={setAddTask}
        />
      )}
    </div>
  );
};

export default BoardColumnWrapper;
