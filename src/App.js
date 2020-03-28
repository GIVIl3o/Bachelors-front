import React, { useState } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import axios from "axios";

function App() {
  const [test, setTest] = useState("");

  const callBackend = async () => {
    const response = await axios.get("/retrieve?id=2");
    console.log(response);
    setTest(response.data.testField);
  };

  return (
    <StylesProvider injectFirst>
      <h1 style={{ color: "blue" }}>This almost looks fun</h1>
      <input type="button" onClick={callBackend} value="Ask backend" />
      {test === "" ? (
        ""
      ) : (
        <h2 style={{ color: "red" }}>Backend replied with:{test}</h2>
      )}
    </StylesProvider>
  );
}

export default App;
