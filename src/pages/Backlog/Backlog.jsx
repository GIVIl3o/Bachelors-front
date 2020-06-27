import React, { useContext, useState, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import {
  layout,
  backlogText,
  textAddWrapper,
  addIcon,
  noBacklog,
  addIconWrapper,
  taskWrapper,
} from "./styles.module.css";
import AddTask from "./AddTask";
import Task from "./Task";
import EditTask from "components/EditTask";

const Backlog = () => {
  const { text } = useContext(UserContext);

  const { project } = useContext(ProjectContext);

  const [openAddTask, setOpenAddTask] = useState(false);
  const [displayAddTask, setAddTask] = useState(true);

  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

  if (!project) return <PageLoading />;

  const onEpicOpenChange = (openDialog) => {
    if (openDialog) {
      setAddTask(false);
      setOpenAddTask(true);
    } else {
      setTimeout(() => {
        setAddTask(true);
      }, 200);
      setOpenAddTask(false);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {displayAddTask && (
        <div className={addIconWrapper}>
          <Tooltip
            title={text.backlog_add_tooltip}
            placement="top"
            onClick={() => {
              onEpicOpenChange(true);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" className={addIcon} />
          </Tooltip>
        </div>
      )}
      <div className={layout}>
        <div>
          <div className={textAddWrapper} style={{ display: "absolute" }}>
            <span className={backlogText}>{text.backlog_title}</span>
          </div>

          <div className={taskWrapper}>
            {project.tasks.length === 0 ? (
              <span className={noBacklog}>{text.backlog_empty_backlog}</span>
            ) : (
              <Fragment>
                {project.tasks
                  .filter((task) => !task.sprintId)
                  .map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      onOpen={setOpenDetailedTask}
                    />
                  ))}
              </Fragment>
            )}
          </div>
        </div>

        <AddTask
          open={openAddTask}
          setOpen={onEpicOpenChange}
          projectId={project.id}
        />
        <EditTask taskId={openDetailedTask} setTaskId={setOpenDetailedTask} />
      </div>
    </div>
  );
};

export default Backlog;
