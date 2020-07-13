import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from "App";
import { Avatar } from "@material-ui/core";

const MemberAvatar = ({ id, className, onClick, version }) => {
  const { imageBase } = useContext(UserContext);

  return (
    <Tooltip
      title={id}
      placement="top"
      className={className}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      <Avatar
        src={imageBase + `/profile/${id}.png?version=${version}`}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default MemberAvatar;
