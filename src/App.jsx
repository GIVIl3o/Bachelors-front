import React, { useState, createContext, Fragment } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
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
<<<<<<< HEAD
import Sprints from "./pages/Sprints";
=======
import SwipeableRoutes from "react-swipeable-routes";
import Settings from "pages/Settings";
import Sprints from "pages/Sprints";
<<<<<<< HEAD
>>>>>>> 52e8b0d... Added navigation + project setting page started
=======
import Backlog from "pages/Backlog";
<<<<<<< HEAD
>>>>>>> 4fa1c08... progress
=======
import ActiveSprint from "pages/ActiveSprint";
>>>>>>> 35f0570... task details halfway in. task board started

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
<<<<<<< HEAD
    ? [
        { path: "/", component: Homepage },
        { path: "/projects/:id", component: Epics },
        { path: "/epics/:id", component: Sprints},        
      ]
=======
    ? [{ path: "/", component: Homepage }]
>>>>>>> 52e8b0d... Added navigation + project setting page started
    : [
        { path: "/", component: Homepage },
        { path: "/login", component: LoginPage },
      ];

  const projectRoutes = [
    { path: "/projects/:id/epics", component: Epics },
    { path: "/projects/:id/sprints", component: Sprints },
    { path: "/projects/:id/active", component: ActiveSprint },
    { path: "/projects/:id/backlog", component: Backlog },
    { path: "/projects/:id/about", component: Settings },
  ];
  sprint_name
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
        <ProjectContext.Provider value={{ project, setProject }}>
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
                <Switch>
                  {routes.map((route) => (
                    <Route
                      path={route.path}
                      component={route.component}
                      exact
                      key={route.path}
                    />
                  ))}
                  {username && (
                    <Fragment>
                      <SwipeableRoutes containerStyle={{ height: "100%" }}>
                        {projectRoutes.map((route) => (
                          <Route
                            path={route.path}
                            component={route.component}
                            exact
                            key={route.path}
                            defaultParams={{ id: "5" }}
                          />
                        ))}
                      </SwipeableRoutes>
                    </Fragment>
                  )}

                  <Route render={() => <Redirect to="/" />} />
                </Switch>
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
