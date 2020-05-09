import React, { useContext } from "react";

import { UserContext } from "App";

import {
  projectHeader,
  projectsWrapper,
  project,
  projectName,
  addProject,
  addProjectText,
} from "./styles.module.css";

const Projects = () => {
  const { text } = useContext(UserContext);

  const projectDiv = (
    <div className={project}>
      <span className={projectName}>Dummy Project Name</span>
    </div>
  );

  return (
    <div>
      <span className={projectHeader}>{text.project_header}</span>
      <div className={projectsWrapper}>
        {Array(5).fill(projectDiv)}
        <div className={addProject}>
          <span className={addProjectText}>+</span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
