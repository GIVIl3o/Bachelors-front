import React, { Fragment, useContext } from "react";

import { UserContext } from "App";

import {
  permissionTextWrapper,
  permissionText,
  actualPermissionWrapper,
  permissionWrapper,
  PermissionCenteringWrapper,
} from "./styles.module.css";
import { ProjectContext } from "App";

const YourPermission = ({ project, editUsername, editable }) => {
  const { text } = useContext(UserContext);

  const { permission } = useContext(ProjectContext);

  return (
    <Fragment>
      <div className={permissionTextWrapper}>
        <span className={permissionText}>{text.settings_your_permission}</span>
      </div>
      <div className={actualPermissionWrapper}>
        <div className={PermissionCenteringWrapper}>
          <span className={permissionWrapper}>{text[permission.text]}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default YourPermission;
