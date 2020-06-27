import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  Fragment,
} from "react";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";

import MemberAvatar from "components/MemberAvatar/MemberAvatar";

import {
  wrapper,
  titleWrapper,
  bottomWrapper,
  taskIdClass,
  avatarWrapper,
  labelWrapper,
  draggedOverThisCard,
} from "./styles.module.css";
import { getLabelValue } from "Constants";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, setDragging, setOpenDetailedTask, dragging }) => {
  const setMessage = useContext(MessageContext);
  const { text, textLang } = useContext(UserContext);

  // is another task dragged over us?
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const homeCard =
    task.assignee === null ? <Fragment /> : <MemberAvatar id={task.assignee} />;

  const ref = useRef(null);
  useEffect(() => {}, [ref]);

  const wrapperDivClasses =
    wrapper + (isDraggedOver ? ` ${draggedOverThisCard}` : "");

  //console.log(wrapperDivClasses);

  return (
    <div>
      <div
        className={wrapperDivClasses}
        onClick={() => setOpenDetailedTask(task.id)}
      >
        <span className={titleWrapper}>{task.title}</span>
        <div className={bottomWrapper}>
          <span className={taskIdClass}>#{task.id}</span>
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
