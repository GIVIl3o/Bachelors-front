import React, { useState, createContext } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Navbar from "./components/Navbar/";
import Homepage from "./pages/Home/";
import Messages from "components/utils/Messages";

let user = "";

try {
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

const App = () => {
  const [username, setUsername] = useState(user);

  return (
    <StylesProvider injectFirst>
      <UserContext.Provider value={{ username, setUsername }}>
        <Messages>
          <BrowserRouter>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100vh",
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

export default App;
