import React, { useState, useContext, useEffect } from "react";

import Slide from "@material-ui/core/Slide";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import SubmitButton from "components/utils/SubmitButton";

import {
  inputWrapper,
  marginWrapper,
  submitWrapper,
  deleteMemberWrapper,
} from "./styles.module.css";
import { MenuItem } from "@material-ui/core";
import { PERMISSIONS } from "Constants";
import Swal from "sweetalert2";

const ChangeMember = ({ setOpen }) => {
  const { text, username: myUsername, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");

  const setMessage = useContext(MessageContext);
  const { project, setProject } = useContext(ProjectContext);

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    axios.get("/users").then((response) => {
      const users = response.data;

      const projectUsernames = project.members.map((t) => t.username);

      // really inefficient. not sure what to do
      setUsernames(
        users.filter((i) => projectUsernames.find((t) => t === i) === undefined)
      );
    });
  }, []);

  const addUserToProject = () => {
    axios.post(`/projects/${project.id}/add?username=` + username);
    const members = [
      ...project.members,
      { username, permission: PERMISSIONS.developer.value },
    ];
    setProject({ ...project, members });
    setOpen(false);
  };

  return (
    <div className={marginWrapper}>
      <span style={{ fontSize: "1.5rem" }}>{text.settings_new_member}</span>
      <MarginTextField
        select
        variant="outlined"
        color="primary"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label={text.settings_change_member}
        className={inputWrapper}
        fullWidth
      >
        {usernames.map((username) => (
          <MenuItem value={username} key={username}>
            {username}
          </MenuItem>
        ))}
      </MarginTextField>

      <MarginTextField
        select
        variant="outlined"
        color="primary"
        value={PERMISSIONS.developer.value}
        label={text.settings_change_permission}
        className={inputWrapper}
        disabled={true}
        fullWidth
      >
        <MenuItem value={PERMISSIONS.developer.value}>
          {text[PERMISSIONS.developer.text]}
        </MenuItem>
      </MarginTextField>

      <div className={submitWrapper}>
        <SubmitButton
          variant="contained"
          color="primary"
          onClick={addUserToProject}
          loading={loading}
        >
          {text.epic_submit}
        </SubmitButton>
        <SubmitButton
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          {text.epic_submit_cancel}
        </SubmitButton>
      </div>
    </div>
  );
};

export default ChangeMember;
