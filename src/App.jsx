<<<<<<< HEAD
import React, { useState, createContext, Fragment } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
=======
import React, { useState, createContext } from "react";
import { Route, BrowserRouter } from "react-router-dom";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
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
import SwipeableRoutes from "react-swipeable-routes";
=======
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
import Settings from "pages/Settings";
import Sprints from "pages/Sprints";
import Backlog from "pages/Backlog";
import ActiveSprint from "pages/ActiveSprint";
<<<<<<< HEAD
=======
import ProjectTransitionWrapper from "./pages/ProjectTransitionWrapper";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

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

=======
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
    ? [
        { path: "/", component: Homepage },
        { path: "/projects/:id", component: Epics },
        // { path: "/epics/:id", component: Sprints},
<<<<<<< HEAD
    ]        
=======
      ]
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
    : [
        { path: "/", component: Homepage },
        { path: "/login", component: LoginPage },
      ];

  const projectRoutes = [
<<<<<<< HEAD
    { path: "/projects/:id/epics", component: Epics },
    { path: "/projects/:id/sprints", component: Sprints },
    { path: "/projects/:id/active", component: ActiveSprint },
    { path: "/projects/:id/backlog", component: Backlog },
    { path: "/projects/:id/about", component: Settings },
  ];
=======
    { path: "/projects/:id/epics", Component: Epics },
    { path: "/projects/:id/sprints", Component: Sprints },
    { path: "/projects/:id/active", Component: ActiveSprint },
    { path: "/projects/:id/backlog", Component: Backlog },
    { path: "/projects/:id/about", Component: Settings },
  ];

>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
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
<<<<<<< HEAD
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
=======
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

>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
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
