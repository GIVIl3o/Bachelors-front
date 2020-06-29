<<<<<<< HEAD
import React from "react";

import {} from "./styles.module.css";

const Sprint = () => {
  return <h1>asd</h1>;
};

=======
import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import Swal from "sweetalert2";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ActiveSprintButton from "./ActiveSprintButton";
import AssignmentIcon from "@material-ui/icons/Assignment";
import {
  wrapper,
  titleWrapper,
  titleClass,
  deleteButton,
  selectedSprint,
  assignmentWrapper,
} from "./styles.module.css";
import { useHistory } from "react-router";
import Tooltip from "@material-ui/core/Tooltip";

const Sprint = ({ sprint, onOpen, selected }) => {
  const { project, setProject } = useContext(ProjectContext);
  const { text } = useContext(UserContext);

  const history = useHistory();

  const deleteSprint = (e) => {
    e.stopPropagation();

    Swal.fire({
      title: text.sprint_delete_swal_title,
      text: text.sprint_delete_swal_description,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: text.sweet_alert_cancel,
      reverseButtons: true,
      confirmButtonText: text.swee_alert_confirm,
      focusCancel: true,
    }).then(({ value: willDelete }) => {
      willDelete &&
        axios
          .delete(`/sprints/${sprint.id}?projectId=${project.id}`)
          .then(() => {
            Swal.fire({
              title: text.sprint_deleted_succesfully_swal,
              icon: "success",
              reverseButtons: true,
              confirmButtonText: text.swee_alert_confirm,
            });
            const sprints = project.sprints.filter((t) => t.id !== sprint.id);

            const removeSprintIdFromTasks = (task) =>
              task.sprintId === sprint.id ? null : sprint.id;

            const unconnectTasks = project.tasks.map((task) => ({
              ...task,
              sprintId: removeSprintIdFromTasks(task),
            }));

            setProject({ ...project, sprints, tasks: unconnectTasks });
          });
    });
  };

  const wrapperSelectedClasses = `${wrapper} ${selected ? selectedSprint : ""}`;

  const numberOfTasks = project.tasks.filter(
    (task) => task.sprintId === sprint.id
  ).length;

  return (
    <div
      className={wrapperSelectedClasses}
      onClick={() =>
        sprint.active
          ? history.push({
              pathname: `/projects/${project.id}/active`,
            })
          : history.push({
              pathname: `/projects/${project.id}/sprints`,
              search: `sprintId=${sprint.id}`,
            })
      }
    >
      <div className={titleWrapper}>
        <span className={titleClass}>{sprint.title}</span>
      </div>

      <div className={assignmentWrapper}>
        <Tooltip title={text.sprint_number_of_tasks} placement="top">
          <div className={assignmentWrapper}>
            <span>{numberOfTasks}</span>
            <div>
              <AssignmentIcon />
            </div>
          </div>
        </Tooltip>
      </div>

      <ActiveSprintButton sprint={sprint} />

      <div className={deleteButton} onClick={deleteSprint}>
        <DeleteForeverIcon fontSize="large" />
      </div>

      <div style={selected ? { visibility: "hidden" } : {}}>
        <MoreHorizIcon
          fontSize="large"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(sprint);
          }}
        />
      </div>
    </div>
  );
};
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
export default Sprint;
