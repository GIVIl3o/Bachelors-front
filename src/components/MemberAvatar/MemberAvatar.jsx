import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from "App";
import { Avatar } from "@material-ui/core";

const MemberAvatar = ({ id, className, onClick }) => {
  const { imageBase } = useContext(UserContext);

  return (
    <Tooltip
      title={id}
      placement="top"
      className={className}
      style={{ display: "inline-block" }}
    >
      <Avatar src={imageBase + `/profile/${id}.png`} onClick={onClick} />
    </Tooltip>
  );
};

export default MemberAvatar;
