import React, { useState, Fragment } from "react";
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
  const [draggedOver, setDraggedOver] = useState(false);

  const [addTask, setAddTask] = useState(false);

  const setCollapsed = (collapse) => {
    console.log("wtf");
    localStorage.setItem(progressColumnName + storageAppend, collapse);
    setCollapsedUpperPart(collapse);
  };

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
      <span>
        <BoardUpperPart
          progressColumnName={progressColumnName}
          {...props}
          collapsedUpperPart={collapsed}
          setCollapsedUpperPart={setCollapsed}
          setAddTask={setAddTask}
        />
      </span>
      {collapsed || (
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
