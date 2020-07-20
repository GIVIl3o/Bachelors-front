import React, { useContext, useState } from "react";
import { UserContext, ProjectContext } from "App";

import Swal from "sweetalert2";
import axios from "axios";
import { MessageContext } from "components/utils/Messages";

import {
  alignEndText,
  settingsWrapper,
  settingsHeader,
  settingsExplanation,
  buttonClass,
  ownershipClass,
  ownerShipWrapper,
} from "./styles.module.css";
import { useHistory } from "react-router";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import MenuItem from "@material-ui/core/MenuItem";
import MarginTextField from "components/utils/MarginTextField/MarginTextField";
import { PERMISSIONS } from "Constants";

const deleteProject = (
  project,
  setProject,
  text,
  textLang,
  history,
  setMessage,
  setDeleteLoading
) => {
  Swal.fire({
    title: text.settings_delete_swal_title,
    text: text.settings_delete_swal_description,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: text.sweet_alert_cancel,
    reverseButtons: true,
    confirmButtonText: text.swee_alert_confirm,
    focusCancel: true,
  }).then(({ value: willDelete }) => {
    willDelete && setDeleteLoading(true);
    willDelete &&
      axios.delete(`/projects/${project.id}`).then(() => {
        setProject(undefined);
        Swal.fire({
          title: text.settings_project_deleted,
          icon: "success",
          reverseButtons: true,
          confirmButtonText: text.swee_alert_confirm,
        });
        history.push("/");
      });
  });
};

const changeAdmin = (
  project,
  setProject,
  newAdmin,
  text,
  setChangeAdminLoading
) => {
  Swal.fire({
    title: text.settings_change_swal_title,
    text: text.settings_change_swal_description,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: text.sweet_alert_cancel,
    reverseButtons: true,
    confirmButtonText: text.swee_alert_confirm,
    dangerMode: true,
    focusCancel: true,
  }).then(({ value: willChange }) => {
    willChange && setChangeAdminLoading(true);

    willChange &&
      axios
        .post(`/projects/${project.id}/change_admin/${newAdmin}`)
        .then(() => {
          const admin = project.members.find(
            (m) => m.permission === PERMISSIONS.admin.value
          );
          const filteredMembers = project.members.filter(
            (m) =>
              m.permission !== PERMISSIONS.admin.value &&
              m.username !== newAdmin
          );
          const members = [
            ...filteredMembers,
            { username: newAdmin, permission: PERMISSIONS.admin.value },
            { username: admin.username, permission: PERMISSIONS.master.value },
          ];

          Swal.fire({
            title: text.settings_project_changed,
            icon: "success",
            reverseButtons: true,
            confirmButtonText: text.swee_alert_confirm,
          });
          setChangeAdminLoading(false);
          setProject({ ...project, members });
        });
  });
};

const DangerZoneAdmin = () => {
  const { text, textLang } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [changeAdminLoading, setChangeAdminLoading] = useState(false);

  const [newAdmin, setNewAdmin] = useState("");

  const history = useHistory();

  const setMessage = useContext(MessageContext);

  const adminCandidates =
    project &&
    project.members
      .filter((m) => m.permission === PERMISSIONS.master.value)
      .map((m) => m.username);

  return (
    <>
      {adminCandidates && adminCandidates.length > 0 && (
        <div className={settingsWrapper}>
          <div className={alignEndText}>
            <span className={settingsHeader}>
              {text.settings_transfer_ownership}
            </span>
            <span className={settingsExplanation}>
              {text.settings_transfer_ownership_description}
            </span>
          </div>

          <div className={ownerShipWrapper}>
            <MarginTextField
              select
              variant="outlined"
              color="secondary"
              className={ownershipClass}
              value={newAdmin}
              label={text.settings_transfer_admin_label}
              onChange={(e) => setNewAdmin(e.target.value)}
            >
              {adminCandidates.map((username) => (
                <MenuItem value={username} key={username}>
                  {username}
                </MenuItem>
              ))}
            </MarginTextField>

            <SubmitButton
              className={buttonClass}
              variant="contained"
              color="secondary"
              onClick={() =>
                changeAdmin(
                  project,
                  setProject,
                  newAdmin,
                  text,
                  setChangeAdminLoading
                )
              }
              loading={changeAdminLoading}
              disabled={newAdmin === ""}
            >
              {text.settings_transfer_ownership_button}
            </SubmitButton>
          </div>
        </div>
      )}

      <div className={settingsWrapper}>
        <div className={alignEndText}>
          <span className={settingsHeader}>{text.settings_delete_header}</span>
          <span className={settingsExplanation}>
            {text.settings_delete_explanation}
          </span>
        </div>
        <SubmitButton
          className={buttonClass}
          variant="contained"
          color="secondary"
          onClick={() =>
            deleteProject(
              project,
              setProject,
              text,
              textLang,
              history,
              setMessage,
              setDeleteLoading
            )
          }
          loading={deleteLoading}
        >
          {text.settings_delete_button}
        </SubmitButton>
      </div>
    </>
  );
};

export default DangerZoneAdmin;
