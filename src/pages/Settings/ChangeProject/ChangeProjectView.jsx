import React, { useContext } from "react";
import { UserContext, ProjectContext } from "App";
import { MessageContext } from "components/utils/Messages";
import Tooltip from "@material-ui/core/Tooltip";
import SettingsIconRotate from "components/utils/SettingsIconRotate";

import {
  wrapper,
  titleWrapper,
  settingsWrapper,
  lineWrapper,
  avatarsWrapper,
  avatarClass,
  description,
} from "./ChangeProject.module.css";
import { Avatar } from "@material-ui/core";

const ChangeProjectView = ({ setEdit }) => {
  const { text, textLang, imageBase } = useContext(UserContext);

  const { project } = useContext(ProjectContext);

  const DisplayAvatar = ({ username }) => (
    <div className={avatarClass}>
      <Tooltip title={username} placement="top">
        <Avatar src={`${imageBase}/profile/${username}.png`} />
      </Tooltip>
    </div>
  );

  const members = project.members.filter((t) => t.permission === "MEMBER");
  const admins = project.members.filter((t) => t.permission === "ADMIN");

  return (
    <div className={wrapper}>
      <div className={titleWrapper}>
        <span>{project.title}</span>
        <SettingsIconRotate
          textLang={textLang.settings_project_change}
          className={settingsWrapper}
          onClick={setEdit}
        />
      </div>
      <div className={lineWrapper}>
        <span>{text.settings_owner}</span>
        <div className={avatarsWrapper}>
          {project.members
            .filter((t) => t.permission === "OWNER")
            .map(({ username }) => (
              <DisplayAvatar key={username} username={username} />
            ))}
        </div>
      </div>
      {admins.length > 0 && (
        <div className={lineWrapper}>
          <span>{text.settings_admins}</span>
          <div className={avatarsWrapper}>
            {admins.map(({ username }) => (
              <DisplayAvatar key={username} username={username} />
            ))}
          </div>
        </div>
      )}
      {members.length > 0 && (
        <div className={lineWrapper}>
          <span>{text.settings_members}</span>
          <div className={avatarsWrapper}>
            {members.map(({ username }) => (
              <DisplayAvatar key={username} username={username} />
            ))}
          </div>
        </div>
      )}

      <div className={lineWrapper}>
        <span>{text.settings_description}</span>
        <span className={description}>
          ddddddddddddddddddddddddddddddddddddddddddddddddddd hello
          worldddddddddddddddddddddddddddddddddqwqwdfew wqsxzwqww
        </span>
      </div>
    </div>
  );
};

export default ChangeProjectView;
