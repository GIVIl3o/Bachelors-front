import React, { useState } from "react";
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

  const [addTask, setAddTask] = useState(false);

  const setCollapsed = (collapse) => {
    console.log("wtf");
    localStorage.setItem(progressColumnName + storageAppend, collapse);
    setCollapsedUpperPart(collapse);
  };

  const divWrapperStyle = collapsedUpperPart
    ? { height: "100%" }
    : { display: "grid", gridTemplateRows: "min-content 1fr", height: "100%" };

  return (
    <div style={divWrapperStyle}>
      <span>
        <BoardUpperPart
          progressColumnName={progressColumnName}
          {...props}
          collapsedUpperPart={collapsedUpperPart}
          setCollapsedUpperPart={setCollapsed}
          setAddTask={setAddTask}
        />
      </span>
      {collapsedUpperPart || (
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
