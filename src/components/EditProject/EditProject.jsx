import React, { useContext } from "react";
import { UserContext } from "App";

import {
  componentLayout,
  aboutProject,
  lineStyle,
  ownerAvatarClass,
  ownerDiv,
  ownerSpan,
  lineWrapper,
  membersDiv,
  lineStart,
  alignCenter,
} from "./styles.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import { Avatar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const EditProject = ({ project }) => {
  const { text, imageBase } = useContext(UserContext);

  const owner = project.members.filter((t) => t.permission === "OWNER")[0];
  const members = project.members
    .filter((t) => t.permission !== "OWNER")
    .map((t) => ({ ...t, permission: t.permission.toLowerCase() }));

  return (
    <div className={componentLayout}>
      <span className={aboutProject}>
        {text.about_project} <SettingsIcon />
      </span>
      <div className={lineStyle}>
        <div className={ownerDiv}>
          <span className={`${ownerSpan} ${lineStart}`}>
            {text.project_owner}
          </span>
          <Tooltip
            title={owner.username}
            placement="top"
            className={ownerAvatarClass}
          >
            <Avatar src={imageBase + `/profile/${owner.username}.png`} />
          </Tooltip>
        </div>
        <div className={lineWrapper}>
          <span className={lineStart}>{text.project_name}</span>
          <span>{project.title}</span>
        </div>

        <div className={`${lineWrapper} ${membersDiv}`}>
          <span className={`${lineStart} ${alignCenter}`}>
            {text.project_members}
          </span>
          <span>
            {members.map((member) => (
              <Tooltip
                title={member.username + " " + member.permission}
                placement="top"
                style={{ display: "inline-block" }}
              >
                <Avatar src={imageBase + `/profile/${member.username}.png`} />
              </Tooltip>
            ))}
          </span>
        </div>

        <div className={lineWrapper}>
          <span className={lineStart}>{text.project_description}</span>
          <span>{project.title}</span>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
