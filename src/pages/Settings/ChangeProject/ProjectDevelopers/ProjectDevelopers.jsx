import React, { Fragment, useContext } from "react";

import { UserContext } from "App";

import {
  developerTextWrapper,
  developersText,
  developersWrapper,
  addIcon,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import { PERMISSIONS } from "Constants";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Tooltip } from "@material-ui/core";

const ProjectDevelopers = ({
  project,
  editUsername,
  editable,
  canAddDevelopers,
  addMember,
}) => {
  const { text } = useContext(UserContext);

  const developers = project.members.filter(
    (t) => t.permission === PERMISSIONS.developer.value
  );

  return (
    <Fragment>
      <div className={developerTextWrapper}>
        <span className={developersText}>{text.settings_developers}</span>
      </div>
      <div className={developersWrapper}>
        {developers.map(({ username }) => (
          <MemberAvatar
            id={username}
            key={username}
            onClick={() => {
              if (editable) editUsername(username);
            }}
          />
        ))}
        {canAddDevelopers && (
          <Tooltip title={text.settings_add_developer} placement="top">
            <AddCircleOutlineIcon className={addIcon} onClick={addMember} />
          </Tooltip>
        )}
      </div>
    </Fragment>
  );
};

export default ProjectDevelopers;
