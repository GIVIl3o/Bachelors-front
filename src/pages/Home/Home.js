import React, { useContext } from "react";
import { UserContext } from "App";
import { currentlyHave } from "./Authenticated.module.css";
import Projects from "./Projects";

const Home = () => {
  const { setUsername, text } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("jwt");
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
