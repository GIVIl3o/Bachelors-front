import React, { useState, useContext, Fragment } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  assigneeText,
  wrapper,
  assigneeWrapper,
  noAssignee,
  dontDisplaySelect,
  editAssignee,
  upperWrapper,
  avatarWrapper,
  assigneeUsername,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar";

const EditTaskAssignee = ({ task }) => {
  const { text, username } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const [open, setOpen] = useState(false);

  const changeAssignee = (selectedAssignee) => {
    const assignee = selectedAssignee === "" ? null : selectedAssignee;

    const watching = task.watching
      ? true
      : assignee === username
      ? true
      : false;

    const newTask = { ...task, assignee, watching };

    const tasks = [...project.tasks];

    const searchedTask = tasks.find((t) => t.id === task.id);
    searchedTask.assignee = assignee;
    searchedTask.watching = watching;

    setProject({ ...project, tasks });

    axios.post(
      `/tasks/${task.id}?projectId=${project.id}&assigneeWatching=${true}`,
      newTask
    );
  };

  const NoAssignee = (
    <div>
      <span>{text.task_edit_no_assignee}</span>
      <span> - </span>
      <span
        className={noAssignee}
        onClick={() => {
          changeAssignee(username);
        }}
      >
        {text.task_edit_assign_yourself}
      </span>
    </div>
  );

  const Assignee = (
    <Fragment>
      <div className={avatarWrapper} onClick={() => setOpen(true)}>
        <MemberAvatar id={task.assignee} />
        <span className={assigneeUsername}>{task.assignee}</span>
      </div>
    </Fragment>
  );

  return (
    <div className={wrapper}>
      <div className={upperWrapper}>
        <span className={assigneeText}>{text.task_assignee}</span>
        <span className={editAssignee} onClick={() => setOpen(true)}>
          {text.task_assignee_edit}
        </span>
      </div>
      <div className={assigneeWrapper}>
        {task.assignee == null ? NoAssignee : Assignee}
      </div>
      <Select
        open={open}
        onClose={() => setOpen(false)}
        value={task.assignee || ""}
        onChange={(e) => changeAssignee(e.target.value)}
        className={dontDisplaySelect}
      >
        <MenuItem value={""}>
          <em>{text.task_assignee_unassigne}</em>
        </MenuItem>
        {project.members.map((member) => (
          <MenuItem value={member.username} key={member.username}>
            {member.username}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default EditTaskAssignee;
