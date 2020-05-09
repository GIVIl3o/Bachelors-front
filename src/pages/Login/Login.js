import React, { useState, useContext, useRef } from "react";
import TextFieldPassword from "components/utils/TextFieldPassword/";
import { TextField, InputAdornment, Paper, Avatar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SubmitButton from "components/utils/SubmitButton";
import axios from "axios";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";

import {
  marginLeft,
  marginLeftClean,
  centerPaper,
  pointer,
  input,
  avatarWrapper,
  submit,
} from "./styles.module.css";

const login = (state, setState, setUsername, setMessage, textLang) => {
  const formData = new FormData();
  formData.append("username", state.username);
  formData.append("password", state.password);

  setState({ ...state, loading: true });

  axios
    .post("/authentication", formData)
    .then((response) => {
      localStorage.setItem("jwt", response.data);
      setMessage(textLang.authentication_welcome, MessageTypes.success);
      setState({ ...state, loading: false });
      axios.defaults.headers.common = {
        Authorization: `Bearer ${response.data}`,
      };
      setUsername(state.username);
    })
    .catch((error) => {
      error.response.status === 403 &&
        setMessage(textLang.wrong_credentials, MessageTypes.error);

      setState({ ...state, loading: false });
    });
};

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    image: "",
  });

  const labelProps = {
    classes: { shrink: marginLeftClean, root: marginLeft },
  };

  const { text, textLang, setUsername } = useContext(UserContext);
  const usernameRef = useRef(null);
  const setMessage = useContext(MessageContext);

  const updateState = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const defaultAvatar = "/images/default_avatar.png";

  const updateImage = () => {
    const image = "/profile/" + state.username + ".png";
    state.username && setState({ ...state, image });
  };

  return (
    <Paper className={centerPaper}>
      <div className={avatarWrapper}>
        <Avatar src={state.image || defaultAvatar} style={{ margin: "auto" }} />
      </div>
      <TextField
        label={text.login_button}
        color="primary"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              className={pointer}
              onClick={() => usernameRef.current.focus()}
            >
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        InputLabelProps={labelProps}
        className={input}
        value={state.username}
        onChange={updateState}
        name="username"
        inputRef={usernameRef}
        onBlur={updateImage}
        autoFocus
      />

      <TextFieldPassword
        className={input}
        variant="outlined"
        label={text.password}
        name="password"
        onChange={updateState}
        InputLabelProps={labelProps}
      />

      <SubmitButton
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          login(state, setState, setUsername, setMessage, textLang);
        }}
        disabled={state.image === null}
        loading={state.loading}
        className={submit}
      >
        {text.submit_sign_up}
      </SubmitButton>
    </Paper>
  );
};

export default Login;
