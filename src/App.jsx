import React, { useState, createContext } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";
import Messages from "components/utils/Messages";
import Text from "Text.json";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import Footer from "./components/Footer";
import Epics from "./pages/Epics";
import Settings from "pages/Settings";
import Sprints from "pages/Sprints";
import Backlog from "pages/Backlog";
import ActiveSprint from "pages/ActiveSprint";
import ProjectTransitionWrapper from "./pages/ProjectTransitionWrapper";
import { getPermission } from "Constants";

let user = "";
let savedLanguage = "";

try {
  savedLanguage = localStorage.getItem("language") || "EN";
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const decoded = jwtDecode(jwt);
    if (decoded.exp * 1000 > Date.now()) {
      user = decoded.sub;
      axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
    } else {
      localStorage.removeItem("jwt");
    }
  }
} catch (e) {}

export const UserContext = createContext({});
export const ProjectContext = createContext({});

const App = ({ width, imageBase }) => {
  const [username, setUsername] = useState(user);
  const [language, setLanguage] = useState(savedLanguage);

  const [project, setProject] = useState(undefined);

  const text = { ...Text };
  const textLang = { ...Text };
  Object.keys(Text).forEach((t) => (text[t] = Text[t][language]));

  const cssMargin = isWidthDown("xs", width)
    ? {}
    : isWidthUp("md", width)
    ? { marginLeft: "5rem", marginRight: "5rem" }
    : { marginLeft: "2rem", marginRight: "2rem" };

  const routes = username
    ? [
        { path: "/", component: Homepage },
        { path: "/projects/:id", component: Epics },
        // { path: "/epics/:id", component: Sprints},
      ]
    : [
        { path: "/", component: Homepage },
        { path: "/login", component: LoginPage },
      ];

  const projectRoutes = [
    { path: "/projects/:id/epics", Component: Epics },
    { path: "/projects/:id/sprints", Component: Sprints },
    { path: "/projects/:id/active", Component: ActiveSprint },
    { path: "/projects/:id/backlog", Component: Backlog },
    { path: "/projects/:id/about", Component: Settings },
  ];

  console.log(username);
  console.log(project);
  console.log(
    project && project.members.filter((m) => m.username === username)
  );
  const permission = getPermission(
    project && project.members.find((m) => m.username === username).permission
  );

  return (
    <StylesProvider injectFirst>
      <UserContext.Provider
        value={{
          imageBase,
          username,
          setUsername,
          text,
          textLang,
          language,
          setLanguage,
        }}
      >
        <ProjectContext.Provider value={{ project, permission, setProject }}>
          <Messages>
            <BrowserRouter>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "auto 1fr auto",
                  height: "100vh",
                  ...cssMargin,
                }}
              >
                <Navbar />
                {routes.map((route) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    exact
                    key={route.path}
                  />
                ))}
                {username && (
                  <div style={{ position: "relative", height: "100%" }}>
                    {projectRoutes.map(({ path, Component }) => (
                      <Route key={path} exact path={path}>
                        {(props) => (
                          <ProjectTransitionWrapper
                            Component={Component}
                            {...props}
                          />
                        )}
                      </Route>
                    ))}
                  </div>
                )}

                <Footer />
              </div>
            </BrowserRouter>
          </Messages>
        </ProjectContext.Provider>
      </UserContext.Provider>
    </StylesProvider>
  );
};

export default withWidth()(App);
