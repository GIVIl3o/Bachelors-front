<<<<<<< HEAD
import React, { useEffect, useContext, useState, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";

import { parseISO } from "date-fns";
import Board from "components/Board/Board";

const ActiveSprint = ({ match }) => {
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

  return <Board tasks={[]} />;
=======
import React, { useContext } from "react";
import { ProjectContext } from "App";
import PageLoading from "components/utils/PageLoading";

import Board from "components/Board/Board";

const ActiveSprint = () => {
  const { project } = useContext(ProjectContext);

  if (!project) return <PageLoading />;

  const activeSprint = project.sprints.find((sprint) => sprint.active);

  if (activeSprint === undefined)
    return <h1>No active sprint found. Fuck. No idea what to present here</h1>;

  const tasks = project.tasks.filter(
    (task) => task.sprintId === activeSprint.id
  );

  return <Board tasks={tasks} sprintId={activeSprint.id} />;
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
};

export default ActiveSprint;
