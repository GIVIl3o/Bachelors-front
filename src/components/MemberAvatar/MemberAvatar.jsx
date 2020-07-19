import React, { useContext, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from "App";
import { Avatar } from "@material-ui/core";

const MemberAvatar = ({ id, className, onClick }) => {
  const { imageBase, username, userImageVersion } = useContext(UserContext);

  const version = id === username ? userImageVersion : 0;

  const [lastWrongUsernameAttempt, setLastWrongUsernameAttempt] = useState("");

  return (
    <Tooltip
      title={id}
      placement="top"
      className={className}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      <Avatar
        src={
          id === lastWrongUsernameAttempt
            ? imageBase + "/images/default_avatar.png"
            : imageBase + `/profile/${id}.png?version=${version}`
        }
        onClick={onClick}
        onError={() => {
          setLastWrongUsernameAttempt(id);
        }}
      />
    </Tooltip>
  );
};

export default MemberAvatar;
