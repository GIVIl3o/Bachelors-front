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
} from "./styles.module.css";
import { getLabelValue, getTaskTypeValue } from "Constants";

const TaskCard = ({ task, setOpenDetailedTask }) => {
  const { text } = useContext(UserContext);

  console.log(task);

  const ref = useRef(null);
  useEffect(() => {}, [ref]);

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
          {task.assignee && (
            <MemberAvatar id={task.assignee} className={avatarWrapper} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
