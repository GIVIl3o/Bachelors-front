import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "App";
import MarginTextField from "components/utils/MarginTextField/MarginTextField";

import {
  wrapper,
  commentsText,
  addCommentWrapper,
  submitWrapper,
  commentClass,
  commentAvatar,
  commentWrapper,
} from "./styles.module.css";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import axios from "axios";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import { useRef } from "react";

// Because websockets use callbacks on subscription. if we just create commets,setComment = useState. old comments reference will be stored!!
const EditTaskComments = ({ task }) => {
  const { websocket, text, username } = useContext(UserContext);

  const [commentText, setCommentText] = useState("");

  const [componentVersion, setComponentsVersion] = useState([""]);
  const reRender = () =>
    setComponentsVersion(["placeHolder to force re-render component"]);

  const commentsRef = useRef([]);

  useEffect(() => {
    if (!websocket) return;
    const subscription = websocket.subscribe(
      `/comment/${task.id}`,
      ({ body }) => {
        const comment = JSON.parse(body);
        commentsRef.current = [comment, ...commentsRef.current];
        reRender();
      }
    );

    return () => subscription.unsubscribe();
  }, [websocket]);

  useEffect(() => {
    axios
      .get(`/tasks/${task.id}/comments?projectId=${task.projectId}`)
      .then(({ data }) => {
        commentsRef.current = data.sort((t1, t2) => t2.id - t1.id);
        reRender();
      });
  }, [task.id]);

  const addComment = () => {
    setCommentText("");
    const newComment = {
      taskId: task.id,
      text: commentText,
      author: username,
      projectId: task.projectId,
    };

    websocket.send("/comment", {}, JSON.stringify(newComment));
  };

  return (
    <div className={wrapper}>
      <span className={commentsText}>{text.task_details_comments}</span>
      <div className={addCommentWrapper}>
        <div style={{ marginLeft: "60px" }}>
          <MarginTextField
            label={text.task_details_add_comment}
            multiline
            rows="2"
            fullWidth
            variant="outlined"
            color="primary"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div
          style={commentText ? {} : { visibility: "hidden" }}
          className={submitWrapper}
        >
          <SubmitButton
            variant="contained"
            color="secondary"
            onClick={() => setCommentText("")}
          >
            {text.epic_submit_cancel}
          </SubmitButton>
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={addComment}
          >
            {text.task_details_add_comment_button}
          </SubmitButton>
        </div>
        <div>
          {commentsRef.current.map((comment) => (
            <div key={comment.id} className={commentWrapper}>
              <div className={commentAvatar}>
                <MemberAvatar id={comment.author} />
              </div>
              <div>
                <MarginTextField
                  value={comment.text}
                  disabled={true}
                  multiline
                  fullWidth
                  variant="outlined"
                  color="primary"
                  InputProps={{
                    style: {
                      borderRadius: "1.5rem",
                      backgroundColor: "rgba(202, 229, 255, 0.5)",
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditTaskComments;
