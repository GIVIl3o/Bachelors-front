import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { proxy } from "../package.json";

if (process.env.NODE_ENV === "production") axios.defaults.baseURL = proxy;

ReactDOM.render(<App />, document.getElementById("root"));
