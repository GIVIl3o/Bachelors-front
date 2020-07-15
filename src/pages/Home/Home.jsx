import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import { currentlyHave } from "./Authenticated.module.css";
import Projects from "./Projects";
import axios from "axios";

const Home = () => {
  const { setUsername, text } = useContext(UserContext);
  const { setProject } = useContext(ProjectContext);

  document.title = text.home_title;
  return (
    <div style={{ alignSelf: "baseline" }}>
      <span className={currentlyHave}>{text.currently_have}</span>
      <Projects />
    </div>
  );
};

export default Home;
