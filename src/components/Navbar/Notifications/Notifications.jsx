import React, { useState, useEffect, useContext, useRef } from "react";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";

import {
  wrapper,
  popoverWrapper,
  popoverPaper,
  iconWrapper,
} from "./styles.module.css";
import { UserContext } from "App";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { MessageContext } from "components/utils/Messages/Messages";
import { MessageTypes } from "components/utils/Messages/Messages";
import NewComment from "./NewComment";

const useReRenderState = () => {
  const [notificationVersion, setNotificationVersion] = useState([
    "need to re-render component",
  ]);

  return () => setNotificationVersion(notificationVersion);
};

// Can't use useLocation because of the callback... :(
const getOpenedTaskId = () => {
  const split = window.location.href.split("?");
  if (split.length === 1) return undefined;

  return parseInt(new URLSearchParams(split[1]).get("taskId"), 10);
};

const openTask = (taskId, projectId, history) => {
  axios
    .get(`/tasks/${taskId}/sprint?projectId=${projectId}`)
    .then(({ data: sprint }) => {
      if (sprint === null)
        history.push(`/projects/${projectId}/backlog?taskId=${taskId}`);
      else {
        if (sprint.active) {
          history.push(`/projects/${projectId}/active?taskId=${taskId}`);
        } else {
          history.push(
            `/projects/${projectId}/sprints?sprintId=${sprint.id}&taskId=${taskId}`
          );
        }
      }
    });
};

const Notifications = () => {
  const [openEl, setOpenEl] = useState(null);

  const { websocket, username, textLang, text } = useContext(UserContext);
  const setMessage = useContext(MessageContext);

  const notificationsRef = useRef([]);

  const reRender = useReRenderState();
  const history = useHistory();

  useEffect(() => {
    axios.get("/users/notifications").then(({ data }) => {
      const notifications = data.map((t) => ({
        ...t,
        payload: JSON.parse(t.payload),
      }));

      notificationsRef.current = notifications;
      reRender();
    });
  }, [websocket, username]);

  useEffect(() => {
    if (!websocket) return;
    websocket.subscribe(`/notification/${username}`, (t) => {
      const body = JSON.parse(t.body);
      const openedTaskId = getOpenedTaskId();
      const payload = JSON.parse(body.payload);

      if (payload.taskId === openedTaskId)
        websocket.send("/notification/delete", {}, body.id);
      else {
        notificationsRef.current = [
          { ...body, payload },
          ...notificationsRef.current,
        ];
        reRender();
        setMessage(
          textLang.task_new_comment_bottom_notification,
          MessageTypes.info,
          {
            messageTime: 60 * 1000,
            onClick: () => {
              const taskId = payload.taskId;
              openTask(taskId, payload.projectId, history);
            },
          }
        );
      }
    });
  }, [websocket]);

  const location = useLocation();

  useEffect(() => {
    const taskId = getOpenedTaskId();
    if (taskId) {
      notificationsRef.current
        .filter((t) => t.payload.taskId === taskId)
        .forEach((viewedNotification) => {
          websocket.send("/notification/delete", {}, viewedNotification.id);
        });
      notificationsRef.current = notificationsRef.current.filter(
        (t) => t.payload.taskId !== taskId
      );

      reRender();
    }
  }, [location.search]);

  const onNotificationClick = (notification) => {
    const comment = notification.payload;

    setOpenEl(null);

    openTask(comment.taskId, comment.projectId, history);
  };

  return (
    <div className={wrapper}>
      <Badge badgeContent={notificationsRef.current.length} color="secondary">
        <NotificationsActiveIcon
          fontSize="large"
          color="primary"
          className={iconWrapper}
          onClick={(e) => setOpenEl(e.target)}
        />
      </Badge>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openEl ? true : false}
        anchorEl={openEl}
        onClose={() => setOpenEl(null)}
        classes={{ paper: popoverWrapper }}
      >
        <div className={popoverPaper}>
          {notificationsRef.current.map((notification) => (
            <NewComment
              notification={notification}
              key={notification.id}
              onClick={onNotificationClick}
            />
          ))}
          {notificationsRef.current.length === 0 && (
            <span>{text.notifications_empty}</span>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default Notifications;
