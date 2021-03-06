import React, { useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { parseISO } from "date-fns";
import { ProjectContext } from "App";
import { PROGRESS } from "Constants";
import {
  pageEnter,
  pageEnterActive,
  pageExit,
  pageExitActive,
  pageEnterDone,
} from "./styles.module.css";
import { useParams } from "react-router";
import { useRef } from "react";

const sortTaskArray = (sprintColumnTasks) => {
  //return sprintColumnTasks;
  const sortedTasks = [];

  while (sortedTasks.length !== sprintColumnTasks.length) {
    if (sortedTasks.length === 0) {
      sortedTasks.push(sprintColumnTasks.find((task) => task.leftId === null));
      continue;
    }

    const searchingForLeft = sortedTasks[sortedTasks.length - 1].id;

    const result = sprintColumnTasks.find(
      (task) => task.leftId === searchingForLeft
    );

    if (!result) console.error("Cannot sort tasks");

    sortedTasks.push(result);
  }

  return sortedTasks;
};

const sortTasks = (sprints, tasks) => {
  const sortedTasks = [];

  for (let i = 0; i < sprints.length; i++) {
    const sprintTasks = tasks.filter((task) => task.sprintId === sprints[i].id);

    for (const column in PROGRESS) {
      const sprintColumnTasks = sprintTasks.filter(
        (task) => task.progress === PROGRESS[column].value
      );

      sortedTasks.push(...sortTaskArray(sprintColumnTasks));
    }
  }

  const backlogTasks = tasks.filter((task) => !task.sprintId);

  sortedTasks.push(...backlogTasks);

  return sortedTasks;
};

const refreshProject = (projectId, setProject) => {
  axios.get(`/projects/${projectId}`).then((response) => {
    const project = response.data;

    document.title = `Scrumhub | ${project.title}`;

    const epics = project.epics.map((epic) => ({
      ...epic,
      fromDate: parseISO(epic.fromDate),
      toDate: parseISO(epic.toDate),
    }));

    const tasks = sortTasks(project.sprints, project.tasks);

    setProject({ ...project, epics, tasks });
  });
};

const ProjectTransitionWrapper = ({ Component, ...props }) => {
  const { project, setProject } = useContext(ProjectContext);
  const projectRef = useRef(null);
  projectRef.current = project;

  const { id } = useParams();

  useEffect(() => {
    if (id) refreshProject(id, setProject);
  }, [id]);

  useEffect(() => {
    axios.interceptors.response.use(undefined, (error) => {
      const response = error.response;

      if (projectRef.current && response && response.status === 400) {
        refreshProject(projectRef.current.id, setProject);
      }

      return Promise.reject(error);
    });
  }, []);

  const style = {
    width: "100%",
    ...(props.match ? { height: "100%" } : { display: "none" }),
  };

  return (
    <CSSTransition
      in={props.match != null}
      timeout={300}
      classNames={{
        enter: pageEnter,
        enterActive: pageEnterActive,
        enterDone: pageEnterDone,
        exit: pageExit,
        exitActive: pageExitActive,
      }}
      unmountOnExit
    >
      <div style={style}>
        <Component {...props} />
      </div>
    </CSSTransition>
  );
};

export default ProjectTransitionWrapper;
