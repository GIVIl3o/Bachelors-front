import React, { useContext } from "react";
import { UserContext } from "App";
import { currentlyHave } from "./Authenticated.module.css";
import Projects from "./Projects";

const Home = () => {
  const { text } = useContext(UserContext);

  document.title = text.home_title;
  return (
    <div style={{ alignSelf: "baseline" }}>
      <Projects />
    </div>
  );
};

export default Home;
