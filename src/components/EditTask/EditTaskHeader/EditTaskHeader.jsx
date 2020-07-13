import React, { useState, useContext, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import EditIcon from "@material-ui/icons/Edit";
import { InputAdornment } from "@material-ui/core";

import {
  wrapper,
  titleClass,
  closeClass,
  dueClass,
  toDateClass,
  marginTop,
  editIcon,
  editTitleClass,
  editWrapper,
} from "./styles.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { format } from "date-fns";
import { TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

const dateFormat = "dd.MM.yyyy";

const EditTaskHeader = ({ task, onClose }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const sprint =
    project.sprints && project.sprints.find((s) => s.id === task.sprintId);
  const epic = sprint && project.epics.find((e) => e.id === sprint.epicId);

  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(task.title);

  const dueDate = epic && (
    <Fragment>
      <span className={dueClass}>{text.task_details_due} </span>
      <span className={toDateClass}>{format(epic.toDate, dateFormat)}</span>
    </Fragment>
  );

  const changeTitle = () => {
    setEditTitle(false);

    const newTask = { ...task, title };
    axios
      .post(`/tasks/${task.id}?projectId=${project.id}`, newTask)
      .then(() => {
        const tasks = [...project.tasks];
        tasks.find((t) => t.id === task.id).title = title;

        setProject({ ...project, tasks });
      });
  };

  const titleElement = (
    <div>
      {editTitle ? (
        <div className={editWrapper} onBlur={changeTitle}>
          <TextField
            className={editTitleClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    setEditTitle(false);
                    setTitle(task.title);
                  }}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "250px" }}
          />
        </div>
      ) : (
        <Fragment>
          <span className={titleClass} onClick={() => setEditTitle(true)}>
            {title}
          </span>
          <EditIcon className={editIcon} onClick={() => setEditTitle(true)} />
        </Fragment>
      )}
    </div>
  );

  return (
    <div>
      <div className={wrapper}>
        <div>
          {titleElement}
          <div className={marginTop}>{dueDate}</div>
        </div>
        <CloseIcon
          fontSize="large"
          className={closeClass}
          // important not to change to onClick={onClick}// argument will be passed
          onClick={() => onClose()}
        />
      </div>
      <hr style={{ marginBottom: "0px" }} />
    </div>
  );
};
export default EditTaskHeader;
