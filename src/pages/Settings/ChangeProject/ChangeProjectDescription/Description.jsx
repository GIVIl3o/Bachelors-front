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
import { MessageContext } from "components/utils/Messages/Messages";
import { MessageTypes } from "components/utils/Messages/Messages";

const ChangeProjectDescription = ({ project, editable, updateProject }) => {
  const { text, textLang } = useContext(UserContext);

  const setMessage = useContext(MessageContext);

  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(project.description);

  const changeDescription = () => {
    if (editable) {
      setEditDescription(false);
      if (description.length >= 10) {
        updateProject({ ...project, description });
      } else {
        setMessage(
          textLang.settings_project_description_length,
          MessageTypes.error
        );
        setDescription(project.description);
      }
    }
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
          setDescription(project.description);
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
            onClick={() => editable && setEditDescription(true)}
          >
            {description}
          </span>
          {editable && (
            <EditIcon
              className={editIcon}
              onClick={() => editable && setEditDescription(true)}
            />
          )}
        </Fragment>
      )}
    </div>
  );

  return (
    <div className={wrapper}>
      <div style={{ marginTop: "1rem" }}>{DescriptionElement}</div>
    </div>
  );
};

export default ChangeProjectDescription;
