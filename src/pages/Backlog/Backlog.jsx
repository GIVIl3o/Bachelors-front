import React, { useEffect, useContext, useState, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";

import {
  layout,
  backlogText,
  textAddWrapper,
  addIcon,
  noBacklog,
  addIconWrapper,
  taskWrapper,
} from "./styles.module.css";
import { parseISO } from "date-fns";
import AddTask from "./AddTask";
import Task from "./Task";
import EditTask from "components/EditTask";

const Backlog = ({ match }) => {
  const { text, textLang } = useContext(UserContext);

  const setMessage = useContext(MessageContext);

  const { project, setProject } = useContext(ProjectContext);

  const projectId = match.params.id;

  const [openAddTask, setOpenAddTask] = useState(false);
  const [displayAddTask, setAddTask] = useState(true);

  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

  useEffect(() => {
    axios
      .get(`/projects/${projectId}`)
      .then((response) => {
        const project = response.data;

        document.title = `Scrumhub | ${project.title}`;
        const epics = project.epics.map((epic) => ({
          ...epic,
          fromDate: parseISO(epic.fromDate),
          toDate: parseISO(epic.toDate),
        }));

        setProject({ ...project, epics });
      })
      .catch(() => {
        setMessage(textLang.project_not_found, MessageTypes.error);
      });
  }, [projectId]);

  if (!project || projectId != project.id) return <PageLoading />;

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
                {project.tasks.map((task) => (
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
