import React, { useContext, useState } from "react";
import { UserContext, ProjectContext } from "App";

import {
  wrapper,
  textWrapper,
  inputWrapperClass,
  buttonsWrapper,
} from "./styles.module.css";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import axios from "axios";
import { PROGRESS, TASK_TYPE } from "Constants";

const submitTask = (
  taskName,
  textLang,
  setMessage,
  setAddTask,
  progressColumnName,
  project,
  setProject,
  setLoading,
  firstTask,
  sprintId
) => {
  if (taskName.length < 4) {
    setMessage(
      textLang.board_task_title_must_be_4_characters,
      MessageTypes.error
    );
    return;
  }
  setLoading(true);

  const task = {
    id: null,
    title: taskName,
    sprintId,
    assignee: null,
    description: "",
    progress: PROGRESS[progressColumnName].value,
    type: TASK_TYPE.story.value,
    leftId: null,
    rightId: firstTask ? firstTask.id : null,
  };

  axios.post(`/tasks?projectId=${project.id}`, task).then(({ data: task }) => {
    if (firstTask) firstTask.leftId = task.id;

    setProject({ ...project, tasks: [task, ...project.tasks] });
    setAddTask(false);
  });
};

const AddTaskBoard = ({
  setAddTask,
  progressColumnName,
  firstTask,
  sprintId,
}) => {
  // firstTaskId - id of the task before which we will insert new task

  const { text, textLang } = useContext(UserContext);

  const [taskName, setTaskName] = useState("");

  const { project, setProject } = useContext(ProjectContext);

  const [loading, setLoading] = useState(false);

  const setMessage = useContext(MessageContext);

  return (
    <div className={wrapper}>
      <span className={textWrapper}>{text.board_add_task_title}</span>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className={inputWrapperClass}
        autoFocus
      />
      <div className={buttonsWrapper}>
        <span>
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={() =>
              submitTask(
                taskName,
                textLang,
                setMessage,
                setAddTask,
                progressColumnName,
                project,
                setProject,
                setLoading,
                firstTask,
                sprintId
              )
            }
            loading={loading}
          >
            {text.board_submit_new_task}
          </SubmitButton>
        </span>

        <SubmitButton
          variant="contained"
          color="secondary"
          onClick={() => setAddTask(false)}
        >
          {text.board_cancel_new_task}
        </SubmitButton>
      </div>
    </div>
  );
};

export default AddTaskBoard;
