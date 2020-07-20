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
import MarginTextField from "components/utils/MarginTextField/MarginTextField";
import { MenuItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";

const Backlog = () => {
  const { text } = useContext(UserContext);

  const { project } = useContext(ProjectContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const history = useHistory();

  const [openAddTask, setOpenAddTask] = useState(false);
  const [displayAddTask, setAddTask] = useState(true);

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

  const tasks = project.tasks
    .filter(
      (task) => !task.sprintId && task.title.includes(query.get("query") || "")
    )
    .sort((t1, t2) => t1.id - t2.id);

  const setOpenDetailedTask = (taskId) => {
    const params = new URLSearchParams(location.search);

    if (taskId) params.set("taskId", taskId);
    else params.delete("taskId");

    history.push(location.pathname + "?" + params.toString());
  };

  const taskId = parseInt(
    new URLSearchParams(location.search).get("taskId"),
    10
  );

  const searchedTask = tasks.find((t) => t.id === taskId);

  const currentlyOpenedTaskId =
    searchedTask && !searchedTask.sprintId ? taskId : undefined;

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
            <div>
              <span className={backlogText}>{text.backlog_title}</span>
            </div>
            <div>
              <MarginTextField
                color="secondary"
                variant="outlined"
                value={query.get("query") || ""}
                label={text.backlog_search_query}
                onChange={(e) => {
                  const value = encodeURIComponent(e.target.value);
                  if (value.length > 0)
                    history.push(
                      `/projects/${project.id}/backlog?query=${value}`
                    );
                  else history.push(`/projects/${project.id}/backlog`);
                }}
                style={displayAddTask ? { marginRight: "4rem" } : {}}
              >
                <MenuItem value={"T"}>
                  <em>{text.sprints_filter_by_epic}</em>
                </MenuItem>
                {project.epics.map((epic) => (
                  <MenuItem value={epic.id} key={epic.id}>
                    {epic.title}
                  </MenuItem>
                ))}
              </MarginTextField>
            </div>
          </div>

          <div className={taskWrapper}>
            {tasks.length === 0 ? (
              <span className={noBacklog}>{text.backlog_empty_backlog}</span>
            ) : (
              <Fragment>
                {tasks.map((task) => (
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
        <EditTask
          taskId={currentlyOpenedTaskId}
          setTaskId={setOpenDetailedTask}
        />
      </div>
    </div>
  );
};

export default Backlog;
