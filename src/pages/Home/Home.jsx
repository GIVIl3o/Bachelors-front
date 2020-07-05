import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import { currentlyHave } from "./Authenticated.module.css";
import Projects from "./Projects";
import axios from "axios";

const Home = () => {
  const { setUsername, text } = useContext(UserContext);
  const { setProject } = useContext(ProjectContext);

  const logout = () => {
    localStorage.removeItem("jwt");

    delete axios.defaults.headers.common["Authorization"];
    setProject(undefined);
    setUsername(undefined);
  };
  document.title = text.home_title;
  return (
    <div style={{ alignSelf: "baseline" }}>
      <div>
        temporary:
        <input
          type="submit"
          onClick={logout}
          value="Logout"
          style={{ margin: "20px" }}
        />
      </div>
      <span className={currentlyHave}>{text.currently_have}</span>
      <Projects />
    </div>
  );
};

export default Home;
