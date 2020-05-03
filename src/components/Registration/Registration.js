import React, { useState, useContext } from "react";
import TextFieldPassword from "components/utils/TextFieldPassword/";
import { TextField, InputAdornment } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SubmitButton from "components/utils/SubmitButton";
import axios from "axios";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";

import {
  input,
  pointer,
  color,
  secondaryText,
  login,
} from "./styles.module.css";

const register = (state, setState, setUsername, setMessage) => {
  if (state.password !== state.repeatPassword) {
    setMessage("Passwords do not match", MessageTypes.error);
    return;
  }

  const formData = new FormData();
  formData.append("username", state.username);
  formData.append("password", state.password);

  setState({ ...state, loading: true });

  axios
    .post("/registration", formData)
    .then((response) => {
      localStorage.setItem("jwt", response.data);
      setMessage(`Welcome ${state.username}`, MessageTypes.success);
      setState({ ...state, loading: false });
      axios.defaults.headers.common = {
        Authorization: `Bearer ${response.data}`,
      };
      setUsername(state.username);
    })
    .catch((error) => {
      const errorMessage = error.response.data;
      setMessage(errorMessage.message, MessageTypes.error);
      setState({ ...state, loading: false });
    });
};

const Registration = () => {
  const setMessage = useContext(MessageContext);
  const { setUsername } = useContext(UserContext);
  const { text } = useContext(UserContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    loading: false,
  });

  const updateState = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <h1 className={color}>{text.sign_up}</h1>
      <div className={secondaryText}>
        {text.have_account}
        <span className={login}>{text.login}</span>
      </div>
      <form>
        <TextField
          label={text.login_button}
          color="primary"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className={pointer}>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          className={input}
          value={state.username}
          onChange={updateState}
          name="username"
          autoFocus
        />
        <TextFieldPassword
          className={input}
          variant="outlined"
          label="Password"
          name="password"
          onChange={updateState}
        />
        <TextFieldPassword
          className={input}
          variant="outlined"
          label="Repeat password"
          name="repeatPassword"
          onChange={updateState}
        />

        <SubmitButton
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            register(state, setState, setUsername, setMessage);
          }}
          disabled={state.image === null}
          loading={state.loading}
          className={input}
        >
          Sign up
        </SubmitButton>
      </form>
    </div>
  );
};

export default Registration;
