import React, { useState, useContext, useRef } from "react";
import TextFieldPassword from "components/utils/TextFieldPassword/";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Avatar,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SubmitButton from "components/utils/SubmitButton";
import axios from "axios";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Tooltip from "@material-ui/core/Tooltip";

import {
  input,
  pointer,
  color,
  secondaryText,
  login,
  marginLeft,
  marginLeftClean,
  paper,
  submit,
  avatar,
  avatarDiv,
  upperLoginText,
} from "./styles.module.css";
import { Link } from "react-router-dom";

const register = (state, setState, setUsername, setMessage, textLang) => {
  if (state.username.length < 4) {
    setMessage(textLang.username_length, MessageTypes.warning);
    return;
  }
  if (state.password.length < 4) {
    setMessage(textLang.password_length, MessageTypes.warning);
    return;
  }
  if (state.password !== state.repeatPassword) {
    setMessage(textLang.password_mismatch, MessageTypes.error);
    return;
  }

  const formData = new FormData();
  formData.append("username", state.username);
  formData.append("password", state.password);
  state.image && formData.append("avatar", state.image);

  setState({ ...state, loading: true });

  axios
    .post("/registration", formData)
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
      error.response.status === 400 &&
        setMessage(textLang.username_taken, MessageTypes.error);

      setState({ ...state, loading: false });
    });
};

const Registration = () => {
  const setMessage = useContext(MessageContext);
  const { setUsername } = useContext(UserContext);
  const { text, textLang } = useContext(UserContext);
  const usernameRef = useRef(null);

  const [state, setState] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    loading: false,
  });

  const updateState = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const labelProps = {
    classes: { shrink: marginLeftClean, root: marginLeft },
  };

  const imageChanged = (image) => {
    if (!image) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setState({
        ...state,
        image,
        profileImageResult: fileReader.result,
      });
    };
    fileReader.readAsDataURL(image);
  };

  const defaultAvatar = "/images/default_avatar.png";

  return (
    <form>
      <div className={upperLoginText}>
        <h1 className={color}>{text.sign_up}</h1>
        <div className={secondaryText}>
          {text.have_account}
          <Link className={login} to="/login">
            {text.login}
          </Link>
        </div>
      </div>
      <Paper className={paper}>
        <div className={avatarDiv}>
          <label htmlFor="contained-button-file">
            <Tooltip title={text.avatar_hover} placement="top">
              <Avatar
                src={state.profileImageResult || defaultAvatar}
                className={avatar}
              />
            </Tooltip>
          </label>
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
        <TextFieldPassword
          className={input}
          variant="outlined"
          label={text.repeat_password}
          name="repeatPassword"
          onChange={updateState}
          InputLabelProps={labelProps}
        />

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={(e) => imageChanged(e.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            component="span"
            color="secondary"
            className={input}
            startIcon={<CloudUploadIcon />}
          >
            {text.profile_image}
          </Button>
        </label>

        <SubmitButton
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            register(state, setState, setUsername, setMessage, textLang);
          }}
          disabled={state.image === null}
          loading={state.loading}
          className={submit}
        >
          {text.submit_sign_up}
        </SubmitButton>
      </Paper>
    </form>
  );
};

export default Registration;
