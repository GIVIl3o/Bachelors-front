import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "App";
import CreateProject from "./CreateProject";

import {
  projectHeader,
  projectsWrapper,
  project,
  projectName,
  addProject,
  addProjectText,
} from "./styles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Projects = () => {
  const { text } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [openProjectCreate, setOpenProjectCreate] = useState(false);

  const ProjectDiv = ({ id, title }) => (
    <Link to={`/projects/${id}`} style={{ textDecoration: "none" }}>
      <div className={project}>
        <span className={projectName}>{title}</span>
      </div>
    </Link>
  );

  useEffect(() => {
    axios.get("/projects").then((response) => {
      setProjects(response.data.sort((a, b) => a.id - b.id));
    });
  }, []);

  return (
    <div>
      <span className={projectHeader}>{text.project_header}</span>
      <div className={projectsWrapper}>
        {projects.map((project) => (
          <ProjectDiv {...project} key={project.id} />
        ))}
        <div className={addProject} onClick={() => setOpenProjectCreate(true)}>
          <span className={addProjectText}>+</span>
        </div>
      </div>

      <CreateProject open={openProjectCreate} setOpen={setOpenProjectCreate} />
    </div>
  );
};

export default Projects;
