import React, { useEffect, useRef, useContext } from "react";
import { UserContext } from "App";

import MemberAvatar from "components/MemberAvatar/MemberAvatar";

import {
  wrapper,
  titleWrapper,
  bottomWrapper,
  taskIdClass,
  avatarWrapper,
  labelWrapper,
  assigneePlaceholderClass,
} from "./styles.module.css";
import { getLabelValue, getTaskTypeValue } from "Constants";

const TaskCard = ({ task, setOpenDetailedTask }) => {
  const { text } = useContext(UserContext);

  const ref = useRef(null);
  useEffect(() => {}, [ref]);

  const assigneePlaceholder = task.assignee ? (
    <MemberAvatar id={task.assignee} className={avatarWrapper} />
  ) : (
    <span className={assigneePlaceholderClass} />
  );

  return (
    <div>
      <div className={wrapper} onClick={() => setOpenDetailedTask(task.id)}>
        <span className={titleWrapper}>{task.title}</span>
        <div className={bottomWrapper}>
          <span className={taskIdClass}>
            #{text[getTaskTypeValue(task.type).text]}
          </span>
          {task.label && (
            <span
              className={labelWrapper}
              style={{ backgroundColor: getLabelValue(task.label).color }}
            >
              {text[getLabelValue(task.label).text]}
            </span>
          )}
          {assigneePlaceholder}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
