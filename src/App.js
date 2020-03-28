import React from "react";
import { StylesProvider } from "@material-ui/core/styles";

function App() {
  return (
    <StylesProvider injectFirst>
      <h1 style={{ color: "blue" }}>This almost looks fun</h1>
    </StylesProvider>
  );
}

export default App;
