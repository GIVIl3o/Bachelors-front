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
import { useEffect } from "react";
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './Theme'

import Stomp from "stompjs";
import sockJS from "sockjs-client";
import User from "pages/User/";

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

const connectWebsocket = (setWebsocket, baseUrl) => {
  const sockClient = new sockJS(`${baseUrl}/websocket`);

  const websocket = Stomp.over(sockClient);

  websocket.connect(
    {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    () => {
      setWebsocket(websocket);
    }
  );

  return websocket;
};

export const UserContext = createContext({});
export const ProjectContext = createContext({});

const App = ({ width, imageBase, baseUrl }) => {
  const [username, setUsername] = useState(user);
  const [userImageVersion, setUserImageVersion] = useState(0);
  const [language, setLanguage] = useState(savedLanguage);

  const [project, setProject] = useState(undefined);
  const [websocket, setWebsocket] = useState(undefined);

  useEffect(() => {
    if (!username) {
      console.log("need cleanup");
      return;
    }

    connectWebsocket(setWebsocket, baseUrl);
  }, [username]);

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
        { path: "/user", component: User },
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

  const permission = getPermission(
    project && project.members.find((m) => m.username === username).permission
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <StylesProvider injectFirst>
      <UserContext.Provider
        value={{
          imageBase,
          websocket,
          username,
          setUsername,
          text,
          textLang,
          language,
          setLanguage,
          userImageVersion,
          changeUserImage: () => setUserImageVersion(userImageVersion + 1),
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
                  <div style={{ height: "100%", overflowX: "auto" }}>
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
    </ThemeProvider>
  );
};

export default withWidth()(App);
