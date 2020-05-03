import React, { useState, createContext } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Navbar from "./components/Navbar/";
import Homepage from "./pages/Home/";
import Messages from "components/utils/Messages";
import Text from "Text.json";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

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

const App = ({ width }) => {
  const [username, setUsername] = useState(user);
  const [language, setLanguage] = useState(savedLanguage);

  const text = { ...Text };
  Object.keys(Text).forEach((t) => (text[t] = Text[t][language]));

  const cssMargin = isWidthDown("xs", width)
    ? {}
    : isWidthUp("md", width)
    ? { marginLeft: "5rem", marginRight: "5rem" }
    : { marginLeft: "2rem", marginRight: "2rem" };

  return (
    <StylesProvider injectFirst>
      <UserContext.Provider
        value={{ username, setUsername, text, language, setLanguage }}
      >
        <Messages>
          <BrowserRouter>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100vh",
                ...cssMargin,
              }}
            >
              <Navbar />
              <Switch>
                <Route path="/" component={Homepage} exact />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </div>
          </BrowserRouter>
        </Messages>
      </UserContext.Provider>
    </StylesProvider>
  );
};

export default withWidth()(App);
