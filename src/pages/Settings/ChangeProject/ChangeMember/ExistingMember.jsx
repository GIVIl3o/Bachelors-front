import React, { useState, useContext } from "react";

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
import { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ChangeMember = ({ setOpen, state }) => {
  const { text, username: myUsername, textLang } = useContext(UserContext);

  const { username: initialUsername, permission: initialPermission } = state;

  const [username, setUsername] = useState(initialUsername);
  const [permission, setPermission] = useState(
    initialPermission || PERMISSIONS.developer.value
  );

  const setMessage = useContext(MessageContext);
  const { project, setProject } = useContext(ProjectContext);

  const updateMember = () => {
    if (permission === PERMISSIONS.owner.value)
      if (
        project.members.find(
          (member) => member.permission === PERMISSIONS.owner.value
        )
      ) {
        setMessage(
          textLang.settings_pruduct_owner_already_exists,
          MessageTypes.error
        );
        return;
      }
    if (!username) {
      setMessage(textLang.settings_please_select_member, MessageTypes.error);
      return;
    }

    axios.post(
      `/projects/${project.id}/update_permission?username=${username}&permission=${permission}`
    );

    const members = [...project.members];
    members.find((m) => m.username === username).permission = permission;
    setProject({ ...project, members });
    setOpen(false);
  };

  const deleteMember = () => {
    Swal.fire({
      title: text.settings_delete_swal_title,
      text: text.settings_remove_member,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: text.sweet_alert_cancel,
      reverseButtons: true,
      confirmButtonText: text.swee_alert_confirm,
      focusCancel: true,
    }).then(({ value: remove }) => {
      if (remove) {
        axios.post(`/projects/${project.id}/leave?username=${username}`);

        const members = project.members.filter((m) => m.username !== username);
        const tasks = [...project.tasks];
        tasks.forEach((t) => {
          if (t.assignee === username) t.assignee = null;
        });

        setProject({ ...project, members, tasks });
        setOpen(false);
      }
    });
  };

  // if other member icon got clicked
  // don't want to lift the state
  useEffect(() => {
    if (!state.username) return;

    const changedPermission = project.members.find(
      (t) => t.username === state.username
    ).permission;

    setUsername(state.username);
    setPermission(changedPermission);
  }, [state.username]);

  return (
    <div className={marginWrapper}>
      <span style={{ fontSize: "1.5rem" }}>
        {text.settings_change_member_permission}
      </span>
      <Autocomplete
        className={inputWrapper}
        options={project.members
          .filter((member) => member.username !== myUsername)
          .map((t) => t.username)}
        renderInput={(params) => (
          <MarginTextField
            {...params}
            label={text.settings_change_member}
            variant="outlined"
            color="primary"
            value={params.value || username || ""}
          />
        )}
        onChange={(e, t) => setUsername(t)}
        value={username}
      />
      <MarginTextField
        select
        variant="outlined"
        color="primary"
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
        label={text.settings_change_permission}
        className={inputWrapper}
        fullWidth
      >
        {Object.keys(PERMISSIONS)
          .filter((t) => PERMISSIONS[t].value != PERMISSIONS.admin.value)
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
          onClick={updateMember}
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
      {username && (
        <div className={deleteMemberWrapper}>
          <SubmitButton
            variant="contained"
            color="secondary"
            onClick={deleteMember}
            fullWidth
          >
            {text.settings_remove_user}
          </SubmitButton>
        </div>
      )}
    </div>
  );
};

export default ChangeMember;
