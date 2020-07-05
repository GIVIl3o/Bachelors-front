import React, { Fragment, useContext } from "react";

import { UserContext } from "App";

import {
  masterTextWrapper,
  scrumMastersText,
  mastersWrapper,
  noScruMastersText,
  noScrumMasterTextWrapper,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import { PERMISSIONS } from "Constants";

const ProjectScrumMasters = ({ project, editUsername, editable }) => {
  const { text } = useContext(UserContext);

  const masters = project.members.filter(
    (t) => t.permission === PERMISSIONS.master.value
  );

  return (
    <Fragment>
      <div className={masterTextWrapper}>
        <span className={scrumMastersText}>
          {text.settings_scrum_masters_tex}
        </span>
      </div>
      <div className={mastersWrapper}>
        {masters.map(({ username }) => (
          <MemberAvatar
            id={username}
            key={username}
            onClick={() => {
              if (editable) editUsername(username);
            }}
          />
        ))}
        {masters.length === 0 && (
          <div className={noScrumMasterTextWrapper}>
            <span className={noScruMastersText}>
              {text.settings_no_scrum_masters}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProjectScrumMasters;
