import React, { useContext, useState } from "react";
import { UserContext, ProjectContext } from "App";

import Swal from "sweetalert2";
import axios from "axios";

import {
  alignEndText,
  settingsWrapper,
  settingsHeader,
  settingsExplanation,
  buttonClass,
} from "./styles.module.css";
import { useHistory } from "react-router";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";

const LeaveProject = (
  project,
  setProject,
  text,
  history,
  username,
  setLeaveLoading
) => {
  Swal.fire({
    title: text.settings_delete_swal_title,
    text: text.settings_project_leave_swal_description,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: text.sweet_alert_cancel,
    reverseButtons: true,
    confirmButtonText: text.swee_alert_confirm,
    focusCancel: true,
  }).then(({ value: leave }) => {
    leave && setLeaveLoading(true);
    leave &&
      axios
        .post(`/projects/${project.id}/leave?username=${username}`)
        .then(() => {
          setProject(undefined);
          Swal.fire({
            title: text.settings_project_leave_success,
            icon: "success",
            reverseButtons: true,
            confirmButtonText: text.swee_alert_confirm,
          });
          history.push("/");
        });
  });
};

const DangerZoneAdmin = () => {
  const { text, username } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const [leaveLoading, setLeaveLoading] = useState(false);

  const history = useHistory();

  return (
    <div className={settingsWrapper}>
      <div className={alignEndText}>
        <span className={settingsHeader}>
          {text.settings_leave_project_header}
        </span>
        <span className={settingsExplanation}>
          {text.settings_leave_project_explanation}
        </span>
      </div>
      <SubmitButton
        className={buttonClass}
        variant="contained"
        color="secondary"
        onClick={() =>
          LeaveProject(
            project,
            setProject,
            text,
            history,
            username,
            setLeaveLoading
          )
        }
        loading={leaveLoading}
      >
        {text.settings_project_leave_button}
      </SubmitButton>
    </div>
  );
};

export default DangerZoneAdmin;
