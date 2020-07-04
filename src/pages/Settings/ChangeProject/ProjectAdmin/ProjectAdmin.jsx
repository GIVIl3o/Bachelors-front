import React, { Fragment, useContext } from "react";

import { UserContext } from "App";

import {
  adminWrapper,
  adminTextWrapper,
  centerClass,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import { PERMISSIONS } from "Constants";

const ProjectAdmin = ({ project }) => {
  const { text } = useContext(UserContext);

  const admin = project.members.find(
    (t) => t.permission === PERMISSIONS.admin.value
  );

  return (
    <Fragment>
      <div className={adminWrapper}>
        <span className={adminTextWrapper}>{text.settings_project_admin}</span>
      </div>
      <div className={centerClass}>
        <MemberAvatar id={admin.username} />
      </div>
    </Fragment>
  );
};

export default ProjectAdmin;
