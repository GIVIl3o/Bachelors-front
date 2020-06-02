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
import SwipeableRoutes from "react-swipeable-routes";
import Settings from "pages/Settings";
import Sprints from "pages/Sprints";

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
    ? [{ path: "/", component: Homepage }]
    : [
        { path: "/", component: Homepage },
        { path: "/login", component: LoginPage },
      ];

  const projectRoutes = [
    { path: "/projects/:id/epics", component: Epics },
    { path: "/projects/:id/sprints", component: Sprints },
    { path: "/projects/:id/about", component: Settings },
  ];

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
