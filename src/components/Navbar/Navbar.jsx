import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import {
  languageButton,
  navbarConteiner,
  logo,
  tabWrapper,
  tabClassName,
} from "./styles.module.css";
import { UserContext } from "App";
import { Link, useLocation, useHistory } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Redirect } from "react-router-dom";

const languageMap = { EN: "GE", GE: "EN" };

const Navbar = ({ match }) => {
  const { username, language, setLanguage } = useContext(UserContext);

  const history = useHistory();
  const { text } = useContext(UserContext);

  const changeLanguage = () => {
    let newLanguage = languageMap[language];
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

  const path = useLocation().pathname;

  let startTab = 0;
  let projectId = 0;
  const isProjectPage = path.includes("project");

  if (isProjectPage) projectId = parseInt(path.split("/")[2]);

  const prefix = `/projects/${projectId}`;
  const tabs = [
    { path: prefix + "/epics", label: text.tab_epics },
    { path: prefix + "/sprints", label: text.tab_sprints },
    { path: prefix + "/backlog", label: text.tab_backlog },
    { path: prefix + "/about", label: text.tab_settings },
  ];

  if (isProjectPage)
    startTab = tabs.map((tab) => tab.path).findIndex((e) => e.startsWith(path));

  const [tabN, setTabN] = useState(startTab);

  if (isProjectPage) {
    if (tabN !== startTab) setTabN(startTab);
  }

  // define allowed routes
  if (username) {
    if (isProjectPage && startTab === -1) return <Redirect to="/" />;
    if (!isProjectPage && path !== "/") return <Redirect to="/" />;
  }

  return (
    <div>
      <div className={navbarConteiner}>
        <Link to="/" style={{ width: "fit-content" }}>
          <img
            src="https://s3.eu-central-1.amazonaws.com/scrumhub.co/images/logo.png"
            alt=""
            className={logo}
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>

        <div className={tabWrapper}>
          {isProjectPage && (
            <Tabs
              value={tabN}
              onChange={(e, t) => setTabN(t)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {tabs.map((tab) => (
                <Tab
                  label={tab.label}
                  onClick={() => history.push(tab.path)}
                  key={tab.path}
                  style={{ width: "50px" }}
                  className={tabClassName}
                />
              ))}
            </Tabs>
          )}
        </div>

        <Button
          className={languageButton}
          onClick={changeLanguage}
          color="primary"
          variant="outlined"
        >
          {language}
        </Button>
      </div>
      <hr style={{ marginBottom: "0" }} />
    </div>
  );
};

export default Navbar;
