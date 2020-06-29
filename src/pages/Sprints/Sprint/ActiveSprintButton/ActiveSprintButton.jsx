import React, { useState, useContext } from "react";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import Swal from "sweetalert2";
import { wrapper } from "./styles.module.css";

const ActiveSprintButton = ({ sprint }) => {
  const [loading, setLoading] = useState(false);
  const { text } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);

  const setActive = async (id, active) => {
    setLoading(true);

    const currentSpring = project.sprints.find((sprint) => sprint.id === id);

    const toSendSprint = { ...currentSpring, active };

    await axios.put(`/sprints?projectId=${project.id}`, toSendSprint);

    setLoading(false);
  };

  return sprint.active ? (
    <SubmitButton
      variant="contained"
      color="secondary"
      className={wrapper}
      loading={loading}
      onClick={(e) => {
        e.stopPropagation();

        setActive(sprint.id, false).then(() => {
          const filteredSprints = project.sprints.filter(
            (e) => e.id !== sprint.id
          );
          const sprints = [...filteredSprints, { ...sprint, active: false }];
          setProject({ ...project, sprints });
        });
      }}
    >
      {text.sprint_deactivate}
    </SubmitButton>
  ) : (
    <SubmitButton
      variant="contained"
      color="primary"
      loading={loading}
      className={wrapper}
      onClick={(e) => {
        e.stopPropagation();

        const previouslyActive = project.sprints.find(
          (sprint) => sprint.active
        );

        if (previouslyActive) {
          Swal.fire({
            title: text.swal_already_active_sprint_title,
            text: text.swal_already_active_sprint_description,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: text.sweet_alert_cancel,
            reverseButtons: true,
            confirmButtonText: text.swee_alert_confirm,
            focusCancel: true,
          }).then(async ({ value: shouldChange }) => {
            if (shouldChange) {
              await setActive(previouslyActive.id, false);
              await setActive(sprint.id, true);

              const filteredSprints = project.sprints.filter(
                (e) => e.id !== sprint.id && e.id !== previouslyActive.id
              );
              const sprints = [
                ...filteredSprints,
                { ...sprint, active: true },
                { ...previouslyActive, active: false },
              ];
              setProject({ ...project, sprints });
            }
          });
        } else {
          setActive(sprint.id, true).then(() => {
            const filteredSprints = project.sprints.filter(
              (e) => e.id !== sprint.id
            );
            const sprints = [...filteredSprints, { ...sprint, active: true }];
            setProject({ ...project, sprints });
          });
        }
      }}
    >
      {text.sprint_activate}
    </SubmitButton>
  );
};

export default ActiveSprintButton;
