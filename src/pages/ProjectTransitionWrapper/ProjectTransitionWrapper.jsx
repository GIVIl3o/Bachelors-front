import React, { useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { parseISO } from "date-fns";
import { ProjectContext } from "App";

import {
  pageEnter,
  pageEnterActive,
  pageExit,
  pageExitActive,
} from "./styles.module.css";
import { useParams } from "react-router";

const refreshProject = (projectId, setProject) => {
  axios.get(`/projects/${projectId}`).then((response) => {
    const project = response.data;

    document.title = `Scrumhub | ${project.title}`;

    const epics = project.epics.map((epic) => ({
      ...epic,
      fromDate: parseISO(epic.fromDate),
      toDate: parseISO(epic.toDate),
    }));

    setProject({ ...project, epics });
  });
};

const ProjectTransitionWrapper = ({ Component, ...props }) => {
  const { setProject } = useContext(ProjectContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) refreshProject(id, setProject);
  }, [id]);

  return (
    <CSSTransition
      in={props.match != null}
      timeout={300}
      classNames={{
        enter: pageEnter,
        enterActive: pageEnterActive,
        exit: pageExit,
        exitActive: pageExitActive,
      }}
      unmountOnExit
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Component {...props} />
      </div>
    </CSSTransition>
  );
};

export default ProjectTransitionWrapper;
