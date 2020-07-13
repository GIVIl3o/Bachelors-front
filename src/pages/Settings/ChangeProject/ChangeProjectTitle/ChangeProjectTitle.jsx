import React, { useState, useContext } from "react";

import {
  titleSpanText,
  editIcon,
  titleWrapper,
  wrapper,
  editTitleClass,
  settingsWrapper,
} from "./styles.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { TextField, InputAdornment } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { ProjectContext, UserContext } from "App";
import SettingsIconRotate from "components/utils/SettingsIconRotate/SettingsIconRotate";
import { MessageTypes } from "components/utils/Messages/Messages";
import { MessageContext } from "components/utils/Messages/Messages";

const ChangeProjectTitle = ({
  project,
  editable,
  updateProject,
  showChangeIcon,
  onMemberChangeClick,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(project.title);

  const { text, textLang } = useContext(UserContext);
  const setMessage = useContext(MessageContext);

  return (
    <div className={wrapper}>
      <div className={settingsWrapper}>
        {showChangeIcon && (
          <SettingsIconRotate
            text={text.settings_project_change}
            onClick={onMemberChangeClick}
          />
        )}
      </div>
      {editTitle ? (
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
                  setTitle(project.title);
                }}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: "250px" }}
          onBlur={() => {
            if (title.length >= 4) {
              updateProject({ ...project, title });
            } else {
              setMessage(
                textLang.settings_project_title_length,
                MessageTypes.error
              );
              setTitle(project.title);
            }
            setEditTitle(false);
          }}
        />
      ) : (
        <div className={titleWrapper}>
          <span
            className={titleSpanText}
            onClick={() => editable && setEditTitle(true)}
          >
            {project.title}
          </span>
          {editable && (
            <EditIcon className={editIcon} onClick={() => setEditTitle(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeProjectTitle;
