import React, {
  useState,
  useContext,
  Fragment,
  useRef,
  useEffect,
} from "react";
import { UserContext, ProjectContext } from "App";
import EditIcon from "@material-ui/icons/Edit";

import {
  wrapper,
  editIcon,
  editWrapper,
  descriptionExplanation,
  descriptionWrapper,
  DescriptionElementWrapper,
  editDescriptionClass,
  buttonsWrapper,
  buttonWrapper,
} from "./styles.module.css";
import axios from "axios";
import SubmitButton from "components/utils/SubmitButton";

const EditTaskDescription = ({ task }) => {
  const { text } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(task.description);

  const changeDescription = () => {
    setEditDescription(false);

    const newTask = { ...task, description };

    axios
      .post(`/tasks/${task.id}?projectId=${project.id}`, newTask)
      .then(() => {
        const tasks = project.tasks.filter((t) => t.id !== task.id);

        setProject({ ...project, tasks: [...tasks, newTask] });
      });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (editDescription) {
      inputRef.current.selectionStart = description.length;
      inputRef.current.selectionEnd = description.length;
    }
  }, [editDescription]);

  const cancelSaveButtons = (
    <div className={buttonsWrapper}>
      <SubmitButton
        className={buttonWrapper}
        variant="contained"
        color="secondary"
        onClick={() => {
          setEditDescription(false);
          setDescription(task.description);
        }}
      >
        {text.edit_task_description_cancel}
      </SubmitButton>
      <SubmitButton
        variant="contained"
        color="primary"
        className={buttonWrapper}
      >
        {text.edit_task_description_submit}
      </SubmitButton>
    </div>
  );

  const DescriptionElement = (
    <div className={DescriptionElementWrapper}>
      {editDescription ? (
        <div className={editWrapper} onBlur={changeDescription}>
          <textarea
            className={editDescriptionClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            ref={inputRef}
            spellCheck="false"
          />
          {cancelSaveButtons}
        </div>
      ) : (
        <Fragment>
          <span
            className={descriptionWrapper}
            onClick={() => setEditDescription(true)}
          >
            {description}
          </span>
          <EditIcon
            className={editIcon}
            onClick={() => setEditDescription(true)}
          />
        </Fragment>
      )}
    </div>
  );

  return (
    <div className={wrapper}>
      <span className={descriptionExplanation}>
        {text.edit_task_description}
      </span>
      <div style={{ marginTop: "1rem" }}>{DescriptionElement}</div>
    </div>
  );
};

export default EditTaskDescription;
