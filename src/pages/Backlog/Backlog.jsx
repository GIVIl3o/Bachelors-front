<<<<<<< HEAD
import React, { useEffect, useContext, useState, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
=======
import React, { useContext, useState, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

<<<<<<< HEAD
import axios from "axios";

=======
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
import {
  layout,
  backlogText,
  textAddWrapper,
  addIcon,
  noBacklog,
  addIconWrapper,
  taskWrapper,
} from "./styles.module.css";
<<<<<<< HEAD
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
=======
import AddTask from "./AddTask";
import Task from "./Task";
import EditTask from "components/EditTask";
import MarginTextField from "components/utils/MarginTextField/MarginTextField";
import { MenuItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";

const getQuery = (location) => {
  const search = location.search;

  const queries = search.substring(1);
  const parsedQueries = queries.split("&");

  const params = {};

  for (const query of parsedQueries) {
    const splitted = query.split("=");

    params[splitted[0]] = decodeURIComponent(splitted[1]);
  }

  return params.query || "";
};

const Backlog = () => {
  const { text } = useContext(UserContext);

  const { project } = useContext(ProjectContext);

  const location = useLocation();
  const query = getQuery(location);
  const history = useHistory();

  const [openAddTask, setOpenAddTask] = useState(false);
  const [displayAddTask, setAddTask] = useState(true);

  const [openDetailedTask, setOpenDetailedTask] = useState(undefined);

  if (!project) return <PageLoading />;
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

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

<<<<<<< HEAD
=======
  const tasks = project.tasks.filter(
    (task) => !task.sprintId && task.title.includes(query)
  );

>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
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
<<<<<<< HEAD
            <span className={backlogText}>{text.backlog_title}</span>
          </div>

          <div className={taskWrapper}>
            {project.tasks.length === 0 ? (
              <span className={noBacklog}>{text.backlog_empty_backlog}</span>
            ) : (
              <Fragment>
                {project.tasks.map((task) => (
=======
            <div>
              <span className={backlogText}>{text.backlog_title}</span>
            </div>
            <div>
              <MarginTextField
                color="secondary"
                variant="outlined"
                value={query}
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
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
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
