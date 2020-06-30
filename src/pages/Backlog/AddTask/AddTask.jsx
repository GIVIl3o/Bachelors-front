import React, { useState, useContext } from "react";

import Slide from "@material-ui/core/Slide";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import SubmitButton from "components/utils/SubmitButton";
import MenuItem from "@material-ui/core/MenuItem";
import {
  wrapper,
  input,
  submitWrapper,
  assigneeClass,
} from "./styles.module.css";
import { InputAdornment } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Swal from "sweetalert2";
import { PROGRESS, TASK_TYPE } from "Constants";

const baseTask = {
  id: null,
  title: "",
  assignee: "",
  description: "",
  progress: PROGRESS.planned.value,
  type: TASK_TYPE.story.value,
  leftId: null,
  rightId: null,
};

const submitTask = (
  project,
  setProject,
  task,
  text,
  textLang,
  setMessage,
  setLoading,
  onSuccess
) => {
  if (task.title.length < 4) {
    setMessage(textLang.backlog_new_title_length, MessageTypes.error);
    return;
  }
  const toSubmit = { ...task, assignee: task.assignee ? task.assignee : null };

  setLoading(true);

  axios
    .post(`/tasks?projectId=${project.id}`, toSubmit)
    .then(({ data: task }) => {
      setLoading(false);
      setProject({ ...project, tasks: [...project.tasks, task] });
      onSuccess();
      Swal.fire({
        title: text.backlog_task_created,
        icon: "success",
        confirmButtonText: text.swal_ok,
      });
    });
};

const AddTask = ({ open, setOpen, projectId }) => {
  const { text, textLang } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);

  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState(baseTask);

  const setMessage = useContext(MessageContext);

  const handleClose = () => {
    setOpen(false);
    setTask(baseTask);
  };

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <div className={wrapper}>
        <MarginTextField
          label={text.backlog_new_title}
          color="primary"
          variant="outlined"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className={input}
          autoFocus
        />

        <MarginTextField
          select
          color="secondary"
          variant="outlined"
          label={text.backlog_new_assignee}
          className={assigneeClass}
          value={task.assignee}
          onChange={(e) => {
            const value = e.target.value;
            const assignee = value ? value : null;
            setTask({ ...task, assignee });
          }}
          {...(task.assignee !== ""
            ? {
                InputProps: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer", marginRight: "15px" }}
                      onClick={() => setTask({ ...task, assignee: "" })}
                    >
                      <ClearIcon
                        fontSize="small"
                        style={{ color: "#313131" }}
                      />
                    </InputAdornment>
                  ),
                },
              }
            : {})}
        >
          {project.members.map(({ username }) => (
            <MenuItem value={username} key={username}>
              {username}
            </MenuItem>
          ))}
        </MarginTextField>

        <MarginTextField
          label={text.backlog_new_description}
          color="secondary"
          variant="outlined"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className={input}
          multiline
          rows="5"
          fullWidth
        />

        <div className={submitWrapper}>
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={() =>
              submitTask(
                project,
                setProject,
                task,
                text,
                textLang,
                setMessage,
                setLoading,
                handleClose
              )
            }
            loading={loading}
          >
            {text.epic_submit}
          </SubmitButton>
          <SubmitButton
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            {text.epic_submit_cancel}
          </SubmitButton>
        </div>
      </div>
    </Slide>
  );
};

export default AddTask;
