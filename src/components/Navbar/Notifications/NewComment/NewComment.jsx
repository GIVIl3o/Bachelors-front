import React, { useContext } from "react";
import { UserContext } from "App";

import { wrapper, leftTextClass } from "./styles.module.css";

const NewComment = ({ notification, onClick }) => {
  const { text } = useContext(UserContext);

  const comment = notification.payload;
  return (
    <div className={wrapper} onClick={() => onClick(notification)}>
      <div>
        <span className={leftTextClass}>
          {text.notification_comment_author}
        </span>
        <span>{comment.author}</span>
      </div>
      <div>
        <span className={leftTextClass}>{text.notification_comment_text}</span>
        <span>{comment.text}</span>
      </div>
    </div>
  );
};

export default NewComment;
