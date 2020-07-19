import React, { useState, useContext, useEffect } from "react";

import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import SubmitButton from "components/utils/SubmitButton";

import {
  inputWrapper,
  marginWrapper,
  submitWrapper,
} from "./styles.module.css";
import { MenuItem } from "@material-ui/core";
import { PERMISSIONS } from "Constants";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ChangeMember = ({ setOpen }) => {
  const { text, textLang } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState(PERMISSIONS.developer.value);

  const setMessage = useContext(MessageContext);
  const { project, setProject } = useContext(ProjectContext);

  const [usernames, setUsernames] = useState([]);
  const [usernameField, setUsernameField] = useState("");

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
    if (!username) {
      setMessage(textLang.settings_add_no_user_message, MessageTypes.error);
      return;
    }

    if (permission === PERMISSIONS.owner.value) {
      if (
        project.members.find((t) => t.permission === PERMISSIONS.owner.value)
      ) {
        setMessage(
          textLang.settings_pruduct_owner_already_exists,
          MessageTypes.error
        );
        return;
      }
    }
    axios.post(
      `/projects/${project.id}/add?username=${username}&permission=${permission}`
    );
    const members = [...project.members, { username, permission }];
    setProject({ ...project, members });
    setOpen(false);
  };

  return (
    <div className={marginWrapper}>
      <span style={{ fontSize: "1.5rem" }}>{text.settings_new_member}</span>

      <Autocomplete
        className={inputWrapper}
        options={usernames}
        renderInput={(params) => (
          <MarginTextField
            {...params}
            label={text.settings_change_member}
            variant="outlined"
            color="primary"
            value={params.value || username || ""}
            autoFocus
          />
        )}
        onChange={(e, t) => setUsername(t)}
        value={username}
        open={usernameField.length > 0}
        onInputChange={(e) => setUsernameField(e.target.value || "")}
        onBlur={() => setUsernameField("")}
      />

      <MarginTextField
        select
        variant="outlined"
        color="primary"
        value={permission}
        label={text.settings_change_permission}
        className={inputWrapper}
        onChange={(e) => setPermission(e.target.value)}
        fullWidth
      >
        {Object.keys(PERMISSIONS)
          .filter((t) => PERMISSIONS[t].value !== PERMISSIONS.admin.value)
          .map((permission) => (
            <MenuItem value={PERMISSIONS[permission].value} key={permission}>
              {text[PERMISSIONS[permission].text]}
            </MenuItem>
          ))}
      </MarginTextField>

      <div className={submitWrapper}>
        <SubmitButton
          variant="contained"
          color="primary"
          onClick={addUserToProject}
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
